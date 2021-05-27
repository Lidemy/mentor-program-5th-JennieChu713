## 什麼是 DOM？

文件物件模型（Document Object Model），是瀏覽器將 html 頁面轉換成樹狀結構的節點（node）物件—— html 頁面本身、標籤元素、當中的字串值和屬性都被視為一個節點——並得以讓 JavaScript 對 html 頁面中的元素進行選取與操作。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

事件傳遞機的順序分別是：**捕獲（Capture） → 目標元素（Target） → 冒泡（Bubbling）**。

也就是說，當觸發事件開始，會從最高的 window 物件開始**依序向下傳遞**，直到監聽事件指定的目標元素為止，這裡就是所謂的<u>捕獲階段（Capture Phase）</u>；觸及到目標元素之後，又自此**向上層層傳遞**到 window 物件，這就是所謂的<u>冒泡階段（Bubbling Phase）</u>。

## 什麼是 event delegation，為什麼我們需要它？

所謂的事件代理（event delegation），就是藉著事件傳遞的特性，將父元素設為事件的觸發點來操作當中的子元素。這不僅可以處理動態新增的子元素，也因為能統一執行相似的處理而令程式碼更為簡潔。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

`event.preventDefault()` 是**防止預設行為的執行**，例如送出表單或開啟超連結等。如果在相關的監聽事件中設置的話，表單便無法送出，點擊超連結也不會有反應。

`event.stopPropagation()`是**阻斷事件傳遞的執行**，但並<u>不影響介面上的操作</u>。會根據 `addEventListener()` 第3個傳入的布林值而定——預設值為 false，使用stopPropagation 的話表示阻止冒泡階段的傳遞，反之則為阻斷捕獲階段的傳遞。
