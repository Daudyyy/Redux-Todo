import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice"; // Import the todo reducer

// Configure the store with the todo reducer
const store = configureStore({
  reducer: {
    todos: todoReducer, // Register todoReducer under the "todos" key
  },
});

export default store;
