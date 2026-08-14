# 用粗略大綱驗證演講節奏

Type: prototype
Status: resolved
Blocked by: 06

## Question

一份包含段落、核心訊息、案例位置、轉場、預估時間與刪減優先序的粗略大綱，是否能讓首次接觸 FSD 的 Vue 工程師跟上推理，並讓有 feature-based 經驗的人得到新的判斷框架？

## Comments

## Answer

使用者實際 review 粗略大綱後，最終 verdict 為「可採用」。維持「決定 40 分鐘的敘事弧線與時間配置」已鎖定的單向節奏：由 Technical-based organization 的熟悉問題出發，公平承認 feature-based organization 對 locality 的改善，再揭露 ownership、dependency、Public API、抽離時機與 enforcement 缺口；用 7 分鐘 just-in-time FSD primer 建立最低必要判斷工具，通過三個匿名真實案例與兩個 framework seams 驗證，最後收束到人、AI、CI 的三層閉環及不依賴 FSD 名稱的方法論結論。

Steiger／CI 段加入使用者指定的本機預檢查策略：以 Husky `pre-push` 在送往遠端前執行架構檢查，不放在 `pre-commit`，避免開發中間狀態暫時不完整時反覆觸發警報；遠端 CI 仍是共同守門。Husky 支援 `.husky/pre-push` 是工具能力，採用 `pre-push` 而非 `pre-commit` 則是本演講明確標示的團隊政策，不冒充 FSD 或 Husky 的強制規則。

大綱保留三個 guided walkthrough，分別壓測新手理解、資深聽眾的新判斷，以及排練超時時「刪細節、不刪敘事節點」的順序。匿名真實案例、合成探針與 framework seam 持續明確分標。

Prototype primary source：branch `prototype/fsd-talk-outline`，commit `cac9f7ee762deb52d0f0e3bb3855fe8bcf317a36`。可用 `git show prototype/fsd-talk-outline:.scratch/fsd-talk-authoring-brief/prototypes/07-talk-outline.html` 取回單檔 HTML。
