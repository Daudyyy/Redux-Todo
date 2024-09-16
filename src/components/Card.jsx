import { useSelector, useDispatch } from "react-redux";
import AddTodoForm from "./AddTodoForm";
import UpdateTodoForm from "./UpdateTodoForm";
import SingleTodoCard from "./SingleTodoCard";
import { todosCleared } from "../store/features/todo/todoSlice";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Card = () => {
  const toggle = useSelector((state) => state.todos.toggleForm);
  const myTodos = useSelector((state) => state.todos.todos);

  const dispatch = useDispatch();

  return (
    <div className="w-4/5 h-auto flex flex-row bg-white p-10 space-x-5 rounded-lg">
      {/* Left side - Form */}
      <div className="w-1/2 bg-white rounded-lg p-5">
        <h1 className="text-3xl font-semibold text-purple-700">
          {toggle ? "Add New Task" : "Edit Task"}
        </h1>
        <div className="mt-5">
          {toggle ? <AddTodoForm /> : <UpdateTodoForm />}
        </div>
      </div>

      {/* Right side - Task List */}
      <div className="w-1/2 bg-gray-100 shadow-lg rounded-lg p-5 h-96 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-purple-700 mb-5">My Tasks</h1>

        {myTodos.length !== 0 ? (
          <ul className="space-y-4">
            {myTodos.map((todo) => (
              <li key={todo.id}>
                <SingleTodoCard
                  title={todo.title}
                  description={todo.description}
                  date={todo.date}
                  image={todo.image}
                  id={todo.id}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full flex flex-col items-center space-y-10">
            <h1 className="text-2xl font-sans text-gray-700">No tasks yet!</h1>
            <BsFillCheckCircleFill size={50} className="text-green-500" />
          </div>
        )}

        {/* Clear all tasks button */}
        {myTodos.length > 0 && (
          <button
            type="button"
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-5 rounded"
            onClick={() => dispatch(todosCleared())}
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
