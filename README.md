# madoi-client-react

A React library for Distributed Information Sharing Platform: Madoi.

分散情報共有基盤MadoiのReact用クライアントライブラリ。

## How to use

```tsx
const MadoiContext = createContext({
    madoi: new Madoi("wss://host/madoi", "MADOI_API_KEY")
});
function App(){
    const ctx = useContext(MadoiContext);
    const [msg, setMsg] = useMadoiState(madoi, "hello");

    const onClick: MouseEventHandler = ()=>{
        setMsg(v => v === "hello" ? "world" : "hello");
    };

    return <div onClick={onClick}>{msg}</div>;
}
```
