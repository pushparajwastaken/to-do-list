import { useState, useEffect } from "react";
import { useTodoStore } from "../../App/TodosStore";
export const Todos = () => {
  const { todos, toggleComplete, removeTodo } = useTodoStore();

  return (
    <div>
      {todos.length === 0 && <p>No todos yet!!</p>}
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => {
              toggleComplete(todo.id);
            }}
          />
          <span
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            {todo.title}
          </span>
          <button
            onClick={() => {
              removeTodo(todo.id);
            }}
          >
            Delete Todo
          </button>
        </div>
      ))}
    </div>
  );
};
