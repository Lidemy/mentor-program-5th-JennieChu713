## 請列出 React 內建的所有 hook，並大概講解功能是什麼

1. `useState`

   用於設定資料的狀態。透過 `setState(新的值)` 來改變 state 原本的資料，並觸發 REACT virtual DOM 找到變化差異時重新渲染畫面。

2. `useEffect`

   表示在 render 完成後才要執行的部分，也就是如 side-effect 的作用。第一個參數接收 callback function，第二個參數則可以放入一個陣列，當中可以內含 state 資料來做表示執行的判斷依據。

3. `useContext`

   可以令其所包覆的 components 存取使用傳遞的資料，而不用透過 props drilling 的方式層層傳遞直到需要的 component 上，如同定義了一組全域變數的物件。

4. `useReducer`

   可應用在複合性的 state 狀況，且會依之前的 state 來執行變化。第一個傳入的是處理 state 的callback function，第二個參數則為 state的初始值。解構提取的的變數為 `state`以及 `dispatch`。`state` 即資料的狀態值，dispatch 則是接收依據 callback function 制定的參數所需傳入的值來執行邏輯處理。

5. `useCallback`

   會記住 callback 回傳的 function 整體，也就是包含 callback 本身，並只在依據的 state 改變時才更新。這相當於 `useMemo(() => {fn}, deps)`

6. `useMemo`

   會記住回傳的值，並在依據的 state改變時才更新。

7. `useRef`

   其存放的值透過 `.current`改變時，也不會觸發 render，只在 render 時給於同一個 ref 物件值，是一個可變數（mutable）。

8. `useImperativeHandle`

   如同 `useRef`，但是可由父層存取。第一個參數是 `ref`的部分，第二個參數則為傳給父層的 callback function，最後則是依據 state 的陣列。

9. `useLayoutEffect`

   類似 `useEffect`，但執行時機點是在 render 之前。

10. `useDebugValue`

    應用在 React DevTools顯示自訂義的 hook。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

class Component 一個循環有 3 個 lifecycle以及其對應的 method：

1. Mounting - 已經透過 React Virtual DOM 找出差異，並置換真正的 DOM
   1. `componentWillMount()`： component 要開始 mounting 的階段所要執行的處理。
   2. `componentDidMount()`： component mount 完成的階段所要執行的處理。
2. Updating - 重新渲染畫面到完成
   1. `componentWillRecieveProps(<object=nextProps>)`：component 接收到新的 props 時執行的處理。
   2. `shouldComponentUpdate(<object=nextProps>, <object=nextState>)`：component 透過新的 props 和 state 比對判斷是否要重新渲染。
   3. `componentWillUpdate(<object=nextProps>, <object=nextState>)`： component 即將更新渲染畫面的階段的處理。
   4. `componentDidUpdate(<object=prevProps>, <object=prevState>)`：component 重新渲染完成時指定執行的處理。
3. UnMounting - 移除真正的DOM
   1. `componentWillUnmount()`：component 即將移除的階段所指定的處理。

## 請問 class component 與 function component 的差別是什麼？

class component 可以依照內建的 lifecycle method 來指定各階段上的執行處理，但 function component 只能依據 state 與 dependency 的變化重新渲染，或是使用 useEffect 或 useLayoutEffect 在渲染後與渲染前的階段指定，比較不如 class component 容易在細節上進行調整。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

也就是 component 的資料是否為 React 可控的差異。換句話說，可控的資料來自於 state 的使用，而不可控的資料就是源自對 html DOM 參照來取得。這些部分的應用最常見於 form 表單的資料。個別使用的方法如下：

```react
// controlled component way
function App() {
  const [name, setName] = useState("charlie the unicorn")
  const handleChange(e) => setName(e.target.value)
  const handleSubmit(e) => e.preventDefault()
  
  return (
    <form onSubmit={handleSubmit}>
    <input type="text" value={name} onChange={handleChange}/>
      <input type="submit"/>
    </form>
  )
}

// uncontrolled component way
function App() {
  const name = useRef("charlie the unicorn")
  const handleChange(e) => name.current = e.target.value
  const handleSubmit(e) => e.preventDefault()
  
  return (
    <form onSubmit={handleSubmit}>
    <input type="text" ref={name} onChange={handleChange}/>
      <input type="submit"/>
    </form>
  )
}
```

一般來說都會建議使用 controlled component，也就是使用 React state 的設定來存取資料。但唯獨 `<input type="file"/>` 用作上傳檔案的 input 標籤，由於僅可取值的特性，只能透過 unconrolled component 來處理。
