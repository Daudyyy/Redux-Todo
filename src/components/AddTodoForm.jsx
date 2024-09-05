import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { todoAdded } from "../store/features/todo/todoSlice";

const AddTodoForm = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (/^\s*$/.test(input)) {
      alert("Enter a todo");
      setInput("");
      return;
    } else {
      dispatch(
        todoAdded({
          id: nanoid(),
          title: input,
        })
      );
      setInput("");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-zinc-200"
          placeholder="Add todo"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddTodoForm;