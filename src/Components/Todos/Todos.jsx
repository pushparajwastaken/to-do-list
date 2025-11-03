import { useState, useEffect, useCallback } from "react";
import { useTodoStore } from "../../App/TodosStore.js";
import React from "react";
import { priorityLevels } from "../../App/index.js";
const Input = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const [showPopUp, setShowPopUp] = useState(false);
  const [taskTitle, setTaskTitle] = useState(false);
  const [priority, setPriority] = useState(priorityLevels[0].label);
  const handleAdd = () => {
    if (!taskTitle.trim()) return alert("Enter a task");
    const newTodo = {
      id: Date.now(),
      title: taskTitle,
      priority,
      isCompleted: false,
      time: new Date().toISOString(),
    };
    addTodo(newTodo);
    setTaskTitle("");
    setShowPopUp(false);
  };
  return (
    <div>
      <button
        onClick={() => {
          setShowPopUp(true);
        }}
      >
        Add a task
      </button>
      {showPopUp && (
        <div>
          <h2>Enter a task</h2>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task"
          />
          <button
            onClick={() => {
              handleAdd();
            }}
          >
            Add
          </button>
          <button onClick={() => setShowPopUp(false)}> Cancel</button>
        </div>
      )}
    </div>
  );
};
export default Input;
