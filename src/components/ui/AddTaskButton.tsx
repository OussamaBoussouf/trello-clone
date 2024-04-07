import { useContext, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { WorkspaceContext } from "../../context/workspaceContext";
import { useClickOutside } from "../../hooks/useClickOutside";

function AddTaskButton({taskId, workspaceId} : {taskId: string, workspaceId: any}) {
  const [inputValue, setInputValue] = useState("");
  const { dispatch } = useContext(WorkspaceContext);
  const [isOpen, setIsOpen] = useState(false);
  const divNode = useRef(null);
  useClickOutside(divNode, () => setIsOpen(false));
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "addTask",
      payload: {
        taskId: taskId,
        workspaceId: workspaceId,
        text: inputValue,
      },
    });
    setInputValue('');
    setIsOpen(false);
  };


  return (
    <div>
      {isOpen ? (
        <div ref={divNode}>
          <form onSubmit={handleSubmit} className="w-full text-start">
            <textarea
              value={inputValue}
              required
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 outline-none rounded-md shadow-md text-sm"
              aria-label="Enter a task"
            ></textarea>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-800 py-1 px-2 rounded-md"
              >
                Add a cart
              </button>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="flex items-center content-center hover:bg-gray-300 rounded-md px-1"
              >
                <IoCloseOutline size={25} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          className="bg-blue-600 hover:bg-blue-800 w-full py-2 mb-4 text-[.9rem] text-white rounded-md"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          Create a task
        </button>
      )}
    </div>
  );
}

export default AddTaskButton;
