# Nuxt file-based routing 與 FSD 的現行整合方式

> **Fixture verification update (2026-08-14):** Ticket「驗證 Nuxt 4 整合 fixture」已用 Nuxt 4.5.2 實測下方 integration seam。設定可採用，但先前草圖中的 `src/app/app.vue` 推論已被否決；source-root app component 應為 `src/app.vue`。精確版本、通過指令與產物證據見 [Nuxt 4 整合 fixture 驗證](./10-nuxt4-fixture-verification.md)。

研究日期：2026-08-14

版本基準：Nuxt 官方文件 v4.5.2；FSD 官網目前公開的 NuxtJS guide（FSD v2.1 文件站）

## 結論先行

Nuxt 與 FSD 的衝突不是「兩邊都有一個叫 `pages` 的資料夾」這麼簡單，而是同一個名稱背後有兩種責任：

- Nuxt 的 pages directory 是 **framework-owned route manifest**：檔名決定 URL、巢狀關係與 dynamic params，page component 也承載 `definePageMeta` 等 Nuxt 編譯期資訊。[Nuxt routing](https://nuxt.com/docs/4.x/getting-started/routing/)、[Nuxt pages](https://nuxt.com/docs/4.x/directory-structure/app/pages)
- FSD 的 Pages layer 是 **application-owned page modules**：一個 slice 可以包含畫面、狀態、API 與頁面內規則，並以 Public API 暴露整合點。[FSD NuxtJS guide](https://fsd.how/docs/guides/tech/with-nuxtjs/)、[FSD Public API](https://fsd.how/docs/reference/public-api/)

可落地的分工是：**保留很薄的 Nuxt route entry，讓它透過 Public API 組裝 FSD page slice。** Route entry 擁有 URL 與 Nuxt-specific metadata；FSD page slice 擁有可測試的頁面內容與業務責任。這是 adapter seam，不是重複兩份 page。

FSD 官網的原則仍可採用，但其中的設定範例帶有 Nuxt 3 時期的目錄與 alias 假設，不能原樣貼進 Nuxt 4。Nuxt 4 已把預設 app source directory 改為 `app/`，`@`／`~` 也會指向該 source directory；整合時應先鎖定 Nuxt major version，再決定實際路徑。[Nuxt 4 upgrade guide](https://nuxt.com/docs/4.x/getting-started/upgrade)、[Nuxt configuration](https://nuxt.com/docs/4.x/api/nuxt-config)

## 目前兩份官方文件各自保證什麼

### FSD 官網的現行建議

[FSD 的 NuxtJS guide](https://fsd.how/docs/guides/tech/with-nuxtjs/) 明確提出：

1. 把 FSD layers 放進 `src/`。
2. FSD `pages` 保留給 flat slice structure。
3. 路由可選擇 `router.options.ts` 設定或 file-based routing。
4. 使用 file-based routing 時，把 Nuxt 掃描目錄指向 `src/app/routes`；route file 再從 `src/pages/<slice>/index.ts` 匯入 page component。
5. layouts 可以放在 App layer，並把 Nuxt 的 layouts directory 指向 `src/app/layouts`。

這個方向符合 FSD 的 layer import rule：App 可以組裝 Pages，route adapter 不必也不應把實作細節深層匯入。FSD 對 Public API 的定義是 module group 與 consumer 之間的 contract；外部只取得必要出口，內部重構不應外洩。[FSD Public API](https://fsd.how/docs/reference/public-api/)

### Nuxt 4 的現行行為

Nuxt 4.5.2 的官方文件與 source 顯示：

- `srcDir` 預設為 `app`；Nuxt 3 compatibility behavior 則是 `.`。Nuxt 4 的標準 file-based routes 與 layouts 因而位於 `app/pages`、`app/layouts`。[Nuxt configuration: `srcDir` and `dir`](https://nuxt.com/docs/4.x/api/nuxt-config)、[Nuxt directory structure](https://nuxt.com/docs/4.x/directory-structure/)
- `dir.pages` 與 `dir.layouts` 可覆寫；Nuxt 官方也提醒除非有需要，否則優先保留 defaults。本案確實有名稱／責任衝突，因此屬於合理覆寫。[Nuxt configuration: `dir`](https://nuxt.com/docs/4.x/api/nuxt-config#dir)
- `@`、`~` 指向 app source directory；`@@`、`~~` 指向 project root。Custom aliases 會加入 Nuxt 產生的 TypeScript configs，官方範例使用 `fileURLToPath(new URL(..., import.meta.url))` 產生絕對路徑。[Nuxt configuration: `alias`](https://nuxt.com/docs/4.x/api/nuxt-config#alias)
- Nuxt source 會把 `srcDir` 與 pages directory 合成掃描位置，也會以 `srcDir + dir.app + router.options` 尋找 router options；alias resolver 則把 `@`／`~` 設成 resolved `srcDir`。[Nuxt config source](https://github.com/nuxt/nuxt/blob/main/packages/schema/src/config/common.ts)、[Nuxt pages module source](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/module.ts)
- pages directory 是 optional；存在非空 pages directory、明確開啟 pages，或提供 router options 時才啟用 page-based routing。[Nuxt pages](https://nuxt.com/docs/4.x/directory-structure/app/pages)、[Nuxt pages module source](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/module.ts)

## Nuxt 4 建議落地形狀

以下是根據兩份官方文件整理出的 **Nuxt 4 adaptation**，不是 FSD 官網逐字提供的 snippet：

```text
src/
  app/                       # FSD App layer + Nuxt integration seam
    app.vue
    router.options.ts        # 只有需要 custom router config 才建立
    routes/                  # Nuxt file-based route entries
      index.vue
      products/
        [id].vue
    layouts/                 # Nuxt-scanned, app-wide route layouts
      default.vue
  pages/                     # FSD Pages layer
    home/
      ui/home-page.vue
      index.ts
    product-details/
      ui/product-details-page.vue
      index.ts
  features/
  entities/
  shared/
nuxt.config.ts
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: 'src/',
  dir: {
    app: 'app',
    pages: 'app/routes',
    layouts: 'app/layouts',
  },
})
```

這個版本不需要覆寫 `@`：Nuxt 4 會讓 `@`／`~` 跟著 resolved `srcDir`，因此 `@/pages/home` 指向 `src/pages/home`。`dir.app: 'app'` 讓 `app.vue`／`router.options.ts` 留在 FSD App layer；`dir.pages` 與 `dir.layouts` 則把 framework scanner 對準 App layer 裡的 integration segments。這項組合應在實際 Nuxt minor version 用最小 fixture 跑 `nuxt prepare`、typecheck 與 build，因為它是跨兩套官方建議推導出的版本化設定，不是 FSD guide 已更新完成的 Nuxt 4 recipe。

如果團隊不想改 `srcDir`，另一個安全策略是保留 Nuxt 4 defaults，另設一個**不覆寫 Nuxt 內建符號**的 custom alias（例如 `#fsd`）指向 FSD root。但這會偏離 FSD 常見的 `@/pages/...` 書寫方式，且資料夾形狀需另外由團隊明訂；它是 project convention，不是 FSD 官方指定解。

## Route entry 與 FSD Page 的界線

```vue
<!-- src/app/routes/index.vue -->
<script setup lang="ts">
import { HomePage } from '@/pages/home'

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <HomePage />
</template>
```

```ts
// src/pages/home/index.ts
export { default as HomePage } from './ui/home-page.vue'
```

### Route entry 應保留

- file path、dynamic params、nested route outlet 等 Nuxt 路由契約。
- `definePageMeta`、route middleware、layout selection 等由 Nuxt scanner／compiler 讀取的框架 metadata。
- 將 route props／params 轉成 FSD page module 所需輸入的薄 adapter。

### FSD Page slice 應擁有

- page UI composition。
- 只屬於這個頁面的 state、query orchestration、validation 與 business rules。
- 對下層 features、entities、shared 的組裝。
- 對外的明確 Public API；route 不應深層 import `ui/home-page.vue`。

Nuxt 的 custom routing 文件另有一個容易踩到的差異：若在 `router.options.ts` 的 `routes` function **回傳全新的 route records**，Nuxt 不會自動把 component 內 `definePageMeta` 的 metadata 補到那些 routes；需要 metadata augmentation 時，官方建議改用 build-time `pages:extend` hook。[Nuxt custom routing](https://nuxt.com/docs/4.x/guide/recipes/custom-routing)

因此，若沒有非用 programmatic routes 不可的需求，這場演講應優先展示 file-based thin adapter。它保留 Nuxt 的 convention、typed route 與 page-meta pipeline，又把業務頁面邊界交還 FSD。

## Layouts 不是一律放 Shared

Nuxt layouts 是 framework-scanned components；要啟用它們，`app.vue` 通常以 `<NuxtLayout><NuxtPage /></NuxtLayout>` 組裝，page 可用 `definePageMeta({ layout: 'admin' })` 選擇 layout。只有一個全域 layout 時，Nuxt 官方建議直接使用 `app.vue`。[Nuxt layouts](https://nuxt.com/docs/4.x/directory-structure/app/layouts)、[Nuxt app.vue](https://nuxt.com/docs/4.x/directory-structure/app/app)

FSD 的判斷則依 scope 與 responsibility，不依「它看起來像 layout」：

- 全應用或 routing structure 的 layout → `app`。
- 特定 page／route group 的 layout → `pages`。
- 無 business context、可重用的純 UI shell → `shared/ui`。
- 跨頁重用且以特定 user action／flow 為中心 → 對應 `features` slice。

若 Nuxt 必須掃描 `src/app/layouts/*.vue`，但可重用骨架其實屬於 `shared/ui`，Nuxt layout file 可以維持為 App-layer adapter，透過 slots 或 props 組裝 lower-layer UI；`shared` 不能反向 import `features`、`pages` 或 `app`。[FSD Page Layouts](https://fsd.how/docs/guides/examples/page-layout/)

## 已確認的 stale／conflicting guidance

| Guidance | 問題 | 演講與 authoring brief 應如何處理 |
| --- | --- | --- |
| Repo 內 `references/framework-integration.md` 標為「Nuxt 3」，示意 root `pages/` + `src/pages/` | Nuxt 4 預設已是 `app/pages`，其 `@` 也預設指向 `app`；此結構不是當前 Nuxt 4 default | 只能作歷史／Nuxt 3 變體，不可標成通用現況 |
| Repo reference 要求為每個 FSD layer 建 runtime alias | Nuxt config 的 `alias` 本身會進 generated TS configs；設定 `srcDir: 'src/'` 後，單一 `@` 已可覆蓋所有 layers | 不要教聽眾維護六組重複 aliases；除非專案刻意需要 layer-specific names |
| FSD 官網用 `alias: { '@': '../src' }` | Nuxt 4 已有 `@`／`~` 的 source-dir 語意；相對 custom alias 也不如 Nuxt 官方 `fileURLToPath(new URL(...))` 範例明確。`../src` 從一般 project root 看更可能指向專案外 | 保留其「需要一致 alias」的意圖，不複製該字串；Nuxt 4 優先以 `srcDir` 取得 `@ -> src` |
| FSD 官網 routing-config 段落交替寫 `router.options.ts`、`router.config.ts`，範例 import `@/pages/home.vue` | Nuxt 官方檔名是 `app/router.options.ts`；而同頁建立的是 `src/pages/home/index.ts`，並不存在 `src/pages/home.vue` | 視為文件 typo／示例不一致；正式材料使用 `router.options.ts`，component 從 `@/pages/home` Public API 匯入 |
| Repo reference 說「Nuxt requires explicit runtime aliases in addition to tsconfig paths」 | 現行 Nuxt docs 說 custom aliases 會自動加入 generated TypeScript configs | 改說「讓 Nuxt config 成為 runtime + generated TS alias 的單一來源」，避免手動雙份 drift |
| 把 layouts 全放 `app` | 對 framework scanner 是合理 integration point，但不代表所有 layout abstraction 都是 App responsibility | 用 scope 判斷；Nuxt-scanned file 可以只是 adapter，真正 layout UI 可在 `pages` 或 `shared/ui` |

## 最值得轉化成演講的踩坑案例

### 案例一：同名資料夾不代表同一個概念

表面症狀是 `pages` 撞名；真正問題是團隊沒有先說清楚「誰擁有 URL contract、誰擁有 page behavior」。若直接把所有內容塞回 Nuxt routes，FSD Pages layer 消失；若硬把 FSD slice 當 Nuxt route，檔名與 slice topology 又被 router convention 綁死。

可帶出的架構觀念：**先定 responsibility，再做 framework adapter。**

### 案例二：照貼官方 snippet 仍會錯

FSD 官網提供的是方法論整合方向，但 Nuxt major version 改變了 `srcDir`、default directories 與 aliases。甚至 FSD 同頁內已有 `router.options.ts`／`router.config.ts` 與 `home/index.ts`／`home.vue` 的不一致。

可帶出的落地觀念：**方法論文件、framework 文件、實際 version 必須三方校準；Agent skill 也要記錄 version-sensitive seam，而不是只背資料夾樹。**

### 案例三：Public API 不只是美觀的 barrel

Route adapter 若 import `@/pages/home/ui/home-page.vue`，framework integration 已穿透 slice boundary。將來 page UI 拆分、改 SSR/client boundary，所有 route entries 都會一起承受。透過 `@/pages/home` 只暴露 `HomePage`，reviewer 能立刻看出 route 只在接線；Steiger／CI 也可檢查 bypassed Public API。[FSD Public API](https://fsd.how/docs/reference/public-api/)

可帶出的 review 觀念：**薄 route adapter + Public API 讓人與 AI 都能以較少上下文驗證責任。**

### 案例四：可機械驗證與仍需判斷的界線

- 可由 tooling／CI 保護：layer import direction、slice Public API bypass、Nuxt build／type generation、route file 是否可被掃描。
- 仍需人或 AI 判斷：一段 layout 究竟是 app-wide、page-specific、business-free shell，還是 reusable user flow；route adapter 是否已混入業務 orchestration。

可帶出的核心主張：**架構方法落地不是把所有判斷交給 linter，而是把能檢查的規則交給 CI，把其餘判斷寫成共享語言與 review criteria。**

## Authoring brief 可直接採用的說法

> Nuxt 的 page 是一個路由入口；FSD 的 Page 是一個應用模組。兩者不必搶同一個資料夾，也不該被誤認為同一個責任。讓 Nuxt entry 保持薄、透過 Public API 接上 FSD Page，再把 version-sensitive 的目錄設定交給 Nuxt build 驗證。

需要避免的過度宣稱：

- 不要說 FSD 官網的 Nuxt snippet 已完整更新到 Nuxt 4。
- 不要說 `src/app/routes` 是 Nuxt 官方預設；它是 FSD integration 的 custom directory。
- 不要說 layout 一律屬於 App 或 Shared。
- 不要說 route entry 必須零程式碼；它仍可擁有 Nuxt metadata 與參數轉接，但不應擁有頁面業務流程。

## Primary sources

- [FSD: Usage with NuxtJS](https://fsd.how/docs/guides/tech/with-nuxtjs/)
- [FSD: Public API](https://fsd.how/docs/reference/public-api/)
- [FSD: Page Layouts](https://fsd.how/docs/guides/examples/page-layout/)
- [Nuxt 4: Directory Structure](https://nuxt.com/docs/4.x/directory-structure/)
- [Nuxt 4: Pages](https://nuxt.com/docs/4.x/directory-structure/app/pages)
- [Nuxt 4: Layouts](https://nuxt.com/docs/4.x/directory-structure/app/layouts)
- [Nuxt 4: Configuration (`alias`, `dir`, `srcDir`)](https://nuxt.com/docs/4.x/api/nuxt-config)
- [Nuxt 4: Custom Routing](https://nuxt.com/docs/4.x/guide/recipes/custom-routing)
- [Nuxt source: configuration resolvers](https://github.com/nuxt/nuxt/blob/main/packages/schema/src/config/common.ts)
- [Nuxt source: pages module](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/module.ts)
