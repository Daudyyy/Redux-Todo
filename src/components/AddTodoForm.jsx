import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { todoAdded } from "../store/features/todo/todoSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTodoForm = () => {
  // Local states for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [image, setImage] = useState(null); // Image state to store file

  const dispatch = useDispatch();

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store selected image file
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter both title and description.");
      return;
    }

    // Dispatch new task with title, description, date, and image (converted to URL)
    dispatch(
      todoAdded({
        id: nanoid(),
        title,
        description,
        date: date ? date.toISOString() : null,
        image: image ? URL.createObjectURL(image) : null, // Save image as a URL
      })
    );

    // Clear form inputs after submission
    setTitle("");
    setDescription("");
    setDate(null);
    setImage(null);
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
        Add Task
      </button>
    </form>
  );
};

export default AddTodoForm;
