# 用 FSD 看架構方法論如何落地

## Destination

一份可直接交給 `create-slide` 製作的完整演講規格：為具備 Vue／TypeScript 與 feature-based 經驗、但尚未系統性接觸 FSD 的前端工程師，製作一場可公開流通的 40 分鐘演講與 10 分鐘 Q&A。規格需鎖定敘事、案例、證據、視覺方向、時間配置、講者提示與驗收標準。

## Notes

- Audience-facing content and presenter notes use Traditional Chinese.
- Core thesis: 架構方法論的價值不在團隊覺得它很好，而在於它能否說清資料分層、依賴方向與演進規則，降低人與 AI 在開發及 review 時的認知負擔，並由 CI 保護可機械驗證的重要規則。FSD 是具體案例，不是唯一答案。
- Narrative begins with Technical-based organization, explains why teams adopt feature-based organization, exposes what generic feature-based conventions leave unspecified, and uses FSD to examine how those gaps can be made explicit and enforceable.
- Reserve roughly 7 minutes for a just-in-time FSD primer. Explain only the rules and intent needed by later cases; do not walk through the official documentation.
- Prefer real, anonymized experience. Use synthetic cases only to fill gaps and label them clearly.
- Use Nuxt, `@tanstack/vue-query`, and Nuxt UI as the concrete technical setting. Nuxt routing, server-state organization, and a form that combines UI with form logic are boundary cases, not library tutorials.
- Separate decisions that require human or AI judgment from rules Steiger and CI can enforce.
- Presenter notes should include the message, context, transitions, required details, and timing for every page. Only the opening, core thesis, and closing need near-verbatim wording.
- Every session should consult `CONTEXT.md`, `feature-sliced-design`, and the current official guidance at `fsd.how`; distinguish official guidance, historical guidance, project convention, and speaker interpretation.
- When authoring begins, use `create-slide` and `slide-authoring` in addition to the subject-matter skills.
- This map ends at an authoring-ready specification. It does not produce the finished OpenSlide deck.

## Decisions so far

- [選出可公開的真實踩坑案例](./issues/01-select-public-real-pitfalls.md) — 鎖定錯誤耦合、穩定規則重複漂移、以及登入 Feature 錯誤擁有全域 auth state 三個匿名親身案例。
- [劃分人與 AI 的架構判斷和 Steiger 的保護範圍](./issues/02-map-judgment-and-enforcement.md) — Steiger／CI 保護可觀察的結構與執行結果；業務邊界、例外與規則嚴格度仍由人制定，並由人與 AI 依共享語言判斷。
- [驗證 Nuxt file-based routing 與 FSD 的現行整合方式](./issues/03-verify-nuxt-routing-integration.md) — Nuxt route entry 是 framework adapter，FSD Page 是 application module；以薄 adapter 經 Public API 接線，但 Nuxt 4 的精確設定仍需 fixture 驗證。
- [把官方 TanStack Query guidance 轉譯為 Vue Query 案例](./issues/04-adapt-tanstack-query-to-vue.md) — Query ownership 與 cache contract 可沿用，Vue reactive inputs 與 Nuxt SSR QueryClient lifecycle 必須作為框架接縫另外設計。
- [設計 Nuxt UI 表單的邊界壓力測試](./issues/05-prototype-nuxt-ui-form-boundary.md) — 以第二個非表單 consumer 被迫繼承 form 與資料來源政策的瞬間，對照只重用受控 UI control 的責任分界。
- [驗證 Nuxt 4 整合 fixture](./issues/10-verify-nuxt4-integration-fixture.md) — Nuxt 4.5.2 實測確認 custom `srcDir`、App-layer routes/layouts、內建 `@` 與 FSD Page Public API 可通過 prepare、typecheck、production build。

## Not yet specified

- The final story arc may reveal a need for a comparison artifact or explanatory prototype that is not yet sharp enough to ticket.

## Out of scope

- Producing or editing the finished OpenSlide deck during this Wayfinder effort.
- Recommending FSD as mandatory for every frontend project.
- A comprehensive FSD documentation walkthrough or a placement-answer encyclopedia.
- Teaching Nuxt, Nuxt UI, or TanStack Query as standalone libraries.
- A step-by-step production migration manual for converting an existing codebase to FSD.
