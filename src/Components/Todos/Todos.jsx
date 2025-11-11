import { useState, useEffect } from "react";
import { useTodoStore } from "../../App/TodosStore";
export const Todos = () => {
  const { todos, toggleComplete, removeTodo } = useTodoStore();

  return (
    <div>
      {todos.length === 0 ? (
        <p className="text-5xl font-mono px-32 py-56 m-8">No todos yet</p>
      ) : (
        <div>
          {todos.map((todo) => (
            <p key={todo.id}>{todo.title})</p>
          ))}
        </div>
      )}
    </div>
  );
};
