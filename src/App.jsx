import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./Components/Input/Input";
import TodosList from "./Components/TodosList/TodosList";

function App() {
  const [Todos, setTodos] = useState([]);
  return (
    <div>
      <Input />
      <TodosList />
    </div>
  );
}

export default App;
