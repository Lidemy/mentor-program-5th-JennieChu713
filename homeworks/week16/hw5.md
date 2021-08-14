## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

這週其實是學習得很開心的一週！儘管後半時間寫作業東想西試（？）比較散漫 😂

可能之前靠《新一代 JavaScript 程式設計精解》（對我來說覺得算是目前的迷你聖經x'D）有建起來基本大概念，還有一些當時沒讀懂不過至少知道的專有名詞，所以對心臟跟大腦的衝擊力（？）相對比較可以承受。

現在經過老師的講解，真的有更懂一些了！~~雖然還是有可能自己的腦袋一廂情願結果不小心誤會了什麼（x~~

### scope and scope chain

變數存在的作用域的界限。範圍依照變數宣告的類型（`var` 或 `let` / `const`）又分為 function block level 以及 block level。執行上會沿著作用域鍊（scope chain），往上層層尋找需要的變數。

其實以前比較看不懂 function block level 跟 block level 的差別，但老師給的範例一下子就明白了。在作用域陷阱的影片中，反而第一次知道 IIFE，回頭查看了一下，才發現書裡是翻成『立即函數』。

### hoisting

對於變數和函式宣告會自動將宣告的動作提升到其作用域頂端並建立。對於 hoisting 的優先順序分別為 `function`、parameter/argument，以及 `var`。雖然 `let` / `const` 也具備 hoisting 的性質，但運作方式與 `var` 不同，而是依據 TDZ（Temporal Dead Zone）的時間經過（宣告變數及賦值為止）來界定。

雖然知道 hoisting 這個詞彙跟大概的作用，不過基本上是來到新世界 xD 第一次知道 function declaration （使用 function 指令）也會提升，不過有一部分的原因是自己的了解是『由於 function delcaration 是靜態結構，因此會在執行前先註冊該 function，所以即使在後方宣告依然可以執行』。

對於上面的疑問，之前先用英文 google 未果（通常不是針對 hoisting 就是物件導向的 `static` 的說明），後來改用中文搜尋反而有[相關的說法（見註解3）](https://ithelp.ithome.com.tw/articles/10191549)。這樣看過之後，就比較能夠理解 [我知道你懂 hoisting，可是你了解到多深？](https://blog.huli.tw/2018/11/10/javascript-hoisting-and-tdz/)後半段提及編譯和直譯的部分。

猜想或許是基於大眾對『JavaScript 是直譯式語言』的普遍認知，但又要解釋有靜態結構的部分反而可能會很混亂，所以採用了 hoisting 這個較為簡明的說明吧？

不過現在其實只要依照大原則，遵循使用變數之前先宣告並且都使用 `let` 和 `const`，基本上能避免不必要的麻煩就是了 xD

### closure

應用 scope chain 的機制，讓函式中的函式使用區域變數（local variable），藉以隱藏特定的資訊，也就是封裝（capsulation）的實作。不過必須注意使用 closure 的話，因為該函數維持在受到參考的變數存在的情況，JavaScript 是不會對此執行垃圾回收機制（GC，garbage collection），如果有需要的話可以[手動刪除](https://iter01.com/524208.html)。

其實個人覺得很老套的 closure 遞增函式似乎能更強烈地感受到 closure 的存在感（？）。以一個很小白（？）的角度在看，會覺得以往執行 n 次的函式明明結果都一樣（因為執行完就被GC了），但這個卻是每執行一次就會增加一次~~讓人忍不住想大喊『MAGIC！』~~，真的會有『變數資料還在那裡』、『變數資料沒有被回收』的真實感。不過這個好像就得講到 GC 的問題，結果又會變得很複雜的樣子⋯⋯

註：那個老套的 closure 遞增函式

``` javascript
function closure() {
  let i = 0
  function incredment() {
    i++
    console.log(i)
  }
  return incredment //也可以直接 return 一個匿名函式
}

let test1 = closure()
let test2 = closure()

test1() // 1
test1() // 2
test1() // 3

test2() // 1
test2() // 2

// 若寫成 closure()() 執行 n 次並不會遞增，因為會被視為一次執行就結束的函式
```

### OOP, prototype and  `this`

JavaScript 本身沒有以往物件導向（Object Oriented）中類別（class）的觀念，而是以原型（prototype）來實現物件導向的設計。相較於正統的類別，原型的靈活度比較高，源自相同物件的每個實體，其內容可以依需求保留或延展各自的方法（method）與屬性（property）。物件與實體間存在原型鍊（prototype chain）來進行參照。關鍵字 `this` 在物件導向中一般代表物件本身，但此外也會隨著所在的位置不同而有不同的代表參考。

第一次接觸物件導向是 Java，然後可能當時受創有點嚴重（？），現在關鍵詞彙還記得，但內容幾乎忘光了⋯⋯

後來對物件導向稍微了解一點的時候，是自己嗑書摸 python 那段時間。不過 python 感覺似乎還是比較接近 JavaScript 在實體的延展上比較靈活的類型（都是用 override 來改寫），所以自己對物件導向的概念可能還是沒有那麽純正（？）。

不過我現在好像還是不太懂多型（polymorphism）的概念。目前看下來很籠統地說，就是用繼承（inheritance）令實體中得到物件的方法作雛形，再藉由 override 進行客製化的樣子？~~然後發現介面（interface）已經被遺忘了~~

但老實說現在 JavaScript 有 `class` 這個語法糖，由衷覺得讓一切都變得容易許多。雖然現在自己還不太確定怎麼實際應用就是了⋯⋯ x'D

### Event Loop

監控 call stack 和 task queue 狀況的中介角色。當 call stack 已經完成同步的執行緒而呈現淨空的狀態時，event loop 便會將 task queue 中佇列的執行緒轉給 call stack 執行，直到 task queue 清空為止。

記得開課的前幾週有出現過這個名詞，然後對 Loupe 視覺化瀏覽器運作過程印象深刻。但現在在看完演講影片之後，也了解到 `setTimeout()` 等非同步的函式其實就是一種 API 的實作，真的覺得非常有趣！

