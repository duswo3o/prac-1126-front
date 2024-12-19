import "./App.css";
import { useRecoilState } from "recoil";
import { countState } from "./atom";

function Counter() {
  const [count, setCount] = useRecoilState(countState);
  return (
    <div>
      <h1>Counter</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      {count}
    </div>
  );
}

function DisplayCounter() {
  const [count, setCount] = useRecoilState(countState);
  return <div>{count}</div>;
}

function App() {
  return (
    <div>
      <Counter />
      <DisplayCounter />
    </div>
  );
}

export default App;
