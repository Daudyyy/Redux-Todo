import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoUpdated } from "../store/features/todo/todoSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateTodoForm = () => {
  const todoToUpdate = useSelector((state) => state.todos.todoUpdate); // Task to update
  const dispatch = useDispatch();

  const [title, setTitle] = useState(todoToUpdate.title);
  const [description, setDescription] = useState(todoToUpdate.description);
  const [date, setDate] = useState(todoToUpdate.date ? new Date(todoToUpdate.date) : null);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter both title and description.");
      return;
    }

    dispatch(
      todoUpdated({
        id: todoToUpdate.id,
        title,
        description,
        date: date ? date.toISOString() : null,
        image: image ? URL.createObjectURL(image) : todoToUpdate.image,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3 bg-white p-5 rounded-lg shadow-md">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        placeholder="Task Title"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        placeholder="Task Description"
      />

      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        placeholderText="Select Due Date"
        dateFormat="MM/dd/yyyy"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Task
      </button>
    </form>
  );
};

export default UpdateTodoForm;
