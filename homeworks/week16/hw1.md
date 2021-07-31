``` javascript
console.log(1)
setTimeout(() => console.log(2), 0)
console.log(3)
setTimeout(() => console.log(4), 0)
console.log(5)
```

上述程式所印出的結果： 

``` javascript
1
3
5
2
4
```

這是在於避免阻塞（blocking）的發生，配合同步（synchronous）與非同步（asynchronous）的執行流程，也就是所謂並行模型（concurrency model）。

並行模式相關的術語：

- call stack：翻作執行堆疊或呼叫堆疊，是負責完成同步（synchronous）程式碼的執行角色。
- API：非同步函式（asynchronous function）的來源，也是負責完成該函式的執行角色。
- task queue：翻作任務佇列，負責接收並靜置 API 完成的非同步函式的所在。
- event loop：翻作事件循環，負責監控 call stack 與 task queue 的情況，並將 task queue 中的非同步函式轉移到 call stack 來執行結果。

流程說明：

當 JavaScript 中隨著程式碼逐一往下執行時，call stack 會依序堆疊並執行程式碼的指令。不過一旦碰到 `setTimeout([callback])` 這類非同步的函式時，就會是由相關的 API 來執行當中的 callback function，並將完成的 callback function 回傳到 task queue 靜置；在此同時， call stack 便繼續向下執行，直到所有 call stack 能進行的執行緒完成為止。

這時，扮演監控 call stack 和 task queue 狀況的中介角色 event loop，注意到 call stack 已經是淨空的狀態，於是便將 task queue 中佇列的執行緒一一轉給 call stack 來呈現結果，直到 task queue 清空為止，最後程式才算執行完畢。