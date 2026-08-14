# 一段程式碼，到底該放哪裡？從 Feature-based 到 Feature-Sliced Design

Status: ready-for-agent

## Problem Statement

具備 Vue、TypeScript 與 feature-based organization 經驗的前端工程師，通常已經感受到 technical-based organization 將同一項業務修改拆散在 `components`、`composables`、`utils` 等技術目錄的成本，也知道依功能 colocate 程式碼能改善 locality；但 generic feature-based organization 仍沒有共同回答 ownership、dependency、Public API、抽離時機與 enforcement。當團隊成員與 AI 對同一段程式碼應放哪裡各有不同理解時，開發與 review 仍仰賴個人記憶，架構規則也容易在持續演進中漂移。

這場公開演講需要在 40 分鐘正文與 10 分鐘 Q&A 內，以 Feature-Sliced Design 作為一個具體 lens，而不是推銷唯一解。它必須公平呈現 technical-based organization 與 feature-based organization 的價值和限制，再以三個匿名真實案例、Nuxt／Vue Query framework seams，以及人、AI、Skill、Steiger、Husky `pre-push` 與遠端 CI 的分工，示範如何把架構方法轉成可理解、可 review、可部分機械驗證的共同語言。

成品不只要內容正確，也要能直接作為公開演講使用：34 頁正文必須在固定 1920×1080 畫布正確呈現、可由 overview 直達任一頁、逐頁 presenter notes 完整、技術聲明可追溯、正常排練在 39:30 前結束，並有不刪敘事節點的 overflow strategy。

## Solution

製作一份 deck id 為 `feature-based-to-fsd` 的 34 頁 OpenSlide deck，正式標題為「一段程式碼，到底該放哪裡？從 Feature-based 到 Feature-Sliced Design」，講者署名「一隻狐狸」。觀眾畫面與 presenter notes 使用自然繁體中文，程式碼、路徑、產品名稱與需要精確對應的技術詞保留英文。

演講採單向敘事：從 technical-based organization 的可理解起點出發，承認 feature-based organization 對 locality 的改善，揭露它仍未回答的架構問題；接著用 7 分鐘 just-in-time FSD primer 建立最低必要語言，再以三個匿名真實案例與兩組 framework seams 驗證，最後把判斷與保護責任分配給人、AI 與 CI，收束為即使不採用 FSD 也能使用的方法。

FSD 現行 guidance 只以 `fsd.how` 及其連結的一手來源為 canonical。舊網域的失去經過若被提及，只能在 primer 開頭用約 20–30 秒標成講者背景，不得冒充官方已發布的歷史，也不得算作真實架構案例。技術證據以已驗證的 Nuxt 4.5.2 fixture、現行 Vue Query／Steiger／Husky 官方資料與 Wayfinder research 為基礎，並在 authoring 當日重驗版本敏感聲明。

成品採 Nuxt 深海軍藍／綠的 light-density 視覺系統、固定架構圖解 grammar 與 subtle motion。完整脈絡、來源、可能追問與安全邊界放在逐頁 notes；觀眾畫面每頁只承擔一個判斷，以一句結論、一個圖解或 2–3 個短要點為主。

## User Stories

1. As a 具備 Vue／TypeScript 經驗的前端工程師, I want 從熟悉的 technical-based organization 問題開始理解演講, so that 我不需要先接受 FSD 才能跟上論證。
2. As a 使用 feature-based organization 的工程師, I want 看見它對 locality 的真實改善被公平承認, so that 演講不會把既有做法扁平成錯誤答案。
3. As a 使用 feature-based organization 的工程師, I want 清楚看見 ownership、dependency、Public API、抽離時機與 enforcement 仍可能未定義, so that 我能辨識目前團隊真正缺少的是什麼。
4. As a 第一次系統性接觸 FSD 的聽眾, I want 在 7 分鐘內取得後續案例真正需要的 layers、slices、segments、dependency direction、Public API 與 Pages First 語言, so that 我不必先讀完整官方文件。
5. As a 第一次接觸 FSD 的聽眾, I want 知道 `fsd.how` 是本演講採用的現行 canonical source, so that 我能避開失去控制的 legacy domain 並自行延伸閱讀。
6. As a 對來源歷史有興趣的聽眾, I want 舊網域經過被明確標成講者背景, so that 我不會把未有第一方公告的說法誤認為官方紀錄。
7. As a 評估 FSD 的資深工程師, I want 聽見它被定位為 FSD lens 而非唯一正解, so that 我能把判斷框架與其他架構方法比較。
8. As a 需要決定程式碼 placement 的工程師, I want 使用「誰擁有、誰能依賴誰、何時抽離、什麼能被保護」的判斷順序, so that placement 不只是一份資料夾答案表。
9. As a 正在逐步改善既有系統的工程師, I want 了解 Pages First、延後抽離與只在有價值時新增 layers 的演進原則, so that 我不會把逐步導入誤解為一次性逐檔搬遷。
10. As a 經歷過過早抽象的工程師, I want 看見 UI control、form adapter 與 server-data owner 被耦合後的具體代價, so that 我能辨識錯誤共享責任。
11. As a 使用 Nuxt UI form 的工程師, I want 透過第二個非表單 consumer 的合成探針看見責任邊界, so that 我能分離受控 UI、form binding 與資料來源政策。
12. As a 關心案例真實性的聽眾, I want 匿名親身事實與成員選擇器、設定表單、動態牆等合成情境被清楚分標, so that 我不會把補足敘事的細節當成講者親身事實。
13. As a 維護多個 feature schemas 的工程師, I want 理解 feature-specific schema ownership 與 shared field rule 可以同時成立, so that 我不會在「全部共用」與「全部複製」之間二選一。
14. As a 維護驗證規則的工程師, I want 看見 validation drift 的因果鏈, so that 我能辨識哪些規則已證明必須一起變動。
15. As a 設計 authentication 的工程師, I want 看見 login behavior 與 app-wide auth state ownership 的區別, so that 其他功能與 API client 不必反向依賴 login feature。
16. As a Vue 工程師, I want 理解 `shared/auth`、App wiring、Vue Plugin／provide-inject 與 `shared/api` 的責任, so that 我能把 composition mechanism 與 architecture ownership 分開。
17. As a 維護 authenticated API 的工程師, I want request interceptor 在每次 request 取得最新 token 的 contract 被正確說明, so that 簡報不會把 stale snapshot 當成安全 wiring。
18. As a Nuxt 工程師, I want 分辨 Nuxt page route manifest 與 FSD Page application module, so that 同名 `pages` 不會被誤認為同一責任。
19. As a Nuxt 工程師, I want 看見薄 route adapter 經 Public API 接上 FSD Page, so that framework convention 與 application boundary 都能保留。
20. As a 技術 reviewer, I want Nuxt 4.5.2 fixture 的驗證範圍與限制被明確呈現, so that 我不會把單一 snapshot 說成所有 Nuxt 4 專案的唯一設定。
21. As a 使用 Vue Query 的工程師, I want 理解 query factory 與 cache key 是由 owning module 暴露的 cache contract, so that read、prefetch、write 與 invalidation 不會各自發明 identity。
22. As a 使用 reactive route params 的工程師, I want 看見 input 被 snapshot 後 URL 改變但 query 不變的風險, so that public API 能明確保留 ref 或 getter 的 reactivity。
23. As a 維護 Nuxt SSR 的工程師, I want 分辨 request-scoped QueryClient 與 process-wide singleton, so that 不同 request 不會共用不該共享的 cache。
24. As a 維護表單的工程師, I want 分辨 immutable server snapshot 與 mutable form draft, so that server state 與 edit buffer 不會被錯誤合併。
25. As a 架構決策者, I want 清楚知道哪些判斷必須由人制定政策與負最終責任, so that business boundary、例外與規則嚴格度不會被假交給工具。
26. As a 使用 AI agent 的工程師, I want AI 與人讀取同一份 Skill、CONTEXT 與 architecture rules, so that implementation 與 review 使用一致語言。
27. As a 使用 AI agent 的 reviewer, I want AI 被定位為可解釋、質疑與在既定規則內修復的協作者, so that AI 不會被誤認為 domain boundary 的最終裁決者。
28. As a 採用 Steiger 的團隊, I want hard checks 與 heuristic diagnostics 被分開, so that arbitrary thresholds、命名假設與「通常」型建議不會冒充普遍架構真理。
29. As a 維護 CI 的工程師, I want import direction、Public API、folder contract、typecheck、build 與 tests 的保護範圍被具體列出, so that 自動化承諾可被驗證。
30. As a 採用 Husky 的團隊, I want 知道 `pre-push` 是本演講選定的團隊 policy 而非 Husky 或 FSD 強制規則, so that 本機預檢查與遠端共同守門的角色不會混淆。
31. As a 演講聽眾, I want 在結尾看見「明確規則、共用判斷語言、自動保護」的不對稱控制迴路, so that 我能記住人、AI 與 CI 不同的裁決權與責任。
32. As a 不打算採用 FSD 的工程師, I want 仍能帶走 ownership、dependency 與 evolution rules 的方法, so that 演講價值不依賴採用特定品牌架構。
33. As a 現場講者, I want 每頁 notes 都有 Message、Context、Transition、Required details、Timing、Sources、Possible Q&A 與 Safety boundary, so that 我能穩定講述、轉場並安全回答問題。
34. As a 現場講者, I want 開場、核心主張與結尾有近逐字稿, so that 關鍵承諾在不同場次保持一致。
35. As a 現場講者, I want 其餘頁面使用自然講述提示而非完整逐字稿, so that 演講仍有口語節奏而不會變成讀稿。
36. As a 現場講者, I want 每頁 timing 能加總至 39:30 並保留 30 秒緩衝, so that 40 分鐘正文能吸收轉場與現場停頓。
37. As a 現場講者, I want 有一條「刪細節、不刪敘事節點」的 overflow path, so that 超時時仍保留完整論證。
38. As a Q&A 參與者, I want 能針對 placement、ownership、dependency、抽離時機、逐步導入、案例與 framework seams 追問, so that 10 分鐘 Q&A 延伸已建立的判斷框架。
39. As a Q&A 參與者, I want 在問題超出既有專案脈絡時先得到可遷移原則與所需補充資訊, so that 講者不會假裝能現場裁決所有檔案位置。
40. As a 講者, I want 直接跳回相關正文頁回答 Q&A, so that 不需要正文外 backup slides 也能使用 notes 中的完整證據。
41. As a 視覺設計 reviewer, I want 每頁使用一致的責任框、Public API 入口、資料流箭頭、依賴箭頭與自動檢查防線, so that 圖解語意可以跨案例累積。
42. As a 投影環境中的聽眾, I want light-density 內容、足夠字級與 100–160px 邊界, so that 每頁都能在 1920×1080 清楚閱讀。
43. As a 色覺或視覺辨識需求不同的聽眾, I want 分類與狀態同時使用文字、圖示、線型、實心或外框, so that 顏色不是唯一語意載體。
44. As a 從 overview 直接進入任一頁的 reviewer, I want reveal 狀態完整可讀, so that 非線性檢視不會缺少必要內容。
45. As a technical reviewer, I want 技術畫面只顯示 3–6 行能證明邊界的程式碼, so that code 在投影時可讀且不被無關設定淹沒。
46. As a source reviewer, I want 每個版本敏感聲明都有 primary source、查核日期、版本、已驗證範圍與 inference 標示, so that 官方 guidance、fixture evidence 與講者解讀不會混在一起。
47. As a source reviewer, I want authoring 當日重驗 Nuxt、Vue Query、Nuxt UI、Steiger 與 Husky 的現行文件, so that 簡報不會把已漂移的 API 當成現況。
48. As a reviewer, I want 三個真實案例的公開事實、匿名化範圍與合成細節有 truth table, so that 故事強度不會犧牲真實性。
49. As an authoring agent, I want 一份固定 34 頁的逐頁 map, so that 不需要重新決定敘事、頁數或段落預算。
50. As an authoring agent, I want 清楚的 MUST、SHOULD 與 MAY boundaries, so that 可以直接實作而不重開 Wayfinder 已完成的問題。
51. As an authoring agent, I want 知道任何 OpenSlide primitive 都要先讀對應 reference, so that motion、morph、steps、design tokens 與 page numbers 符合 framework contract。
52. As an authoring agent, I want helper components 與 constants 留在單一 deck entry, so that 成品符合 OpenSlide 的 slide-local file contract。
53. As an authoring agent, I want 只使用既有 React、`@open-slide/core` 與 standard web APIs, so that authoring 不需改動依賴或 repo 設定。
54. As an acceptance reviewer, I want 從 overview 開啟全部 34 頁並逐頁視覺檢查, so that 裁切、貼邊、換行、標籤、圖解與 code 問題不會被抽樣漏掉。
55. As an acceptance reviewer, I want `pnpm build` 通過且 deck export 正好包含 34 頁, so that OpenSlide contract、imports 與 assets 在 production build 中成立。
56. As an acceptance reviewer, I want content、evidence、code 與 timing audits 都通過, so that deck 不只是能 build，還完整履行公開承諾。
57. As an acceptance reviewer, I want 至少一次正常完整排練與一次 overflow drill, so that 時間與縮減策略有實際證據而非估算。
58. As an acceptance reviewer, I want 測試聚焦完整 deck 的外部行為, so that helper component implementation details 不會成為脆弱的驗收目標。
59. As a repo maintainer, I want authoring 只新增指定 deck 與必要 assets, so that themes、其他 slides、package 與 OpenSlide 設定不會被連帶修改。
60. As a 主流程協作者, I want 正式 authoring task 使用 `gpt-5.6-sol` 且 reasoning effort 為 `max`, so that 已鎖定的執行條件在 handoff 後仍被遵守。

## Implementation Decisions

### MUST：場次、受眾與立場

- 正式標題是「一段程式碼，到底該放哪裡？從 Feature-based 到 Feature-Sliced Design」；講者是「一隻狐狸」。
- 主要受眾是具備 Vue、TypeScript 與 feature-based organization 經驗、但尚未系統性接觸 FSD 的前端工程師；內容同時要讓資深工程師取得 module boundary、演進與 enforcement 的新判斷。
- 正文固定 40 分鐘，接續 10 分鐘 Q&A；deck 固定 34 頁正文，沒有正文外 backup slides，逐步 reveal 仍算同一頁。
- 全場採非推銷立場：technical-based organization 是可理解的起點，feature-based organization 真正改善 locality，FSD 用來檢視未被說清的 ownership、dependency、Public API、抽離時機與 enforcement，不宣稱是唯一解。
- 「逐步導入」只指 Pages First、延後抽離、依實際重用與穩定邊界演進的判斷順序；不擴張為逐檔 migration plan。
- audience-facing content 與 presenter notes 使用繁體中文；只有程式碼、路徑、產品名稱與精確技術名詞保留英文。

### MUST：locked narrative 與 34-page authoring map

全部頁面的 `Timing` 加總為 2,370 秒（39:30），最後 30 秒停留在結尾頁作緩衝。表中的 transition 是 authoring 必須落入 notes 的最小語意；實際 notes 還要同時描述前頁承接與後頁引導。

| 頁 | 時間段 | Page role | 核心 message | 主要 visual | 分類標籤 | Motion | 秒數 | Transition |
| ---: | --- | --- | --- | --- | --- | --- | ---: | --- |
| 1 | 0:00–0:45 | Cover／開場提問 | 一段程式碼該放哪裡，是長期協作與理解成本問題 | 單一程式碼片段被多個目錄拉扯 | 講者詮釋 | Static | 45 | 從標題進入具體修改情境 |
| 2 | 0:45–1:30 | Problem setup | placement 分歧會放大重構、review 與 AI context 成本 | 人、AI、reviewer 在不同答案間來回 | 講者詮釋 | Subtle reveal 可選 | 45 | 從成本引向既有組織方式 |
| 3 | 1:30–3:30 | Technical-based baseline | 技術分類容易上手，但業務修改邊界會散落 | `components`／`composables`／`utils` 跨目錄追查 | 講者詮釋 | Static | 120 | 公平承認起點，再尋找 locality |
| 4 | 3:30–5:00 | Feature-based improvement | feature colocation 讓一起變動的程式靠近 | 前後 locality 對照 | 講者詮釋 | Morph 可選 | 90 | 從改善轉入仍未回答的問題 |
| 5 | 5:00–6:30 | Gap framing | Feature 資料夾本身沒有回答 ownership、dependency、Public API、抽離與 enforcement | 五個未決問題環繞 feature box | 講者詮釋 | Steps 可選 | 90 | 將缺口轉成全場要解的問題 |
| 6 | 6:30–7:00 | Thesis／promise | 用 FSD lens 建立人與 AI 共用、CI 可部分保護的方法 | 「判斷語言」與「機械護欄」雙軌 | 講者詮釋 | Static | 30 | 進入最低必要 FSD primer |
| 7 | 7:00–7:35 | Source policy | 本演講的現行 FSD guidance 以 `fsd.how` 為準 | canonical source 卡片與 legacy domain 警示 | 現行官方 guidance／講者背景 | Static | 35 | 20–30 秒說明來源後進入術語 |
| 8 | 7:35–9:05 | Primer: layers | Layers 表達責任層級，不要求每個專案用滿所有層 | 最小 layers 階梯，App／Pages／Shared 為起點 | 現行官方 guidance | Steps 可選 | 90 | 從責任層級進入業務分組 |
| 9 | 9:05–10:30 | Primer: slices／segments | Slice 依業務領域分組，segment 描述 slice 內技術目的 | 一個 slice 的業務框與 `ui/model/api` 分區 | 現行官方 guidance | Static | 85 | 從內部結構引向依賴契約 |
| 10 | 10:30–12:10 | Primer: dependencies／Public API | 高層只能依賴低層，slice 透過具名 Public API 對外 | 虛線 dependency arrow 穿過具名入口 | 現行官方 guidance | Steps／morph 可選 | 100 | 從依賴規則引向演進時機 |
| 11 | 12:10–14:00 | Primer: Pages First decision tree | 先留在 Pages；只在真實重用與穩定邊界出現後抽離 | placement／逐步導入判斷樹 | 現行官方 guidance | Steps 可選 | 110 | 用判斷樹進入第一個真實案例 |
| 12 | 14:00–15:00 | Case 1: original decision | 過早把三種責任做成全專案共用元件 | 單一大框包住 UI、form、server data | 匿名真實案例 | Static | 60 | 從原決策進入可觀察後果 |
| 13 | 15:00–16:15 | Case 1: consequence | Control 無法脫離 form，也無法替換資料來源 | wrapper／例外 props 由大框外生長 | 匿名真實案例 | Morph 可選 | 75 | 用後果引出第二 consumer 壓力測試 |
| 14 | 16:15–17:35 | Case 1: guided probe | 第二個非表單 consumer 迫使假表單或更多例外 | 合成 consumer 對照兩條路 | 合成案例 | Steps 可選 | 80 | 從探針回到可公開的責任修正 |
| 15 | 17:35–19:00 | Case 1: correction | 分離 UI control、form adapter、server-data owner；只重用已穩定責任 | 三個責任框與 runtime data flow | 現行官方 guidance／講者詮釋 | Morph 可選 | 85 | 從「過早共享」轉成對照案例「共享不足」 |
| 16 | 19:00–20:10 | Case 2: valid ownership | 各 feature 合理擁有不同完整 schema | 多個 feature schema 各自封閉 | 匿名真實案例 | Static | 70 | 從合理差異聚焦必須一致的規則 |
| 17 | 20:10–21:30 | Case 2: drift | 語意相同的欄位規則被複製，修改時只改到部分流程 | 規則副本逐漸分岔 | 匿名真實案例 | Steps 可選 | 80 | 從漂移引向穩定共用點 |
| 18 | 21:30–23:00 | Case 2: correction | Feature schema 保持本地，只下沉已證明必須一起變動的 shared field rule | 多 schema 經 Public API 依賴單一 rule | 現行官方 guidance／講者詮釋 | Morph 可選 | 90 | 從 validation ownership 轉入 auth ownership |
| 19 | 23:00–24:05 | Case 3: original decision | Login feature 錯誤擁有 app-wide token | 其他功能反向指向 login | 匿名真實案例 | Static | 65 | 從錯置 owner 展示依賴擴散 |
| 20 | 24:05–25:15 | Case 3: consequence | Profile、權限與 API client 被迫依賴 login feature 或複製狀態 | cross-import／狀態副本圖 | 匿名真實案例 | Steps 可選 | 70 | 從後果問真正穩定 owner 在哪裡 |
| 21 | 25:15–26:35 | Case 3: ownership correction | 簡單 token／session 由 `shared/auth` 擁有，登入只是使用它的行為 | Login、Shared Auth、其他 consumers 的依賴方向 | 現行官方 guidance／匿名真實案例 | Morph 可選 | 80 | 從 ownership 進入 composition root wiring |
| 22 | 26:35–28:00 | Case 3: wiring | App 注入 token provider 給 `shared/api`；interceptor 每次 request 取最新 token | App composition root 與 runtime token flow | 現行官方 guidance／講者詮釋 | Steps 可選 | 85 | 從 App wiring 連到另一個 framework adapter |
| 23 | 28:00–28:45 | Nuxt seam: naming pitfall | Nuxt page 是 route manifest；FSD Page 是 application module | 兩個同名 `pages` 的責任對照 | 現行官方 guidance／講者詮釋 | Static | 45 | 從命名衝突進入 adapter 解法 |
| 24 | 28:45–29:40 | Nuxt seam: adapter | 薄 route entry 經 Public API 接上 FSD Page，不把 framework directory 當 business owner | framework entry → Public API → FSD Page | 現行官方 guidance | Morph 可選 | 55 | 從責任設計進入版本化實證 |
| 25 | 29:40–30:30 | Nuxt seam: fixture | Nuxt 4.5.2 fixture 已驗證 custom directories、內建 alias 與 production build seam | config／route／Public API 3–6 行 code + PASS 防線 | 已驗證版本 snapshot | Static | 50 | 從 routing cache-free seam 轉入 server-state seam |
| 26 | 30:30–31:20 | Vue Query: cache contract | Query factory 讓 key、request 與 invalidation 有可發現 owner | owning slice 對外暴露 cache contract | 現行官方 guidance／講者詮釋 | Static | 50 | 從 cache identity 進入 Vue reactivity |
| 27 | 31:20–32:10 | Vue Query: reactive seam | Reactive input 若在邊界被 snapshot，網址變了 query 仍不變 | getter/ref 穿越 Public API vs plain snapshot | 現行官方 guidance | Steps 可選 | 50 | 從 client reactive lifecycle 進入 SSR lifecycle |
| 28 | 32:10–33:00 | Vue Query: SSR／draft seam | Nuxt SSR QueryClient 必須 request-scoped；server snapshot 不等於 form draft | request boxes 隔離 cache + draft 分流 | 現行官方 guidance／講者詮釋 | Static | 50 | 從工具看不到的 lifecycle 引向人的判斷 |
| 29 | 33:00–34:00 | Human judgment | 人制定 business boundary、例外與規則嚴格度 | 人在控制迴路上方制定 policy | 團隊 policy／講者詮釋 | Static | 60 | 從政策 owner 進入共享執行語言 |
| 30 | 34:00–35:00 | Human + AI language | Skill／CONTEXT／架構文件讓人與 AI 共用判斷；AI 不是最終裁決者 | 人與 AI 讀同一規則並互相 review | 講者詮釋 | Steps 可選 | 60 | 從語意系統進入機械護欄 |
| 31 | 35:00–35:30 | Steiger boundaries | Imports、Public API、folder contract 可硬檢；threshold／naming 多為 heuristics | Hard checks vs heuristics 雙欄 | 現行官方 guidance | Static | 30 | 從規則分類進入執行位置 |
| 32 | 35:30–36:00 | Husky／CI matrix | Husky `pre-push` 是本機團隊 policy；遠端 CI 是共同守門 | Local pre-push → remote CI，列出實際 checks | 團隊 policy | Static | 30 | 從工具分工組裝完整閉環 |
| 33 | 36:00–38:00 | Synthesis | 明確規則 → 共用判斷語言 → 自動保護，只有模糊與邊界變更回到人 | 不對稱架構控制迴路逐步完成 | 講者詮釋 | Steps／morph 可選 | 120 | 從 FSD-specific 證據抽象成一般方法 |
| 34 | 38:00–39:30 | Conclusion | 即使不採用 FSD，也要說清 ownership、dependency、evolution rules | 三個帶走問題＋完成的控制迴路 | 講者詮釋 | Static | 90 | 收束並停留至 40:00，接 Q&A |

### MUST：三個真實案例與合成案例界線

| 案例 | 可公開的匿名親身事實 | 必須匿名化／不得擴寫 | 可用的合成探針 | 邊界修正與教訓 |
| --- | --- | --- | --- | --- |
| 過早共享 | UI control、form adapter、特定 backend data source 被合成共用元件；control 無法脫離 form，也難替換資料來源 | 產品、業務、元件種類；不得加入 submit lifecycle | 成員選擇器、設定表單、動態牆或第二個非表單 consumer，必須標「合成案例」 | 先留在 owning page／feature；分離受控 UI、form binding、server-data ownership，只抽離已觀察到的穩定責任 |
| 共享不足 | 各 feature 有不同完整 schema，但語意一致的欄位規則被重複；規則變更只改部分副本，造成 validation drift | 具體欄位不得被說成親身事實；password／email 僅能是說明例 | 可用匿名「某項欄位規則」圖解，不補造產品背景 | Feature schema 保持 owning slice；只下沉已證明必須一起變動的 shared field rule |
| Auth ownership 錯置 | Token 由 login feature 擁有，其他功能與共用 Axios client 被迫依賴 login；修正後由穩定下層 auth boundary 擁有並由 App wiring | 產品、實際功能名稱與未確認的 session 細節 | 可用 profile、permission、authenticated API 作一般 consumer，不得宣稱全是原事件細節 | Login behavior 不等於 auth state owner；簡單 token／session 可在 `shared/auth`，App composition root 注入 current-token provider 給 `shared/api`，interceptor 每次 request 讀最新 token |

案例一與案例二必須刻意形成對照：前者是不該一起變動的責任被過早共享，後者是已證明必須一致的穩定規則沒有共享。三個案例不得為湊數增加第四案；Technical-based → feature-based → FSD lens 是 problem framework，不占真實案例名額。

### MUST：FSD 與 framework seam 技術 contract

- 現行 FSD guidance 只以 `fsd.how` 與其連結的一手資料為 canonical；不得引用 legacy `feature-sliced.design`。官方 GitHub organization 可作 release／repository provenance，當前 guidance 仍以 `fsd.how` 為準。
- Primer 只講後續案例所需的最低語言：layers 的責任層級、業務 slices、slice 內 segments、向下 dependency direction、Public API、Pages First 與延後抽離。不得變成官方文件導讀或 placement 百科。
- FSD 是 lens：Not all layers are required，最小起點可只有 App／Pages／Shared；Features／Entities 只在真實重用和穩定邊界帶來價值時加入。不得把目錄長得像 FSD 等同 architecture operationalization。
- Nuxt route entry 是 framework adapter，擁有 URL contract、Nuxt metadata 與必要參數轉接；FSD Page 是 application module，擁有 page composition、page-specific state、queries、validation 與 business rules。Route entry 經 slice Public API 匯入，不深層穿透 internals。
- Nuxt 技術畫面以 Nuxt 4.5.2 fixture 作 evidence snapshot：`srcDir: 'src/'`、`dir.app: 'app'`、`dir.pages: 'app/routes'`、`dir.layouts: 'app/layouts'`、source-root `src/app.vue`、內建 `@` 指向 `src`、route adapter 經 FSD Page Public API。Snapshot 已通過 prepare、typecheck 與 production build，但不是所有 Nuxt 4 app 的唯一設定或完整 deployment certification。
- 不得重現已否決的 `src/app/app.vue`；不得把 TypeScript 7.0.2／`vue-tsc` 3.3.9 組合說成已通過。Fixture 的可行 snapshot 使用 TypeScript 6.0.3；這是當次 toolchain compatibility evidence，不是 Nuxt 的通用強制 pin。
- Vue Query 的 query factory／cache contract 可依實際 owner 留在 page／feature，或在證明跨 consumer 重用後放入適當 lower boundary；不得因 endpoint response 自動建立 Entity，也不得把所有 query code 一律搬到 Shared。
- Reactive input 若需跨 composable／factory boundary，public contract 應保留 ref 或 getter 並讓 input 留在 query key；不得先 `.value`／property access 成 plain snapshot 後期待 query 自動追蹤。
- Nuxt SSR 的 QueryClient 是 App-level policy，但 server-side instance 必須依 request/app lifecycle 建立，不得用 process-wide singleton 讓 requests 共用 cache。
- Vue Query result 是可被 refresh 替換的 server snapshot；form draft 是獨立、可變的 edit buffer。Nuxt UI 案例中的 UI control 不知道 form library、Vue Query 或 endpoint；form adapter 只處理 field binding／validation／error presentation；server-data owner 決定 fetch、transform、loading 與 error policy。
- Auth 案例中，FSD 決定 ownership 與 dependency direction；Vue Plugin、`app.use()`、app-level `provide()`／`inject()` 是 composition root 的一種 framework mechanism，不是 ownership 本身。

### MUST：人、AI、Skill、Steiger、Husky 與 CI 分工

- 人制定產品的 business language、architecture policy、風險容忍度、例外與 diagnostics severity，並對高成本或跨 boundary 決策負最終責任。
- 人與 AI 共同使用 Skill、CONTEXT 與架構文件判斷 placement、ownership、dependency、資料流和例外。AI 可解釋、提出選項、review 並在既定規則內修復；遇到 business ambiguity、例外或責任邊界改變時回到人裁決。
- Steiger 保護它能從檔案樹與靜態 imports 觀察到的規則，例如 higher-layer import、same-layer cross-import、Public API sidestep 與 folder contract。不得宣稱 Steiger 通過即可證明 business boundary 正確、符合全部 FSD 或完全沒有 circular dependencies。
- `excessive-slicing`、`shared-lib-grouping` 等 arbitrary thresholds，以及 reference count、英文命名假設與「通常」型 diagnostics 必須標成 heuristics；是否升級為 error 是團隊 policy。
- Husky 能執行 `.husky/pre-push` 是工具能力；選 `pre-push` 而非 `pre-commit` 是本演講的團隊 policy，理由是避免開發中間狀態反覆觸發架構警報。
- 遠端 CI 是共同守門，執行團隊採納的 Steiger rules、typecheck、production build、tests 與必要的 custom architecture checks。本機 `pre-push` 提早回饋，但不取代 remote CI。
- 結尾控制迴路必須是不對稱的：人制定政策；人與 AI 依共同語言實作／review；AI 可在明確規則內修復；CI 守可機械驗證結果；只有模糊、例外或 boundary change 回到人。不得畫成等權圓環或讓 CI 包住全部架構語意。

### MUST：Presenter notes contract

每一頁都必須有以下八個固定欄位，且內容不可用空泛占位文字：

1. `Message`：本頁唯一要讓聽眾帶走的判斷。
2. `Context`：講者需要補充、但不應塞到觀眾畫面的脈絡；案例頁要指出親身事實與合成部分。
3. `Transition`：同時說明承接前頁的哪個問題，以及如何把聽眾帶往下一頁。
4. `Required details`：不可漏講的術語、因果、code line、版本 caveat 或標註。
5. `Timing`：以秒為單位，精確對應 authoring map，34 頁總和為 2,370 秒。
6. `Sources`：直接支持本頁聲明的一手來源、查核日期／版本；Wayfinder research 與 fixture 可作 evidence pointer。
7. `Possible Q&A`：最可能的追問與安全、簡短答案；技術頁可保留完整 config／code pointer。
8. `Safety boundary`：本頁不可過度宣稱、不可暴露或不可把 inference 說成官方事實的界線。

開場第 1–2 頁、核心主張第 6／33 頁與結尾第 34 頁使用近逐字稿。其餘頁面使用可自然講述的提示，不把完整講稿或 notes 搬上畫面。沒有額外 Q&A slides；Q&A 直接從 overview 回到相關正文頁，notes 即為備援材料。

### MUST：Visual system 與圖解 grammar

- Canvas 固定 1920×1080；內容邊界 100–160px；頁面標題 56–80px、正文 32–44px、label 22–28px。每頁 root 填滿畫布，逐頁計算 vertical budget。
- 字體使用 Public Sans；主背景 `#020420`，主 accent `#00DC82`，搭配白色與 slate 中性色階。Nuxt 是視覺基準，不反覆使用 Logo／山形，也不得讓 deck 看似 Nuxt 官方產品簡報。
- 採 light density：每頁一個主要判斷，通常一句結論加一個圖解或 2–3 個短要點；技術頁約 3–6 行 code。不得縮小字級、減少邊界或塞滿 dashboard/grid 來換取密度。
- 封閉框線表示責任範圍；框線上的具名入口表示 Public API；實線箭頭表示 runtime data flow；虛線箭頭表示 static import／dependency；每支箭頭附動詞或資料名稱。
- CI 使用「自動檢查防線」，直接列出 imports、Public API、types、build、tests 等實際 checks；不得與 Public API 共用含義模糊的 gate 圖像。
- 內容需要揭露性質時，使用 `匿名真實案例`、`合成案例`、`現行官方 guidance`、`歷史 guidance`、`團隊 policy`、`講者詮釋` 或 `已驗證版本 snapshot` 等文字 label。Label 同時使用文字與圖示／線型／實心／外框，顏色只作輔助。
- 使用同一套責任框、Public API、箭頭與檢查防線跨案例累積；結尾重組成不對稱控制迴路，不讓每頁重新發明圖例。
- 採 subtle motion：不為每頁強制動畫；若有 page transition，使用同一 motion vocabulary，通常 140–280ms。`Steps` 只用於推理順序，morph 只用於相鄰頁的同一架構物件狀態延續。Overview 直達任何頁面時必須完整可讀。

### MUST：OpenSlide boundaries 與正式 authoring 執行條件

- Deck id 固定 `feature-based-to-fsd`。成品是一個 OpenSlide deck entry 加必要的 slide-local assets；helper components 與 constants 留在同一 entry，不拆 sibling source files。
- 只使用 React、repo 目前安裝的 `@open-slide/core` 與 standard web APIs；不得新增 dependencies。
- 不修改 package manifest、OpenSlide config、themes、其他 slides、Wayfinder map／issues／research 或 domain context。
- 使用 top-level `design` export；`meta.title` 使用正式標題；`meta.createdAt` 在正式建檔當下依 `slide-authoring` 規則取得精確 ISO timestamp。
- 每頁 root 為 100% × 100%；不得用 scroll、hidden overflow、negative margin、transform 或低於既定字級來掩蓋 overflow。
- 使用 design tokens、assets、webfonts、page numbers、Steps、SlideTransition 或 MorphElement 前，正式 authoring task 必須完整讀取對應 `slide-authoring` reference。
- 正式執行 `create-slide` 並製作 deck 的 task 必須使用 `gpt-5.6-sol`，reasoning effort 必須是 `max`。

### SHOULD

- 以同一個 ownership／dependency 視覺語言串起三個案例與 framework seams，使資深聽眾能比較 boundary pattern，而不只記住目錄名稱。
- 完整 sources、version caveats、設定、code pointer 與延伸閱讀留在 notes；觀眾畫面只保留完成當頁判斷的最小證據。
- Code highlighting 每頁只突出正在解釋的 framework entry、Public API、owner 或 check，避免把 library tutorial 帶進正文。
- 排練連續進行直到正常版本可穩定在 39:30 前完成，overflow path 也能維持所有敘事節點。

### MAY

- 少數推理順序重要的頁面可使用 `Steps`；相鄰頁若同一責任物件持續變形，可使用 morph；兩者都不得為裝飾而用。
- 只在來源清楚且內容確實需要時加入 slide-local assets；不得以 generic stock image 或無必要 placeholder 填空。
- Presenter notes 可保留比觀眾畫面更完整的 config、code、版本矩陣與延伸閱讀，但正文理解不得依賴隱藏內容。

## Testing Decisions

### 已確認的最高層 seam

驗收以**完整 OpenSlide deck**為唯一最高層測試 seam，而非 helper components 或內部資料結構。通過條件是：34 頁正文能在 1920×1080 正確 render、overview 可直接開啟任一頁、presenter notes 全部符合 schema、production build 通過，並完成內容、來源、程式碼、時間與 overflow drill 的整體驗收。

這是一個外部行為 seam：測試觀眾、講者與 reviewer 實際能看見和操作的 deck。次級 seam 只用於定位失敗，包括逐頁視覺 inspection、必要的靜態 audit、source／code pointer 查核；不得把 helper component implementation details、內部常數名稱或 JSX 組織方式當成獨立測試目標。

### 視覺與互動驗收

- 從 overview 逐一打開全部 34 頁，不可抽樣；確認任一頁可直接進入，且 reveal 頁在非線性進入時顯示完整內容。
- 每頁以 1920×1080 檢查 root fill、100–160px 內容邊界、無裁切、無文字貼邊、無意外 bullet wrap、code 清晰可讀、label 可辨識、diagram grammar 一致。
- 每頁核對 light density 與 single-judgment 原則；若內容不合，拆解或精簡內容，不得用小字、scroll、hidden overflow、negative margin 或 transform 隱藏問題。
- 若使用 transitions、Steps 或 morph，核對其對應 OpenSlide primitive contract、同一 motion vocabulary，以及 overview direct-entry behavior。

### Build 與靜態驗收

- 執行 `pnpm build` 並要求 exit 0；確認 deck export 是非空且正好 34 個 pages，所有 imports／assets 存在。
- 執行 scoped diff audit，確認只新增正式 deck 與必要 assets，沒有更動 package manifest、OpenSlide config、themes、其他 slides 或 planning／domain files。
- 必要的靜態 audit 可檢查 `meta.title`、`meta.createdAt`、top-level `design`、逐頁 notes 欄位與 34 個 timing 的加總；它們是定位與完整性檢查，不取代 render inspection。

### Content audit

- 核對公開承諾全部在正文可見：placement、technical-based → feature-based → FSD lens、逐步導入、人與 AI 搭配官方 Skill／Linter、可持續演進。
- 核對 7 分鐘 primer 包含 `fsd.how` canonical source 的 20–30 秒說明，以及 layers、slices、segments、dependency direction、Public API、Pages First／延後抽離。
- 核對三個匿名真實案例全部具備「原決策 → 可觀察後果 → boundary correction → lesson」，並遵守 truth table；所有補足業務情境清楚標成合成案例。
- 核對 Nuxt UI 三責任邊界、Nuxt 4 routing fixture、Vue Query cache／reactive／SSR seams、人／AI／Skill／Steiger／Husky `pre-push`／CI 分工全部在正文可見。
- 核對第 33 頁的不對稱控制迴路與第 34 頁不依賴採用 FSD 的方法論結論完整存在。

### Evidence 與 code audit

- 每個外部技術聲明都要有 primary source、查核日期／版本、已驗證範圍與 inference／speaker interpretation 標示；外部連結在 authoring 當日可開啟。
- Authoring 當日重新核對 Nuxt、Nuxt UI、TanStack Vue Query、Steiger 與 Husky 的官方文件與版本敏感聲明；若 current guidance 與 snapshot 不同，更新 notes 的差異標註，不擅自改變已鎖定的 architecture lesson。
- 每段觀眾畫面 code 必須可追溯到 Nuxt 4.5.2 fixture、官方文件，或在 notes 清楚標示轉譯邊界的範例；不得憑印象發明 API。
- Nuxt audit 必須確認使用 `src/app.vue` 而非已否決的 `src/app/app.vue`，且不把 TypeScript 7.0.2／`vue-tsc` 3.3.9 說成已通過組合。
- Steiger audit 必須區分 hard checks 與 heuristics；Husky audit 必須把 `pre-push` 標成團隊 policy；CI audit 不得聲稱能驗證 business semantics。

### Notes、Q&A 與時間驗收

- 34 頁每頁都必須包含八個 notes 欄位：`Message`、`Context`、`Transition`、`Required details`、`Timing`、`Sources`、`Possible Q&A`、`Safety boundary`。
- 每個 `Transition` 同時承接前頁並引向後頁；每個 `Timing` 與 authoring map 一致，總和正好 2,370 秒。
- 開場、核心主張、控制迴路回顧與結尾有近逐字稿；其他頁是自然講述提示。Q&A 不依賴額外 backup slides，並能由 overview 跳回相關正文頁。
- 至少完成一次正常完整排練，正文在 39:30 前結束；另完成一次 overflow drill，在 40:00 內完成且不刪任何既定敘事節點。
- Overflow drill 依序刪減：來源／證據細節；壓縮 Nuxt 與 Vue Query mechanics；縮短案例 mechanics 但保留四段因果；最後才壓縮 primer 的 layer 名稱與目錄展示。不得刪 problem framework、任何真實案例、Nuxt UI／Nuxt fixture／Vue Query 核心踩坑、人／AI／CI 分工、三層閉環或方法論結論。

### Prior art

- OpenSlide runtime 已提供 overview、page navigation、fixed 1920×1080 canvas 與 production build seam；驗收沿用這些使用者可見行為。
- `slide-authoring` 的 self-review checklist 是逐頁視覺檢查的基礎，包括 root fill、vertical budget、字級、padding、assets、Steps／transitions／morph 與禁止 overflow workaround。
- Nuxt routing 技術聲明的 prior art 是已完成的 Nuxt 4.5.2 fixture：prepare、typecheck、production build 與 generated artifacts 已驗證 scanner、alias、route adapter、layout 與 FSD Page Public API seam。
- Wayfinder prototype 只提供可回溯的內容與視覺探針，不是正式 deck 的可複製 implementation，也不是 acceptance seam。

## Out of Scope

- 本 spec 不製作、編輯或預覽 slides，不建立 theme，不新增 assets，不執行正式 authoring。
- 本 spec 不拆 implementation tickets；下一階段才使用 `/to-tickets`。
- 不重新研究、訪談或更改已鎖定的受眾、標題、deck id、34 頁、40+10 分鐘、敘事、案例、framework seams、視覺方向、notes schema、技術 contract 或驗收 seam。
- 不把 FSD 推薦為所有 frontend projects 的必選方法，也不比較出唯一架構冠軍。
- 不提供完整 FSD documentation walkthrough、所有 placement 問題的答案表，或所有 layers／patterns 的百科。
- 不教 Nuxt、Nuxt UI、Vue Query、Steiger 或 Husky 的完整 API／CLI；只使用能證明 architecture seam 的最小內容。
- 不提供既有 production codebase 的逐檔 migration plan、現場完整架構診斷或 framework-specific deployment certification。
- 不新增第四個真實案例，不把 problem framework 或舊網域背景算成架構案例。
- 不把合成的成員選擇器、設定表單、動態牆、日期區間、報表、儀表板或具體欄位冒充講者親身事實。
- 不宣稱 Steiger 能證明全部 FSD correctness、business semantics 或不存在任何 circular dependency。
- 不新增正文外 backup slides；Q&A 使用既有 34 頁與其 presenter notes。
- 不修改 Wayfinder map／issues／research、CONTEXT、themes、其他 slides、package manifest 或 OpenSlide config。

## Further Notes

### Stable delivery identifiers

- Spec location: `.scratch/fsd-talk-authoring-brief/spec.md`
- Formal deck id: `feature-based-to-fsd`
- Formal title: 「一段程式碼，到底該放哪裡？從 Feature-based 到 Feature-Sliced Design」
- Speaker: 「一隻狐狸」
- Body: 34 pages, 2,370 seconds of authored timing, 30-second closing buffer, followed by 10-minute Q&A
- Formal authoring execution: `gpt-5.6-sol`, reasoning effort `max`

### Wayfinder evidence index

- Decision map: `.scratch/fsd-talk-authoring-brief/map.md`
- Tickets 01–10: `.scratch/fsd-talk-authoring-brief/issues/`
- Judgment／Steiger／CI research: `.scratch/fsd-talk-authoring-brief/research/02-judgment-and-enforcement.md`
- Nuxt routing research: `.scratch/fsd-talk-authoring-brief/research/03-nuxt-routing.md`
- Vue Query research: `.scratch/fsd-talk-authoring-brief/research/04-vue-query.md`
- Nuxt 4 fixture evidence: `.scratch/fsd-talk-authoring-brief/research/10-nuxt4-fixture-verification.md`

### Prototype primary-source pointers

Prototype 只供正式 authoring 查回已 review 的探針與視覺方向，不得直接複製成正式文案或 working implementation：

| Purpose | Branch | Commit | Path |
| --- | --- | --- | --- |
| Nuxt UI responsibility probe | `prototype/nuxt-ui-form-boundary` | `059326be75e53b39500b4496a9301a9963e41c04` | `.scratch/fsd-talk-authoring-brief/prototypes/05-nuxt-ui-form-boundary.html` |
| 40-minute outline walkthrough | `prototype/fsd-talk-outline` | `cac9f7ee762deb52d0f0e3bb3855fe8bcf317a36` | `.scratch/fsd-talk-authoring-brief/prototypes/07-talk-outline.html` |
| Visual language comparison | `prototype/fsd-talk-visual-language` | `23c24ddf2c06db0ba411efe2dfab7ee6ff58dd14` | `.scratch/fsd-talk-authoring-brief/prototypes/08-visual-language.html` |

### Evidence and version matrix

| Claim family | Primary authority／snapshot | Verified scope | Inference／safety boundary | Authoring-day action |
| --- | --- | --- | --- | --- |
| Current FSD guidance | `fsd.how` and linked first-party material; official `feature-sliced` GitHub for provenance | Layers, slices, segments, dependency rule, Public API, Pages First, auth／Nuxt／TanStack Query guidance | Legacy-domain loss chronology is speaker context until a first-party record is linked | Reopen current pages; never cite `feature-sliced.design` |
| Nuxt routing seam | Nuxt 4.x official docs + Nuxt 4.5.2 fixture | `srcDir`, custom scanned dirs, `src/app.vue`, built-in `@`, thin route adapter, FSD Page Public API, prepare/typecheck/build | Snapshot is not the only valid Nuxt 4 config or deployment certification | Recheck current Nuxt docs/version; retain 4.5.2 as dated snapshot |
| Fixture toolchain | Nuxt 4.5.2, TypeScript 6.0.3, `vue-tsc` 3.3.9 verification | Exact combination passed after TypeScript 7.0.2 failed package export compatibility | Does not require all Nuxt apps to pin TypeScript 6.0.3 forever | Verify whether newer `vue-tsc` supports newer TypeScript; report differences |
| Vue Query | TanStack Vue Query official query options, reactivity, SSR, mutation docs + FSD TanStack Query guidance | Query factory／cache contract, reactive input, request-scoped SSR client, immutable server snapshot | Placement depends on actual owner and reuse; directory examples are not unique official layouts | Recheck current APIs and SSR guidance; label React-to-Vue translation |
| Nuxt UI form boundary | Anonymous personal facts + reviewed guided probe | Three-responsibility coupling and second-consumer pressure test | Consumer names and business details are synthetic; Nuxt UI APIs are not the point | Recheck any displayed Nuxt UI API; keep responsibility lesson stable |
| Auth wiring | `fsd.how` auth guidance, Vue application／plugin／provide-inject docs, Axios auth/interceptor docs | Login is not app-wide state owner; App composition can inject a current-token provider | `shared/auth` is valid for simple token/session, not an unconditional answer for all auth domains | Recheck displayed APIs; distinguish FSD ownership from Vue mechanism |
| Steiger | Steiger official docs/source, snapshot 0.7.0 | Static import／Public API／folder diagnostics; recommended severity behavior | Diagnostics with arbitrary thresholds or naming assumptions are heuristics; no complete cycle proof | Recheck current version/rules and lockfile; update notes if behavior changed |
| Husky／CI | Husky official hook capability + speaker team policy | `.husky/pre-push` can run checks; remote CI can gate executable checks | Choosing pre-push is not an FSD or Husky mandate; CI does not infer business meaning | Recheck Husky syntax only if code is shown; preserve policy label |
| Visual system | Nuxt Design Guidelines and reviewed visual prototype | Public Sans, navy／green palette, whitespace and hierarchy direction | This is a deck design inspired by Nuxt, not an official Nuxt deck | Verify asset licenses／font loading if assets or webfont are used |

### Q&A contract

Q&A 可回答 placement、ownership、dependency、抽離時機、逐步導入、三個案例、Nuxt routing、Vue Query、Nuxt UI responsibility seam，以及人／AI／Skill／Steiger／Husky／CI 分工。超出範圍時先提供可遷移的判斷原則，再說明要取得具體結論仍需要哪些 business、runtime、reuse、dependency 或 migration context。

不得在缺乏脈絡時直接裁決每個檔案位置、提供完整套件教學、現場產出逐檔 migration plan，或把 team policy／speaker interpretation 說成 current official FSD guidance。Q&A 直接跳回對應正文頁；完整來源、版本、設定與 safety boundary 都留在該頁 notes。

### Handoff

本 spec 已完成 `/to-spec` 的 synthesis 與 testing seam 確認。下一個 Ask Matt route 應為 `/to-tickets`；該階段可以依 dependency order 拆 authoring、evidence refresh、visual implementation、notes completion、full-deck inspection、build 與 rehearsal tickets，但不得在本 spec 階段提前拆票或開始實作。
