import { useContext, useEffect, useRef, useState } from "react";
import { WorkspaceContext } from "../../context/BoardListContext";
import { useClickOutside } from "../../hooks/useClickOutside";

interface Task {
  id: any;
  title: string;
  tasks: [];
}

interface InputTitleProps {
  id: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: Task;
  columnId: string;
  workspaceId: any;
}

function InputTitle({
  isOpen,
  setIsOpen,
  id,
  task,
  columnId,
  workspaceId,
}: InputTitleProps) {
  const [inputTitle, setInputTitle] = useState("");

  const { dispatch } = useContext(WorkspaceContext);

  const inputRef = useRef(null);
  useClickOutside(inputRef, () => setIsOpen(false));

  const handleUpdateTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      dispatch({
        type: "updateTitle",
        payload: {
          newTitle: inputTitle,
          columnId: columnId,
          workspaceId: workspaceId,
        },
      });
      setIsOpen(false);
    }
  };

  return (
    <div>
      {isOpen && columnId == id ? (
        <input
          ref={inputRef}
          onKeyDown={handleUpdateTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          value={inputTitle}
          type="text"
          className="p-1 rounded-md shadow-md"
          aria-label="Update title"
        />
      ) : (
        <h2 className="font-bold">{task.title}</h2>
      )}
    </div>
  );
}

export default InputTitle;
