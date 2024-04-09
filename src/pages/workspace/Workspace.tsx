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
  useSensor,
  MouseSensor,
  useSensors,
} from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { useClickOutside } from "../../hooks/useClickOutside";
import Column from "../../components/Column";
import { SortableContext } from "@dnd-kit/sortable";

interface IColumn {
  id: string;
  columnTitle: string;
}

function Workspace() {
  const { id } = useParams() as { id: string };
  const [activeColumn, setActiveColumn] = useState(null);
  const [titleIsOpen, setTitleIsOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState("");
  const { columns, dispatchColumn } = useContext(BoardListContext);
  const [isOpen, setIsOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  // const { workspace, dispatch } = useContext(WorkspaceContext);
  // const currentWorkspace = workspace.find((ele) => ele.id == id);

  // const handleDelete = (columnId: number) => {
  //   dispatch({
  //     type: "deleteColumn",
  //     payload: {
  //       columnId: columnId,
  //       workspaceId: id,
  //     },
  //   });
  // };

  // const handleUpdateTitle = (
  //   event: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if(event.key == "Enter"){
  //     setIsOpen(false);
  //   }
  // };

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(mouseSensor);
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }

    console.log("Effect");
  }, [isOpen]);

  useClickOutside(inputRef, () => {
    setIsOpen(false);
  });

  const handleAddColumn = () => {
    dispatchColumn({
      type: "addColumn",
      payload: {
        id: id,
        columnId: uuidv4(),
        title: columns[id] ? `Column ${columns[id].length + 1}` : "Column 1",
      },
    });
  };

  const handleDragStart = (event) => {
    const { active } = event;

    if (active.data.current?.type == "column") {
      console.log(active.id);
      setActiveColumn(active);
    }
  };

  const handleDragEnd = (event) => {
    const {over, active} = event;
    if (!over) return;

    if (active.id != over.id && active.data.current?.type == "column") {
        dispatchColumn({
          type:"reArrangeColumns",
          payload: {
            active: active,
            over: over,
            id: id
          }
        })
    }
    setActiveColumn(null);
  };

  const handleDragOver = (event) => {
    
  };

  return (
    <DndContext
      sensors={sensors}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <section className="overflow-x-auto h-content mt-[57px] p-3">
        <div className="min-w-fit gap-4">
          <ol className="flex items-start gap-2 min-w-max">
            <SortableContext items={columns[id]}>
              {columns[id]?.map((column: IColumn) => (
                <Column
                  key={column.id}
                  workSpaceId={id}
                  columnId={column.id}
                  columnTitle={column.columnTitle}
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
        <DragOverlay>
          {activeColumn ? (
            <Column
              workSpaceId={id}
              columnId={
                columns[id][activeColumn.data.current.sortable.index].id
              }
              columnTitle={
                columns[id][activeColumn.data.current.sortable.index]
                  .columnTitle
              }
            />
          ) : null}
        </DragOverlay>
      </section>
    </DndContext>
  );
}

export default Workspace;
