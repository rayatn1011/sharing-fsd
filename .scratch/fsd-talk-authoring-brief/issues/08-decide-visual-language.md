# 決定簡報的視覺語言與重複圖像

Type: prototype
Status: resolved
Blocked by: 07

## Question

哪一套視覺方向與反覆出現的圖像系統，最能呈現責任邊界、資料流、依賴方向、人／AI 理解成本及 CI 防線，並適合公開研討會的大螢幕閱讀？

## Comments

### HITL working constraints — 2026-08-14

- 使用者確認保留 prototype A 的資訊結構與圖像語法：責任範圍框線、單向箭頭、框架與應用程式的整合邊界，以及 CI 防線；不保留其晶晶體文案或終端機式裝飾。
- 整場採深色高對比的 Nuxt 配色，並以自然繁體中文為主；只有程式碼、路徑、產品名稱與確實需要精確對應的技術名詞保留英文。
- 視覺系統須參照 [`nuxtjs.tw/design.md`](https://nuxtjs.tw/design.md)：dark mode default、deep navy surfaces、Nuxt green as the single accent、generous whitespace、clarity over decoration、Public Sans、semantic color／text／background／border hierarchy，以及「狀態不可只靠顏色，必須搭配圖示或文字標籤」。這是最終 verdict 的輸入，待完成其餘 HITL 選擇後整合進 Answer。
- 在標題旁放置「內容分類標籤」，依頁面需要標示內容性質；「匿名真實案例」與台灣聽眾較自然的「合成案例」是其中兩例，不是僅有的兩種標籤，也不使用「合成探針」。標籤以文字、圖示、實心或外框共同辨識，顏色只作輔助。
- 框架整合案例的程式碼採「少而完整」：每次只顯示約 3–6 行，用來證明框架入口、Public API 與真正負責應用行為之模組的關係；只高亮當頁正在說明的行，其餘設定留給講者備援或 Q&A。
- 圖解語法固定為：實線箭頭表示執行期間資料流、虛線箭頭表示靜態匯入／依賴方向、封閉框線表示責任範圍；Public API 以框線上具名的對外入口表示，CI 則以清楚列出檢查項目的自動檢查防線表示，不共用含義模糊的「閘門」圖像。顏色不單獨承擔語意。
- 結尾主圖採不對稱的架構控制迴路：「人制定架構政策，人與 AI 依共同語言實作與審查，AI 可在既定規則內自我修復，CI 守住可機械驗證的結果，只有規則模糊、例外或邊界變更才交由人決定。」
- Nuxt 僅作為配色、字體、留白與語意層級的視覺基準；不反覆使用 Nuxt Logo 或山形，避免把演講誤解成 Nuxt 官方或 Nuxt UI 產品介紹。

## Answer

使用者實際比較三個方向後，選定 prototype A 的資訊結構，但不沿用原稿的晶晶體文案、終端機式裝飾或青綠／橘雙主色。正式視覺語言以「責任範圍、流向、對外入口與自動檢查防線」為核心，並依 [`nuxtjs.tw/design.md`](https://nuxtjs.tw/design.md) 重新設計為乾淨的 Nuxt 風格：dark mode 為預設、深海軍藍表面、Nuxt 綠作單一主強調色、Public Sans、大量留白，以及清楚的文字／背景／邊框層級。Nuxt 僅是視覺基準，不反覆使用 Logo 或山形，避免把演講誤解成 Nuxt 官方或 Nuxt UI 產品介紹。

配色以 `#020420` 深海軍藍、`#00DC82` Nuxt 綠與 `#FFFFFF` 白色為基礎，搭配 slate 中性色階建立次要文字、分隔線與表面層級。violet／blue／yellow／red 只在「重要提示／資訊／警告／錯誤」等對應語意需要時出現；狀態不得只靠顏色區分，必須同時使用文字、圖示、線型、實心或外框。觀眾文字盡量使用自然的繁體中文，只有程式碼、路徑、產品名稱與無法準確翻譯的技術名詞保留英文。

固定的圖解語法如下：

- 封閉框線表示某個模組或角色負責的範圍；框線上具名的對外入口表示 Public API。
- 實線箭頭表示執行期間的資料流；虛線箭頭表示靜態匯入或依賴方向。箭頭旁必須有動詞或資料名稱，避免只靠方向猜測含義。
- 框架整合案例以「框架入口 → Public API → 真正負責應用行為的模組」呈現，明確標出框架與應用程式的整合邊界，不使用 `framework seam` 作為觀眾標題。
- CI 以「自動檢查防線」呈現，直接列出 imports、Public API、型別、build 與測試等實際檢查項目；不與 Public API 共用含義模糊的閘門圖像，也不暗示 CI 能證明業務語意正確。
- 標題旁可依頁面需要放置內容分類標籤；「匿名真實案例」與「合成案例」是其中兩例，不是僅有的兩種標籤。標籤以文字、圖示、實心或外框共同辨識，顏色只作輔助。
- 框架整合案例每次只顯示約 3–6 行必要程式碼，用來證明框架入口、Public API 與負責應用行為之模組的關係；只高亮當頁正在說明的行，其餘設定留給講者備援或 Q&A。

結尾反覆出現並在最後組裝完成的主圖，是不對稱的架構控制迴路：「人制定架構政策，人與 AI 依共同語言實作與審查，AI 可在既定規則內自我修復，CI 守住可機械驗證的結果，只有規則模糊、例外或責任邊界改變時才需要人決定。」圖中不可把人、AI 與 CI 畫成具有相同裁決權的等權圓環，也不可把 CI 畫成能保護全部架構語意的最外層防護罩。

所有頁面以 1920×1080 大螢幕閱讀為準：保持 100–160px 內容邊界、56–80px 頁面標題、32–44px 正文與 22–28px 標籤；一頁只承擔一個主要圖解，避免滿版格線、儀表板密度與大段程式碼。格線只在需要對齊架構圖時局部出現，等寬字只用於程式碼與路徑。

Prototype primary source：branch `prototype/fsd-talk-visual-language`，commit `23c24ddf2c06db0ba411efe2dfab7ee6ff58dd14`。可用 `git show prototype/fsd-talk-visual-language:.scratch/fsd-talk-authoring-brief/prototypes/08-visual-language.html` 取回單檔 HTML。

## Amendment — 2026-08-15

使用者已核准將正式 deck 的 primary accent 修訂為 `#00DABF`；自本 amendment 起，`#00DABF` supersedes `#00DC82`，成為正式 deck 的現行 primary accent。上方 `## Answer` 保留原始決策全文與歷史，其中 `#00DC82` 只代表當時採用的值，不再是現行 contract；其餘視覺語言、semantic colors、圖解 grammar、版面與內容決策均未重開。

## Amendment — 2026-08-15（第二次修訂）

使用者後續核准將正式 deck 的 primary accent 修訂為 `#04ab80`；自本 amendment 起，`#04ab80` supersedes 先前 amendment 的 `#00DABF`，成為正式 deck 的現行 primary accent。`#00DC82` 與 `#00DABF` 均保留為可追溯的決策歷史；其餘視覺語言、semantic colors、圖解 grammar、版面與內容決策均未重開。
