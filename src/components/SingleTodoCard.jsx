import { useDispatch } from "react-redux";
import { BsTrashFill, BsCheckSquare } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { formToggled, todoDeleted } from "../store/features/todo/todoSlice";

const SingleTodoCard = ({ title, description, date, image, id }) => {
  const [toggleComplete, setToggleComplete] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md space-y-2 overflow-x-auto">
      {/* Task title */}
      <h2 className={toggleComplete ? "font-semibold line-through" : "font-semibold"}>
        {title}
      </h2>

      {/* Task description */}
      <p className="text-gray-600">{description}</p>

      {/* Task due date */}
      <p className="text-gray-500">{date ? new Date(date).toLocaleDateString() : "No due date"}</p>

      {/* Task image thumbnail */}
      {image && (
        <img
          src={image}
          alt="Task"
          className="w-20 h-20 object-cover rounded-lg cursor-pointer"
          onClick={() => setShowFullImage(!showFullImage)}
        />
      )}

      {/* Full-sized image modal */}
      {showFullImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setShowFullImage(false)}
        >
          <img
            src={image}
            alt="Full-size task image"
            className="w-1/2 h-auto object-cover rounded-lg"
          />
        </div>
      )}

      {/* Task action buttons */}
      <div className="flex space-x-4 mt-3">
        <BsCheckSquare
          onClick={() => setToggleComplete(!toggleComplete)}
          className="cursor-pointer text-green-700 hover:text-green-500"
          size={20}
        />
        <FaEdit
          onClick={() => dispatch(formToggled({ id, title, description, date, image }))}
          className="cursor-pointer text-yellow-700 hover:text-yellow-500"
          size={20}
        />
        <BsTrashFill
          onClick={() => dispatch(todoDeleted(id))}
          className="cursor-pointer text-red-700 hover:text-red-500"
          size={20}
        />
      </div>
    </div>
  );
};

export default SingleTodoCard;
