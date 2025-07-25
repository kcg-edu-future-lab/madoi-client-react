# madoi-client-react

A React library for <a href="https://github.com/kcg-edu-future-lab/madoi">Distributed Sharing Platform: Madoi</a>.

<a href="https://github.com/kcg-edu-future-lab/madoi">分散共有基盤Madoi</a>のReact用クライアントライブラリ。

[![Current Release](https://img.shields.io/npm/v/madoi-client-react.svg)](https://www.npmjs.com/package/madoi-client-react)
[![Licence](https://img.shields.io/github/license/kcg-edu-future-lab/madoi-client-react.svg)](https://github.com/kcg-edu-future-lab/madoi-client-react/blob/master/LICENSE)


## Install

```bash
npm i madoi-client madoi-client-react
```

## Getting started

### Prepare Madoi instance

```jsx
const MadoiContext = createContext({
    madoi: new Madoi("wss://host/madoi-server/rooms/room000", "MADOI_API_KEY")
});
```

最初に<a href="https://github.com/kcg-edu-future-lab/madoi-client-ts-js">Madoiクライアント</a>を作成してください。引数は<a href="https://github.com/kcg-edu-future-lab/madoi/tree/master/madoi-volatileserver">Madoiサーバ</a>のURLとAPIキーです。あらかじめ、Madoiサーバを起動しておく必要があります。

### Example for shared state (useSharedState)

```jsx
function StateExample(){
  const ctx = useContext(MadoiContext);
  const [msg, setMsg] = useSharedState(ctx.madoi, "hello");
  const onClick: MouseEventHandler = ()=>{
    // setメソッドに渡された状態は、全てのアプリケーションに共有される
    setMsg(v => v === "hello" ? "world" : "hello");
  }
  return <div>
      <h4>madoi state</h4>
      <button onClick={onClick}>{msg}</button>
    </div>;
}
```

`useSharedState` は、`useState` の分散共有版です。
同じMadoiサーバ上のルームに参加しているアプリケーション間で、状態の同期が行われます。
上記の例では、一つのアプリケーション内で `setMsg` が実行されると、新しい状態が全てのアプリケーションに通知され、既存の状態と異なる場合はReactのレンダリングが行われます。
クリックハンドラで `setMsg` が呼び出されているので、ボタンがクリックされるたびに全てのアプリケーションでラベルが変更されます。

`useSharedState` は、手軽に利用できる反面、毎回状態を送信するため、サイズが大きい場合(例えば画像の場合)は通信コストが増大します。
また、利用者間で状態変更操作が競合しやすいという欠点があります(例えば画像に対して2人が同時に描画した場合、後で描画した方の状態で上書きされてしまう)。

次に紹介する `useSharedModel` は、状態の更新操作を個別に共有するため、競合の回避が行いやすい方式です。


### Example for shared model (useSharedModel)

```jsx
/*
 * チャットログを保持するモデルクラス
 */
class ChatLogs{
  private logs: string[] = [];

  // 状態を変更するメソッドには@Shareデコレータを追加する
  @Share()
  addLog(text: string){
    this.logs = [...this.logs, text];
  }

  // 状態を取得するメソッドには@GetStateデコレータを追加する
  @GetState()
  getLogs(){
    return this.logs;
  }

  // 状態を設定するメソッドには@SetStateデコレータを追加する
  @SetState()
  setLogs(logs: string[]){
    this.logs = logs;
  }
}

function ModelExample(){
  const ctx = useContext(MadoiContext);
  const inputRef = useRef<HTMLInputElement>(null!);
  const logs = useSharedModel(ctx.madoi, ()=>new ChatLogs());

  const onSubmit: FormEventHandler = e=>{
    e.preventDefault();
    // @Shareが追加されたメソッドの呼び出しは、他の全てのアプリケーションでも実行される
    logs.addLog(inputRef.current.value);
  }

  return <div>
    <h4>madoi model</h4>
    <form onSubmit={onSubmit}>
      <input ref={inputRef} type="text"></input>
    </form>
    <div>
      {logs.getLogs().map(l => <div>{l}</div>)}
    </div>
  </div>;
}
```

`useSharedModel` は、状態を保持し、かつ状態への変更操作を持っているオブジェクトを登録します。
登録したオブジェクトの変更メソッド(`@Share`が追加されたメソッド)が実行されると、他の全てのアプリケーションでも実行されます。
より厳密に言うと、実行が`Madoi`ライブラリにより横取りされ、引数とともにサーバへ送信され、全てのアプリケーションに送信され、
アプリケーションで受信した際にメソッドが実行されます。
複数のクライアントで同時にメソッドが実行された場合も、サーバに届いた順にアプリケーションへ送信されるため、全てのアプリケーションでメソッドの実行順は同じになります。

メソッドの実行後、状態取得メソッド(`@GetState`が追加されたメソッド)が実行され、状態が取得されます。
次に、取得した状態と、実行前の状態との比較が行われ、変更されていれば、`React`のレンダリングが行われます。
また、状態は`Madoi`サーバにも送信され、アプリケーションが新しく参加してくれば、そのアプリケーションに通知されます。

これにより、チャットログの追加や画像への描画など、異なるアプリケーションで同時に起こりうる操作を、
取りこぼすことなくモデル内の状態に反映できます(実際には`@Share`が追加されたメソッド内で操作が合成されるよう実装しておく必要があります)。


## まとめ

madoi-client-reactにより、MadoiとReactを組み合わせ、分散共有アプリを宣言的な記述で設計、実装できます。

より具体的なアプリケーション開発例は、[ビデオ会議付きコラボレーションツール Presence](https://github.com/kcg-edu-future-lab/presence/)を参照ください。

