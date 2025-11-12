import { useState } from "react";
import "./App.css";
import Input from "./Components/Input/Input";
import { Todos } from "./Components/Todos/Todos";

function App() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start w-full gap-8 px-8">
      <Input />
      <Todos />
    </div>
  );
}

export default App;
