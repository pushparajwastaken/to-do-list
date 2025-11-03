import { stringify } from "postcss";
import { create } from "zustand";
export const useTodoStore = create((set, get) => ({
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  addTodo: (todo) => {
    const updatedTodos = [...get().todos, todo];
    set({ todos: updatedTodos });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  },
  deleteTodo: (todoId) => {
    const updatedTodos = get().todos.filter((todo) => todo.id !== todoId);
    set({ todos: updatedTodos });
    localStorage.setItems("todos", JSON, stringify(updatedTodos));
  },
  toggleComplete: (todoId) => {
    const updatedTodos = get().todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    set({ todos: updatedTodos });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  },
  editTodos: (todoId, newDesc) => {
    constUpdatedTodos = get().todos.map((todo) => {
      todo.id === todoId ? { ...todo, ...newDesc } : t;
    });
    set({ todos: updatedTodos });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  },
  clearAll: () => {
    set({ todos: [] });
    localStorage.removeItem("todos");
  },
}));
