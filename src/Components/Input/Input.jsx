import { useState } from "react";

import { useTodoStore } from "../../App/TodosStore";
const Input = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const downloadCard = useTodoStore((state) => state.downloadCard);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("High 🔥");
  const handleSubmit = (e) => {
    e.preventDefault();
    const deadline = `${time}`;
    if (new Date(deadline) < new Date())
      return alert("Deadline must be in the future!");
    if (!title.trim()) return alert("Please Enter a task!");
    addTodo({
      title,
      deadline,
      priority,
    });
    setTitle("");

    setTime("");
    setPriority("High 🔥");
  };
  return (
    <div className="rounded-3xl md:w-1/2 w-full p-8 ml-2 border-black border-4 my-8 hover:scale-105  shadow-[8px_8px_0px_0px_#000] transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#000]">
      <p className="text-5xl px-2 font-mono mb-6">Add Tasks</p>
      <form onSubmit={handleSubmit} className="font-mono space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <input
              type="text"
              value={title}
              placeholder="Enter your task"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full box-border font-mono h-12 px-4 flex rounded-lg border-2 border-black  focus:border-black"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="Deadline" className="font-mono text-xl mb-1">
              Deadline
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border-2 border-black rounded-lg h-12 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="priority" className="font-mono text-xl mb-1">
              Priority
            </label>
            <select
              value={priority}
              id="priority"
              onChange={(e) => setPriority(e.target.value)}
              className="border-black box-border border-2 rounded-lg w-full h-[3rem] px-3 bg-white"
            >
              <option value="High 🔥">High 🔥</option>
              <option value="Medium ⚖️">Medium ⚖️</option>
              <option value="Low 🧘">Low 🧘</option>
            </select>
          </div>
        </div>
        <br />
        <button
          type="submit"
          className="font-mono w-full h-12 rounded-lg px-4  bg-black  hover:bg-neutral-500 text-white "
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Input;
