# 15 — 完成 Vue Query、架構操作化與結論（頁 26–34）

**What to build:** 在前 25 頁的問題框架、primer、真實案例與 Nuxt seam 之後製作第 26–34 頁，完成 Vue Query cache contract、reactive input、request-scoped SSR 與 form draft 的三個 seams，再把架構判斷與保護責任分配給人、AI、Skill、Steiger、Husky `pre-push` 與遠端 CI，最後以不對稱控制迴路與不依賴採用 FSD 的方法論結論完成正好 34 頁的 deck。

**Blocked by:** 14 — 完成 auth ownership 與 Nuxt routing seam（頁 19–25）

**Status:** ready-for-agent

## Execution contract

- 執行 task 必須使用模型 `gpt-5.6-sol`、reasoning effort `ultra`（超高）。
- 必須使用 `create-slide`、`slide-authoring` 與 `feature-sliced-design`；使用任何 OpenSlide primitive 前完整讀取對應 reference。
- Authoring 當日以 `fsd.how` 為 current FSD canonical source，並依 `AGENTS.md` 使用 Context7 重驗 TanStack Vue Query、Steiger、Husky 及任何其他版本敏感 library／tool docs。
- 保持「FSD 是 lens，不是唯一解」與人／AI／CI 不對稱權責；不將工具能執行的 checks 說成它能裁決 business semantics。

## Acceptance checklist

- [ ] 頁 26 將 query factory 呈現為 owning module 對外提供的 cache contract，key、request、prefetch、write 與 invalidation 不各自發明 identity；placement 依真實 owner 與 reuse，不因 endpoint response 自動建立 Entity。
- [ ] 頁 27 清楚對比 getter／ref 穿越 public contract 與 plain snapshot，reactive input 留在 query key，不先讀取 `.value` 後還期待 query 自動追蹤。
- [ ] 頁 28 同時正確呈現 Nuxt SSR QueryClient 依 request／app lifecycle 建立與 server snapshot／mutable form draft 分流，不使用 process-wide singleton 共用 server cache。
- [ ] 頁 29–32 清楚分配責任：人制定 business language、policy、例外與 severity；人與 AI 共用 Skill／CONTEXT／架構文件；Steiger hard checks 與 heuristic diagnostics 分開；Husky `pre-push` 標為團隊 policy，remote CI 是共同守門。
- [ ] 不宣稱 Steiger 通過即證明 business boundary 正確、完全符合 FSD 或沒有 circular dependencies；threshold、reference count、命名假設與「通常」型規則標為 heuristics。
- [ ] 頁 33 以近逐字稿與不對稱控制迴路完成 synthesis：人制定政策，人與 AI 依共同語言實作／review，AI 可在明確規則內修復，CI 守可機械驗證結果，只有模糊、例外或 boundary change 回到人。
- [ ] 頁 34 以近逐字稿收束為三個帶走問題：ownership、dependency、evolution rules；結論不依賴聽眾採用 FSD，且結尾頁可停留到 40:00 後進入 Q&A。
- [ ] 九頁時間依序為 50、50、50、60、60、30、30、120、90 秒，總計 540 秒；完整 34 頁 notes timing 合計正好 2,370 秒，另留 30 秒在結尾頁。
- [ ] 每頁都有八個完整 notes 欄位，技術頁的 sources、version caveats、code pointers、Possible Q&A 與 Safety boundary 可支援從 overview 跳回正文回答 Q&A，不新增 backup slides。
- [ ] 完整 deck 正好 34 頁，全部可從 overview 直接進入，無裁切、貼邊、意外換行或 overflow workaround，且圖解 grammar 從案例累積至結尾而非重新發明。
- [ ] Notes 完整記錄「刪細節、不刪敘事節點」的 overflow path；這裡只完成 authored timing 與縮減策略，不宣稱已完成真人口語排練。
- [ ] `pnpm build` exit 0，且 scoped diff 只限正式 deck 與必要 slide-local assets；沒有修改 spec、map、Wayfinder issues／research、`CONTEXT.md`、themes、其他 slides、package manifest 或 OpenSlide config。

## Stable pointers

- Authoring spec and locked page map: `.scratch/fsd-talk-authoring-brief/spec.md`
- Judgment, Steiger, Husky and CI research: `.scratch/fsd-talk-authoring-brief/research/02-judgment-and-enforcement.md`
- Vue Query research: `.scratch/fsd-talk-authoring-brief/research/04-vue-query.md`
- Official current FSD guidance: `https://fsd.how/`
