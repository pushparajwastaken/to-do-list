import { create } from "zustand";
//persist is used to store all store information in local storage
import { devtools, persist } from "zustand/middleware";

const TodosStore = (set) => ({
  todos: [],
  addTodo: (todo) => {
    set((state) => ({
      todos: [...state.todos, todo],
    }));
  },
  removeTodo: (todoId) => {
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== todoId),
    }));
  },
});
