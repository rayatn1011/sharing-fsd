# 16 — 驗收並修正完整 34 頁 deck

**What to build:** 以完整 OpenSlide deck 為唯一最高層 acceptance seam，對已完成的 34 頁執行 spec、內容、來源、code、頁數、timing、overview direct-entry、全頁視覺、overflow strategy、build 與 scoped diff audit，並在同一 task 修正發現的 deck 問題，直到觀眾、講者與 reviewer 可見的完整成果符合已核准 authoring spec。本驗收只包含 agent 可重現的 authored timing 與 overflow audit，不宣稱代替真人口語排練。

**Blocked by:** 11 — 完成開場與問題框架（頁 1–6）; 12 — 完成 just-in-time FSD primer（頁 7–11）; 13 — 完成過早共享與 validation drift 案例（頁 12–18）; 14 — 完成 auth ownership 與 Nuxt routing seam（頁 19–25）; 15 — 完成 Vue Query、架構操作化與結論（頁 26–34）

**Status:** ready-for-agent
**State:** done

## Execution contract

- 執行 task 必須使用模型 `gpt-5.6-sol`、reasoning effort `ultra`（超高），且不得與最後一張 authoring ticket 合併執行。
- 驗收與任何修正必須使用 `create-slide`、`slide-authoring` 與 `feature-sliced-design`；重驗任何 OpenSlide primitive 時完整讀取對應 reference。
- 驗收當日以 `fsd.how` 為 current FSD canonical source，不使用 legacy `feature-sliced.design`；依 `AGENTS.md` 使用 Context7 重驗 Nuxt、Nuxt UI、TanStack Vue Query、Steiger、Husky 及其他版本敏感 library／tool docs。
- 驗收必須針對完整 deck 的外部行為，不將 helper component、內部常數名稱或 JSX 組織方式變成獨立、脆弱的驗收目標。

## Acceptance checklist

- [x] 重讀 authoring spec、`CONTEXT.md`、repo instructions 與相關來源，逐項對照已鎖定的標題、講者、受眾、非推銷立場、40+10 分鐘、34 頁、敘事順序、視覺系統、notes schema、來源政策與禁止範圍。
- [x] 確認 deck export 非空且正好 34 頁；top-level design、meta title、meta createdAt、imports 與 assets 均符合 OpenSlide contract。
- [x] 從 overview 依序開啟全部 34 頁，不可抽樣；每頁在 1920×1080 檢查 root fill、100–160px 邊界、無裁切／貼邊／意外換行、code 可讀、label 可辨識、diagram grammar 一致、light density 與 single judgment。
- [x] 若有 Steps、transitions 或 morph，確認 primitive contract、一致 motion vocabulary 與 overview direct-entry 完整狀態；不以 scroll、hidden overflow、negative margin、transform、縮小字級或減少邊界解決問題。
- [x] 完成 content audit：placement 問題、technical-based → feature-based → FSD lens、逐步導入原則、7 分鐘 primer、三個真實案例、Nuxt UI 三責任、Nuxt fixture、Vue Query seams、人／AI／Skill／Steiger／Husky／CI 與結尾不對稱迴路全部在正文可見。
- [x] 完成 truth audit：三案都有「原決策 → 可觀察後果 → boundary correction → lesson」；所有合成細節、匿名事實、current guidance、team policy、verified snapshot 與 speaker interpretation 分類正確。
- [x] 完成 evidence 與 code audit：每個外部技術聲明都有可開啟的 primary source、查核日期／版本、已驗證範圍與 inference 標示；每段觀眾 code 可追溯至 fixture、官方文件或標明轉譯邊界的範例。
- [x] Nuxt audit 確認 `src/app.vue` 與已驗證的 TypeScript 6.0.3／`vue-tsc` 3.3.9 snapshot，不重現已否決路徑或組合；Steiger audit 區分 hard checks／heuristics；Husky `pre-push` 標為團隊 policy；CI 不聲稱能驗證 business semantics。
- [x] 34 頁每頁都有 `Message`、`Context`、`Transition`、`Required details`、`Timing`、`Sources`、`Possible Q&A`、`Safety boundary`；所有 transition 同時承接前頁並引向後頁。
- [x] 逐頁 timing 與 locked map 一致且總和正好 2,370 秒；結尾可停留 30 秒至 40:00。依 spec 順序靜態 walkthrough overflow path，確認只刪減來源／證據細節、framework mechanics、案例 mechanics 與最後的 primer 細節，不刪任何已鎖定敘事節點。
- [x] 明確記錄本 ticket 驗證的是 authored timing 與 overflow strategy，不把 agent walkthrough 聲稱為真人口語排練或實際演講時間證據。
- [x] 發現的問題在同一 task 內修正後，重跑相關 audit，最後執行 `pnpm build` 並取得 exit 0。
- [x] 最終 scoped diff 只包含正式 deck 與必要 slide-local assets；沒有修改 spec、map、Wayfinder issues／research、`CONTEXT.md`、themes、其他 slides、package manifest 或 OpenSlide config。

## Answer

### Fixed point、範圍與修正

- Acceptance 從固定點 `24dbe61ad911086ce656ec7e824a4da4cd19ca5f` 開始；開工時 deck 與該固定點相同，先保留 `Status: ready-for-agent` 並將本 ticket 設為 `State: in-progress`。
- Deck 修正只發生在 `slides/feature-based-to-fsd/index.tsx`；tracker evidence 只寫入本 ticket，沒有修改 spec、map、`CONTEXT.md`、Tickets 01–15、research、themes、其他 slides、manifest、OpenSlide config、dependencies 或 slide-local assets，頁數維持 34。
- 修正頁 13／15／16／18 低於 22px 的 audience labels；修正頁 4 卡片 edge-kiss、頁 12／25／26／28 的孤行或斷詞、頁 24 code edge collision，以及頁 31 code-like rule 名稱與 detail 的硬斷行。每次修正後均重新 build，並由 overview 重新直達受影響頁做 fresh inspection；沒有用 scroll、hidden overflow、negative margin、transform、縮字或犧牲安全邊界掩蓋問題。
- 修正頁 26 `QueryClient` receiver；頁 27 明標 React-to-Vue 講者轉譯；頁 28 分開 current Nuxt 4.x lifecycle docs 與 dated Nuxt 4.5.2 fixture；補齊 Nuxt UI、Vue Query、Steiger、Husky 與 FSD Skill 的完整 primary URLs、日期、版本／commit、verified scope 與 inference boundary；頁 34 notes 補上 Q&A 從 overview 回相關正文頁的操作。

### 34 頁 production visual／overview evidence

- 以 `pnpm build` 的 production artifact 執行 preview，Browser viewport 固定為 1920×1080。Overview 顯示 `Pages 34`；逐頁開啟 1–34 時，每一次都重新確認 34 個 `Go to slide N` entries，並確認 URL 為 `?p=1` 至 `?p=34`。
- Codex session visual artifact 位於 repo 外、未提交的 `/Users/rayzhang/.codex/visualizations/2026/08/14/01a000ec-9703-7312-80bc-d3bf702eeef2/ticket16-final/overview-page-01.png` 至 `overview-page-34.png`；現存 34 張 fresh screenshots 均為 1920×1080。每頁的 1920×1080 fixed canvas／PageFrame scroll size 完整，root padding 為 `104px 120px`，geometry audit 為 0 spill；修正頁 4／12／24／25／26／28／31 已覆寫為修後 fresh evidence。
- 獨立逐頁 visual review 最終為 34/34 PASS：root fill、安全邊界、裁切／edge-kiss／意外換行、code／labels、diagram grammar、light density、single judgment 與非純色彩分類均通過。Deck 沒有 Steps、Morph 或 page-transition primitive，因此沒有非線性 reveal state；唯一 transform 只把固定 badge 置中，不縮放、裁切或隱藏內容。
- Preview 的 browser console `warn`／`error` 為空。Public Sans 的 `document.fonts.status` 為 `loaded`、`document.fonts.check(...)` 為 true，可見 slide title 的 computed font 為 Public Sans；license／font files 另由 official `google/fonts` 的 `ofl/publicsans` 目錄查核。

### Content、truth、evidence 與 code audit

- 34 頁 locked narrative 順序完整：placement → technical-based／feature-based → FSD lens → 7 分鐘 primer → 三個匿名真實案例 → Nuxt UI／Nuxt routing fixture → Vue Query seams → Human／AI／Skill／Steiger／Husky／CI → 不對稱控制迴路 → 不採用 FSD 仍適用的 ownership／dependency／evolution rules。三案均保留 decision → observable consequence → boundary correction → lesson；合成第二 consumer 沒有冒充真實案例。
- 匿名真實案例、合成 probe、current official guidance、team policy、dated verified snapshot、speaker context／interpretation／translation 均有文字與 symbol 分類，不只靠顏色；沒有新增真實案例、產品細節或把 FSD 說成唯一解。
- 依 `AGENTS.md` 先 resolve library ID、再依單一概念查核 Context7：Nuxt `/websites/nuxt_4_x`、Nuxt UI `/websites/ui_nuxt`、TanStack Vue Query `/websites/tanstack_query_framework_vue`、Vue current API／guide、Axios `/axios/axios`、Steiger `/feature-sliced/steiger`、Husky `/typicode/husky/v9.1.7`。另重新開啟本演講依賴的 `fsd.how` overview、layers、slices／segments、Public API、migration、auth、API requests、Nuxt 與 React Query pages；current guidance 沒有使用 legacy domain。
- 2026-08-14 published／resolved evidence 為 Nuxt 4.5.2、Nuxt UI 4.10.0、Vue Query 5.101.4、Vue 3.5.41、Axios 1.19.0、Steiger CLI 0.6.0、`@feature-sliced/steiger-plugin` 0.7.0、Husky 9.1.7；Steiger 與 FSD Skill sources 固定到 resolved commits。Exact Nuxt fixture 仍只把 Nuxt 4.5.2 + TypeScript 6.0.3 + vue-tsc 3.3.9 的 prepare／typecheck／build 稱為 PASS，並明列 TypeScript 7.0.2 + vue-tsc 3.3.9 不得稱為通過。
- Audience code 最終為 Nuxt adapter 3 行、fixture 6 行、cache contract 5 行、reactive comparison 4 行，分別可追溯 fixture、official API 或明標 speaker translation。`src/app.vue`、fresh server-request `QueryClient`、immutable server snapshot／mutable draft、Steiger hard guards／heuristics、Husky `pre-push` team policy、remote CI 不裁決 business semantics 等 safety boundaries 全數保留。

### Notes、timing、overflow 與 build

- Static parser 與人工 walkthrough 均確認 34 pages／34 notes；每頁各且僅一個非空的 Message、Context、Transition、Required details、Timing、Sources、Possible Q&A、Safety boundary。34 個 Transition 均同時承接前頁並引向後頁，最後一頁在 40:00 進 Q&A，必要時從 overview 回正文，不新增 backup slides。
- 逐頁 timing 與 locked map 完全一致，總計 2,370 秒（39:30）；頁 34 停留 30 秒至 40:00，Q&A 10 分鐘不計正文。Authored overflow 順序為 evidence／版本／API 細節 → Nuxt／Vue Query mechanics → 保留四段因果的案例 mechanics → 最後才壓 primer 細節；problem framework、三案、framework core seams、人／AI／CI 分工、三層閉環、控制迴路與方法論結論都不可刪。
- 本 evidence 只代表 agent 可重現的 authored timing／overflow walkthrough；沒有宣稱已完成真人口語排練、實際演講時間測量，或能取代 human rehearsal。
- 修後最終 `pnpm build` exit 0；Vite 只留下既有的大 chunk warning，沒有新 failure。`git diff --check`、page／notes／timing static audit 與 preview console audit 均通過。

## Stable pointers

- Authoring spec and complete acceptance contract: `.scratch/fsd-talk-authoring-brief/spec.md`
- Domain glossary: `CONTEXT.md`
- Decision map and evidence index: `.scratch/fsd-talk-authoring-brief/map.md`
- Official current FSD guidance: `https://fsd.how/`
