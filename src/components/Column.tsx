import { useContext, useEffect, useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useClickOutside } from "../hooks/useClickOutside";
import { BoardListContext } from "../context/BoardListContext";
import { FaPlus } from "react-icons/fa6";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddTaskButton from "./ui/AddTaskButton";

interface ColumnProps {
  columnId: string;
  columnTitle: string;
  workSpaceId: string;
}

function Column({ workSpaceId, columnId, columnTitle }: ColumnProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState(columnTitle);
  const [inputValue, setInputValue] = useState("");
  const { dispatchColumn } = useContext(BoardListContext);
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: columnId,
    data: {
      type: "column",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // const [isAddingTask, setIsAddingTask] = useState(false);
  // const divNode = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // useClickOutside(divNode, () => setIsAddingTask(false));

  useClickOutside(inputRef, () => {
    setIsOpen(false);
  });

  const handleUpdateTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      dispatchColumn({
        type: "updateColumnTitle",
        payload: {
          id: workSpaceId,
          columnId: columnId,
          newTitle: inputTitle,
        },
      });
      setIsOpen(false);
    }
  };

  const handleDeleteColumn = (colId: string) => {
    dispatchColumn({
      type: "deleteColumn",
      payload: {
        id: workSpaceId,
        columnId: colId,
      },
    });
  };

 
  // if(isDragging) return (
  //   <li
  //     key={columnId}
  //     ref={setNodeRef}
  //     style={style}
  //     {...attributes}
  //     {...listeners}
  //     className="text-[.8rem] opacity-50 px-2 py-2 bg-light-gray w-[272px] rounded-xl list-none"
  //   >
  //     <div className="flex items-center justify-between pt-4">
  //       {isOpen ? (
  //         <input
  //           ref={inputRef}
  //           value={inputTitle}
  //           type="text"
  //           className="p-1"
  //           onKeyDown={handleUpdateTitle}
  //           onChange={(event) => setInputTitle(event.target.value)}
  //         />
  //       ) : (
  //         <p
  //           onClick={() => {
  //             setIsOpen(true);
  //           }}
  //           className="font-bold cursor-pointer break-all flex-grow px-3 py-2"
  //         >
  //           {columnTitle}
  //         </p>
  //       )}
  //       <button
  //         type="button"
  //         className="p-3 hover:bg-gray-300 rounded-md"
  //         onClick={() => handleDeleteColumn(columnId)}
  //       >
  //         <RiDeleteBin6Line size={18} />
  //       </button>
  //     </div>
  //     <ol className="overflow-y-auto py-2 scrollbar-thin max-h-content mt-1 flex flex-col gap-y-2 ">
  //       <li className="relative group/item cursor-pointer hover:outline-blue-600 hover:outline-2 hover:outline bg-white break-words shadow-md text-wrap rounded-md px-3 py-2 mx-1">
  //         <button
  //           type="button"
  //           className="hover:bg-gray-200 group-hover/item:visible invisible bg-white p-2 rounded-full absolute top-1 right-1"
  //         >
  //           <MdDeleteOutline size={18} />
  //         </button>
  //         aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  //       </li>
  //       <li className="relative group/item cursor-pointer hover:outline-blue-600 hover:outline-2 hover:outline bg-white break-words shadow-md text-wrap rounded-md px-3 py-2 mx-1">
  //         <button
  //           type="button"
  //           className="hover:bg-gray-200 group-hover/item:visible invisible bg-white p-2 rounded-full absolute top-1 right-1"
  //         >
  //           <MdDeleteOutline size={18} />
  //         </button>
  //         aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  //       </li>
  //       <li className="relative group/item cursor-pointer hover:outline-blue-600 hover:outline-2 hover:outline bg-white break-words shadow-md text-wrap rounded-md px-3 py-2 mx-1">
  //         <button
  //           type="button"
  //           className="hover:bg-gray-200 group-hover/item:visible invisible bg-white p-2 rounded-full absolute top-1 right-1"
  //         >
  //           <MdDeleteOutline size={18} />
  //         </button>
  //         aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  //       </li>
  //     </ol>
  //     {/* <button
  //       type="button"
  //       className="flex text-sm hover:bg-gray-300 w-full p-2 mt-2 rounded-md"
  //     >
  //       <FaPlus className="me-2" size={20} />
  //       Add a task
  //     </button> */}
  //   </li>
  // );

  return (
    <li
      key={columnId}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="text-[.8rem] px-2 py-2 bg-light-gray w-[272px] rounded-xl list-none"
    >
      <div className="flex items-center justify-between pt-4">
        {isOpen ? (
          <input
            ref={inputRef}
            value={inputTitle}
            type="text"
            className="p-1"
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
            {columnTitle}
          </p>
        )}
        <button
          type="button"
          className="p-3 hover:bg-gray-300 rounded-md"
          onClick={() => handleDeleteColumn(columnId)}
        >
          <RiDeleteBin6Line size={18} />
        </button>
      </div>
      <ol className="overflow-y-auto py-2 scrollbar-thin max-h-content mt-1 flex flex-col gap-y-2 ">
        <li className="relative group/item cursor-pointer hover:outline-blue-600 hover:outline-2 hover:outline bg-white break-words shadow-md text-wrap rounded-md px-3 py-2 mx-1">
          <button
            type="button"
            className="hover:bg-gray-200 group-hover/item:visible invisible bg-white p-2 rounded-full absolute top-1 right-1"
          >
            <MdDeleteOutline size={18} />
          </button>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </li>
        <li className="relative group/item cursor-pointer hover:outline-blue-600 hover:outline-2 hover:outline bg-white break-words shadow-md text-wrap rounded-md px-3 py-2 mx-1">
          <button
            type="button"
            className="hover:bg-gray-200 group-hover/item:visible invisible bg-white p-2 rounded-full absolute top-1 right-1"
          >
            <MdDeleteOutline size={18} />
          </button>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </li>
        <li className="relative group/item cursor-pointer hover:outline-blue-600 hover:outline-2 hover:outline bg-white break-words shadow-md text-wrap rounded-md px-3 py-2 mx-1">
          <button
            type="button"
            className="hover:bg-gray-200 group-hover/item:visible invisible bg-white p-2 rounded-full absolute top-1 right-1"
          >
            <MdDeleteOutline size={18} />
          </button>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </li>
      </ol>
      <button
        type="button"
        className="flex text-sm hover:bg-gray-300 w-full p-2 mt-2 rounded-md"
      >
        <FaPlus className="me-2" size={20} />
        Add a task
      </button>
    </li>
  );
}

export default Column;
