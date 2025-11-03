import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (title) => {
        const updatedTodos = [
          ...get().todos,
          {
            id: Date.now(),
            title,
            isCompleted: false,
          },
        ];
        set({ todos: updatedTodos });
      },
      removeTodo: (todoId) => {
        const updatedTodos = get().todos.filter((todo) => todo.id !== todoId);
        set({ todos: updatedTodos });
      },
      toggleComplete: (todoId) => {
        const updatedTodos = get().todos.map((todo) =>
          todo.id === todoId
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        );
        set({ todos: updatedTodos });
      },
      editTodo: (todoId, newData) => {
        const updatedTodos = get().todos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                ...newData,
              }
            : todo
        );
        set({ todos: updatedTodos });
      },
      clearAll: () => set({ todos: [] }),
    }),
    {
      name: "todo-storage",
    }
  )
);
