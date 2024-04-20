import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useClickOutside } from "../hooks/useClickOutside";
import { BoardListContext } from "../context/BoardListContext";
import { FaPlus } from "react-icons/fa6";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddTaskButton from "./ui/AddTaskButton";
import ColumnTitle from "./ColumnTitle";
import AddTaskForm from "./ui/AddTaskForm";
import TaskItem from "./ui/TaskItem";

interface Column {
  id: string;
  columnTitle: string;
}

interface ColumnProps {
  column: Column;
  workSpaceId: string;
  onDelete: (id: string) => void;
}

function Column({ workSpaceId, column, onDelete }: ColumnProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const addTaskNode = useRef<HTMLLIElement>(null);
  const taskContainerNode = useRef<HTMLOListElement>(null);
  const { tasks } = useContext(BoardListContext);

  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
      columnId: column.id,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isAddTaskOpen && taskContainerNode.current) {
      if (
        taskContainerNode.current?.scrollHeight >
        taskContainerNode.current?.clientHeight
      ) {
        taskContainerNode.current.scrollTop =
          taskContainerNode.current.scrollHeight;
      }
    }
  }, [isAddTaskOpen]);

  useClickOutside(addTaskNode, () => {
    setIsAddTaskOpen(false);
  });

  if (isDragging)
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="text-[.8rem] opacity-10 px-2 py-2 bg-black w-[272px] rounded-xl "
      ></div>
    );

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="text-[.8rem] px-2 py-2 bg-light-gray w-[272px] rounded-xl list-none"
    >
      <div className="flex items-center justify-between">
        <button type="button" {...attributes} {...listeners}>
          <RxDragHandleDots2 size={25} />
        </button>
        <ColumnTitle workSpaceId={workSpaceId} column={column} />
        <button
          type="button"
          className="p-3 hover:bg-gray-300 rounded-md"
          onClick={() => onDelete(column.id)}
        >
          <RiDeleteBin6Line size={18} />
        </button>
      </div>
      <ol
        ref={taskContainerNode}
        className="py-2 w-full space-y-3 overflow-y-auto scrollbar-thin max-h-content min-h-content mt-1 gap-y-2 "
      >
        {tasks[workSpaceId] &&
          tasks[workSpaceId][column.id] &&
          tasks[workSpaceId][column.id].map((task) => (
            <SortableContext
              key={task.id}
              items={tasks[workSpaceId][column.id]}
              strategy={verticalListSortingStrategy}
            >
              <TaskItem task={task} id={workSpaceId} columnId={column.id} />
            </SortableContext>
          ))}
        {isAddTaskOpen ? (
          <li className="mx-1" ref={addTaskNode}>
            <AddTaskForm
              id={workSpaceId}
              columnId={column.id}
              onClose={() => setIsAddTaskOpen(false)}
            />
          </li>
        ) : null}
      </ol>
      {!isAddTaskOpen ? (
        <button
          type="button"
          className="flex text-sm hover:bg-gray-300 w-full p-2 mt-2 rounded-md"
          onClick={() => {
            setIsAddTaskOpen(true);
          }}
        >
          <FaPlus className="me-2" size={20} />
          Add a task
        </button>
      ) : null}
    </li>
  );
}

export default Column;
