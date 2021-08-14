``` javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

以上輸出結果：

``` javascript
i: 0
i: 1
i: 2
i: 3
i: 4
5 // 間隔 0 秒後出現
5 // 間隔 1 秒後出現
5 // 間隔 2-1 = 1 秒後出現
5 // 間隔 3-2 = 1 秒後出現
5 // 間隔 4-3 = 1 秒後出現
```

這是在並行模型（concurrency model）的機制下，還有 JavaScript 中作用域（scope）與提升（hoisting）交互影響產生的結果。

並行模式相關的術語：

- call stack：翻作執行堆疊或呼叫堆疊，是負責完成同步（synchronous）程式碼的執行角色。
- API：非同步函式（asynchronous function）的來源，也是負責完成該函式的執行角色。
- task queue：翻作任務佇列，負責接收並靜置 API 完成的非同步函式的所在。
- event loop：翻作事件循環，負責監控 call stack 與 task queue 的情況，並將 task queue 中的非同步函式轉移到 call stack 來執行結果。

作用域相關的術語：

- scope：翻作作用域，變數的生存範圍。換句話話說，只要變數超出所限定的範圍，就等同不存在。
- scope chain：翻作作用域鍊。當程式在使用變數時，會為了確認變數的存在而依循 scope chain 連結起來的脈絡，在自己的作用域或朝更廣泛的範圍中尋找。

流程說明：

在並行模型的前提下，隨著 for 迴圈的執行循環，call stack 執行 `console.log('i: ' + i)`，接著執行 `setTimeout([callback])` 非同步函式的時候，就會將當中的callback function 交由關連的 API 去負責，然後繼續順著迴圈的流程進行。同時，API 也一邊執行觸發的函式，並將完成的部分回傳到 task queue 靜置。

直到變數 `i` 值遞增到不符合 `i < 5`的條件，跳出了 for 迴圈之後，call stack  呈現淨空的狀態， event loop 便將停駐在 task queue 的函式依序轉交給 call stack，讓 call stack 呈現結果。

現在，先回到當時 call stack 執行 `setTimeout()` 的狀況。對於 for 迴圈中以 `var` 宣告變數 `i` 的部分，由於宣告變數這個動作 JavaScript 會自動提升（hoisting）到作用域（scope）的頂端來建立該變數的存在。因此，變數 `i` 實際比較接近這樣的存在狀態：

``` javascript
var i
for (i = 0; i < 5; i++) {
  ...
  setTimeout(() => {
    ...
  }, i * 1000)
}
```

換句話說，變數 `i` 是以全域變數（global variable）的身份存在。隨著 for 迴圈，`setTimeout()` 的執行每次大概會是這樣的結構：

``` javascript
//建立全域變數 i
var i 
// 迴圈第一次
i = 0
setTimeout(() => {
  ...
}, 0 * 1000)

// 迴圈第二次
i++// 1
setTimeout(() => {
  ...
}, 1 * 1000)

// 以此類推
```

一直到迴圈執行完畢後，才開始執行從 task queue 轉移過來的 callback function。但由於 callback function 當中並沒有定義變數 `i`，於是便根據 scope chain 的連結查看，並在全域中找到變數 `i`——注意，由於 callback function 是在迴圈結束後才執行，而迴圈結束的條件就是當變數 `i` 不符合 `i < 5`，也就是 **`i = 5`** 的狀態——以此執行 `console.log(i)`，印出 `5`。依據當時迴圈觸發 `setTimeout()` 的次數，就會執行幾次 callback function。

