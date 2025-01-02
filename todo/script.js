document.addEventListener("DOMContentLoaded", () => {
  const todoin = document.getElementById("Input");
  const taskbtn = document.getElementById("add-task-btn");
  const todolist = document.getElementById("todo-list");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((ta) => rendertask(ta));
  taskbtn.addEventListener("click", function () {
    const tasktext = todoin.value.trim();
    if (tasktext === "") return;
    const taskobj = { id: Date.now(), text: tasktext, completed: false };
    tasks.push(taskobj);
    saveTasks();
    rendertask(taskobj);
    todoin.value = ""; //clear input
    console.log(tasks);
  });
  function rendertask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("Completed");
    li.innerHTML = `<span>${task.text}</span><button class="delete-btn">Delete</button>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });
    todolist.appendChild(li);
  }
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
