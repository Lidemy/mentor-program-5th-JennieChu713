## 什麼是反向代理（Reverse proxy）？

如同在 Client 端能夠隱藏 Client 身份的代理（Proxy），是從 Server 端立場出發的代理，可以保護 Server 端的安全以及隱藏隨流量切換 port 的分流結構。此外，反向代理亦有提供快取便於做出迅速的 Response。

## 什麼是 ORM？

Object Relational Model，是對 SQL 資料庫的資料透過映射（Mapping），以近似物件的格式用 Javascript 進行操作。這有點像是 HTML 之於 DOM 的格式轉換，令 JavaScript 得以操作的模型。


## 什麼是 N+1 problem？

N+1 problem 是在 query 資料庫的關聯性資料（1 : Many 或 Many : Many 等）時，隨著 query 進行的方式，可能產生不斷重複 query 而產生低效耗能的策略問題。一般對應的情況，ORM 如 sequelize 便有提供 `include` （在定義了之間的資料關聯的情況下）來減少重複的 query。

