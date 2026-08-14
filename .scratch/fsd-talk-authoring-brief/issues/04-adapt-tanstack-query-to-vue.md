# 把官方 TanStack Query guidance 轉譯為 Vue Query 案例

Type: research
Status: resolved

## Question

FSD 官方以 React Query 為主的 query keys、query factories、request functions、mutations 與 QueryClient placement 建議，哪些可直接套用至 `@tanstack/vue-query`，哪些需要 Vue／Nuxt 特有調整；最能揭露架構邊界的真實風險是什麼？

## Comments

## Answer

研究結論已整理於 [把 FSD 的 TanStack Query guidance 轉譯成 Nuxt／Vue Query 案例](../research/04-vue-query.md)。核心結論是：query factory、cache key、request/mutation ownership 與 App-level QueryClient policy 可沿用；Vue reactive inputs 與 Nuxt SSR request lifecycle 必須另外設計。最適合演講的踩坑是 route param 被 snapshot、SSR QueryClient scope 過長、手寫 keys 分裂 cache，以及直接把 immutable query result 當成表單 draft。
