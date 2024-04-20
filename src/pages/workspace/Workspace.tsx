import Menu from "../../components/Menu";
import "./Workspace.css";
import { GoKebabHorizontal } from "react-icons/go";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
// import { WorkspaceContext } from "../../context/BoardListContext";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import AddTaskButton from "../../components/ui/AddTaskButton";
import InputTitle from "../../components/ui/InputTitle";
import AddColumnButton from "../../components/ui/AddColumnButton";
import { BoardListContext } from "../../context/BoardListContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  closestCenter,
  useSensor,
  MouseSensor,
  useSensors,
} from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { useClickOutside } from "../../hooks/useClickOutside";
import Column from "../../components/Column";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import TaskItem from "../../components/ui/TaskItem";
import { createPortal } from "react-dom";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

interface IColumn {
  id: string;
  columnTitle: string;
}

function Workspace() {
  const { id } = useParams() as { id: string };
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const { columns, tasks, dispatchColumn, dispatchTask } =
    useContext(BoardListContext);
  const [isOpen, setIsOpen] = useState(false);
  const [columnId, setColmunId] = useState(null);
  // const { workspace, dispatch } = useContext(WorkspaceContext);
  // const currentWorkspace = workspace.find((ele) => ele.id == id);

  const handleDeleteColumn = (columnId: string) => {
    dispatchColumn({
      type: "deleteColumn",
      payload: {
        id: id,
        columnId: columnId,
      },
    });
    dispatchTask({
      type: "deleteEntireTasks",
      payload: {
        id: id,
        columnId: columnId,
      },
    });
  };

  // const handleUpdateTitle = (
  //   event: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if(event.key == "Enter"){
  //     setIsOpen(false);
  //   }
  // };


  const inputRef = useRef<HTMLInputElement>(null);

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  useClickOutside(inputRef, () => {
    setIsOpen(false);
  });

  const handleAddColumn = () => {
    const columnId = uuidv4();

    dispatchColumn({
      type: "addColumn",
      payload: {
        id: id,
        columnId: columnId,
        title: columns[id] ? `Column ${columns[id].length + 1}` : "Column 1",
      },
    });

    dispatchTask({
      type: "addTask",
      payload: {
        id: id,
        columnId: columnId,
      },
    });
  };

  const handleDragStart = (event) => {
    const { active } = event;

    if (active.data.current?.type == "column") {
      setActiveColumn(active.data.current.column);
    }
    if (active.data.current?.type == "item") {
      setActiveTask(active.data.current.task);
      setColmunId(active.data.current.columnId);
    }
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (!over) return;

    if (active.id != over.id && active.data.current?.type == "column") {
      dispatchColumn({
        type: "reArrangeColumns",
        payload: {
          active: active,
          over: over,
          id: id,
        },
      });
    }

    setActiveColumn(null);
    setActiveTask(null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (
      active.data.current.columnId != over.data.current.columnId &&
      ((active.data.current.type == "item" &&
        over.data.current.type == "item") ||
        (active.data.current.type == "item" &&
          over.data.current.type == "column"))
    ) {
      dispatchTask({
        type: "rearrangeTasks",
        payload: {
          active: active,
          over: over,
          id: id,
        },
      });
    }

    if (
      active.id != over.id &&
      active.data.current.type == "item" &&
      over.data.current.type == "item"
    ) {
      dispatchTask({
        type: "sortTasks",
        payload: {
          active: active,
          over: over,
          id: id,
        },
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <section className="scroll-smooth h-content mt-[57px] p-3">
        <div className="min-w-fit gap-4">
          <ol className="flex gap-5 overflow-x-auto">
            <SortableContext strategy={horizontalListSortingStrategy} items={columns[id] ? columns[id] : []}>
              {columns[id]?.map((column: IColumn) => (
                <Column
                  key={column.id}
                  workSpaceId={id}
                  column={column}
                  // columnId={column.id}
                  // columnTitle={column.columnTitle}
                  onDelete={handleDeleteColumn}
                />
              ))}
            </SortableContext>
            {/* ADD COLUMN BUTTON */}
            <div className="w-[275px]">
              <button
                type="button"
                className="rounded-lg w-full text-gray-600 flex items-center px-3 py-2 bg-gray-50 hover:bg-gray-300"
                onClick={handleAddColumn}
              >
                <FaPlus className="me-2" size="15" />
                <p className="text-sm">Add a list</p>
              </button>
            </div>
          </ol>
        </div>
        {createPortal(
          <DragOverlay 
            className="my-drag-overlay"
            style={{
              rotate: '1deg',
              fontSize: 12,
              opacity: 0.9,
            }}
          >
            {activeTask ? (
              <TaskItem task={activeTask} id={id} columnId={columnId} />
            ) : null}
            {activeColumn ? (
              <Column
                workSpaceId={id}
                column={activeColumn}
                onDelete={handleDeleteColumn}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </section>
    </DndContext>
  );
}

export default Workspace;
