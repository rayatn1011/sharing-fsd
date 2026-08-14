# Nuxt 4 整合 fixture 驗證

驗證日期：2026-08-14

## 結論先行

Nuxt `4.5.2` 實測足以支持演講採用以下接縫：`srcDir: 'src/'`，再以 `dir.app: 'app'`、`dir.pages: 'app/routes'`、`dir.layouts: 'app/layouts'` 把 Nuxt-scanned route 與 layout 放進 FSD App layer；route entry 只保留 Nuxt metadata 與轉接，並透過 `@/pages/<slice>` Public API 組裝 FSD Page。

這份設定在完全相同的 source seam 下通過明確執行的 `nuxt prepare`、`nuxt typecheck` 與 production `nuxt build`。產物也確認：

- generated TypeScript config 將內建 `@/*` 映射為 `../src/*`，不需要另寫 custom alias；
- production manifest 收錄 `app/routes/index.vue` 與 `app/layouts/default.vue`；
- generated layout type 指向 `src/app/layouts/default.vue`；
- route server chunk 同時包含 Nuxt route adapter 與由 FSD Page Public API 帶入的 `src/pages/home/ui/home-page.vue`。

有一項必須修正的版本問題與 Nuxt config 無關：`vue-tsc 3.3.9` 仍以 `require.resolve('typescript/lib/tsc')` 啟動；TypeScript `7.0.2` 的 package `exports` 不再公開該 subpath，因此第一次 typecheck 失敗。保留全部 Nuxt/FSD seam，只將 TypeScript pin 到 `6.0.3` 後三個 required commands 全數通過。

另需修正前一份研究中的目錄推論：`dir.app` 是 Nuxt app integration files 的 prefix，不會把 source-root `app.vue` 一併搬進該目錄。使用 custom `srcDir: 'src/'` 時，本 fixture 採用 `src/app.vue`；`src/app/app.vue` 不應作為演講範例。

## 官方基準

- Context7 解析 Nuxt 4 文件為 `/websites/nuxt_4_x`，查詢 `srcDir`／`dir.*`／aliases 與 CLI commands。
- [`srcDir` 與 `dir` config reference](https://nuxt.com/docs/4.x/api/nuxt-config)：相對 `srcDir` 由 `rootDir` 解析；`dir.pages`／`dir.layouts` 是可覆寫的 framework-scanned directories；custom aliases 會進 generated TypeScript configs。
- [Nuxt 4 upgrade guide](https://nuxt.com/docs/4.x/getting-started/upgrade)：Nuxt 4 預設 `srcDir` 是 `app/`，`@`／`~` 跟著 source directory，`dir.app` 用於 `router.options.ts` 與其他 app integration files。
- [Nuxt pages](https://nuxt.com/docs/4.x/directory-structure/app/pages) 與 [layouts](https://nuxt.com/docs/4.x/directory-structure/app/layouts)：pages 是 file-based route manifest；layout 需由 `app.vue` 的 `<NuxtLayout>` 組裝。
- [Nuxt prepare](https://nuxt.com/docs/4.x/api/commands/prepare)、[TypeScript/typecheck](https://nuxt.com/docs/4.x/guide/concepts/typescript)、[build](https://nuxt.com/docs/4.x/api/commands/build)：分別產生 `.nuxt` types、以 `vue-tsc`／TypeScript 檢查、建立 production output。
- `pnpm view nuxt version` 於 2026-08-14 回傳 `4.5.2`；fixture 因而精確 pin `nuxt: 4.5.2`，不使用 `latest` 或 range。

Nuxt docs 的 4.x 頁面在驗證時顯示 `v4.5.1`，而 npm registry 的 `nuxt` latest 是 `4.5.2`。本結論因此把公開 config API 視為 4.x guidance，再以實際安裝的 `4.5.2` fixture 驗證，不把 docs navbar 的 patch label 當成已執行版本。

## 精確環境與 packages

Repo 無 `.node-version` 或 `.nvmrc`，故依專案規則沒有執行 `fnm use`。

```text
Node.js      v24.16.0
pnpm         10.27.0
packageManager pnpm@10.27.0
Nuxt         4.5.2
TypeScript   6.0.3
vue-tsc      3.3.9
Nitro        2.13.4  (Nuxt build banner)
Vite         8.2.1   (Nuxt build banner)
Vue          3.5.41  (Nuxt build banner)
Vue Router   5.2.0   (Nuxt dependency tree)
```

Fixture 是 `mktemp -d /tmp/nuxt4-fsd-fixture.XXXXXX` 建立的 `/tmp/nuxt4-fsd-fixture.n7QRiO`。該目錄、lockfile、`.nuxt`、`.output` 與 `node_modules` 都不提交。

## Fixture tree

```text
nuxt4-fsd-fixture.n7QRiO/
├── nuxt.config.ts
├── package.json
├── pnpm-lock.yaml              # 暫存，未提交
├── tsconfig.json
└── src/
    ├── app.vue                 # source-root Nuxt app adapter
    ├── app/                    # FSD App layer + Nuxt scanning seam
    │   ├── layouts/
    │   │   └── default.vue
    │   └── routes/
    │       └── index.vue
    └── pages/                  # FSD Pages layer
        └── home/
            ├── index.ts        # slice Public API
            └── ui/
                └── home-page.vue
```

## 最終 config 與關鍵 source

採用的 `nuxt.config.ts`：

```ts
export default defineNuxtConfig({
  srcDir: 'src/',
  dir: {
    app: 'app',
    pages: 'app/routes',
    layouts: 'app/layouts',
  },
})
```

`src/app.vue`：

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

Nuxt-scanned thin route adapter `src/app/routes/index.vue`：

```vue
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

FSD Page Public API `src/pages/home/index.ts`：

```ts
export { default as HomePage } from './ui/home-page.vue'
```

Nuxt-scanned layout `src/app/layouts/default.vue` 以 `data-fixture-layout="default"` 作產物 marker；FSD page UI 以 `data-fsd-page="home"` 作 marker。這些 marker 都出現在 production chunks。

最終 `package.json` 的驗證 scripts 與直接 dev dependencies：

```json
{
  "packageManager": "pnpm@10.27.0",
  "scripts": {
    "prepare": "nuxt prepare",
    "typecheck": "nuxt typecheck",
    "build": "nuxt build"
  },
  "devDependencies": {
    "nuxt": "4.5.2",
    "typescript": "6.0.3",
    "vue-tsc": "3.3.9"
  }
}
```

`tsconfig.json` 只 extends generated config：

```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

## Commands 與結果

### 建立與安裝

```bash
mktemp -d /tmp/nuxt4-fsd-fixture.XXXXXX
pnpm view nuxt version
# 4.5.2

pnpm install --frozen-lockfile=false
```

首次安裝使用精確 packages `nuxt 4.5.2`、`typescript 7.0.2`、`vue-tsc 3.3.9`；pnpm lifecycle 自動執行一次 `nuxt prepare` 並成功。pnpm 顯示 `esbuild@0.28.2` build script 被 ignored，但後續 production client/server build 均成功，因此未執行 `pnpm approve-builds`。

### 第一次 required run

```bash
pnpm prepare
# PASS — Types generated in .nuxt.

pnpm typecheck
# FAIL — ERR_PACKAGE_PATH_NOT_EXPORTED:
# Package subpath './lib/tsc' is not defined by "exports" in typescript/package.json
```

原因證據：

- `vue-tsc@3.3.9/index.js` 的 `resolveTscPath` default 直接呼叫 `require.resolve('typescript/lib/tsc')`。
- `pnpm view typescript@7.0.2 exports --json` 有明確 exports allowlist，但沒有 `./lib/tsc`。
- `pnpm view typescript@6.0.3 exports --json` 沒有 exports field，因此同一 subpath 仍可解析。
- `vue-tsc@3.3.9` peer range 只寫 `typescript >=5.0.0`，沒有上限；把這個 range 解讀為已驗證 TypeScript 7 相容是不安全的推論。

### 最小修正與重跑

唯一修正：`typescript: 7.0.2` → `typescript: 6.0.3`。沒有修改 `srcDir`、`dir.*`、route adapter、layout、alias import 或 FSD Public API。

```bash
pnpm install --frozen-lockfile=false
pnpm prepare
# PASS — exit 0

pnpm typecheck
# PASS — exit 0

pnpm build
# PASS — exit 0
# Nuxt 4.5.2 / Nitro 2.13.4 / Vite 8.2.1 / Vue 3.5.41
# Client built; Server built; Nitro node-server output complete.
```

Build 另有一則 Rollup 對 Nuxt server bundle annotation 位置的 informational warning；Rollup 自動移除 comment，build 仍是 exit 0，與 fixture seam 無關。

### 產物查核

```bash
sed -n '58,74p' .nuxt/tsconfig.app.json
# "@": ["../src"]
# "@/*": ["../src/*"]

rg -n 'app/routes/index|app/layouts/default|data-fixture-layout|data-fsd-page' .nuxt .output
# .nuxt/types/layouts.d.ts -> src/app/layouts/default.vue
# production precomputed manifest -> app/layouts/default.vue + app/routes/index.vue
# layout chunk -> data-fixture-layout="default"
# route chunk -> src/pages/home/ui/home-page.vue + data-fsd-page="home"
```

## 採用、否決與 inference

### 採用

- 採用上述 `srcDir` + `dir.app/pages/layouts` config，鎖定驗證版本 Nuxt `4.5.2`。
- 採用 `src/app.vue` 作 source-root Nuxt adapter；`src/app/routes` 與 `src/app/layouts` 作 FSD App layer 裡的 framework scanning seam。
- 採用 Nuxt 內建 `@`，讓 `@/pages/home` 走 FSD slice Public API；不另設 `alias` 或手寫 tsconfig paths。
- 演講可安全展示「Nuxt Page 是 route adapter，FSD Page 是 application module」，並以 prepare/typecheck/build 作 version-sensitive seam 的 CI 證據。

### 否決

- 否決 Nuxt 3 式 root `pages/` + FSD `src/pages/` 範例作為 Nuxt 4 的通用現況。
- 否決為每個 FSD layer 重複宣告 Nuxt runtime alias；本 fixture 的 generated config 已證明內建 `@` 跟隨 custom `srcDir`。
- 否決把 `app.vue` 寫成 `src/app/app.vue`；`dir.app` 不等於 app component root。
- 否決 `typescript 7.0.2` + `vue-tsc 3.3.9` 組合；至少在此次精確版本與 Node 環境下會於 typecheck 啟動前失敗。

### 明確標示的 inference

- Build artifacts 證明 scanner、resolver、Public API module graph 與 production compiler 一致；這足以支撐演講的 architecture seam，但不是完整 production app 的 runtime／SSR／deployment certification。
- TypeScript `6.0.3` 是此次最小可行 pin，不代表所有 Nuxt 4.5.2 專案都必須固定該版本；之後若 `vue-tsc` 更新 TypeScript 7 支援，應重跑同一 fixture 再調整。
- 本 ticket 沒有產生新的 Wayfinder fog；它清掉 ticket 03 留下的精確設定不確定性，讓「決定 40 分鐘的敘事弧線與時間配置」成為下一個 frontier。
