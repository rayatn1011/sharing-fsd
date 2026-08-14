# 定義 create-slide 的製作規格與驗收契約

Type: grilling
Status: resolved
Blocked by: 07, 08

## Question

最終 authoring brief 必須包含哪些已決定內容、來源與資產連結、每段時間、講者提示要求、程式碼準確性規則、視覺驗收與 build 驗證，才能讓 `create-slide` 不必重新打開已解決的產品決策？

## Comments

### 正式 deck 身分與公開承諾

使用者提供官方場次介紹並確認：正式標題沿用「一段程式碼，到底該放哪裡？從 Feature-based 到 Feature-Sliced Design」，deck id 為 `feature-based-to-fsd`，正式路徑為 `slides/feature-based-to-fsd/index.tsx`。

Authoring brief 必須把官方介紹視為公開承諾：簡報需明確回應程式碼 placement、從 feature-based 到 FSD 的架構演進、逐步導入的判斷方式、AI 搭配官方 Skill 與 Linter 的開發／驗證閉環，以及資深開發者關心的模組邊界與長期可維護性。「逐步導入」指可採用的演進原則與判斷順序，不擴張成既定範圍外的逐檔搬遷教學。

### 單頁文字密度

使用者確認採用 light density：每頁只承擔一個判斷，通常以一句結論搭配一個圖解或 2–3 個短要點；完整脈絡留在 presenter notes。技術頁仍只顯示約 3–6 行足以證明邊界的必要程式碼，不用縮小字級換取密度。

### 動態強度

使用者確認採用 subtle motion：不為每頁強制加動畫；頁面轉場共用同一套短促 motion vocabulary，通常落在 140–280ms。只有推理順序重要時才使用 `<Steps>`，morph 只用於同一架構物件跨頁的狀態延續。任何頁面由 overview 直接進入時仍必須完整可讀。

### 正文頁數

使用者確認 40 分鐘正文固定為 34 頁，不含可能的 Q&A 備援頁；逐步揭露仍算同一頁。頁面預算為：開場 2、Technical-based 2、Feature-based 改善 1、Feature-based 缺口 2、全場承諾 1、FSD primer 6、真實案例一 4、真實案例二 3、真實案例三 4、Nuxt routing 2、Vue Query 2、人的判斷 1、人與 AI 共用語言 1、Steiger／CI 1、三層閉環回顧 1、方法論結論 1。39:30–40:00 的緩衝不新增內容，停留在結尾頁。

### Q&A 邊界

使用者確認 10 分鐘 Q&A 聚焦於本演講已建立的判斷框架與證據：placement、ownership、dependency、抽離時機、逐步導入、人／AI／Skill／Steiger／Husky／CI 分工，以及 Nuxt routing、Vue Query、Nuxt UI form 作為架構接縫的問題。不承諾在缺乏專案脈絡時直接裁決每個檔案位置、提供完整套件 API 教學、現場產出逐檔 migration plan，或把團隊政策／speaker interpretation 說成官方 FSD 規則。超出範圍時先回答可遷移的判斷原則，再指出需要哪些脈絡才能下結論。

### Q&A 備援頁

使用者確認在 34 頁正文之後製作 5 頁「Q&A 備援」，不計入 40 分鐘正文：placement／逐步導入判斷樹、Nuxt 4 fixture、Vue Query reactive／cache／SSR 接縫、Nuxt UI 的 UI control／form adapter／server-data owner 邊界，以及 Steiger hard rules／heuristics、Husky `pre-push` 團隊政策與遠端 CI 的自動保護矩陣。備援頁可由 overview 直接跳入，不在正常正文中講述，也不得成為正文理解的前置條件。

### 修正：五項內容升為正文

使用者隨後明確改變決定：上述五項不是只供 Q&A 使用的補充，而是演講中重要的踩坑經驗與落地判斷，必須在 40 分鐘正文內可見。前一段的「5 頁 Q&A 備援」安排作廢；authoring contract 必須重新分配既定 34 頁，讓 placement／逐步導入、Nuxt 4 fixture、Vue Query reactive／cache／SSR、Nuxt UI 三責任邊界，以及 Steiger／Husky／CI 保護矩陣都成為正文敘事節點，而不是正文理解所依賴的隱藏 appendix。

使用者確認修訂後的 34 頁分配：開場 2、Technical-based 1、Feature-based 改善 1、Feature-based 缺口 1、全場承諾 1、FSD primer 5、真實案例一 4、真實案例二 3、真實案例三 4、Nuxt routing／fixture 3、Vue Query 3、人的判斷 1、人與 AI 共用語言 1、Steiger／CI 2、三層閉環回顧 1、方法論結論 1；39:30–40:00 停留在結尾頁。Nuxt fixture、Vue Query reactive／SSR 與自動保護矩陣因此各取得獨立正文 beat，前段則以更精煉的頁數保留全部既定敘事節點。

### 無額外 backup slides

使用者確認不新增正文外 backup slides，deck 固定 34 頁。每個技術段落的 presenter notes 必須提供官方來源、版本、完整設定／程式碼指標、「可能追問」與安全回答邊界；Q&A 直接跳回相關正文頁。遇到需要特定專案脈絡的問題，回答可遷移的判斷原則，不臨場做完整架構診斷。

### 正式 authoring task 的模型設定

使用者最初要求後續實際執行 `create-slide`、製作正式 OpenSlide deck 的 task 使用模型 `gpt-5.6-sol`、reasoning effort `max`，其後明確將 reasoning effort 提升為 `ultra`（超高）。最新要求取代舊值；這是 authoring handoff 的硬性執行條件，不代表本 Wayfinder ticket 開始製作 slides，也不要求改變本 ticket 的模型。

## Answer

使用者最終 verdict 為「可採用」。以下 contract 是後續把全部 Wayfinder 決策轉成 authoring brief、再交給 `create-slide` 的完整 handoff；後續 task 不得重新詢問已鎖定的受眾、時間、敘事、案例、framework seams、人／AI／CI 分工、視覺方向或下列 authoring 選項。

### MUST

#### 1. Authoring brief 的必要章節

Authoring brief 必須包含且互相交叉核對：

1. **正式場次與公開承諾**：正式標題「一段程式碼，到底該放哪裡？從 Feature-based 到 Feature-Sliced Design」、講者「一隻狐狸」、適合對象、40 分鐘演講加 10 分鐘 Q&A，以及官方介紹承諾的 placement、從 feature-based 到 FSD 的架構演進、逐步導入、AI 搭配官方 Skill 與 Linter、可持續演進。此處的「逐步導入」是演進原則與判斷順序，不是逐檔 migration 教學。
2. **Locked narrative**：依[決定 40 分鐘的敘事弧線與時間配置](./06-decide-story-arc-and-timing.md)與[用粗略大綱驗證演講節奏](./07-prototype-talk-outline.md)寫出全場單向敘事、每一節的任務與不可刪節點。
3. **34-page authoring map**：每頁列出 page number、page role、所屬時間段、核心 message、主要 visual、內容分類標籤、是否使用 reveal／morph、預估秒數，以及其前後 transition。
4. **Case truth table**：逐項列出可公開的親身事實、必須匿名化的資訊、只可作為合成案例的細節、官方 guidance、團隊 policy 與 speaker interpretation。
5. **Evidence and version matrix**：每個技術聲明對應一手來源、查核日期／版本、已驗證範圍、仍屬 inference 的範圍，以及 authoring 時是否需要重驗。
6. **Visual system**：palette、type scale、spacing、內容分類標籤、圖解 grammar、code treatment、motion vocabulary 與不對稱控制迴路。
7. **Presenter-notes schema**：使用下節固定欄位，填滿全部 34 頁。
8. **Implementation boundaries**：OpenSlide id／path、檔案限制、可用 dependencies、assets placement、禁止修改範圍。
9. **Acceptance plan**：逐頁視覺檢查、build、頁數／內容／時間／連結／程式碼 audit、正常排練與 overflow drill。
10. **Q&A contract**：可回答範圍、需要補充脈絡的界線，以及 notes 中的備援材料。

#### 2. Canonical sources 與 asset pointers

- 現行 FSD guidance 只以 [fsd.how](https://fsd.how/) 及其連結的一手資料為 canonical；不得引用 legacy `feature-sliced.design`。失去舊網域的經過若提及，只能標為講者背景，不冒充官方已發表的歷史。
- 必須讀取並引用本 Wayfinder map、tickets 01–10 的 Answers，以及下列研究：
  - [人／AI 的架構判斷與 Steiger／CI 的保護範圍](../research/02-judgment-and-enforcement.md)
  - [Nuxt file-based routing 與 FSD 的現行整合方式](../research/03-nuxt-routing.md)
  - [把 FSD 的 TanStack Query guidance 轉譯成 Nuxt／Vue Query 案例](../research/04-vue-query.md)
  - [Nuxt 4 整合 fixture 驗證](../research/10-nuxt4-fixture-verification.md)
- Prototype pointers 必須保留為可回溯素材，不得把 prototype 文案直接當正式稿：
  - Nuxt UI boundary：branch `prototype/nuxt-ui-form-boundary`，commit `059326be75e53b39500b4496a9301a9963e41c04`，path `.scratch/fsd-talk-authoring-brief/prototypes/05-nuxt-ui-form-boundary.html`
  - Talk outline：branch `prototype/fsd-talk-outline`，commit `cac9f7ee762deb52d0f0e3bb3855fe8bcf317a36`，path `.scratch/fsd-talk-authoring-brief/prototypes/07-talk-outline.html`
  - Visual language：branch `prototype/fsd-talk-visual-language`，commit `23c24ddf2c06db0ba411efe2dfab7ee6ff58dd14`，path `.scratch/fsd-talk-authoring-brief/prototypes/08-visual-language.html`
- 視覺依據使用 [Nuxt Design Guidelines](https://nuxtjs.tw/design.md)；各 library／tool 的 API 或版本聲明使用各自官方文件與 repository。來源細節優先放在 notes，避免傷害頁面可讀性。

#### 3. 正文時間與頁面節點

正文固定 **34 頁**，逐步揭露仍算同一頁；沒有正文外 backup slides。

| 時間 | 節點 | 頁數 | 必須完成的敘事任務 |
| --- | --- | ---: | --- |
| 0:00–1:30 | 開場情境 | 2 | 以「一段程式碼該放哪裡」建立長期重構、協作與 AI 理解成本。 |
| 1:30–3:30 | Technical-based organization | 1 | 公平說明其可理解起點與跨技術目錄追查責任的限制。 |
| 3:30–5:00 | Feature-based 改善 | 1 | 承認 colocation 對 locality 的真實改善。 |
| 5:00–6:30 | Feature-based 缺口 | 1 | 點出 ownership、dependency、Public API、抽離時機與 enforcement 未被回答。 |
| 6:30–7:00 | 全場承諾 | 1 | 用 FSD lens 尋找人與 AI 可共用、CI 可部分保護的方法。 |
| 7:00–14:00 | Just-in-time FSD primer | 5 | 先用 20–30 秒建立 `fsd.how` 來源，再講最低必要語言與 placement／逐步導入判斷樹。 |
| 14:00–19:00 | 真實案例一 | 4 | 過早共用、Nuxt UI 三責任耦合、第二個非表單 consumer、修正邊界。 |
| 19:00–23:00 | 真實案例二 | 3 | Feature schema ownership、shared field rule、validation drift。 |
| 23:00–28:00 | 真實案例三 | 4 | Login feature 錯誤 ownership、`shared/auth`、App wiring、API client。 |
| 28:00–30:30 | Nuxt routing／fixture | 3 | 同名 pages 踩坑、薄 route adapter／Public API seam、Nuxt 4 fixture 證據。 |
| 30:30–33:00 | Vue Query | 3 | Cache ownership、reactive input snapshot、SSR QueryClient lifecycle。 |
| 33:00–34:00 | 人的判斷 | 1 | 人制定業務邊界、例外與規則嚴格度。 |
| 34:00–35:00 | 人與 AI 共用語言 | 1 | Skill／架構文件支援實作與 review，AI 不是最終裁決者。 |
| 35:00–36:00 | Steiger／CI | 2 | Hard rules vs heuristics；Husky `pre-push` 團隊政策與遠端 CI。 |
| 36:00–38:00 | 三層閉環回顧 | 1 | 明確規則、共用判斷語言、自動保護的不對稱控制迴路。 |
| 38:00–39:30 | 方法論結論 | 1 | 不採用 FSD 仍應明確化 ownership、dependency、evolution rules。 |
| 39:30–40:00 | 緩衝 | 0 | 停留在結尾頁，不新增內容。 |

#### 4. Presenter notes contract

每頁 notes 固定包含 `Message`、`Context`、`Transition`、`Required details`、`Timing`、`Sources`、`Possible Q&A`、`Safety boundary`。`Transition` 必須同時說清從前頁承接什麼、如何引向下一頁；`Timing` 使用可加總的秒數。開場、全場核心主張與結尾使用近逐字稿，其餘用可自然講述的提示，不把完整講稿搬到觀眾畫面。

#### 5. 內容真實性與標註

每個需要揭露性質的頁面，從以下 vocabulary 選擇清楚的文字標籤：`匿名真實案例`、`合成案例`、`現行官方 guidance`、`歷史 guidance`、`團隊 policy`、`講者詮釋`。標籤同時使用文字與圖示／實心／外框，顏色只作輔助。三個真實案例只可使用[選出可公開的真實踩坑案例](./01-select-public-real-pitfalls.md)確認過的因果與匿名化範圍；成員選擇器、設定表單、動態牆、特定欄位等補足情境都必須標為合成案例。

#### 6. 程式碼與技術聲明正確性

- 技術畫面每次只顯示約 **3–6 行**，用來證明 framework entry、Public API、ownership 或自動檢查；完整設定、來源與版本放在 notes。
- Nuxt routing 以 **Nuxt 4.5.2 fixture** 為 evidence snapshot：`srcDir: 'src/'`、`dir.app: 'app'`、`dir.pages: 'app/routes'`、`dir.layouts: 'app/layouts'`、source-root `src/app.vue`、內建 `@` 與 FSD Page Public API。不得把 snapshot 說成所有 Nuxt 4 專案的唯一配置，也不得重現已否決的 `src/app/app.vue` 或 TypeScript 7／`vue-tsc 3.3.9` 組合。
- Vue Query 必須正確表達 query factory／cache ownership、reactive input 留在 query key、Nuxt SSR request-scoped QueryClient，以及 server snapshot 與 form draft 的區別。
- Nuxt UI 案例以 UI control、form adapter、server-data owner 三責任分離為核心；不得把合成 consumer 冒充親身業務事實。
- Steiger 必須區分 import／Public API／folder contract 等可機械 hard checks，以及 arbitrary thresholds／naming assumptions 等 heuristics；不得說通過 Steiger 即證明業務架構正確或無 circular dependency。
- Husky 能執行 `.husky/pre-push` 是工具能力；選擇 `pre-push` 而非 `pre-commit` 是本演講的團隊 policy，遠端 CI 仍是共同守門。
- Authoring 當日要重新核對 Nuxt、Vue Query、Nuxt UI、Steiger、Husky 的官方文件與版本敏感聲明。畫面程式碼只能來自已驗證 fixture、官方文件，或在 notes 明確標示來源與轉譯邊界的範例；不得憑印象發明 API。

#### 7. 視覺與 motion contract

- Canvas 固定 1920×1080；內容邊界 100–160px；頁面標題 56–80px、正文 32–44px、標籤 22–28px。
- 使用 Public Sans、`#020420` 深海軍藍、`#00DC82` Nuxt 綠、白色與 slate 中性色階；Nuxt 只作視覺基準，不反覆使用 Logo 或山形。
- 採 **light density**：每頁只承擔一個判斷，通常是一句結論搭配一個圖解或 2–3 個短要點；不縮字換密度。
- 固定圖解 grammar：封閉框線＝責任範圍；實線箭頭＝runtime data flow；虛線箭頭＝static import／dependency；框線上具名入口＝Public API；CI＝列出實際檢查項目的自動檢查防線。箭頭附動詞或資料名稱，顏色不單獨承擔語意。
- 結尾主圖是不對稱架構控制迴路：人制定政策，人與 AI 依共同語言實作／review，AI 可在既定規則內修復，CI 守可機械驗證的結果，只有模糊、例外或邊界變更回到人。
- 採 **subtle motion**：不為每頁強制加動畫；轉場共用同一 motion vocabulary，通常 140–280ms。`<Steps>` 只服務必要的推理順序，morph 只用於同一架構物件的狀態延續；由 overview 直接進入任何頁面時仍完整可讀。

#### 8. OpenSlide implementation boundaries 與執行設定

- 正式 deck id 為 `feature-based-to-fsd`，只可新增 `slides/feature-based-to-fsd/index.tsx` 與必要的 `slides/feature-based-to-fsd/assets/`。
- 不得修改 `package.json`、`open-slide.config.ts`、themes 或其他 slides；不得新增 dependencies。只使用 React、目前安裝的 `@open-slide/core` 與 standard web APIs。
- 一個 deck 只有一個 `index.tsx` 加可選 `assets/`；helper components／constants 全留在同檔。使用 top-level `design` export，`meta.title` 使用正式標題，`meta.createdAt` 依 `slide-authoring` 規則在建檔當下取得精確 ISO timestamp。
- 每頁 root 填滿 100% × 100%，逐頁計算垂直 budget；不得用 scroll、hidden overflow、負 margin 或縮小字級掩蓋超出畫布。
- 使用任何 OpenSlide primitive 前，正式 authoring task 必須讀取對應 `slide-authoring/references/*.md`。
- **正式執行 `create-slide` 與製作 OpenSlide deck 的 task 必須使用模型 `gpt-5.6-sol`、reasoning effort `ultra`（超高）。** 這是後續 task 的硬性 handoff 條件，不代表本 Wayfinder ticket 開始 authoring。

#### 9. 驗收、排練與超時策略

- 視覺檢查全部 34 頁，不可抽樣；逐頁確認 1920×1080 無裁切、文字不貼邊、bullet 不意外換行、分類標籤可辨、diagram grammar 一致、code 可讀、reveal 跳頁後完整。
- 執行 `pnpm build`；檢查 export 確為 34 個正文 pages、所有 imports／assets 存在、沒有修改禁止範圍。
- 執行 content audit：官方介紹的每項公開承諾、全部既定敘事節點、三個匿名案例、Nuxt UI／Nuxt fixture／Vue Query／Steiger-Husky-CI 均在正文可見。
- 執行 evidence audit：每個外部連結可用、每個技術聲明有 source／version／inference 標示、每段 code 可追溯且與 notes 一致。
- 至少完成一次正常完整排練，正文必須在 39:30 前結束；再完成一次 overflow drill，證明能在不刪敘事節點下回到 40:00 內。建議連續排練直到時間穩定。
- 超時遵守「刪細節、不刪敘事節點」：依序刪證據細節、壓縮 Nuxt／Vue Query mechanics、縮短案例 mechanics 但保留「原決策 → 可觀察後果 → 邊界修正 → 教訓」，最後才縮 primer 名詞說明。不得刪問題框架、任何真實案例、Nuxt UI／Nuxt fixture／Vue Query 的核心踩坑、人／AI／CI 分工、三層閉環或方法論結論。

#### 10. Q&A

10 分鐘 Q&A 聚焦 placement、ownership、dependency、抽離時機、逐步導入、三個案例、framework seams 與人／AI／Skill／Steiger／Husky／CI 分工。不承諾在缺乏脈絡時逐檔裁決 placement、提供完整套件 API 教學或現場產出 migration plan；超出範圍時先回答可遷移的判斷原則，再說明仍需要的專案脈絡。沒有額外 backup slides；每頁 notes 的 `Sources`、`Possible Q&A`、`Safety boundary` 與完整設定／程式碼指標就是備援材料，Q&A 直接跳回相關正文頁。

### SHOULD

- 以自然繁體中文為主，只有程式碼、路徑、產品名稱與需要精確對應的技術名詞保留英文。
- 重複使用同一套責任框、Public API、資料／依賴箭頭、自動檢查防線與控制迴路，使後續案例能在既有 visual grammar 上累積，而非每頁重新解碼。
- 將完整證據與講述深度放在 notes；觀眾畫面保持 light density。
- 正式交付前連續排練，直到正文可穩定落在 39:30 內，且 overflow path 不破壞敘事。

### MAY

- 在少數推理順序重要的頁面使用 `<Steps>`，或讓同一責任物件跨相鄰頁面 morph；不為裝飾使用。
- 只在確實需要且來源清楚時加入 slide-local assets；不得以 placeholder 或 generic stock decoration 填空。
- Notes 可保留較完整的 config、code、版本矩陣與延伸閱讀，但不得讓正文理解依賴未出現在 34 頁中的隱藏內容。
