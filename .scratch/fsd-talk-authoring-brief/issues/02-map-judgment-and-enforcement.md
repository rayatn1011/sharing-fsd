# 劃分人與 AI 的架構判斷和 Steiger 的保護範圍

Type: research
Status: resolved

## Question

依現行 FSD 與 Steiger 的第一方文件，哪些架構規則能由 Steiger 或一般 CI 檢查可靠地機械驗證，哪些仍需人或 AI 理解業務語意與脈絡；演講應如何避免把建議誤說成 linter 保證？

## Comments

## Answer

結論是把 FSD 落地拆成兩套互補系統：人制定政策並作最終裁決，人與 AI 依共同的 Skill／架構文件判斷 layer、slice、資料所有權與例外；Steiger／CI 只負責目錄、靜態 import、Public API、型別、build 與測試等可重現檢查。Steiger recommended config 雖會把啟用規則設成 error，但 `excessive-slicing`、`shared-lib-grouping` 等規則明載任意門檻，其他規則也含「通常」或英文命名假設，因此 severity 必須視為團隊 policy，不可把 diagnostic 說成架構語意的證明。

完整規則分類、Vue／Nuxt caveat、版本限制、CI 分工與演講安全措辭見[研究筆記](../research/02-judgment-and-enforcement.md)。
