import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import UpdateTodoForm from "./UpdateTodoForm";
import SingleTodoCard from "./SingleTodoCard";

import { useSelector, useDispatch } from "react-redux";
import { todosCleared } from "../store/features/todo/todoSlice";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

const Card = () => {
  const toggle = useSelector((state) => state.todos.toggleForm);
  const myTodos = useSelector((state) => state.todos.todos);

  const dispatch = useDispatch();

  if (toggle) {
    return (
      <div className="w-1/2 h-3/4 min-h-max bg-amber-100 shadow-2xl rounded-lg p-2 items-center flex flex-col space-y-10 justify-between">
        <div className="flex flex-col space-y-10 w-full h-3/4 min-h-max items-center">
          <h1 className="text-3xl font-semibold ">My Todo List</h1>
          <div className="w-3/4">
            {toggle ? <AddTodoForm /> : <UpdateTodoForm />}
          </div>
          <div className="w-3/4 ">
            {myTodos.length !== 0 ? (
              <ul className="w-full max-h-72 overflow-y-auto ">
                {myTodos.map((todo) => (
                  <li className="mb-3" key={todo.id}>
                    <SingleTodoCard title={todo.title} id={todo.id} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="w-full flex flex-col items-center space-y-10">
                <h1 className="text-2xl font-sans">Enter your first todo item</h1>
                <BsFillCheckCircleFill size={50} className="text-green-500" />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            dispatch(todosCleared());
          }}
        >
          Clear
        </button>
      </div>
    );
  } else {
    return (
      <div className="w-1/2 h-3/4 min-h-max bg-amber-100 shadow-2xl rounded-lg p-2 items-center flex flex-col space-y-10 justify-between">
        <div className="flex flex-col space-y-10 w-full h-3/4 min-h-max items-center">
          <h1 className="text-3xl font-semibold">
            My Todo List for Today
          </h1>
          <div className="w-3/4">
            <UpdateTodoForm />
            <div className="w-full flex flex-col items-center space-y-10 mt-20">
              <h1 className="text-2xl">Edit your todo item</h1>
              <FaEdit size={50} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;