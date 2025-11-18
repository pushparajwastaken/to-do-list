import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: ({ title, deadline, priority }) => {
        const updatedTodos = [
          ...get().todos,
          {
            id: Date.now(),
            title,
            isCompleted: false,
            deadline,
            priority,
            notified: false,
            notifiedDeadline: false,
          },
        ];
        set({ todos: updatedTodos });
      },
      extractDateFromId: (todoid) => {
        const date = new Date(Number(todoid));
        return date.toISOString().split("T")[0];
      },
      grouptodobydate: (todos) => {
        return todos.reduce((groups, todo) => {
          const dateKey = get().extractDateFromId(todo.id);

          if (!groups[dateKey]) groups[dateKey] = [];
          groups[dateKey].push(todo);

          return groups;
        }, {});
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
