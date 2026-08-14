# 選出可公開的真實踩坑案例

Type: grilling
Status: resolved

## Question

哪些親身經歷最能支撐演講的核心主張，能提供哪些可驗證的背景、前後差異與教訓，又需要如何匿名化，才能選出 3 至 4 個可公開且彼此不重複的主案例？

## Comments

### 來源校正與訪談重啟

依使用者指示，上一輪判定作廢。本 ticket 後續只以 [fsd.how](https://fsd.how/) 及該站連結的官方一手資料作為現行 FSD guidance；不再使用或引用舊網域 `feature-sliced.design`。使用者補充舊網域已被註冊走且無法取回；目前可獨立確認的是官方 GitHub repository 指向 `fsd.how`，而舊網域頁面已出現與 FSD 無關的大量賭博／SEO 連結。若尚未找到一手公告，演講中的失去網域經過應標為講者補充，不冒充官方已發表的歷史紀錄。

網域說明不屬於本 ticket 要選出的真實架構踩坑。它安排在 7 分鐘 FSD primer 的開頭：先定義 FSD，接著用約 20–30 秒建立 `fsd.how` 是現行官方來源，再進入 layer、slice、segment 與 dependency rules。此決定已同步寫入 `AGENTS.md`，供後續 story arc 與 authoring 使用。

原始三段式論述仍待依 `fsd.how` 重新驗證，並需綁定親身事件、前後差異、證據與匿名化界線，才能成為本 ticket 的候選主案例。

### 決定：三段式論述是問題框架

使用者確認「technical-based organization → feature-based organization → FSD lens」是全場的問題框架，不占 3 至 4 個真實踩坑案例名額。後續案例的功能是用具體親身事件證明這套問題框架，而不是重述整套演進。

為協助回想，候選事件可從以下方向盤點，但尚未替使用者選定：

- 一次原本看似局部的功能修改，最後必須在大量 technical-based 目錄間追查或同步修改。
- 一次 feature-based 專案中，Feature A 直接依賴 Feature B，造成連鎖修改、循環依賴、測試擴散或責任歸屬不清。
- 一次團隊成員或 AI 對程式碼該放哪裡各有不同答案，review 只能依個人偏好爭論。
- 一次導入 FSD 或明確架構規則後，修改範圍、review 判準或自動檢查確實變得更可預測；也可以是導入失敗後得到的反例。
- 一次 Nuxt routing、Vue Query server state 或 Nuxt UI form logic 跨越框架與業務邊界，暴露「資料夾分類仍無法回答誰擁有責任」。

### 候選案例：過早抽離只服務單一功能的「共用」元件

使用者親身遇過某個元件在只有單一功能需求時就被抽到共用位置，但元件實際上仍攜帶該功能的假設。其他功能後來嘗試加入時，只能在原抽象上繼續包裝或增加例外，造成結構疊床架屋、行為愈來愈難理解與修改。

此案例可作為主案例候選，因為它具備清楚的錯誤決策、後續需求衝突與可觀察代價，也直接支持 FSD v2.1 的 Pages First 與延後抽離原則。`fsd.how` 明確指出：未重用的 UI block 可留在 page slice；只由一個 page 使用的物件應移回該 page；當不同頁面的需求可能分岔時，複製有時比建立共用抽象更正確。依據：[Layers — Pages and Shared](https://fsd.how/docs/reference/layers/)、[From a custom architecture](https://fsd.how/docs/guides/migration/from-custom/)、[Migration from v2.0 to v2.1](https://fsd.how/docs/guides/migration/from-v2-0/)。

使用者提出的第一項根因成立：根據想像中的未來重用提早最佳化，會使抽象與實際變化方向不符。第二項需改寫：不是「愈全專案共用，就必須愈原子化」，因為 `shared/ui` 可以包含完整且具 UI logic 的元件；較精確的教訓是「共用抽象應有單一、穩定且不含特定功能政策的責任，功能差異由 owning page／feature 組合」。抽象的門檻應是已觀察到的共同需求與穩定邊界，不是元件尺寸。

此候選尚缺可公開的具體事件：原元件的用途、它內建的功能假設、第二個需求如何與其衝突、實際增加了哪些 wrapper／prop／branch、造成的維護代價、後來如何處理，以及需要匿名化的資訊。

使用者進一步確認這是表單元件案例：團隊一開始就把已客製化的 UI control 與 form state／validation integration 耦合成一個所謂共用元件，導致原本的 UI control 無法脫離表單單獨使用。這使案例的錯誤邊界更清楚：不是「表單元件不能共用」，而是 presentation control 與特定 form contract 尚未證明會一起變化，就被綁成同一個抽象。

目前可預期的安全教訓是保留兩個可分離責任：可獨立使用的 UI control，以及在 owning page／feature 中把 control 接上欄位名稱、驗證狀態與錯誤訊息的 form integration。是否需要再抽出穩定的 form adapter，應由多個實際使用情境決定，而不是一開始就預設所有 control 都只會在表單內使用。

#### 合成情境供使用者比對（尚非親身案例事實）

最初在「匯出報表」表單中製作日期區間選擇器。團隊直接把日期 popover、calendar UI、欄位名稱、required、validation error 與 dirty／reset 包成單一 `ReportDateRangeField`；元件只能從 form context 取得與更新值，沒有可獨立控制的 value／change contract。

後來儀表板工具列也需要相同的日期區間 UI，但它不是表單：選取後要立即同步 URL query 並重新取得圖表資料。由於原元件離不開 form context，開發者只能在工具列外包一個假的表單，或持續加入 `standalone`、`hideError`、`syncRoute` 等 props 與條件分支。原本只服務報表的抽象因而同時承擔 form validation 與 dashboard filtering，任何修改都可能影響另一個情境。

可行的重構是把可受控的 `DateRangePicker` 保持為獨立 UI control，再由報表功能組成 `DateRangeField` form adapter；儀表板則直接組合 picker、URL state 與 query refresh。這個合成情境只用來協助使用者辨識自己的經驗；除非使用者確認關鍵因果與實際經歷相符，否則不得在演講中標成真實案例。

#### 親身事實確認

使用者確認自己真實遇過同一個共用元件耦合三項責任：UI control、form control 與特定 backend data source。案例不包含 submit lifecycle；演講不得把問題誇張成完整提交流程失控。實際風險是元件難以脫離 form 單用，也難以改用靜態資料、另一個 endpoint、URL state、已快取資料或不同的 loading／error policy。

較清楚的責任切分是：UI control 接受資料與互動 contract；owning page／feature 決定如何取得與轉換 server data；form adapter 只處理 form binding。上方日期區間／報表內容仍是合成情境；真實的是三重耦合及其可重用性問題，除非使用者另外確認，演講不得把合成業務細節說成親身事實。

#### 決定：選為真實主案例一

使用者確認將此案例列為第一個真實主案例。公開版本保留已確認的因果鏈：團隊過早把 UI control、form adapter 與 server-data owner 合成全專案共用元件，導致 control 無法脫離 form 使用，也無法替換資料來源。業務名稱、元件種類與產品背景一律匿名化；未經使用者確認的日期區間、報表、儀表板等合成細節不得當成親身事實。

### 合成探針：購物車、優惠券與結帳互相依賴（尚非親身案例）

在 generic feature-based organization 中，`cart`、`coupon`、`checkout` 各自成為 feature。`cart` 為了顯示折扣後總額，直接讀取 `coupon` 的狀態與計算；`coupon` 為了驗證最低金額與排除商品，又直接讀取 `cart` 的 items／subtotal；`checkout` 再同時依賴兩者組出提交 payload。

最痛的時刻是優惠規則改變，例如新增「部分商品不計入門檻」：修改不再局限於 `coupon`，而會擴散到 cart total、checkout summary、submission mapping 與三組測試 fixture。`cart` 與 `coupon` 無法獨立測試，循環依賴也讓 bug ownership 不清楚。團隊常見的錯誤補救是把計算全部搬進 `shared`，但這只把業務耦合藏進更全域的依賴。

這個合成探針代表 cross-import 的最高痛點：同 layer slices 不再能獨立改動，變更影響範圍不可預測。可能的設計方向包括重新合併實際一起變更的邊界、把穩定的 domain calculation 放到 lower layer，或由 page／app 在上層組合；應依真實責任決定，而不是把所有 cross-import 一律搬到 `shared`。除非使用者確認有相同的親身因果，否則不得列為真實主案例。

#### 使用者判定：不採用

使用者認為購物車／優惠券／結帳情境不夠好，不列入主案例。它刻意放大循環依賴，卻不如常見的使用者與驗證流程貼近實務；後續不得因為它看似能示範 FSD import rule 就硬塞進演講。

### 候選方向：多個使用者功能共同依賴 User schema

使用者提出更常見的結構：註冊、登入、修改密碼、取得使用者資訊可能是不同 feature，但共同依賴一個 `User` schema。依 [Layers](https://fsd.how/docs/reference/layers/)，多個 feature 依賴 lower layer 的穩定 domain model 是合理的依賴方向，不是踩坑本身；同 layer feature 彼此直接 import 才違反 slice isolation。因此這個情境不能被表述成「跨 feature 共享 schema 就是高耦合」。

它只有在邊界失真時才會成為有力案例，例如：

- `UserSchema` 被放在 `features/register`，登入、改密碼與取得使用者資訊反過來 import 註冊 feature。
- 同一份全域 schema 同時承擔使用者資料、註冊輸入、登入憑證、修改密碼輸入與 session／token，最後充滿只對單一流程成立的 optional 欄位與條件分支。
- 後端 response type、前端 domain model 與 feature-specific form schema 被當成同一個概念，任何 API 或驗證規則改動都擴散到所有功能。

較精確的邊界是：可被多個功能穩定使用的 `User` domain model 可位於 `entities/user`；純後端 DTO／共用 API type 可留在 `shared/api`；`RegisterInput`、`LoginCredentials`、`ChangePasswordInput` 等流程輸入各自留在 owning page／feature；authentication session 與 token 不應為了共用而硬塞進一般 `User` entity。此判定符合 [Handling API Requests](https://fsd.how/docs/guides/examples/api-requests/) 對 API types 的指引，以及 [Excessive Entities](https://fsd.how/docs/guides/issues/excessive-entities/) 對 auth data 與過早建立 entity 的警告。

目前尚未確認使用者說的是一個親身踩坑，還是用來說明「合理共享依賴」的反例，因此尚未列為真實主案例二。

#### 親身事實確認：重複的是欄位規則，不是整份功能 schema

使用者確認真實情況不是一份全域 `User` schema 混入所有流程，也不是各 feature 不應共享 `User` 概念。註冊、登入、修改密碼、取得使用者資訊各自需要不同的欄位組合；但同名欄位的 schema 規則本來一致。實作時沒有辨識出這個穩定共通點，各功能各寫了一份相同的欄位規則。後來其中一條共通規則改變時，團隊常只修改某一份，漏掉其他副本，甚至不知道還有哪些副本需要同步。

因此較精確的踩坑名稱是「功能 schema 各自擁有，但共通欄位規則遭到複製而漂移」。問題不在 duplication 一律有害，而在這些副本理應遵守同一項規則、必須一起變動，卻沒有單一可發現的 owner。它與主案例一不同：案例一是過早抽離並耦合不該一起變動的責任；本候選則是沒有抽離已證明必須一致的穩定規則。

可公開的結構可以匿名表述為：每個 feature 保留自己的完整 schema 與 required／optional 組合，只共用已確認語意一致的欄位規則；例如註冊與登入仍是不同 schema，但引用同一個 email 規則。這符合 FSD 的 controlled reuse：feature-specific validation 留在 owning slice，而真正跨多個 consumer、具有穩定責任的 domain rule 才下沉。尚須由使用者決定是否正式選為真實主案例二。

#### 決定：選為真實主案例二

使用者確認將「共通欄位規則被各 feature 重複實作，修改時產生 validation drift」列為第二個真實主案例。公開版本可說明不同功能合理地擁有不同欄位組合，但語意必須一致的欄位規則不應存在多個隱蔽副本；規則變更時只改到部分流程，造成行為不一致與漏改風險。

此案例與主案例一刻意形成對照：案例一是過早共享、把不該一起變動的責任耦合；案例二是沒有共享已證明必須一起變動的穩定規則。密碼、email 或任何特定欄位目前都只是說明用例，不得在未經確認時當成親身案例細節；公開時可維持「某項共通欄位規則」的匿名描述。

### 候選案例：登入 Feature 錯誤擁有全域驗證狀態

使用者確認自己曾遇過登入功能持有 token 或目前使用者狀態；後來個人資料、權限判斷與其他 authenticated API 也需要相同狀態，造成其他 feature 反向依賴登入 feature，或各自維護狀態。這是親身事件，可發展為第三個真實主案例；尚未正式選定。

依 [Authentication](https://fsd.how/docs/guides/examples/auth/) 與 [Cross-imports](https://fsd.how/docs/guides/issues/cross-imports/) 核對後，使用者提出的「狀態放在 Shared，但是注入」方向需要拆成兩種合法模式，不能混成單一硬規則：

- 簡單的 token、refresh 與 minimal session 可由 `shared/auth` 擁有，`shared/api` 與各 feature 都能依 layer rule 向下使用；此時不需要用 DI 規避依賴方向。
- 當 session／current-user state 合理地位於 `entities/session` 或 `entities/user`，`shared/api` 不能反向 import entity。可由 `app` 訂閱較高層狀態，並在 token 變動時注入 API client；或由 `app` 提供 context。這才是 DI／IoC 用來維持依賴方向的典型情境。

另一個可行的 DI 表述是讓 Shared 定義穩定的 auth contract／context，而 `app` 提供具體 provider，features 只依賴該低層 contract。此時應說「Shared 擁有 contract，App 負責 wiring」，不能籠統宣稱所有 auth state 都必須放 Shared。官方 guidance 同時接受 Shared 與 Entity 兩種 token placement，依狀態複雜度、entities layer 是否存在，以及 current-user/profile 是否有真實跨場景重用決定；明確不建議由單一 login feature 擁有 app-wide token state。

使用者進一步釐清 DI 的實際需求：共用的 Axios instance 必須在 authenticated requests 注入目前 token。案例三因此應把具體機制說成「API client 接受 token provider，或由 App 在 token 變動時把 token 推入 API client」；Axios request interceptor 可在每次 request 取得最新 token 並設定 `Authorization` header。不要把它籠統說成「把 auth state 注入 Feature」。

若 auth state 已位於 `shared/auth`，`shared/api` 可依專案設計直接取得 token，DI 主要提供 client 與 storage 的解耦與測試替換；若 auth state 位於 `entities/session`，則由 App wiring／subscription 把 token 注入 `shared/api`，是避免 Shared 反向依賴 Entity 的必要邊界。兩者都符合 FSD，但演講必須先說清楚採用哪一種 placement。

#### 決定：選為真實主案例三

使用者確認採用此案例，並將公開版本收斂為：登入 feature 曾錯誤擁有 token，導致其他功能與共用 API client 依賴登入 feature；後來由 `shared/auth` 擁有 token，App 將 token provider 注入 `shared/api`，Axios request interceptor 在每次 request 取得最新 token。這個案例的主旨是「登入行為不等於 session ownership；DI 讓 API infrastructure 不必知道登入 feature 或具體狀態管理方案」。

使用者也確認以 Vue 的 App-level DI 作為技術落點：App 透過 `app.use(plugin, options)` 安裝 Plugin；Plugin 的 `install(app, options)` 再呼叫 `app.provide(key, instance)`，元件樹透過 `inject(key)` 取得依賴。此說法已依 Vue 3 官方 [Application API](https://vuejs.org/api/application.html#app-use)、[Plugins](https://vuejs.org/guide/reusability/plugins.html) 與 [Provide / Inject](https://vuejs.org/guide/components/provide-inject.html#app-level-provide) 核對。

演講應保持兩層論述：FSD 決定依賴方向與 ownership；Vue Plugin／provide-inject 是實現 App composition root 的一種框架機制。不得把 `app.use()` 說成 DI 本身，也不得宣稱 FSD 要求使用 Vue Plugin。

## Answer

選定三個可公開、匿名化且互不重複的真實主案例；不再為湊數加入第四個。Technical-based organization → feature-based organization → FSD lens 保留為全場問題框架，不占案例名額。

1. **過早共用造成錯誤耦合**：團隊把 UI control、form adapter 與 server-data owner 合成全專案共用元件，導致 control 無法脫離 form 使用，也無法替換資料來源。公開時隱去產品、業務與元件種類，只保留三重責任及後果；日期區間、報表與儀表板是訪談探針，不得當成親身事實。教訓是先留在 owning page／feature，待真實重用與穩定邊界出現後，再分離 control、form binding 與資料取得。
2. **該共用的穩定規則沒有共用**：註冊、登入、修改密碼、取得使用者資訊各自需要不同欄位組合，但語意一致的欄位 schema 規則被各 feature 重複實作。規則改變時只修改部分副本，造成 validation drift、漏改與不可發現的影響範圍。公開時維持「某項共通欄位規則」的匿名描述；密碼與 email 僅為說明例。教訓是 feature 保有自己的完整 schema，只下沉已證明必須一起變動的 shared field rule。
3. **登入行為錯誤擁有全域 auth state**：token 由登入 feature 持有，其他功能與共用 Axios client 被迫依賴登入 feature。修正後由 `shared/auth` 擁有 token，App 將 token provider 注入 `shared/api`，request interceptor 每次 request 取得最新 token。Vue 中由 `app.use()` 安裝 Plugin，Plugin 的 `install()` 透過 `app.provide()` 提供實例，元件以 `inject()` 取得依賴。教訓是登入行為不等於 session ownership；FSD 決定 ownership 與依賴方向，Vue Plugin／provide-inject 只是實作 composition root 的框架機制。

官方依據以 [fsd.how](https://fsd.how/) 為準：Pages First 與延後抽離支持案例一；layer import rule 與 controlled reuse 支持案例二；[Authentication](https://fsd.how/docs/guides/examples/auth/) 明確不建議由單一 login feature 擁有 app-wide token，並接受 Shared／Entity placement 與 token injection。Vue 機制已依 [Application API](https://vuejs.org/api/application.html#app-use)、[Plugins](https://vuejs.org/guide/reusability/plugins.html) 及 [Provide / Inject](https://vuejs.org/guide/components/provide-inject.html#app-level-provide) 核對；Axios instance／request interceptor 已依 [Axios authentication](https://github.com/axios/axios/blob/v1.x/docs/pages/advanced/authentication.md) 核對。
