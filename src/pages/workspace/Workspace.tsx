import Menu from "../../components/Menu";
import "./Workspace.css";
import { GoKebabHorizontal } from "react-icons/go";
import { useContext, useMemo, useState } from "react";
import { WorkspaceContext } from "../../context/workspaceContext";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import AddTaskButton from "../../components/ui/AddTaskButton";
import InputTitle from "../../components/ui/InputTitle";
import AddColumnButton from "../../components/ui/AddColumnButton";

interface Task {
  id: any;
  title: string;
  tasks: [];
}

function Workspace() {
  const { id } = useParams();
  const [titleIsOpen, setTitleIsOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState("");
  const { workspace, dispatch } = useContext(WorkspaceContext);
  const currentWorkspace = workspace.find((ele) => ele.id == id);

  const handleDelete = (columnId: number) => {
    dispatch({
      type: "deleteColumn",
      payload: {
        columnId: columnId,
        workspaceId: id,
      },
    });
  };

  return (
    <section className="overflow-x-auto h-content mt-[57px] p-3">
      <div className="min-w-fit gap-4">
        <ol className="flex gap-2 min-w-max">
          <li className="text-[.8rem] px-2 bg-light-gray w-[272px] rounded-xl">
            <div className="flex items-start justify-between pt-4">
              <p className="font-bold break-all flex-grow px-3 py-2">
                Teamazeazeazeazeazeazeazeazeaze
              </p>
              <button
                type="button"
                className="p-3 hover:bg-gray-300 rounded-md"
              >
                <GoKebabHorizontal size={15} />
              </button>
            </div>
            <ol className="overflow-y-auto py-2 scrollbar-thin max-h-content mt-1 mb-3 flex flex-col gap-y-2 ">
              <li className="relative group/item cursor-pointer hover:outline-blue-600 hover:outline-2 hover:outline bg-white break-words shadow-md text-wrap rounded-md px-3 py-2 mx-1">
                <button type="button" className="hover:bg-gray-200 group-hover/item:visible invisible bg-white p-2 rounded-full absolute top-1 right-1">
                  <MdDeleteOutline size={18} />
                </button>
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </li>
            </ol>
          </li>

          {/* ADD COLUMN BUTTON */}
          <div className="w-[275px]">
            <button
              type="button"
              className="rounded-lg w-full text-gray-600 flex items-center px-3 py-2 bg-gray-50 hover:bg-gray-300"
            >
              <FaPlus className="me-2" size="15" />
              <p className="text-sm">Add a list</p>
            </button>
          </div>
        </ol>
      </div>

      {/* {currentWorkspace?.allTask.map((ele: Task) => (
            <div
              key={ele.id}
              className="h-[100%] bg-gray-100 rounded-md px-3 py-6"
            >
              <div className="flex items-center justify-between mb-2">
                <InputTitle
                  workspaceId={id}
                  columnId={ele.id}
                  id={selectedColumnId}
                  isOpen={titleIsOpen}
                  setIsOpen={setTitleIsOpen}
                  task={ele}
                />
                <Menu>
                  <Menu.Button />
                  <Menu.List>
                    <Menu.Item>
                      <Menu.UpdateTitleButton
                        id={ele.id}
                        onUpdateTitle={(columnId) => {
                          setTitleIsOpen(true);
                          setSelectedColumnId(columnId);
                        }}
                      />
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.DeleteButton
                        onDelete={handleDelete}
                        columnId={ele.id}
                      />
                    </Menu.Item>
                  </Menu.List>
                </Menu>
              </div>
              <ul className="space-y-4 pt-2 h-[92%] scrollbar-thin">
                {ele.tasks.map((task, index) => (
                  <li key={index}>
                    <div className="bg-white text-[.8rem] shadow-md rounded-md p-3">
                      {task}
                    </div>
                  </li>
                ))}
                <AddTaskButton workspaceId={id} taskId={ele.id} />
              </ul>
            </div>
          ))}
          <AddColumnButton columnId={id}/> */}
    </section>
  );
}

export default Workspace;
