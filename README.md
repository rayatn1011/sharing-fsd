# 一段程式碼，到底該放哪裡？

> 從 Feature-based 到 Feature-Sliced Design

這是我在 [v-taiwan Meetup #5](https://www.facebook.com/share/p/1Gp1GgaGbM/) 使用的演講簡報。

這場演講從前端團隊很常遇到的一個問題開始：新程式碼到底該放哪裡？

專案還小的時候，放在 `components/`、`composables/` 或 `utils/`，看起來都說得通。專案變大之後，資料夾位置就不只是整理檔案，而是在回答：誰負責這段程式碼、誰可以依賴它，以及需求改變時要怎麼調整結構。

這場不是要大家把每個專案都改成 Feature-Sliced Design（FSD），而是借用 FSD 的規則，把原本只能憑經驗判斷的事說清楚、寫成團隊的共同規則，再把可以自動檢查的部分交給工具。

## 內容與來源

FSD 相關內容以 [fsd.how](https://fsd.how/) 與其連結的一手資料為準。

投影片會標明內容屬於`現行官方 guidance`、`匿名真實案例`、`合成案例`、`團隊 policy` 或`講者詮釋`，避免把不同性質的材料混在一起。
