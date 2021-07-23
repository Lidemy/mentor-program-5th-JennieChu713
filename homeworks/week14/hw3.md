## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

DNS 即 Domain Name System，網域名稱系統，是一個將網域名與IP位址對映的系統。除了能將網域名轉換成機器可讀取的 IP位址，亦可將 IP 切換成網域名，便於使用者閱覽網頁的一種網路服務。

Google公開的DNS，除了提供大眾便利的服務（聲稱快速、安全性與正確性）之外，亦能夠追蹤、收集使用者所瀏覽的網頁資料（從IP回溯至網域供應商）並進行相關的行銷。

## 什麼是資料庫的 lock？為什麼我們需要 lock？

Lock 是在 Transaction 中，可以避免 Race Condition（競爭情況），也就是同時更改到某一項值而造成資料誤差的防範辦法。

當使用 Lock 時，可以在碰到 Race Condition 的情況下，使任一方先進行 Transaction，而讓另一方等待，直到該 Transaction 完成，才讓另一方執行下一個 Transaction。

## NoSQL 跟 SQL 的差別在哪裡？

與 SQL 關聯式資料庫相反，NoSQL 便是非關聯式資料庫。NoSQL 的特色在於它不是 Schema 的格式（所以也不支援 JOIN），而是以 JSON 的 Key-Value 格式來儲存資料。因此，很適合存放結構格式不固定的資料，同時具備較為靈活的資料延展性（Scalable）。

## 資料庫的 ACID 是什麼？

這是為了確保一次 Transaction （交易）過程的正確性所依循的四個原則：

- Atomicity（原子性）：若過程中發生問題，則該次交易中所有的內容執行都會失敗，否則全部成功。
- Consistency（一致性）：資料的一致性。
- Isolation（隔離性）：多筆交易彼此獨立，不會相互影響，亦即不能同時更改同一項值。
- Duration（持久性）：當交易完成後，資料也不會消失。