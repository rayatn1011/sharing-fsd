# 16 — 驗收並修正完整 34 頁 deck

**What to build:** 以完整 OpenSlide deck 為唯一最高層 acceptance seam，對已完成的 34 頁執行 spec、內容、來源、code、頁數、timing、overview direct-entry、全頁視覺、overflow strategy、build 與 scoped diff audit，並在同一 task 修正發現的 deck 問題，直到觀眾、講者與 reviewer 可見的完整成果符合已核准 authoring spec。本驗收只包含 agent 可重現的 authored timing 與 overflow audit，不宣稱代替真人口語排練。

**Blocked by:** 11 — 完成開場與問題框架（頁 1–6）; 12 — 完成 just-in-time FSD primer（頁 7–11）; 13 — 完成過早共享與 validation drift 案例（頁 12–18）; 14 — 完成 auth ownership 與 Nuxt routing seam（頁 19–25）; 15 — 完成 Vue Query、架構操作化與結論（頁 26–34）

**Status:** ready-for-agent

## Execution contract

- 執行 task 必須使用模型 `gpt-5.6-sol`、reasoning effort `max`，且不得與最後一張 authoring ticket 合併執行。
- 驗收與任何修正必須使用 `create-slide`、`slide-authoring` 與 `feature-sliced-design`；重驗任何 OpenSlide primitive 時完整讀取對應 reference。
- 驗收當日以 `fsd.how` 為 current FSD canonical source，不使用 legacy `feature-sliced.design`；依 `AGENTS.md` 使用 Context7 重驗 Nuxt、Nuxt UI、TanStack Vue Query、Steiger、Husky 及其他版本敏感 library／tool docs。
- 驗收必須針對完整 deck 的外部行為，不將 helper component、內部常數名稱或 JSX 組織方式變成獨立、脆弱的驗收目標。

## Acceptance checklist

- [ ] 重讀 authoring spec、`CONTEXT.md`、repo instructions 與相關來源，逐項對照已鎖定的標題、講者、受眾、非推銷立場、40+10 分鐘、34 頁、敘事順序、視覺系統、notes schema、來源政策與禁止範圍。
- [ ] 確認 deck export 非空且正好 34 頁；top-level design、meta title、meta createdAt、imports 與 assets 均符合 OpenSlide contract。
- [ ] 從 overview 依序開啟全部 34 頁，不可抽樣；每頁在 1920×1080 檢查 root fill、100–160px 邊界、無裁切／貼邊／意外換行、code 可讀、label 可辨識、diagram grammar 一致、light density 與 single judgment。
- [ ] 若有 Steps、transitions 或 morph，確認 primitive contract、一致 motion vocabulary 與 overview direct-entry 完整狀態；不以 scroll、hidden overflow、negative margin、transform、縮小字級或減少邊界解決問題。
- [ ] 完成 content audit：placement 問題、technical-based → feature-based → FSD lens、逐步導入原則、7 分鐘 primer、三個真實案例、Nuxt UI 三責任、Nuxt fixture、Vue Query seams、人／AI／Skill／Steiger／Husky／CI 與結尾不對稱迴路全部在正文可見。
- [ ] 完成 truth audit：三案都有「原決策 → 可觀察後果 → boundary correction → lesson」；所有合成細節、匿名事實、current guidance、team policy、verified snapshot 與 speaker interpretation 分類正確。
- [ ] 完成 evidence 與 code audit：每個外部技術聲明都有可開啟的 primary source、查核日期／版本、已驗證範圍與 inference 標示；每段觀眾 code 可追溯至 fixture、官方文件或標明轉譯邊界的範例。
- [ ] Nuxt audit 確認 `src/app.vue` 與已驗證的 TypeScript 6.0.3／`vue-tsc` 3.3.9 snapshot，不重現已否決路徑或組合；Steiger audit 區分 hard checks／heuristics；Husky `pre-push` 標為團隊 policy；CI 不聲稱能驗證 business semantics。
- [ ] 34 頁每頁都有 `Message`、`Context`、`Transition`、`Required details`、`Timing`、`Sources`、`Possible Q&A`、`Safety boundary`；所有 transition 同時承接前頁並引向後頁。
- [ ] 逐頁 timing 與 locked map 一致且總和正好 2,370 秒；結尾可停留 30 秒至 40:00。依 spec 順序靜態 walkthrough overflow path，確認只刪減來源／證據細節、framework mechanics、案例 mechanics 與最後的 primer 細節，不刪任何已鎖定敘事節點。
- [ ] 明確記錄本 ticket 驗證的是 authored timing 與 overflow strategy，不把 agent walkthrough 聲稱為真人口語排練或實際演講時間證據。
- [ ] 發現的問題在同一 task 內修正後，重跑相關 audit，最後執行 `pnpm build` 並取得 exit 0。
- [ ] 最終 scoped diff 只包含正式 deck 與必要 slide-local assets；沒有修改 spec、map、Wayfinder issues／research、`CONTEXT.md`、themes、其他 slides、package manifest 或 OpenSlide config。

## Stable pointers

- Authoring spec and complete acceptance contract: `.scratch/fsd-talk-authoring-brief/spec.md`
- Domain glossary: `CONTEXT.md`
- Decision map and evidence index: `.scratch/fsd-talk-authoring-brief/map.md`
- Official current FSD guidance: `https://fsd.how/`
