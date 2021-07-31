``` javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

以上輸出結果：

``` javascript
undefined // fn() 第1行 console.log(a)
5 // fn() 第3行 console.log(a)
6 // fn2() 第1行 console.log(a)
20 // 經過 fn2() 賦值之後，fn() 第7行 console.log(a)
1 // 執行完 fn() 之後總數第 16 行 console.log(a)
10 // 總數第 17 行 console.log(a)
100 // 最後一行 console.log(b)
```

這裡主要涉及 JavaScript 中提升（hoisting）和作用域（scope）的部分。JavaScript 的變數宣告和函式宣告（function declaration）都具備 hoisting 的性質，那會使宣告這個動作自動提升到作用域（scope）中的頂端來建立其存在。

作用域相關的術語：

- scope：翻作作用域，變數的生存範圍。換句話話說，只要變數超出所限定的範圍，就等同不存在。 如果 `var` 或 `function` 宣告在一個 function 中，其作用域便限制在 function 之內；反過來說，在該 function 外便無法使用在裡面宣告的 `var` 或 `function`。如果宣告發生在全域（global scope）中，則任何函式都可以存取使用。
- scope chain：翻作作用域鍊。當程式在使用變數時，會為了確認變數的存在而依循 scope chain 連結起來的脈絡，在自己的作用域或朝更廣泛的範圍中尋找。

流程說明：

在呼叫 `fn()` 時，當中第二行 `var a = 5` ，JavaScript 會自動將 `var a` 變數宣告的部分提升到 `fn()` 當中的頂端進行宣告，也就是實際運作時比較接近這樣：

``` javascript
function fn() {
  var a
  console.log(a)
  a = 5
  ...
}
```

雖然確立了變數 `a` ，但此刻並未賦值，因此第一行 `console.log(a)` 便印出了預設值 `undefined`。

接著原本的 `var a = 5` 會因為變數已經存在而無視原本 `var` 宣告的部分，直接當作 `a = 5` 進行賦值，接著執行的 `console.log(a)` 便是 `5`。

再來執行 `a++`，這時變數 `a` 值為 `6`。無視重複宣告 `var a` 的部分，執行 `fn2()`。

在 `fn2()` 執行 `console.log(a)` 時，因為當初定義 `fn2()` 時當中並沒有變數宣告的部分，於是 JavaScript 便會以定義 `fn2()` 的位置為出發點，根據作用域鍊的連結往上找，也就是在 `fn()` 的作用域中尋找變數 `a` 的存在，找到後印出 `6`。然後隨著程式執行，將變數 `a` 賦值 `20`，變數 `b` 賦值 `100`。

變數 `b` 很值得注意的部分，是**沒有使用變數宣告**這件事。在 JavaScript 中，即使沒有使用變數宣告依然可以建立變數，但是這類變數便不存在作用域的限制，也就是任誰都可存取的全域變數（global variable）。

`fn()` 整個執行完成之後，接著執行 `console.log(a)`。因為這行程式碼位於全域中，JavaScript 要確認變數 `a` 的存在，便在全域中尋找，最後找到整個程式碼第一行的 `var a = 1`，於是印出 `1`。

至於為什麼不會找到當初 `fn()` 使用 `var` 宣告的變數 `a`，是因為 `var` 宣告會使變數的作用域只侷限在 `fn()`，在 `fn()` 之外這個變數等同不存在。

接下來經過 `a = 10` ，再印出了 `10`。最後的 `console.log(b)`，因為當初宣告變數 `b` 並沒有使用變數宣告關鍵字，因此在存取上是沒有作用域的限制，於是便找到了當初先前在定義 `fn2()` 時宣告的變數 `b`，印出了 `100`，程式執行結束。
