## 什麼是 Ajax？

Asynchronous JavaScript and XML，也就是**非同步資料交換**。利用瀏覽器（Window 物件）提供給 JavaScript 的 XMLHttpRequest 物件向伺服器傳送 request 進行非同步通訊。過去主要是以 XML 資料格式為主流，所以被命名為 XMLHttpRequest，但實際上不論都 JSON 或 XML 都可以接收。

## 用 Ajax 與我們用表單送出資料的差別在哪？

最關鍵的差異在於與**伺服器的通訊同步與否**。以往用表單送出資料與伺服器互動的方式，是所謂的**同步通訊**——伺服器會回傳一個<u>包含 request 要索取的部分</u>的完整資料（HTML），而瀏覽器為了呈現這份資料便會**更新整個畫面**。

Ajax 則是以**非同步**的方式進行通訊。在這樣的情況下， 伺服器則只會回傳 <u>request 要求的資料部分</u>，頁面上只會隨 DOM 指定操作進行**部分更新**。非同步的好處在於客戶端可以繼續執行其他的操作，而且對通訊上的負擔也相對較小。

## JSONP 是什麼？

JSON with Padding，所謂 JSON 填充。這是早期針對同源政策的限制來索取跨網域資料的應變方法。利用不受同源政策限制，也就允許非同源特性的 html 標籤（ex., `<img>`、`<script>`等，這裡主要使用`<script>`），將資料網址傳入 `src` 屬性作為參數，並搭配相應的 callback function 和 DOM 監聽事件來獲取資料。

## 要如何存取跨網域的 API？

一種是利用JSONP來存取，另一種則是以跨來源資料共享（Cross Origin Sharing）的方式來獲得。跨來源資料共享又可以分成 Simple Request 和 With Preflight 兩種。

Simple Request 是直接提出跨域請求，在 HEADER 當中加入 `access-control-allow-origin: *`（對此最通用的標頭，`*` 可以替換成網址，也就是Origin的部分），表示「允許所有通訊的需求」，便可以通過同源政策的限制來取得資料。

With Preflight 則會先以 OPTIONS 方法來試探伺服器，並隨之附上 Origin 和指定使用的請求方法（Access-Control-Request-Method、Access-Control-Request-Headers）以及自定義的標頭，若伺服器允許的話，便能進行跨領域請求來獲取資料。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

第四週是從本地端，也就是自己的電腦直接向伺服器索取資料。但這週是透過瀏覽器與伺服器溝通，因此必須依照瀏覽器的規範進行。

由於伺服器通常會設置一些外部服務機制（proxy）供以存取，而瀏覽器基於安全考量便設下許多限制，如同源政策（Same Origin Policy）便是其中之一。

同源政策侷限請求的資源只能來自與頁面相同的網域，然而現今實務上必然會從多個網域來取得資料，也因此產生了跨網域的問題。
