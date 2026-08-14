# 13 — 完成過早共享與 validation drift 案例（頁 12–18）

**What to build:** 在已完成的 problem framework 與 FSD primer 後製作第 12–18 頁，透過兩個可獨立 demo 的完整案例形成對照：案例一是 UI control、form adapter 與 server-data owner 不該一起變動卻被過早共享；案例二是 feature schemas 合理分開，但已證明必須一致的 shared field rule 沒有共享而造成 validation drift。兩案都必須完成「原決策 → 可觀察後果 → boundary correction → lesson」。

**Blocked by:** 12 — 完成 just-in-time FSD primer（頁 7–11）

**Status:** ready-for-agent

## Execution contract

- 執行 task 必須使用模型 `gpt-5.6-sol`、reasoning effort `ultra`（超高）。
- 必須使用 `create-slide`、`slide-authoring` 與 `feature-sliced-design`；使用任何 OpenSlide primitive 前完整讀取對應 reference。
- Authoring 當日以 `fsd.how` 為 current FSD canonical source；任何顯示的 Nuxt UI 或其他版本敏感 API 必須依 `AGENTS.md` 使用 Context7 查核官方文件。
- 以 authoring spec 的 case truth table 與 Wayfinder 01／05 為事實邊界；不自行補寫產品、元件類型、submit lifecycle 或具體欄位為親身事實。

## Acceptance checklist

- [ ] 頁 12–15 完整呈現過早共享的原決策、wrapper／例外 props 後果、第二個非表單 consumer 壓力測試，以及 UI control、form adapter、server-data owner 三責任分離的修正。
- [ ] 頁 14 的 consumer 與業務情境清楚標為「合成案例」；頁 12–13 只聲明已核准的匿名親身因果，不以敘事強度犧牲真實性。
- [ ] 頁 16–18 先承認各 feature 擁有不同完整 schema 的合理性，再呈現語意相同規則的複製漂移，最後只下沉已證明必須一起變動的 shared field rule。
- [ ] 七頁時間依序為 60、75、80、85、70、80、90 秒，總計 540 秒，且兩案例形成「不該共享的責任過早共享」與「該一致的穩定規則沒有共享」的明確對照。
- [ ] 每頁都完整填寫八個 notes 欄位，在 `Context`、`Sources` 與 `Safety boundary` 追溯親身事實、合成部分、現行 guidance 與講者詮釋。
- [ ] 延續同一套責任框、Public API 入口、runtime data flow 實線箭頭與 static dependency 虛線箭頭；所有箭頭有動詞或資料名稱。
- [ ] 觀眾畫面保持 light density 與 single judgment，案例分類同時用文字與圖示／線型／實心或外框呈現，顏色不是唯一語意載體。
- [ ] 已完成的 18 頁可從 overview 非線性進入並完整閱讀，無裁切、貼邊、意外換行或 overflow workaround。
- [ ] `pnpm build` exit 0，且 diff 只限正式 deck 與必要 slide-local assets，沒有修改禁止範圍。

## Stable pointers

- Authoring spec and case truth table: `.scratch/fsd-talk-authoring-brief/spec.md`
- Real-case decision: `.scratch/fsd-talk-authoring-brief/issues/01-select-public-real-pitfalls.md`
- Nuxt UI responsibility probe: `.scratch/fsd-talk-authoring-brief/issues/05-prototype-nuxt-ui-form-boundary.md`
