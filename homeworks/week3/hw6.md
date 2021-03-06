## hw1：好多星星

根據輸入的正整數 n，印出 n 行 “ * ” ，且 “ * ” 的數量會隨行數遞增。由於 n 的範圍最大只到 30，屬電腦處理數值的安全範圍，因此沒什麼太大的顧忌。

這個函式輸出的結果採用 `console.log`。雖然說LIOJ的讀取方式是檔案I/O的路線，所以會固定以 `console.log` 輸出結果，不過由於輸出的要求是多行的形式，所以比起使用 `return` 搭配 `\n` 斷行串接成一整段字串回傳 （經測試，LIOJ可以過），直接用 `console.log()` 會更簡潔。

## hw2：水仙花數

從正整數 n 至 m 的數字範圍中，若該數字的各個位數<sup>位數次方</sup>相加之總和與其數字相等，便是印出該數字。本題的上限為10<sup>6</sup>，也就是100萬，仍在安全範圍，不用特別留心。

在 [ALG101] 的 Project 4 做過一次，不過當時是用偷吃步的方式，也就是利用字串索引直接抓每個位數來計算。所以在這次作業中，便用數學的方式處理——利用模數以及除數來找出每個位數的值。

不過第一次實作完在replit上測試的時候，出現了無限迴圈。一開始看到的時候有點困惑（畢竟是看過檢討影片才知道用數學處理的方法）。重複檢查迴圈幾次、又默默地執行無限迴圈幾次，觀看印出來的數字，才猛然發覺到問題<strike>（同時覺得自己北七）</strike>：

```javascript
//當時的錯誤
function isNarciss(n, m) {
  for (let i = n; i <= m; i++) {
    let len = String(i).length;
    if (len === 1) {//處理個位數的部分
      console.log(i);
    } else {//處理十位數以上的部分
      let total = 0;
      while (i !== 0) {//當該數字（亦即整數商）不為0時，繼續執行該迴圈
        let digit = i % 10;//模數取餘，得到個位數的值
        quo = Math.floor(i / 10);//除數取整數商，捨去個位數的部分
        total += digit**len;//個位數之位數次方加總
      }
      if (total === i) {
        console.log(i);
      }
    }
  }
}
```

由於是直接用 for 迴圈的 i 值作為 while迴圈的跳出條件（i !== 0），所以當 i 遞增到 10 進入 while 迴圈的時候，於是 i 值便在這裡被模數跟除數洗白到 0 <strike>（最強一匙零有沒有）</strike>，這時也就是 i = 0；變數 total 最後得到 1（0<sup>1</sup> + 1<sup>1</sup> = 1），而 total === 0 並不成立，因此沒有印出；當這個 block 中的程式跑完後，由於 i = 0 還在 m 值範圍內，於是遞增 i 值，此刻便是 i = 1，然後一直安然無事印到 9，接著繼續重新洗白歸 0⋯⋯造就了值不過 10 的無限迴圈。

將 i 值複製到一個新的變數 quo （擷取 quotient，商數），然後以 quo 作為 while 迴圈的跳出條件（quo !== 0），這樣就不會影響整體 for 迴圈的行進，也就能如預期比對十位數以上的值是否為水仙花數。

## hw3：判斷質數

判斷正整數 p 是否為質數。題目的上限範圍是100000（即10<sup>5</sup>），是非常安全的範圍值。

以前有在 Codewars 解過，不過當時是還在熟悉 Python 的階段，然後腦中的數學概念還處在未開化的時代，儘管對於怎麽快速判斷質數這件事的理解糾結了很久，那時候的 code 還是寫得落落長。

在這裡除了 1 之外（根據題目直接回傳 'Composite'），對於 2 之後的數字直接用試除法——取開根號 p 的整數，再以該整數範圍以內的數字一一對 p 進行整除。如果餘數為 0 表示是 p 的因數，也就意味 p 不是質數。試除法在[單位1千萬之內](https://www.geeksforgeeks.org/sieve-of-eratosthenes/)都還有效，所以目前試除法是可以應付的。

## hw4：判斷迴文

一個字串倒過來拼還是一樣的字串就是迴文。字串長度的上限為100，是安全範圍。

其實只要從頭與尾兩端的字元往中間的方向不斷地對照，全部都相同的話就必然是迴文。換句話說，只需要字串長度的一半就能比對完首末兩端的字元來判斷是否為迴文。

先找出字串一半的長度（取整數）並存入變數 lenHalf，然後在 for 迴圈設置變數 i = 0 及 j = str.length - 1，然後在 i <= lenHalf 作為迴圈結束的條件；這邊反過來設成 j >= lenHalf、i < lenHalf 或 j > lenHalf 都可以。有沒有附設等於的條件差異主要是正中間的字元——當字串長度是奇數時，正中間的字元不會被比對到，不過也因為它不成對，而且就算倒過來也還是在原來的位置，完全沒影響；而字串長度為偶數時，因字元是成對的，i 和 j 又是同時進退的關係，所以不會有遺漏比對的疑慮。若是字串長度只有 1 的時候，則不會進入 for 迴圈，會直接回傳 'True'。

i 值隨迴圈遞增、j 值則遞減。當兩者所在的字元不相等，那就一定不是迴文，所以回傳 'False'；如果比對完都相同，便回傳 'True'。

## hw5：聯誼順序比大小

先根據 K 決定是比大或比小，再決定 A 與 B 哪個勝出，如果兩者數字相等則為平手。M表示比賽的次數，上限是 50，雖然是安全範圍，不過實際上程式本身不會使用到這個部分。而 A 與 B 的數值是在 **512 個位數**之內，這其實遠遠超過 `Number.MAX_SAFE_INTEGER` 的範疇（16 個位數），所以這裡勢必得**用字串來處理**。

這題其實意外有卡到<strike>是關不是陰</strike>。雖然一開始也是自己沒注意，只是很單純地想就是轉換成 int 型態來比較，然後遵循 DRY 原則，先將 a 與 b 的比較結果分別把要回傳的 'A' 跟 'B' 存入變數 high 跟 low 當中（如果兩者相等就直接回傳 'DRAW' ），然後再根據 k 的值回傳相應的變數即可。

當然拿一開始的範例做測試的話一定會過，但跑 LIOJ 就很自然地WA了。一開始有先確認自己的設定邏輯有沒有錯，然後有點白目地又按了幾次，再仔細看一次題目的條件，才終於注意到 512 個位數這個部分。

所以這裡就把 a 與 b 的比較改成 a 與 b 字串長度的比較——這可以先解決位數不同的比較，畢竟位數多的表示該值一定比較大。

再來就是處理相同長度但內容不相等的部分——當變數 high （或 low 亦可）為空值的時候，從字串索引 i = 0 開始比對（最大的位數），直到 a 與 b 分出大小病傳入變數 high 和 low 為止。但當時可能已經有點累了，沒有想得很清楚，結果想成「位數比對若相等，則必須串接下一個位數再繼續比對，以避免大小產生誤差」的謬誤：

```javascript
//當時的謬誤
function highLow(a, b, k) {
  let high = '';
  let low = '';
  if (a === b) {
    return 'DRAW';
  } else if ( a.length > b.length) {
    high = 'A';
    low = 'B';
  } else if (a.length < b.length) {
    high = 'B';
    low = 'A';
  } else {//處理長度相等、內容不同的部分
    let aDigit = a[0];//從 a 最大的位數開始，後用來串接 a 的下一位數
    let bDigit = b[0];//從 a 最大的位數開始，後用來串接 b 的下一位數
    let i = 1;//用作字串索引的變數 i，因上面兩個變數已經從0開始，所以這裡設置為 1
    while (!high) {//在變數 high 是空值的情況下執行迴圈
      if (Number(aDigit) > Number(bDigit)) {//當 aDigit 大於 bDigit
        high = 'A';
        low = 'B';
      } else if (Number(aDigit) < Number(bDigit)) {//當 bDigit 大於 aDigit
        high = 'B';
        low = 'A';
      } else { //當兩者相等
        aDigit += a[i];//串接下一個位數 a[i]
        bDigit += b[i];//串接下一個位數 b[i]
      }
      i++;//i 遞增
    }
  }
  if (k == -1) {
    return low;
  } else if (k == 1) {
    return high;
  }
}
```

額外設置了用來串接的變數 aDigit 以及 bDigit，還有 else block 來處理串接的部分。單純從邏輯上看好像也不會出錯？的樣子，不過總之進 LIOJ 跑，則是跑出Runtime Error。由於看不到錯誤的輸出或錯誤的部分在哪裡，又重試了幾次（然後不禁有點懷疑系統，但客觀看 mattermost 或 GitHub 沒有多數人提出類似的疑問，而其他人也有通過這個題目，所以反而能肯定是自己程式的問題），接著又在網路上找找有沒有可以參考，意外有搜到前輩的筆記，然後試試看對方的解法能不能過，如果過了就去了解自己寫的和對方不同在哪裡？思考為什麼對方的 code 不會有問題？然而也是出現 Runtime Error。

在這個當下其實思考已經陷入情緒當中，並不適合再繼續處理這個問題，所以便決定不再想這件事，一方面也告訴自己，其實也只剩這一題程式題，明天也不是宇宙爆炸的日子（？），只是星期三。於是之後就是放空（但現在還真的回想不起來那時候做了什麼），結果睡前關上電腦的剎那，突然就想通了：其實根本不用串接位數，既然等值就根本沒差嘛！況且又是從最大位數往回比，所以只要比到其中一個位數有差異就能定勝負了。雖然還不能確定這是不是就能克服 Runtime Error（畢竟不是答案錯誤，而是運行錯誤，造成運行錯誤的可能就滿多的），但至少這是一個改的方向。如果最後真的不行再去問就可以了。

於是今天照著上面的方向修改，刪除了不必要的變數跟 else block，再丟 LIOJ 跑，這次終於成功了。