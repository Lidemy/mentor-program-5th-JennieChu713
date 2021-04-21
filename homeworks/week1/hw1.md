## 交作業流程

在CLI從 Lidemy 產生自己的 repository 並且`clone`之後，每次交作業的流程：

1. **`git branch 分支名稱`**：建立一個分支。
2. **`git checkout 分支名稱`**：切換到該分支寫作業。
3. **`git add .`**：作業完成後，先將該分支的所有作業加入 git 版本控制中。
4. **`git commit -am "說明"`**：將作業加入版本控制後，一定要記得把該分支的異動進行 commit。
5. **`git push origin 分支名稱`**：再次檢查確認後，把該分支上傳到 GitHub。
6. **將 pull request 的連結網址（PR 連結）張貼到學習系統中「課程總覽 -> 繳交作業」或「作業列表 -> 新增作業」並送出**。

交作業的流程基本在這裡告一段落。

Extra．**`git pull origin master`**：當作業改完後，將變動同步到本地。
