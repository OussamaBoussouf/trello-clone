import { useContext, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useClickOutside } from "../../hooks/useClickOutside";
import { FaPlus } from "react-icons/fa6";

function AddTaskButton() {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const divNode = useRef(null);
  useClickOutside(divNode, () => setIsOpen(false));
  

  return (
    <div>
      {isOpen ? (
        <div ref={divNode}>
          <form className="w-full text-start">
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
                Save
              </button>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="flex items-center content-center hover:bg-gray-300 rounded-md px-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex text-sm hover:bg-gray-300 w-full p-2 rounded-md" >
        <FaPlus className="me-2" size={20}/>
        Add a task</button> 
      )}
    </div>
  );
}

export default AddTaskButton;
