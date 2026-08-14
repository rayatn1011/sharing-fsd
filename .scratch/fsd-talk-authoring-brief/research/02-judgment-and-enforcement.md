# 人／AI 的架構判斷與 Steiger／CI 的保護範圍

研究快照：2026-08-14。以下以 FSD 官方文件、FSD 官方 Agent Skill，以及 Steiger 0.7.0 的官方文件與原始碼為準。

## 結論

FSD 要落地，必須同時具備兩個系統：

1. **語意決策系統**：人負責政策與最終取捨，人或 AI 依業務語意判斷 layer、slice、責任、資料所有權與例外。
2. **可執行護欄**：Steiger 與一般 CI 只驗證能從檔案、import graph、型別、測試與 build 觀察到的事實。

因此，演講不能說「Steiger 保證專案符合 FSD」；較精確的說法是：

> Steiger 會依目前設定，攔下它能從目錄與靜態 import 看見的 FSD 違規；人與 AI 仍要判斷邊界本身是否有正確的業務意義，CI 則保證被選定的機械檢查確實通過。

FSD 官方將 layers 定義為具有語意的責任層級、slices 定義為由業務領域決定的群組；這兩件事天然需要產品與程式脈絡。另一方面，layer import rule 與 Public API rule 則能轉成靜態檢查。[FSD Layers](https://fsd.how/docs/reference/layers/) · [FSD Slices and segments](https://fsd.how/docs/reference/slices-segments/) · [FSD Public API](https://fsd.how/docs/reference/public-api/)

## 四種保護範圍

| 範圍 | 能回答的問題 | 適合的負責者 | 能否當 merge gate |
| --- | --- | --- | --- |
| Steiger 的結構規則 | 「這條 import 是否逆向？」「是否繞過 Public API？」「目錄形狀是否違規？」 | Steiger | 對已校準的硬規則可以 |
| Steiger 的啟發式規則 | 「slice 是否可能拆太細？」「Shared/lib 是否可能變成垃圾場？」 | Steiger 提醒，人／AI 判讀 | 建議先 warning，除非團隊明確採納門檻 |
| 一般 CI | 「型別、build、測試、lint、自訂架構測試是否通過？」 | 專用工具與自訂 script | 可以，但只保證該檢查 |
| 語意與演進判斷 | 「這真的是業務 feature 嗎？」「抽取後是否較容易變更？」 | 人制定政策；人／AI 協作判斷 | 不宜假裝成單一 linter 結論 |

## Steiger 能可靠機械驗證的部分

### 1. 靜態 import graph 的方向與入口

- `fsd/forbidden-imports` 檢查向較高 layer 的 import，以及同一 layer 不同 slices 的 cross-import；合法的 entity `@x` cross-reference API 會被辨識。它可以拆成 `no-higher-level-imports` 與 `no-cross-imports` 來個別設定，但兩個細分規則預設未啟用，recommended config 使用合併規則。[規則說明](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/forbidden-imports/README.md) · [目前啟用／停用清單](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/index.ts)
- `fsd/no-public-api-sidestep` 檢查外部程式是否直接 import slice 或 Shared segment 的內部檔案；`fsd/public-api` 檢查應有的 `index.*` 是否存在；`fsd/no-layer-public-api` 阻止把整個 layer 做成一個 barrel。[Public API 檢查原始碼](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/public-api/index.ts) · [sidestep 檢查原始碼](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/no-public-api-sidestep/index.ts)
- 這些規則驗證的是**可觀察的依賴方向與入口**。它們能阻止一大類跨 layer／slice 的耦合與循環，但不能證明整個 module graph 絕無循環；同一 slice、App／Shared 內部仍可能有 cycle。

### 2. 可由檔案樹判定的結構規則

Steiger 目前列有 `no-segmentless-slices`、`no-segments-on-sliced-layers`、`no-reserved-folder-names`、`ambiguous-slice-names`、`typo-in-layer-name`、`no-processes` 等結構檢查；這些很適合在團隊確認目錄契約後由 CI 執行。[Steiger README 的完整規則表](https://github.com/feature-sliced/steiger#rules)

這類規則可以證明「檔案樹符合已選定的形式」，不能證明「放進該資料夾的程式具有正確責任」。例如 `shared/ui` 裡的檔案名稱與結構可能完全合法，但其中仍可能藏著業務規則。

### 3. Vue／Nuxt 專案的實際可見範圍

Steiger 0.7.0 的 dependency extractor 已包含 `.vue` parser，會擷取 `<script>` 中的靜態 import、dynamic import 與 `require`；也支援 JS／TS／JSX／TSX、Svelte 與 Astro。[language tools 原始碼](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/_language-tools/index.ts) · [npm 0.7.0 套件頁](https://www.npmjs.com/package/%40feature-sliced/steiger-plugin)

但這也揭示一個 Nuxt caveat：檢查器只能分析原始碼中可擷取、可解析到檔案的 dependency。**推論**：沒有顯式 import 的 Nuxt auto-import、runtime injection、字串組出的路徑或框架在 build 時生成的關係，不能假定已被同一套 import rule 覆蓋；需要以 Nuxt build、型別檢查、測試或專案自訂檢查補上。

## Steiger 會機械報告、但仍需判讀的啟發式規則

「機器能偵測」和「機器能裁決正確性」是兩件事。以下規則能穩定產生 diagnostic，但 diagnostic 是 review 線索，不是業務架構的證明：

- `fsd/excessive-slicing`：官方規則文件明說目前的 20 個 slices 門檻是**任意設定**。[規則說明](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/excessive-slicing/README.md)
- `fsd/shared-lib-grouping`：15 個未分組模組的門檻同樣被明說是**任意設定**。[規則說明](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/shared-lib-grouping/README.md)
- `fsd/insignificant-slice`：依 0 或 1 個 reference 建議刪除或合併；規則自己使用「probably」的理由。是否有穩定邊界、獨立演進或刻意隔離，仍是架構判斷。[規則說明](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/insignificant-slice/README.md)
- `fsd/segments-by-purpose`：以 `utils`、`helpers`、`hooks`、`modals`、`components` 黑名單提示 technical-by-essence 命名。它能看名稱，不能理解內容真正的目的。[規則說明](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/segments-by-purpose/README.md)
- `fsd/inconsistent-naming`：官方標記為 early development，且目前假設 slice 名稱是單一英文單字。[規則說明](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/inconsistent-naming/README.md)
- `fsd/repetitive-naming`、`fsd/no-ui-in-app`：前者是可讀性偏好；後者的理由是 `app/ui`「通常」是錯誤，並明列單頁 app 例外。兩者都不應脫離團隊脈絡宣稱為普遍真理。[repetitive-naming](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/repetitive-naming/README.md) · [no-ui-in-app](https://github.com/feature-sliced/steiger/blob/master/packages/steiger-plugin-fsd/src/no-ui-in-app/README.md)

### 一個容易誤導的預設

Steiger 的 recommended config 會把目前啟用的規則全部設為 `error`；CLI 有 error diagnostic 就以 exit code 1 結束，warning 則只有在 `--fail-on-warnings` 時才失敗。[recommended config 產生方式](https://github.com/feature-sliced/steiger/blob/master/packages/toolkit/src/create-configs.ts) · [CLI exit 行為](https://github.com/feature-sliced/steiger/blob/master/packages/steiger/src/cli.ts)

所以 severity 是**團隊的 policy 選擇**，不是規則真理程度的官方分級。研究建議：

- import direction、Public API sidestep、明確的目錄契約可作 error／merge gate；
- arbitrary threshold、reference count、英文命名與「通常」型規則先作 warning；
- 團隊確認建議已成為自身不可違反的政策後，再升級為 error；
- 每個 override／ignore 都應說明原因與預計移除條件。

## 一般 CI 可以補上的機械檢查

以下是根據工具邊界得出的**實務推論**，不是 Steiger 宣稱會提供的保證：

- TypeScript／Vue typecheck：驗證 alias、Public API export 與 consumer 的型別契約。
- Nuxt production build：驗證 file-based routing、auto-import、server／client 邊界與 bundler 才能看見的整合問題。
- 單元、integration、E2E／contract tests：驗證資料流與行為，而不是資料夾外觀。
- 一般 lint 或自訂架構測試：補上專案特有 forbidden imports、generated directories、runtime-specific entry points。
- 專用 dependency-cycle check：補上 Steiger import rule 沒有涵蓋的同 slice、App、Shared 或非標準路徑 cycles。Steiger 的目前規則表沒有「所有 module cycle」檢查。[目前規則表](https://github.com/feature-sliced/steiger#rules)
- CI 應使用 lockfile 固定 Steiger／plugin 版本並輸出版本。Steiger 官方 README 仍標示 beta、API 可能變更，且 0.5.0 曾更換 config 格式；截至本研究快照 npm 套件為 0.7.0。[Steiger README](https://github.com/feature-sliced/steiger) · [npm 版本](https://www.npmjs.com/package/%40feature-sliced/steiger-plugin)

一般 CI 仍然只能回答「我們寫下的 executable checks 有沒有通過」。若沒有先把規則轉成工具設定或測試，CI 不會因為架構文件寫得很好就自動保護它。

## 必須由人或 AI 理解脈絡的判斷

以下問題不能只從目錄或 import path 得出答案：

- 一段程式的責任究竟是 app-wide orchestration、page-specific flow、可重用 feature、business entity，還是無業務語意的 Shared infrastructure。
- slice 名稱是否反映團隊真正使用的 ubiquitous language，邊界是否高內聚，兩個 slices 是否應合併。
- 「被兩處使用」是否代表穩定重用，還是恰好相似、未來會各自演進；是否值得付出 Public API 與抽象成本。
- Shared 裡是否混入業務規則。Steiger 能看到 `shared/lib` 的數量與名稱，不能理解折扣、權限或表單 validation 的產品語意。
- Public API 是否小而有意義、是否隱藏不穩定 internals。Steiger 可以驗證入口存在與未被 sidestep，不能評價 API contract 的品質。
- entity `@x` 是否真的是不可避免的 domain relationship，還是錯誤切分造成的 coupling；官方只說應減少使用，主要限於 Entities。[FSD Public API for cross-imports](https://fsd.how/docs/reference/public-api/#public-api-for-cross-imports)
- 資料的 source of truth、mutation ownership、cache key 意義、server／client lifecycle，以及 Nuxt router、Vue Query、Nuxt UI form 與 FSD 邊界如何協調。
- 這次偏離規則是有期限的 migration seam，還是會永久破壞依賴方向；何時應調整規則本身。

FSD 官方也明確說，不需要使用所有 layers，只有帶來價值時才新增；Features 不是越多越好，是否成為 feature 要考慮跨 pages 重用與新進者能否快速理解重要功能。這些措辭本身就是決策框架，而不是可單憑 AST 決定的分類器。[FSD Layers](https://fsd.how/docs/reference/layers/)

## 人與 AI 應如何分工

### 人負責

- 定義這個產品的 business language、架構目標、風險容忍度與例外政策。
- 決定哪些 Steiger diagnostics 是 hard gate、哪些只是 smell。
- 對高成本或跨 bounded context 的邊界決策負最終責任。

### AI Agent 適合協助

- 讀取同一份架構 skill／CONTEXT／ADR，在開發前提出 placement 與 dependency 方向。
- 在 review 時解釋變更涉及的責任、資料流與例外，找出 linter 看不到的語意風險。
- 針對 Steiger diagnostic 提供可能原因與修正選項，而不是只搬檔案讓 CI 變綠。
- 每次依可引用的規則說明理由，遇到 business ambiguity 時請人裁決。

FSD 團隊目前提供 v2.1 Agent Skill，明確把 code placement、cross-import、Nuxt integration、TanStack Query 等定位為 agent 的「decision framework」與參考資料；它讓 Agent 取得共同語言，但不是 deterministic validator。[FSD 官方 Agent Skills](https://github.com/feature-sliced/skills)

### Steiger／CI 負責

- 每次提交都重跑已採納的結構與 import rules。
- 以 typecheck、build、tests 驗證框架整合與執行行為。
- 讓已知的硬規則不必每次消耗 reviewer 的注意力。

最實用的閉環是：**人訂政策 → Skill 讓人與 AI 在開發／review 時共享判斷框架 → Steiger／CI 驗證可機械化部分 → 例外與新踩坑回饋到政策和 Skill**。

## 演講可安全使用的說法

### 建議說

- 「FSD 同時提供語意上的決策框架，以及一部分能被工具執行的規則。」
- 「Steiger 保護 import direction、Public API 使用與目錄契約；人與 AI 保護業務邊界的意義。」
- 「AI skill 把同一套準則帶進開發與 review；CI 再驗證其中可判定的部分。」
- 「降低 reviewer 負擔不是取消 review，而是把 deterministic checks 從人的工作記憶移到工具。」
- 「沒有任何單一工具能證明架構可持續；可持續來自共同語言、可執行護欄和持續校準。」

### 避免說

- 「Steiger 可以保證沒有 circular dependency。」
- 「Steiger 通過就代表符合 FSD。」
- 「CI 可以判斷程式應該放在哪一層。」
- 「recommended rules 都是無條件的 FSD hard rules。」
- 「Agent skill 能取代 domain knowledge 或 reviewer。」

## 適合投影片的一張圖

```text
                    人制定政策與最終裁決
                              │
          ┌───────────────────┴───────────────────┐
          ▼                                       ▼
  Skill / 架構文件                         Steiger / CI
  人與 AI 的共同判斷語言                  可重複的機械護欄
          │                                       │
          ├─ layer / slice 的業務意義             ├─ import direction
          ├─ 資料所有權與演進邊界                 ├─ Public API sidestep
          ├─ framework integration 的取捨         ├─ folder contract
          └─ exception rationale                  └─ typecheck / build / tests
          └───────────────────┬───────────────────┘
                              ▼
                  開發快、review 快、漂移可見
```

這張圖的重點不是「AI 對抗 linter」，而是兩者處理不同種類的不確定性：AI 協助理解與解釋，linter／CI 提供可重現且不可遺忘的底線。
