import { useState, useEffect } from "react";
import { useTodoStore } from "../../App/TodosStore";
const Input = () => {
  const { addTodo } = useTodoStore((state) => state.addTodo);

  addTodo: return (
    <div className="rounded-3xl border-black border-4 px-32 py-48 m-8">
      <p className="text-5xl px-8 font-mono">Add Tasks</p>

      <form action="" className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Tasks"
          className="font-mono h-12 px-20 flex-1 rounded-lg border-2 border-black  focus:border-black"
        />
        <br />

        <button
          onClick={() => {
            addTodo;
          }}
          className="font-mono flex-1 h-12 my-6 rounded-lg px-4  bg-black  hover:bg-neutral-500 text-white "
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Input;
