import { useCallback, useContext, useRef, useState } from "react";
import { WorkspaceContext } from "../../context/workspaceContext";
import { useClickOutside } from "../../hooks/useClickOutside";

function AddColumnButton({ columnId }: { columnId: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef(null);
  if (ref) {
    useClickOutside(ref, () => setIsOpen(false));
  }
  const { dispatch } = useContext(WorkspaceContext);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "addColumn",
      payload: {
        id: columnId,
        title: inputValue,
      },
    });
    setInputValue("");
    setIsOpen(false);
  };
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="self-start w-[50%] hover:bg-dark-blue bg-light-blue rounded-md py-2 px-3 text-white"
        type="button"
      >
        Add a column
      </button>
      {isOpen ? (
        <div ref={ref} className="bg-gray-300 rounded-md p-2 absolute top-0">
          <form onSubmit={handleSubmit} className="w-full text-start">
            <input
              value={inputValue}
              required
              onChange={(e) => setInputValue(e.target.value)}
              className="block mb-3 p-1 rounded-md"
              aria-label="Enter the column title"
              type="text"
            />
            <button
              type="submit"
              className="bg-light-blue text-white hover:bg-dark-blue py-1 px-2 rounded-md"
            >
              Add
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default AddColumnButton;
