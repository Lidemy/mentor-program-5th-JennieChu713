## 請以自己的話解釋 API 是什麼

API 就是對外開放自己或別人所訂定的資料供他人所用，以便達到資料交流的目的。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

1. 305 Use Proxy

   是早期針對Proxy（網路代理，一種在客戶端與網站之間的中介角色，可以隱藏用戶端的 IP 位址）指定代理要求所發出的status code。基於安全考量，現在已認定為 deprecated（於 [RFC 7231](https://tools.ietf.org/html/rfc7231#section-6.4.5) 文件中 6.4.5. 聲明）。

2. 418 I'm a Teapot

   於 RFC7168 提出 HTCPCP-TEA 協定，為針對愚人節傳統的惡搞梗（最初的設定是咖啡壺），並不是真的具備意義的 status code。在 2017 年時曾經發起移除這個 status code 的活動，對此同時也掀起了保留該 status code 的聲浪。作為一個彩蛋的價值，它始終得以保留了下來。

3. 410 Gone

   所連線的資源已經不存在於原始伺服器中，也意味著該資源已經永久移除。但大部分的伺服器通常是以 404 來回應。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

| 說明             | Method | PATH               | 參數                                                         | 範例              |
| :--------------- | ------ | :----------------- | :----------------------------------------------------------- | :---------------- |
| 回傳所有餐廳資料 | GET    | `/restaurants`     | 無                                                           |                   |
| 回傳單一餐廳資料 | GET    | `/restaurants/:id` | 無                                                           | `/restaurants/12` |
| 新增餐廳         | POST   | `/restaurants`     | name: "餐廳名", address:"住址", phone:"電話號碼", website: "官網", menu:"菜單" |                   |
| 更改餐廳         | PATCH  | `/restaurants/:id` | name: "餐廳名", address:"住址", phone:"電話號碼", website: "官網", menu:"菜單" |                   |
| 刪除餐廳         | DELETE | `/restaurants/:id` | 無                                                           |                   |

