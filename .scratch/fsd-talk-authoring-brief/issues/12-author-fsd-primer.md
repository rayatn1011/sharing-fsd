# 12 — 完成 just-in-time FSD primer（頁 7–11）

**What to build:** 在已可 demo 的開場 deck 上完成第 7–11 頁，以 7 分鐘建立後續案例真正需要的最低 FSD 語言：先說明 `fsd.how` 的 current canonical source 政策，再完成 layers、slices、segments、dependency direction、Public API 與 Pages First／延後抽離的判斷樹。這個區段完成後，聽眾無需先接受 FSD 是唯一解，也能使用 primer 理解後續案例。

**Blocked by:** 11 — 完成開場與問題框架（頁 1–6）

**Status:** ready-for-agent

## Execution contract

- 執行 task 必須使用模型 `gpt-5.6-sol`、reasoning effort `ultra`（超高）。
- 必須使用 `create-slide`、`slide-authoring` 與 `feature-sliced-design`；使用 design tokens、webfonts、page numbers、Steps、transitions 或 morph 前，完整讀取對應 `slide-authoring` reference。
- Authoring 當日重新開啟 `fsd.how` 及其連結的第一方資料；不引用 legacy `feature-sliced.design`。版本敏感 library／tool docs 依 `AGENTS.md` 使用 Context7 查核。
- 不將 primer 擴寫為 FSD 文件導讀、placement 百科或宣傳；只作為後續真實案例的必要判斷語言。

## Acceptance checklist

- [ ] 頁 7 在約 20–30 秒內建立 `fsd.how` 為本演講採用的現行 canonical source；舊網域經過若提及，只標為講者背景，不冒充官方歷史且不算作真實架構案例。
- [ ] 頁 8–11 依 locked map 完成 layers，slices／segments，dependency／Public API，以及 Pages First decision tree；清楚表達 not all layers are required 與延後抽離。
- [ ] 五頁時間依序為 35、90、85、100、110 秒，總計 420 秒，且轉場能從全場承諾進入 source policy，再用判斷樹進入第一個真實案例。
- [ ] 每頁均有八個不空泛的 notes 欄位，`Sources` 含第一方連結、authoring 查核日期與必要版本，`Safety boundary` 區分 current guidance、講者背景與講者詮釋。
- [ ] 觀眾畫面使用 spec 的文字 label 與非顏色單一編碼，並延續既有責任框、Public API 入口、依賴箭頭圖解 grammar。
- [ ] 若使用 Steps 或 morph，必須服務概念建立順序，overview 直接進入時仍完整可讀；不為裝飾強制每頁加動畫。
- [ ] 已完成的 11 頁全部符合 1920×1080、light density、字級、邊界與 vertical budget，且 overview 直接進入可讀。
- [ ] `pnpm build` exit 0，且 diff 只限正式 deck 與必要 slide-local assets；未修改 spec、map、Wayfinder issues／research、`CONTEXT.md`、themes、其他 slides、package manifest 或 OpenSlide config。

## Stable pointers

- Authoring spec: `.scratch/fsd-talk-authoring-brief/spec.md`
- FSD subject-matter skill: `.agents/skills/feature-sliced-design/SKILL.md`
- Official current guidance: `https://fsd.how/`
