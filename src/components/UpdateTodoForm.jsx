import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoUpdated } from "../store/features/todo/todoSlice";

const UpdateTodoForm = () => {
  const dispatch = useDispatch();
  const todoToUpdate = useSelector((state) => state.todos.todoUpdate);
  const [update, setUpdate] = useState(todoToUpdate.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (/^\s*$/.test(update)) {
      alert("Enter a todo");
      setInput("");
      return;
    } else {
      dispatch(
        todoUpdated({
          id: todoToUpdate.id,
          title: update,
        })
      );
      setUpdate("");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <input
          type="text"
          name="updateTodo"
          value={update}
          onChange={(e) => setUpdate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-zinc-200"
          placeholder="Update"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-7 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateTodoForm;