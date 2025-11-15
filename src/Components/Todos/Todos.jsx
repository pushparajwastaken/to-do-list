import { useRef, useEffect } from "react";
import { Pencil, X, CheckSquare } from "lucide-react";
import { useTodoStore } from "../../App/TodosStore";

export const Todos = () => {
  const { todos, toggleComplete, removeTodo, editTodo } = useTodoStore();
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        console.log("Notification permission:", perm);
      });
    } else {
      console.log("Notifications not supported in this browser.");
    }
  }, []);
  const todoref = useRef(null);
  useEffect(() => {
    if (!("Notification" in window) || Notification.permission !== "granted")
      return;

    const checkDeadlines = () => {
      const now = new Date();

      todos.forEach((todo) => {
        if (!todo.deadline || todo.isCompleted) return;

        const [hours, minutes] = todo.deadline.split(":").map(Number);
        const deadlineDate = new Date();
        deadlineDate.setHours(hours, minutes, 0, 0);

        const diffMinutes = (deadlineDate - now) / 60000;

        if (diffMinutes <= 5 && diffMinutes > 0 && !todo.notified) {
          new Notification("⏰ Task Reminder", {
            body: `${todo.title} is due in ${Math.round(diffMinutes)} minute${
              Math.round(diffMinutes) !== 1 ? "s" : ""
            }!`,
          });
          todo.notified = true;
        }

        if (diffMinutes <= 0 && !todo.isCompleted && !todo.notifiedDeadline) {
          new Notification("🚨 Deadline Reached!", {
            body: `${todo.title} deadline is now.`,
          });
          todo.notifiedDeadline = true;
        }
      });
    };

    checkDeadlines();
    const interval = setInterval(checkDeadlines, 60000);
    return () => clearInterval(interval);
  }, [todos]);

  return (
    <div className="font-mono flex justify-center w-full min-h-screen">
      {todos.length === 0 ? (
        <p className="md:w-1/2 w-full text-center pt-24 text-5xl font-mono">
          No tasks yet
        </p>
      ) : (
        <div className="flex flex-col w-full gap-4 p-4 items-start md:w-1/2 ">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center w-full p-4
               text-lg border-4 border-black border-spacing-y-3  hover:scale-105  shadow-[8px_8px_0px_0px_#000] transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#000]"
            >
              <CheckSquare
                onClick={() => toggleComplete(todo.id)}
                className={`w-6 h-6 cursor-pointer hover:scale-110 transition-transform ${
                  todo.isCompleted ? "text-green-600" : ""
                }`}
              />
              <p
                className={`font-semibold ${
                  todo.isCompleted ? "line-through opacity-60" : ""
                }`}
              >
                {todo.title}
              </p>
              <p className="text-xs">{todo.deadline}</p>
              <p className="text-base">{todo.priority}</p>
              <div className="flex items-center gap-3">
                <Pencil
                  onClick={() => {
                    const newTitle = prompt("Edit task title:", todo.title);
                    if (newTitle && newTitle.trim() !== "") {
                      editTodo(todo.id, { title: newTitle });
                    }
                  }}
                  className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors"
                />
                <X
                  onClick={() => removeTodo(todo.id)}
                  className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
