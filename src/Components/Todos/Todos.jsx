import { useState, useEffect } from "react";
import { useTodoStore } from "../../App/TodosStore";
export const Todos = () => {
  const { todos, toggleComplete, removeTodo } = useTodoStore();

  return (
    <div className="font-mono">
      {todos.length === 0 ? (
        <p className="md:w-1/2 w-full p-3 text-5xl font-mono">No todos yet</p>
      ) : (
        <div className="border-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className=" w-full border-4 border-black border-spacing-y-3 md:w-1/2"
            >
              <p>{todo.title}</p>
              <p>{todo.deadline}</p>
              <p>{todo.priority}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
