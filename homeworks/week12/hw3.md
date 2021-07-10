## 請簡單解釋什麼是 Single Page Application

僅以單一的頁面用 JavaScript 搭配 AJAX 動態性地進行資料的建立、讀取與刪改。換句話說，頁面不需切換就可以達成 CRUD 所有的功能。

## SPA 的優缺點為何

SPA能夠減少 server-side 的負擔，而且因為是使用 AJAX 的方式，只需要在頁面上進行部分的更新，因此也不用像以往傳統的 MPA（Muti-Page Application），必須使用多個頁面相互連結來完成 CRUD 功能，而 SPA 整體網頁架構也相對單純許多。

但反過來說，由於所有資料與頁面呈現都是由 client-side 完成，對 client-side的運行負擔很大。而且基於動態更新網頁部分的形式，對於 SEO （Search Engine Optimize）並不理想。


## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

即前端渲染（Client-Side Render）與後端渲染（Server-Side Render）的差異。

透過 PHP 直接輸入內容的方式，是先經過 server 讀取 PHP 程式碼並進行處理後，再將完成渲染產生的 html 文件傳給 client 呈現，也就是後端渲染；藉著 AJAX 收到後端傳來的資料，再透過 JavaScript 或前端框架將資料呈現在頁面上，便是前端渲染。
