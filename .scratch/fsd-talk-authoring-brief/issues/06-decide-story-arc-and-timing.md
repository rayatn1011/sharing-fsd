# 決定 40 分鐘的敘事弧線與時間配置

Type: grilling
Status: resolved
Blocked by: 01, 02, 03, 04, 05, 10

## Question

如何把 Technical-based、feature-based 的改善與缺口、7 分鐘 FSD primer、真實踩坑、Nuxt／Vue Query／Nuxt UI 案例、人與 AI 的開發及 review、Steiger／CI 保護，以及非 FSD 也可落實的結論，編排成一條 40 分鐘內有張力且不超載的敘事？

## Comments

## Answer

採用一條由問題走向可操作方法的單向敘事弧線：先從 Technical-based organization 的可理解起點出發，說明 feature-based organization 改善 locality 後仍未回答的 ownership、dependency、Public API、抽離時機與 enforcement；再用最少必要的 FSD 語言建立判斷工具，透過三個匿名真實案例與兩個 framework seams 驗證，最後將判斷分配給人、AI 與 CI，回顧為可在不採用 FSD 時仍然落實的方法。

40 分鐘本體的時間配置如下；40:00 後另有 10 分鐘 Q&A，不計入演講本體：

| 時間 | 段落 | 敘事任務 |
| --- | --- | --- |
| 0:00–1:30 | 開場情境 | Technical-based 專案中，局部修改仍需跨技術目錄追查責任。 |
| 1:30–3:30 | Technical-based organization | 說明它作為起點的可理解性，以及無法直接呈現業務修改邊界的長期限制。 |
| 3:30–5:00 | Feature-based 改善 | Colocation 改善 locality，相關程式開始一起變動。 |
| 5:00–6:30 | Feature-based 缺口 | Ownership、dependency、Public API、抽離時機與 enforcement 仍未被回答。 |
| 6:30–7:00 | 全場承諾 | 以 FSD 作為 lens，尋找人與 AI 可共用、CI 可部分保護的架構方法。 |
| 7:00–14:00 | Just-in-time FSD primer | 先以 20–30 秒建立 `fsd.how` 為現行官方來源，再以最低必要的 layers、slices、segments、依賴方向、Public API 與 Pages First，建立「誰擁有、誰能依賴誰、什麼能被保護」三個問題。 |
| 14:00–19:00 | 真實案例一：過早共用 | UI control、form adapter 與 server-data owner 被錯誤耦合；以 Nuxt UI 的第二個非表單 consumer 壓出邊界。 |
| 19:00–23:00 | 真實案例二：共用不足 | Feature 各自擁有 schema，但穩定欄位規則被複製，造成 validation drift。 |
| 23:00–28:00 | 真實案例三：ownership 錯置 | Login feature 錯誤擁有 token；修正為 `shared/auth` ownership、App wiring 與 API client dependency。 |
| 28:00–30:30 | Nuxt routing seam | Framework route adapter 經 Public API 接上 FSD Page；framework directory 不等於 architecture ownership。 |
| 30:30–33:00 | Vue Query seam | Owning slice 擁有 query factory、cache key 與 request contract；Vue reactive input 與 Nuxt SSR QueryClient lifecycle 另行設計。 |
| 33:00–34:00 | 人的判斷 | 人制定業務邊界、例外與規則嚴格度。 |
| 34:00–35:00 | 人與 AI 共用語言 | Skill 與架構文件供人質疑及對齊，也供 AI 實作與 review；AI 不是最終裁決者。 |
| 35:00–36:00 | Steiger／CI | 保護目錄、imports、Public API、型別、build 與測試等可觀察結果；diagnostic 不冒充業務語意證明。 |
| 36:00–38:00 | 回顧 | 以「明確規則 → 人與 AI 共用的判斷語言 → 自動保護」三層閉環，對比只有目錄分類的 generic feature-based organization。 |
| 38:00–39:30 | 方法論結論 | 即使不採用 FSD，也應說清 ownership、dependency 與 evolution rules，讓人、AI 與 CI 各自承擔合適責任。 |
| 39:30–40:00 | 緩衝 | 吸收轉場或現場停頓，不新增內容。 |

7 分鐘 primer 不是文件導讀。若需要壓縮，先縮短 layer 名稱與目錄展示，必須保留依賴方向、Public API、延後抽離，以及最後三個判斷問題。Nuxt routing 與 Vue Query 各只保留一個可遷移的 ownership 判斷；Nuxt 4 config、alias、layout、generated output、fixture 版本、Vue Query 風險清單、TypeScript／`vue-tsc` 相容性與 Nuxt UI API 細節留在講者備援或 Q&A。

排練超時時遵守「刪細節，不刪敘事節點」：依序刪除證據細節、將兩個 framework seams 由共 5 分鐘壓至 3 分鐘、縮短案例 mechanics 但保留「原決策 → 可觀察後果 → 邊界修正 → 教訓」，最後才壓 primer 的名詞介紹。不得整段刪除問題框架、任何一個真實案例、人／AI／CI 分工、三層閉環回顧或方法論結論。
