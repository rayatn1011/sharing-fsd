# 把 FSD 的 TanStack Query guidance 轉譯成 Nuxt／Vue Query 案例

查核日期：2026-08-14

## 研究問題

FSD 官方以 React Query 為主的 query keys、query factories、request functions、mutations 與 QueryClient placement 建議，哪些可直接套用至 `@tanstack/vue-query`，哪些需要 Vue／Nuxt 特有調整；最能揭露架構邊界的真實風險是什麼？

## 結論先行

FSD guidance 的**架構判斷幾乎都能沿用**：用同一份 query factory 維護 cache identity 與 request function、依實際擁有者放置 API code、把 mutation 的流程協調留在使用它的 slice、把全域 QueryClient policy 放在 App 邊界。需要重寫的是**框架接縫**：套件 import、Vue reactive inputs、composable 回傳的 refs，以及 Nuxt SSR 的 plugin／dehydrate／hydrate 生命週期。[FSD 的 TanStack Query 指南](https://fsd.how/docs/guides/tech/with-react-query/)與 [TanStack Vue Query 的 Query Options](https://tanstack.com/query/latest/docs/framework/vue/guides/query-options)共同支持這個切法。

最值得放進演講的主案例不是「React API 換成 Vue API」，而是：

> 同一套 cache contract 必須同時尊重 FSD 的模組邊界、Vue 的 reactive graph，以及 Nuxt 的 request lifecycle。只整理資料夾，三者任一處仍可能失效。

## 哪些可以直接沿用，哪些必須調整

| 主題 | React guidance 的核心 | Vue／Nuxt 轉譯 | 判定 |
| --- | --- | --- | --- |
| Query key hierarchy | 由一個 factory 產生 `all → lists → list`、`details → detail` 等 prefix，讓讀取、prefetch、寫入與 invalidation 共用 cache identity | 結構原封不動；改由 `@tanstack/vue-query` 匯入 `queryOptions` | 直接沿用 |
| `queryOptions` factory | co-locate `queryKey` 與 `queryFn`，並在 `useQuery`、prefetch、`setQueryData` 間共用型別推論 | Vue Query 官方提供同名 helper 與相同用途 | 直接沿用 |
| Request functions | factory 呼叫獨立 request function；HTTP client、generated client 或通用 endpoint 可放 `shared/api` | 與 Vue 無關；單一 slice 專用的 request 留在該 slice 的 `api`，不要為了 TanStack Query 全部搬到 Shared | 直接沿用 |
| Mutation ownership | 不把 query 與 mutation workflow 混成一個全域 hooks 倉庫；底層 `mutationFn` 可共享，失效、導頁、通知等協調靠近使用情境 | `useMutation`／`useQueryClient` API 對等；composable 狀態是 refs，template 會自動 unwrap，script 中則以 ref 使用 | 小幅調整 |
| Mutation keys/state | 穩定的 `mutationKey` 讓其他 UI 用 `useMutationState` 觀察特定操作 | Vue Query 也提供 `mutationOptions` 與 `useMutationState` | 直接沿用 |
| QueryClient | cache policy、全域 error policy、devtools 與 provider 是 app-wide concern | React provider 改為 `VueQueryPlugin`；在 Nuxt 內必須配合 plugin、dehydrate/hydrate 與 SSR request lifecycle | 必須調整 |
| Suspense／error boundary | factory 本身可重用，render boundary 在 App layer | 不可照搬 React 的 `ErrorBoundary + Suspense` 元件；Nuxt/Vue 要使用其 runtime 的 suspense、error 與 server-prefetch 機制 | 必須重做接縫 |

依據：FSD 官方列出 query key 可置於 `shared/api`、按 controller 分區，或在既有 Entities 結構中置於 entity 的 `api` segment；mutation 可在使用處的 `api` segment 編排，或重用 Shared／Entities 的 `mutationFn`。[Usage with TanStack Query](https://fsd.how/docs/guides/tech/with-react-query/) 更一般的 API 指南則明確說：只被一個 page／feature 使用的 request 應留在該 slice，而通用 client、API types、cache keys 與 common options 才適合 Shared。[Handling API Requests](https://fsd.how/docs/guides/examples/api-requests/)

## 建議用在簡報中的 Vue Query factory

以下不是 FSD 官方原碼，而是根據 FSD placement guidance 與 Vue Query reactivity guidance 做的**轉譯範例**：

```ts
// shared/api/post/post.queries.ts
import { queryOptions } from '@tanstack/vue-query'
import { toValue, type MaybeRefOrGetter } from 'vue'

import { getPost, getPosts } from './post.requests'

export const postQueries = {
  all: () => ['posts'] as const,
  lists: () => [...postQueries.all(), 'list'] as const,
  list: (page: MaybeRefOrGetter<number>) =>
    queryOptions({
      queryKey: [...postQueries.lists(), page] as const,
      queryFn: () => getPosts({ page: toValue(page) }),
    }),
  details: () => [...postQueries.all(), 'detail'] as const,
  detail: (id: MaybeRefOrGetter<string | undefined>) =>
    queryOptions({
      queryKey: [...postQueries.details(), id] as const,
      queryFn: () => getPost(toValue(id)!),
      enabled: () => toValue(id) !== undefined,
    }),
}
```

```vue
<!-- FSD page component or page-local composable -->
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'

import { postQueries } from '@/shared/api/post'

const route = useRoute()
const postId = () => route.params.id as string | undefined

const postQuery = useQuery(postQueries.detail(postId))
</script>
```

關鍵不是 `MaybeRefOrGetter` 這個型別本身，而是不要在 composable 邊界過早取值。Vue Query 官方示範：若呼叫端把 `userId.value` 傳成 plain value，之後 ref 改變不會觸發新 query；應把 ref 或 reactive getter 放進 `queryKey`，並在 `queryFn` 用 `toValue` 讀取。[Reactivity](https://tanstack.com/query/latest/docs/framework/vue/reactivity)

這使 factory 多了一個需要人／AI 判斷的設計選擇：

- 若 factory 是純 cache contract，可只接受 plain parameters，呼叫端每次重建 options。
- 若 factory 要支援 route params、props 或 computed inputs，就應在 public API 明確接受 reactive input，不能靠團隊成員「記得不要 `.value`」。
- reactive key 的規則值得放進 Agent skill／範例；它不是 Steiger 能從 FSD layer import graph 推導出的規則。

## Mutation：把「能共享的 request」和「情境協調」拆開

```ts
// shared/api/post/post.mutations.ts
export const updatePost = (input: UpdatePostInput) =>
  apiClient.patch<Post>(`/posts/${input.id}`, input)
```

```ts
// pages/post-edit/api/use-update-post.ts
import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { postQueries, updatePost } from '@/shared/api/post'

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['posts', 'update'],
    mutationFn: updatePost,
    onSuccess: (post) => {
      queryClient.setQueryData(postQueries.detail(post.id).queryKey, post)
      queryClient.invalidateQueries({ queryKey: postQueries.lists() })
    },
  })
}
```

TanStack Vue Query 官方示範 mutation 成功後以同一個 QueryClient invalidation；`useMutationState` 也以 `mutationKey` 篩選全域 mutation cache。[Invalidations from Mutations](https://tanstack.com/query/latest/docs/framework/vue/guides/invalidations-from-mutations) [useMutationState](https://tanstack.com/query/latest/docs/framework/vue/reference/useMutationState)

架構上應再區分：

- `updatePost` 只描述後端操作，可以重用。
- `setQueryData`／`invalidateQueries` 描述這個 app 的 cache consistency，可與使用情境放在同一 slice，或在確有多處重用後抽成 common mutation options。
- 成功後關閉哪個 modal、跳去哪一頁、顯示什麼文案，是 page／feature workflow，不應下沉至 `shared/api`。
- 若把完整 mutation composable 全塞進 Shared，它很快就會需要 router、toast、表單文案或其他 business slice；這是 Shared 向上依賴的前兆。這一點是依 FSD import rule 與上述 mutation placement 推導出的架構判斷，不是 TanStack Query 自身的限制。[Layers and import rule](https://fsd.how/docs/reference/layers/)

## Nuxt 的 QueryClient：App concern，不等於 module singleton

FSD 將 context providers、global store/config 與 framework entrypoint 視為 App layer concern。[Layers — App](https://fsd.how/docs/reference/layers/) 在 Nuxt 裡，對應的 runtime seam 是 `VueQueryPlugin`：官方 Nuxt 3 範例在 Nuxt plugin callback 內建立 `QueryClient`，server render 後 `dehydrate` 到 `useState`，client 端再 `hydrate`。[Vue Query SSR — Nuxt 3](https://tanstack.com/query/latest/docs/framework/vue/guides/ssr)

簡報可以用下面這個責任拆法，但要標示它是**整合建議，不是官方唯一目錄**：

```text
plugins/vue-query.ts                 Nuxt 必須看得到的 runtime adapter
src/app/providers/vue-query.ts       可選：app-wide cache/error/default policy
src/shared/api/...                   HTTP client、共用 request、cache contracts
src/pages/<page>/api/...             page-specific query/mutation orchestration
```

最重要的坑：不要為了「全域只有一個 client」就在 server module scope 建一個 process-wide singleton。TanStack 的 SSR 指南在 request entry 中建立 fresh QueryClient；Nuxt 3 範例也在 plugin callback 裡建立並做 hydration。由此可推論，共用 singleton 可能讓不同 SSR requests 共用 cache，造成資料交叉污染；這是安全與正確性風險，不只是檔案放錯位置。[Vue Query SSR](https://tanstack.com/query/latest/docs/framework/vue/guides/ssr)

這也呼應 Nuxt routing 整合的同一原則：**框架要求檔案位於特定掃描位置時，保留一個薄 adapter；不要為了讓樹狀目錄「長得像 FSD」而破壞 runtime contract。**

## 最能揭露架構邊界的踩坑

### 1. Route param 被 snapshot，網址變了但 query 不變

錯誤不是 query key 少一層，而是 `.value`／property access 在 composable boundary 把 reactive source 變成 plain snapshot。Nuxt 在相同 page component instance 中切換參數時尤其容易暴露。修正是把 getter/ref 傳到 factory，並把它保留在 key 中。[Vue Query Reactivity](https://tanstack.com/query/latest/docs/framework/vue/reactivity)

### 2. SSR QueryClient 活太久

瀏覽器中的 singleton 是「同一使用者的一個 app cache」；server process 中的 singleton 可能變成「多個 request 共用 cache」。同一個檔案、同一句 `new QueryClient()`，放在 module scope 或 request/app scope 的語意完全不同。[Vue Query SSR](https://tanstack.com/query/latest/docs/framework/vue/guides/ssr)

### 3. 相同 endpoint 有多套手寫 key

`['posts', id]`、`['post', id]`、`['posts', 'detail', id]` 會成為不同 cache entries；mutation invalidation 看似成功，UI 卻仍顯示舊資料。Query factory 的價值是讓人與 AI 都從同一 public API 取得 key，而不是少打幾個字。[FSD Query Factory Benefits](https://fsd.how/docs/guides/tech/with-react-query/) [TanStack Query Options](https://tanstack.com/query/latest/docs/framework/vue/guides/query-options)

### 4. 把 server-state result 直接當表單 model

Vue Query 官方明確說 query results 是 immutable；直接把結果交給雙向 `v-model` 不會形成安全的 edit buffer，應建立可變副本並在 submit 時 mutation。[Vue Query Reactivity — Immutability](https://tanstack.com/query/latest/docs/framework/vue/reactivity) 這可與 Nuxt UI form 案例連動：Query 擁有 server state，表單 slice 擁有尚未提交的 draft state；兩者不能因為都出現在同一頁就混成一個 Shared form abstraction。

### 5. 按後端 endpoint 自動建立 Entity

FSD 的 TanStack Query 頁面允許 query factory 置於 Entities，但一般 API 指南同時警告不要因 response shape 就過早建立 Entity；single-slice request 可留在該 slice，CRUD 與 generated client 也可留在 Shared。[Handling API Requests](https://fsd.how/docs/guides/examples/api-requests/) [Excessive Entities](https://fsd.how/docs/guides/issues/excessive-entities/) 因此「TanStack Query 放 entities」不是固定答案，必須先證明 frontend domain boundary 與重用需求。

## 適合演講的判斷／保護分工

### 人或 AI Agent 必須判斷

- 這份 query/mutation contract 是 page-local、跨頁共用 API，還是穩定的 frontend entity boundary。
- mutation 的哪些 side effects 屬於 cache consistency，哪些屬於特定 user flow。
- public API 是否應接受 plain value，還是明確支援 `MaybeRefOrGetter`。
- Nuxt runtime adapter 與 FSD module 的責任切點。
- SSR、client-only 與 hydration 的 QueryClient lifecycle。

### 靜態檢查／CI 能保護

- layer import direction、同層跨 slice imports、繞過 slice public API 等 FSD 結構規則可交給 Steiger 與既有 lint/build checks。
- TypeScript 可保護 factory 的 key/data inference，以及 mutation variables/data types。
- 測試可固定 key hierarchy、mutation invalidation 與 SSR hydration 行為。

### 不能期待 Steiger 自動判斷

- query key 是否語意一致。
- route param 是否被過早 unref。
- QueryClient 是否在正確 request scope 建立。
- cache data 是否被當作表單 draft 直接修改。
- 一個 endpoint 是否真的值得形成 Entity。

這正是此案例對演講主張的價值：**FSD 提供可共享的責任語言，Steiger 保護其中可機械化的邊界，而框架 reactivity、SSR lifecycle 與產品 workflow 仍需要寫進團隊準則與 Agent skill。**

## 可濃縮成投影片的三句話

1. Query factory 統一的不只是 keys，而是人與 AI 都能找到的 cache contract。
2. Vue 版不是換 package name：reactive input 若在邊界被 snapshot，架構看起來正確，資料流仍然錯。
3. QueryClient 屬於 App，但 Nuxt SSR 的「App」是每次 request 的 app instance，不是整個 server process。

## 一手來源

- [Feature-Sliced Design — Usage with TanStack Query](https://fsd.how/docs/guides/tech/with-react-query/)
- [Feature-Sliced Design — Handling API Requests](https://fsd.how/docs/guides/examples/api-requests/)
- [Feature-Sliced Design — Layers](https://fsd.how/docs/reference/layers/)
- [Feature-Sliced Design — Excessive Entities](https://fsd.how/docs/guides/issues/excessive-entities/)
- [TanStack Vue Query — Query Options](https://tanstack.com/query/latest/docs/framework/vue/guides/query-options)
- [TanStack Vue Query — Reactivity](https://tanstack.com/query/latest/docs/framework/vue/reactivity)
- [TanStack Vue Query — SSR](https://tanstack.com/query/latest/docs/framework/vue/guides/ssr)
- [TanStack Vue Query — Invalidations from Mutations](https://tanstack.com/query/latest/docs/framework/vue/guides/invalidations-from-mutations)
- [TanStack Vue Query — `useMutationState`](https://tanstack.com/query/latest/docs/framework/vue/reference/useMutationState)
- [TanStack Vue Query — `mutationOptions`](https://tanstack.com/query/latest/docs/framework/vue/reference/mutationOptions)
