import { useContext, useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { BoardListContext } from "../context/BoardListContext";

interface Column {
  id: string;
  columnTitle: string;
}

interface ColumnProps {
  column: Column;
  workSpaceId: string;
}

function ColumnTitle({ column, workSpaceId }: ColumnProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {dispatchColumn} = useContext(BoardListContext);
  const [isOpen, setIsOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState(column.columnTitle);
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useClickOutside(inputRef, () => {
    setIsOpen(false);
  });

  const handleUpdateTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      dispatchColumn({
        type: "updateColumnTitle",
        payload: {
          id: workSpaceId,
          columnId: column.id,
          newTitle: inputTitle,
        },
      });
      setIsOpen(false);
    }
  };
  return (
    <>
      {isOpen ? (
        <input
          ref={inputRef}
          value={inputTitle}
          type="text"
          className="p-1 flex-grow"
          onKeyDown={handleUpdateTitle}
          onChange={(event) => setInputTitle(event.target.value)}
        />
      ) : (
        <p
          onClick={() => {
            setIsOpen(true);
          }}
          className="font-bold cursor-pointer break-all flex-grow px-3 py-2"
        >
          {column.columnTitle.length > 20 ? column.columnTitle.substring(0, 21)+'...' : column.columnTitle}
        </p>
      )}
    </>
  );
}

export default ColumnTitle;
