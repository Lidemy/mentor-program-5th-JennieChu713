``` javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}

const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

以上輸出結果：

``` javascript
2
2
undefined
```

這是在於 `this` 的應用。在物件導向的程式設計結構來說，`this` 便是指向物件本身，包含當中的方法（method）與屬性（property）。在物件以外的地方使用 `this` ，則不具任何意義。

流程說明：

首先分別以 `const` 宣告變數 `obj2` 以及 `hello`，並賦值 `obj.inner` 與 `obj.inner.hello`。其當中的內容基本上會類似這樣的狀態：

``` javascript
const obj2 = {
  value: 2,
  hello: function() {
    console.log(this.value)
  }
}

const hello = function() {
  console.log(this.value)
}
```

執行 `obj.inner.hello()` ，也就是印出 `this.value`，其指向變數物件 `obj` 下包含的 `inner` 物件，亦即 `this` ，其底下的 `value` 的值，也就是 `2`。

接著執行 `obj2.hello()`。變數 `obj2` 所存入的值是一個物件（正確地說，是關連到儲存變數物件 `obj.inner` 的記憶體位置），而執行內容當中的函式 `hello()`，同樣地 `this` 指向 `inner` 物件中 `value` 的值，於是印出 `2`。

最後執行 `hello()`。變數 `hello` 存入的是 `obj.inner.hello` 的函式。不過這裡的關鍵在於，這時在這個函式中的 `this` 所指的是涵蓋了函式本身的全域物件（Global Object）。隨著執行環境不同，如果是在瀏覽器上的話，就會替換為 Window 物件。

換句話說，現在 hello 存入的函式其所在的位置，是在全域物件當中，而不是 `obj.inner` 這個物件裡。也因此，當 `this` 查看全域物件，但並沒有 `value` 這個物件的值的時候，JavaScript 便在此同時自動宣告了變數 `value` 的存在，但也因為沒有賦值，所以印出的結果便是 `undefined`。