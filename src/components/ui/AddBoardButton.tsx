import { useCallback, useContext, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { IoClose } from "react-icons/io5";
import { BoardListContext } from "../../context/BoardListContext";
import { v4 as uuidv4 } from "uuid";

interface IBoardList {
    id: string;
    title: string;
  };

function AddBoardButton() {
  const [isOpen, setIsOpen] = useState(false);
  const {dispatchBoardList} = useContext(BoardListContext);
  const ref = useRef(null);
  useClickOutside(ref, () => setIsOpen(false));
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchBoardList({
        type: "addBoard",
        payload: {
            id: uuidv4(),
            title: inputValue
        }
    });
    setIsOpen(false);
    setInputValue("");
  };


  return (
    <li className="relative">
      <div>
        <div
          role="button"
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer h-[100px] p-2 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center"
        >
          <span className="text-sm">Add a board</span>
        </div>
        <div
          ref={ref}
          className={
            isOpen
              ? "absolute top-[0] left-0 w-72 bg-white p-4 rounded-md shadow-lg"
              : "hidden"
          }
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="text-center flex-grow text-sm">Create a workspace</p>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="rounded-md hover:bg-gray-400 p-1"
            >
              <IoClose size={23} className="float-end" />
            </button>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label
              htmlFor="title"
              className="after:content-['*'] after:text-red-500 text-[.8rem]"
            >
              Title of the table
            </label>
            <input
              type="text"
              id="title"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
              className="w-full mb-5 p-1 border-[1px] focus:outline-blue-700 rounded-md"
            />
            <button
              type="submit"
              className="text-sm bg-blue-500 hover:bg-blue-700 w-full py-2 rounded-md text-white"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </li>
  );
}

export default AddBoardButton;
