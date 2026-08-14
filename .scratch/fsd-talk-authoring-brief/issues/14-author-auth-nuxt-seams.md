# 14 — 完成 auth ownership 與 Nuxt routing seam（頁 19–25）

**What to build:** 在前兩個完整案例之後製作第 19–25 頁，先完成 login feature 錯誤擁有 app-wide token 的第三個真實案例，再將 ownership correction 連到 App composition root 與 current-token provider wiring，最後用 Nuxt page route manifest／FSD Page 同名責任衝突、薄 route adapter 與 Nuxt 4.5.2 fixture 證據建立可 demo 的 framework seam。

**Blocked by:** 13 — 完成過早共享與 validation drift 案例（頁 12–18）

**Status:** ready-for-agent

## Execution contract

- 執行 task 必須使用模型 `gpt-5.6-sol`、reasoning effort `ultra`（超高）。
- 必須使用 `create-slide`、`slide-authoring` 與 `feature-sliced-design`；使用任何 OpenSlide primitive 前完整讀取對應 reference。
- Authoring 當日以 `fsd.how` 為 current FSD canonical source，並依 `AGENTS.md` 使用 Context7 重驗 Nuxt、Vue application／provide-inject、Axios 或其他將出現的版本敏感 library／tool docs。
- Nuxt 4.5.2 fixture 是已驗證版本 snapshot，不是所有 Nuxt 4 專案的唯一設定或 deployment certification；如當日 current docs 已變動，更新 notes 的差異與推論標示，不擅自改變已鎖定的 architecture lesson。

## Acceptance checklist

- [ ] 頁 19–22 完整呈現 token 被 login feature 擁有的原決策、其他 consumers／API client 的反向依賴後果、簡單 token／session 的穩定 lower-layer auth boundary，以及 App 將 current-token provider 提供給 API infrastructure 的 wiring。
- [ ] Interceptor 明確在每次 request 取得最新 token，不將 stale snapshot 說成安全 wiring；Vue Plugin／`app.use()`／provide-inject 只是 composition mechanism，不被說成 ownership 本身。
- [ ] 案例只使用已核准的匿名親身因果；profile、permission、authenticated API 若使用，標為一般 consumer，不冒充全部原事件細節。
- [ ] 頁 23–25 清楚區分 Nuxt route manifest 與 FSD Page application module，以薄 route adapter 經 Public API 接線，並用已驗證 snapshot 呈現 custom directories、source-root `src/app.vue`、內建 `@` 與 production build seam。
- [ ] Nuxt 技術畫面只放 3–6 行能證明 framework entry、Public API 或 build seam 的 code；不出現已否決的 `src/app/app.vue`，不將 TypeScript 7.0.2／`vue-tsc` 3.3.9 說成已通過組合。
- [ ] 七頁時間依序為 65、70、80、85、45、55、50 秒，總計 450 秒，並從 auth ownership 自然轉入 framework adapter 責任。
- [ ] 每頁均完整填寫八個 notes 欄位；每個外部技術聲明都有 primary source、查核日期／版本、已驗證範圍與 inference／speaker interpretation 邊界。
- [ ] 責任框、Public API 入口、runtime token flow、static dependency 與 snapshot PASS 防線使用 spec 的一致圖解 grammar，不混用語意不明的 gate 圖像。
- [ ] 已完成的 25 頁可從 overview 直接進入、無視覺 overflow，且 `pnpm build` exit 0；diff 只限正式 deck 與必要 slide-local assets。

## Stable pointers

- Authoring spec and evidence matrix: `.scratch/fsd-talk-authoring-brief/spec.md`
- Nuxt routing research: `.scratch/fsd-talk-authoring-brief/research/03-nuxt-routing.md`
- Nuxt 4 fixture evidence: `.scratch/fsd-talk-authoring-brief/research/10-nuxt4-fixture-verification.md`
- Auth and real-case decisions: `.scratch/fsd-talk-authoring-brief/issues/01-select-public-real-pitfalls.md`
