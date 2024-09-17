import { createSlice } from "@reduxjs/toolkit";

// Initial state with an empty task list and default form state
const initialState = {
  todos: [],
  todoUpdate: null,
  toggleForm: true, // true for AddForm, false for UpdateForm
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Add a new task
    todoAdded: (state, action) => {
      state.todos.push(action.payload);
    },

    // Delete a task by filtering out the deleted task from the array
    todoDeleted: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    // Update a task by finding it in the state and updating its fields
    todoUpdated: (state, action) => {
      const { id, title, description, date, image } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.description = description;
        existingTodo.date = date;
        existingTodo.image = image; // update the image URL
      }
      state.toggleForm = true; // Switch back to add form after updating
    },

    // Clear all tasks
    todosCleared: (state) => {
      state.todos = [];
    },

    // Toggle between add and update forms
    formToggled: (state, action) => {
      state.todoUpdate = action.payload; // Store the task to update
      state.toggleForm = false; // Switch to update form
    },
  },
});

// Export actions for use in components
export const { todoAdded, todoDeleted, todoUpdated, todosCleared, formToggled } = todoSlice.actions;

// Export the reducer to be included in the store
export default todoSlice.reducer;
