# 驗證 Nuxt file-based routing 與 FSD 的現行整合方式

Type: research
Status: resolved

## Question

現行 FSD 與 Nuxt 第一方文件如何處理 Nuxt file-based routes、FSD `pages` layer、layouts、aliases 與 Public API 的責任衝突；哪些是目前建議、哪些可能受 Nuxt 版本影響，最值得轉化成踩坑案例的是什麼？

## Comments

## Answer

已核對現行 FSD 與 Nuxt 4 第一方文件：保留 Nuxt route entry 作為 framework adapter，透過 Public API 接上 FSD Page；Nuxt 4 的 `srcDir`、`app/pages`、aliases 與 layouts defaults 使 FSD 官網及 repo 內 Nuxt 3 範例不能原樣沿用。完整的版本差異、建議結構、layout 邊界與踩坑素材見 [研究筆記：Nuxt file-based routing 與 FSD 的現行整合方式](../research/03-nuxt-routing.md)。
