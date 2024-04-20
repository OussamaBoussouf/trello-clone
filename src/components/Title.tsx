import { useRef, useState } from "react";
import { GoPencil } from "react-icons/go";
import { useClickOutside } from "../hooks/useClickOutside";


function Title() {
  const [heading, setHeading] = useState(
    localStorage.getItem("title") || "My space"
  );
  const [inputValue, setInputValue] = useState(heading);
  const titleMenu = useRef<HTMLDivElement |null> (null);
  const [isOpen, setIsOpen] = useState(false);
  useClickOutside(titleMenu, () => setIsOpen(false));


  const handleCancel = () => {
    setInputValue(heading);
    setIsOpen(false);
  };

  const handleSave = () => {
    localStorage.setItem("title", inputValue);
    setHeading(inputValue);
    setIsOpen(false);
  };
  

  return (
    <div className="flex border-b-[1px] pb-5">
      <div className="me-3 text-white font-bold text-3xl bg-blue-500 h-16 w-16 rounded-lg flex items-center justify-center">
        {heading.charAt(0).toUpperCase()}
      </div>
      <div className="flex">
        <div>
          <p className="font-bold text-lg relative">{heading}</p>
        </div>
        <div className="relative" ref={titleMenu}>
          <button
            type="button"
            title="Modify title"
            className="ms-2 align-middle hover:bg-gray-300 p-1 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="pointer-events-none">
              <GoPencil />
            </span>
          </button>
          <form
            className={
              isOpen
                ? "animate-scale origin-top-left bg-white space-y-4 absolute z-1 left-[100%] top-6 font-light text-sm rounded-lg shadow-xl p-2"
                : "hidden"
            }
          >
            <input
              className="border-[1px] rounded-sm p-1"
              type="text"
              name="title"
              aria-label="Workspace Title"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="space-x-2">
              <button
                type="button"
                className={
                  inputValue.length != 0
                    ? "bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-1 font-bold text-white"
                    : "bg-gray-200 rounded-md px-3 py-1 font-bold text-gray-100"
                }
                disabled={inputValue.length == 0 ? true : false}
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Title;
