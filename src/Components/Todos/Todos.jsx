import { useRef, useEffect } from "react";
import { Pencil, X, CheckSquare } from "lucide-react";
import { useTodoStore } from "../../App/TodosStore";

export const Todos = () => {
  const { todos, toggleComplete, removeTodo, editTodo, grouptodobydate } =
    useTodoStore();
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        console.log("Notification permission:", perm);
      });
    } else {
      console.log("Notifications not supported in this browser.");
    }
  }, []);
  const grouped = grouptodobydate(todos);
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
        <div className="flex flex-col w-full gap-8 p-4 items-start md:w-1/2">
          {Object.keys(grouped)
            .sort()
            .map((date) => (
              <div key={date} className="w-full">
                <h2 className="text-3xl font-extrabold mb-4">
                  {new Date(date).toDateString().split(" ").slice(1).join(" ")}
                </h2>

                {grouped[date].map((todo) => (
                  <div
                    key={todo.id}
                    className="flex flex-wrap items-center gap-4 w-full p-4
                    text-lg border-4 border-black hover:scale-105 rounded-3xl
                    shadow-[8px_8px_0px_0px_#000] transition-all duration-300
                    hover:translate-x-[-4px] hover:translate-y-[-4px]
                    hover:shadow-[12px_12px_0px_0px_#000] bg-white mb-4"
                  >
                    <CheckSquare
                      onClick={() => toggleComplete(todo.id)}
                      className={`w-6 h-6 cursor-pointer hover:scale-110 transition-transform ${
                        todo.isCompleted ? "text-green-600" : ""
                      }`}
                    />
                    <p
                      className={`font-semibold truncate ${
                        todo.isCompleted ? "line-through opacity-60" : ""
                      }`}
                    >
                      {todo.title}
                    </p>

                    <p className="text-xs">{todo.deadline}</p>
                    <p className="text-base mr-auto">{todo.priority}</p>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Pencil
                        onClick={() => {
                          const newTitle = prompt(
                            "Edit task title:",
                            todo.title
                          );
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
            ))}
        </div>
      )}
    </div>
  );
};
