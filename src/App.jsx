import { useState } from "react";
import "./App.css";
import Input from "./Components/Input/Input";
import { Todos } from "./Components/Todos/Todos";

function App() {
  return (
    <div className="flex gap-6 justify-between items-start p-4">
      <Input />
      <Todos />
    </div>
  );
}

export default App;
