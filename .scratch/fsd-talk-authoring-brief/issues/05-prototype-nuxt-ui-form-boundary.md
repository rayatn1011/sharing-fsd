# 設計 Nuxt UI 表單的邊界壓力測試

Type: prototype
Status: resolved
Blocked by: 01

## Question

哪一個粗略的 Nuxt UI 表單案例，最能讓聽眾看出 `shared/ui`、真正通用的 `shared/lib`，以及同一 page 或 feature slice 內 `ui`、`model`、`lib` 的分界，同時避免演變成 Nuxt UI 教學或過早建立 `shared/form`？

## Comments

## Answer

選擇 guided probe B「第二個非表單 consumer」作為演講中的 Nuxt UI 表單邊界案例。最有力的轉折不是表單 API 或目錄長相，而是第二個使用情境出現時：若共用抽象同時擁有 UI control、form adapter 與 server-data owner，非表單畫面就只能建立假表單，或繼續加入 `standalone`、`hideError`、`sourceMode` 等例外；若責任已分開，第二個 consumer 只重用受控 UI control，並自行組合 URL state 與自己的資料來源。

公開敘事保留以下邊界：

- 匿名真實事實只有「團隊曾把 UI control、form adapter 與特定 backend data source 合成共用元件，導致 control 無法脫離 form 使用，也難以替換資料來源」。成員選擇器、設定表單與動態牆篩選器都必須標為合成探針。
- 第二個 consumer 出現後，已證明可重用的受控 control 才適合成為 `shared/ui` 候選；它只接受 options、value、loading 與互動事件，不知道 Nuxt UI form、Vue Query 或 endpoint。
- `shared/lib` 只容納已證明跨情境通用、且不含 member、form、route 或 query policy 的純能力，例如 debounce；不得藉此建立另一個 `shared/form`。
- 原表單所在 page／feature slice 繼續由 `ui` 接 Nuxt UI field error、`model` 擁有 draft 與 validation、`api` 擁有 Vue Query server state、`lib` 進行該 slice 專用的 response-to-options mapping。
- Vue Query result 是可被 refresh 取代的 server snapshot；Nuxt UI form draft 是獨立的可變 edit buffer。兩者的界線用來補充 ownership，但不搶走「第二個 consumer」這個主要轉折。

Prototype primary source：branch `prototype/nuxt-ui-form-boundary`，commit `059326be75e53b39500b4496a9301a9963e41c04`。可用 `git show prototype/nuxt-ui-form-boundary:.scratch/fsd-talk-authoring-brief/prototypes/05-nuxt-ui-form-boundary.html` 取回單檔 HTML。
