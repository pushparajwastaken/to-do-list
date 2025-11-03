import React, { useState } from "react";
import { useTodoStore } from "../../App/TodosStore.js";
import { priorityLevels } from "../../App/index.js";
import { PriorityDropdown } from "./PriorityDropdown.jsx";

const Input = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const [showPopUp, setShowPopUp] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState(priorityLevels[1].value); // default "high

  const handleAdd = () => {
    if (!taskTitle.trim()) return alert("Enter a task");
    addTodo(taskTitle);
    setTaskTitle("");
    setShowPopUp(false);
  };

  return (
    <div>
      <button onClick={() => setShowPopUp(true)}>Add a Task</button>

      {showPopUp && (
        <div>
          <h2>Enter your task</h2>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task"
          />
          <p>Set Priority</p>
          <PriorityDropdown />
          <button onClick={handleAdd}>Add</button>
          <button onClick={() => setShowPopUp(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Input;
