# 驗證 Nuxt 4 整合 fixture

Type: task
Status: resolved
Blocked by: 03

## Question

以目前鎖定的 Nuxt 4 minor 建立最小、可丟棄的驗證 fixture，實際確認 `srcDir`、`dir.app`、`dir.pages`、`dir.layouts`、內建 alias、薄 route adapter 與 FSD Page Public API 能通過 prepare、typecheck 與 production build；結果是否足以決定演講可安全展示的目錄與設定？

## Comments

## Answer

Nuxt `4.5.2` 實測足以決定演講可展示的設定：採用 `srcDir: 'src/'`、`dir.app: 'app'`、`dir.pages: 'app/routes'`、`dir.layouts: 'app/layouts'`；`src/app.vue` 組裝 Nuxt layout/page，薄 route adapter 從 `@/pages/<slice>` Public API 匯入 FSD Page。Nuxt generated config 證明內建 `@` 跟隨 `srcDir`，不需 custom aliases；prepare、typecheck 與 production build 均通過。

第一次 typecheck 使用 `typescript 7.0.2` + `vue-tsc 3.3.9` 時，因 TypeScript 7 不再 export `./lib/tsc` 而失敗。保留相同 Nuxt/FSD seam，只將 TypeScript pin 到 `6.0.3` 後全數通過。這是 toolchain compatibility，不是否決 config。

完整版本、fixture tree、source、commands、失敗原因、產物證據與 inference 見 [Nuxt 4 整合 fixture 驗證](../research/10-nuxt4-fixture-verification.md)。沒有新增 fog；本票 resolved 後，下一個 frontier 是「決定 40 分鐘的敘事弧線與時間配置」。
