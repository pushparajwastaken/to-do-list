import { useState, useEffect } from "react";

import { PriorityDropdown } from "./PriorityDropdown/PriorityDropdown.jsx";
const Input = () => {
  const handlePriorityChange = (priority) => {
    console.log("Select Priority: ", priority);
  };
  return (
    <div>
      <h2>Enter your task</h2>
      <input type="text" placeholder="Task" />
      <PriorityDropdown onSelect={handlePriorityChange} />
      <button>Add</button>
    </div>
  );
};
export default Input;
