### Hook

| Hook 名稱               | 用途                       |
|-----------------------|--------------------------| 
| useState              | 管理簡單狀態，例如數據或布爾值。         |
| useEffect             | 處理副作用，例如 API 請求或 DOM 操作。 |
| useSession            | 管理用戶登入狀態（需要外部庫支持）。       |
| useContext            | 訪問全局共享狀態，例如主題、語言。        |
| useReducer            | 管理複雜的狀態邏輯，例如多步操作。        |
| useRef                | 訪問 DOM 或保持不會改變的數據。       |
| useCallback           | 優化函式的重新創建問題。             |
| useMemo               | 優化計算的性能。                 |
| useLayoutEffect       | 在 DOM 更新後立即執行邏輯。         |
| useImperativeHandle   | 自定義對 ref 的處理邏輯。          |
| useImperativeHandle   | 自定義對 ref 的處理邏輯。          |
|                       |                          |

---
#### useState
- 用途：管理簡單狀態，例如數字、布爾值或字串。
```
import React, { useState } from "react";

function Counter() {
const [count, setCount] = useState(0);

    return (
        <div>
            <p>目前計數：{count}</p>
            <button onClick={() => setCount(count + 1)}>增加</button>
        </div>
    );
}
```

---
#### useEffect
- 用途：執行副作用，例如 API 請求、DOM 操作或事件監聽。
```
import React, { useState, useEffect } from "react";

function FetchData() {
const [data, setData] = useState(null);

    useEffect(() => {
        fetch("https://api.example.com/data")
            .then((res) => res.json())
            .then((result) => setData(result));
    }, []); // 空依賴陣列表示僅在組件第一次渲染時執行

    return <div>{data ? JSON.stringify(data) : "加載中..."}</div>;
}
```

---
#### useSession
- 用途：用於管理用戶登入狀態，通常需要配合外部庫（如 NextAuth.js）。
```
import { useSession } from "next-auth/react";

function UserProfile() {
const { data: session, status } = useSession();

    if (status === "loading") return <p>加載中...</p>;
    if (!session) return <p>未登入</p>;

    return (
        <div>
            <p>用戶：{session.user.name}</p>
            <img src={session.user.image} alt="用戶頭像" />
        </div>
    );
}
```

---
#### useContext
- 用途：訪問全局共享狀態，例如主題或用戶數據。
```
import React, { createContext, useContext } from "react";
   const ThemeContext = createContext("light");
   
   function ThemeDisplay() {
      const theme = useContext(ThemeContext);
      return <p>當前主題：{theme}</p>;
   }
   
   export default function App() {
      return (
         <ThemeContext.Provider value="dark">
            <ThemeDisplay />
         </ThemeContext.Provider>
   );
}
```

---
#### useReducer
- 用途：管理複雜的狀態邏輯，類似於 Redux 的 reducer。

範例：

```
import React, { useReducer } from "react";

function reducer(state, action) {
   switch (action.type) {
      case "increment":
         return { count: state.count + 1 };
      case "decrement":
         return { count: state.count - 1 };
      default:
         throw new Error();
   }
}

function Counter() {
const [state, dispatch] = useReducer(reducer, { count: 0 });
    return (
        <div>
            <p>計數：{state.count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>增加</button>
            <button onClick={() => dispatch({ type: "decrement" })}>減少</button>
        </div>
    );
}
```

---
#### useRef
- 用途：獲取 DOM 元素或保存不會改變的數據。
```
import React, { useRef } from "react";

function FocusInput() {
const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.focus(); // 聚焦輸入框
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="點擊按鈕聚焦" />
            <button onClick={handleFocus}>聚焦輸入框</button>
        </div>
    );
}
```

---
#### useCallback
- 用途：記憶函式，避免不必要的重新創建，提升性能。
```
import React, { useState, useCallback } from "react";

function Counter() {
const [count, setCount] = useState(0);

    const increment = useCallback(() => {
        setCount((prevCount) => prevCount + 1);
    }, []);

    return (
        <div>
            <p>計數：{count}</p>
            <button onClick={increment}>增加</button>
        </div>
    );
}
```

---
#### useMemo
- 用途：記憶計算結果，避免不必要的重新計算。
```
import React, { useState, useMemo } from "react";

function ExpensiveCalculation({ number }) {
   const compute = (num) => {
   console.log("計算中...");
   return num * 2;
};

    const result = useMemo(() => compute(number), [number]);

    return <p>計算結果：{result}</p>;
}

function App() {
const [count, setCount] = useState(0);

    return (
        <div>
            <ExpensiveCalculation number={count} />
            <button onClick={() => setCount(count + 1)}>增加數字</button>
        </div>
    );
}
```

---
#### useLayoutEffect
- 用途：在 DOM 更新後立即執行邏輯，通常用於測量 DOM 元素尺寸。
```
import React, { useState, useRef, useLayoutEffect } from "react";

function Box() {
const boxRef = useRef(null);
const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        setBoxSize({
            width: boxRef.current.offsetWidth,
            height: boxRef.current.offsetHeight,
        });
    }, []);

    return (
        <div>
            <div ref={boxRef} style={{ width: 100, height: 50, backgroundColor: "blue" }} />
            <p>盒子尺寸：{boxSize.width}x{boxSize.height}</p>
        </div>
    );
}
```
---
#### useImperativeHandle
 - 用途：自定義 ref 的行為，通常與 forwardRef 一起使用。
```
import React, { useRef, forwardRef, useImperativeHandle } from "react";

const CustomInput = forwardRef((props, ref) => {
const inputRef = useRef();

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current.focus(),
    }));

    return <input ref={inputRef} {...props} />;
});

function App() {
const inputRef = useRef();

    return (
        <div>
            <CustomInput ref={inputRef} placeholder="點擊按鈕聚焦" />
            <button onClick={() => inputRef.current.focus()}>聚焦輸入框</button>
        </div>
    );
}
