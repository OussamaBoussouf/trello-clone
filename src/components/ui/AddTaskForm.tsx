import { useContext, useEffect, useRef, useState } from "react";
import { BoardListContext } from "../../context/BoardListContext";
import { v4 as uuidv4 } from "uuid";

interface AddTaskProps {
  id: string;
  columnId: string;
  onClose: () => void;
}

// let total = 55;

function AddTaskForm({ onClose, columnId, id }: AddTaskProps) {
  const [taskValue, setTaskValue] = useState("");
  const textareaNode = useRef<HTMLTextAreaElement>(null);
  const { dispatchTask } = useContext(BoardListContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchTask({
      type: "addTask",
      payload: {
        id: id,
        columnId: columnId,
        taskId: uuidv4(),
        content: taskValue,
      },
    });
    onClose();
  };

  const handleHeight = () => {
    if (textareaNode.current) {
      textareaNode.current.style.height = 'auto';
      textareaNode.current.style.height = (textareaNode.current.scrollHeight) + 'px';
    }

  };

  return (
    <form onSubmit={handleSubmit} className="w-full text-start ">
      <textarea
        value={taskValue}
        ref={textareaNode}
        onPaste={handleHeight}
        onInput={handleHeight}
        onChange={(e) => setTaskValue(e.target.value)}
        required
        className="w-full break-words resize-none p-2 outline-none min-h-[75px] rounded-md shadow-md text-[.8rem]"
        aria-label="Enter a task"
        placeholder="Add your task here..."
      ></textarea>
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-800 py-1 px-2 rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          className="flex items-center content-center hover:bg-gray-300 rounded-md px-1"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddTaskForm;
