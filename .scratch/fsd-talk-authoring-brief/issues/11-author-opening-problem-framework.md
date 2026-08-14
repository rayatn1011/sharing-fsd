/Users/rayzhang/.zshenv:.:1: no such file or directory: /Users/rayzhang/.cargo/env
# 11 — 完成開場與問題框架（頁 1–6）

**What to build:** 建立正式 OpenSlide deck 的第 1–6 頁，讓觀眾先取得 Technical-based → Feature-based → Feature-Sliced Design 的全場路線圖，再公平看見 technical-based organization 的起點、feature-based organization 對 locality 的改善，以及它尚未共同回答的 ownership、dependency、Public API、抽離時機與 enforcement，最後建立 FSD lens 的全場承諾。路線圖必須同時預告 Skill 作為人與 AI 的共同判斷語言，以及 Steiger／CI 只保護可機械驗證的結構規則；不得暗示工具能裁決 business boundary、證明完整 architecture，或把 FSD 推銷成唯一解。這個區段完成後必須可從 overview 開啟、可投影閱讀並通過 production build。

**Blocked by:** None — can start immediately

**Status:** ready-for-agent
**State:** done

## Execution contract

- 執行 task 必須使用模型 `gpt-5.6-sol`、reasoning effort `ultra`（超高）。
- 必須使用 `create-slide`、`slide-authoring` 與 `feature-sliced-design`；使用任何 OpenSlide primitive 前，完整讀取 `slide-authoring` 對應 reference。
- 正式 authoring 當日以 `fsd.how` 為 current FSD canonical source，不引用 legacy `feature-sliced.design`。涉及版本敏感 library、framework、SDK、API 或 CLI 的聲明時，依 repo `AGENTS.md` 使用 Context7 查核當日官方文件。
- 以已核准的 authoring spec、`CONTEXT.md` 與 Wayfinder decisions 為範圍；不重開受眾、標題、時間、頁數、敘事或視覺方向。

## Acceptance checklist

- [x] 正式 deck id 為 `feature-based-to-fsd`，meta 使用正式標題與建檔當下的精確 ISO timestamp，觀眾內容與 notes 使用自然繁體中文，講者署名為「一隻狐狸」。
- [x] 頁 1–6 依 spec 的 locked map 實作 Cover、Talk roadmap、Technical-based baseline、Feature-based improvement、Gap framing 與 Thesis，不新增、合併或重排敘事節點。
- [x] 六頁時間依序為 45、45、120、90、90、30 秒，總計 420 秒；頁 1、2、6 提供近逐字稿，其餘頁提供自然講述提示。
- [x] 每頁 notes 都完整填寫 `Message`、`Context`、`Transition`、`Required details`、`Timing`、`Sources`、`Possible Q&A`、`Safety boundary`，且 transition 同時承接前頁並引向後頁。
- [x] 建立後續頁面可繼續使用的 Nuxt 深海軍藍／綠 light-density 視覺與圖解 grammar，但成果本身是六頁可 demo 的完整縱切，不是單獨 theme 或 component foundation。
- [x] 1920×1080 畫布、100–160px 邊界、字級、顏色非唯一語意載體、single-judgment 與 vertical budget 均符合 spec；不使用 scroll、hidden overflow、negative margin、transform 或縮字掩蓋問題。
- [x] 第 2 頁以三欄由左向右呈現 Technical-based、Feature-based、FSD；Skill 與 Steiger／CI 使用文字、圖示與框線，並明確標示三欄不是成熟度排名，FSD 不是唯一答案。
- [x] Overview 可直接進入任一已完成頁；reveal 或 motion 若被使用，直接進入時仍完整可讀，且 motion 只服務推理順序或相鄰狀態延續。
- [x] 只使用 React、repo 已安裝的 `@open-slide/core` 與 standard web APIs；helper components 與 constants 留在單一 deck entry。
- [x] `pnpm build` exit 0；除本次明確允許同步的 Ticket 11 與 authoring spec 外，scoped diff 沒有修改 map、其他 Wayfinder issues／research、`CONTEXT.md`、themes、其他 slides、package manifest 或 OpenSlide config。

## Stable pointers

- Authoring spec: `.scratch/fsd-talk-authoring-brief/spec.md`
- Decision map: `.scratch/fsd-talk-authoring-brief/map.md`
- Domain glossary: `CONTEXT.md`
