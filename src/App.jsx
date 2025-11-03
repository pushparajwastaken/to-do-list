import { useState } from "react";
import "./App.css";
import Input from "./Components/Input/Input";
import { Todos } from "./Components/Todos/Todos";

function App() {
  return (
    <div>
      <Input />
      <Todos />
    </div>
  );
}

export default App;
