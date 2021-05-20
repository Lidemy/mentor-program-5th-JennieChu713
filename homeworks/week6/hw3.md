## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

**`<blockquote></blockquote>`**

用作引文的標籤，是為區塊元素。通常會搭配 `cite` 屬性或 `<cite></cite>` 標籤元素註明引文的來源。`<q></q>` 則是行內型的引文標籤。是 HTML 5 現行標準的標籤元素。

**`<hr/>`**

產生水平線的單一標籤。 在過去 HTML 4 中詮釋為 「水平分隔線」（horizontal rule），也是多數普遍對 `<hr>` 的認知。後來在 HTML 5 中則闡明為「段落之間的轉場切換」（thematic break），令該元素標籤的定位具備語義（semantic）。亦是現存於 HTML5 的標準中。

**`<fieldset></fieldset>`**

表示一組集合的標籤元素，用在 `<form></form>` 表單當中。會將包含在該標籤當中的元素（如 `checkbox` 或 `radio` 的類型）匡列成一組選項。通常會搭配 `<legend></legend>` 標籤來表示這組選項的題目或描述。HTML 5 的標準之一。

## 請問什麼是盒模型（box model）

即指每個標籤元素都可以視為一個盒子，其大小會隨著內容的多寡或屬性的差異改變。如果是區塊（block）元素，則會佔滿一行的空間，不會與其他元素並排；反之，行內（inline）元素的空間則是取決於輸入內容的量，會和其他同屬性的元素並排在同一行。其中，邊距（border）和間距（padding）的設置會擴增元素本身的大小，排版上需要特別留意。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

inline 的特性在於<u>可以與同屬性的元素並排</u>，但**無法改變上下的寬高及外距**（margin），這部分也不會對上下周圍的元素產生影響。換句話說，是只能長胖不能長高的元素屬性。

block 則<u>不會與其他元素並排</u>，自己獨佔一行的空間，可以對該元素進行**大小與排版移動的操作**。

inline-block 則結合了兩者的優勢，可以和其他行內元素並排之外，也能夠進行操作。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

`static` 是所有元素的**預設值**，依照擺放的順序與各個元素的屬性（block 或 inline）在頁面上自左上角開始排列。

`relative` 是會依照自己**原來所在位置為基準點**進行移動。不會有影響其他元素。

`absolute` 則是會**根據父元素為基準點**來移動。若父元素的 `position` 屬性沒有設定的話，則會以 viewport（視窗） 作基準點來移動。

`fixed` 以 **viewport 的範圍**中移動。

`relative`、`absolute` 以及 `fixed` 可以利用 `top`、`right`、`bottom`、`left` 來設定位置。通常是 `top` 或 `bottom` 擇一，再搭配 `right` 或 `left` 來調整。



