import { FaRegUser } from "react-icons/fa6";
import BoardList from "../../components/BoardList";

import Title from "../../components/Title";
import { useState } from "react";

type Workspace = {
  id: number;
  title: string;
  backgroundColor: string;
};

function Board() {
  const dataFromLocalStorage = localStorage.getItem("workspace");
  const workspaceList: Workspace[] = dataFromLocalStorage
    ? JSON.parse(dataFromLocalStorage)
    : [];
  const [workspace, setWorkspace] = useState(workspaceList);
  console.log(workspace);

  const handleDelete = (index: number) => {
    const deleteTask = confirm("Do you really want to delete this workspace?");
    if (deleteTask) {
      const availabelTasks = workspace.filter((ele) => ele.id != index);
      localStorage.setItem("workspace", JSON.stringify(availabelTasks));
      setWorkspace(availabelTasks);
    }
  };

  return (
    <main className="mt-10">
      {/* HEADING */}
      <Title />
      {/* YOUR TABLES */}
      <div className="my-3 flex">
        <span className="me-2">
          <FaRegUser size={19} />
        </span>
        <p className="font-bold">Your tables</p>
      </div>
      {/* ALL TABLES */}
      <BoardList>
        <>
          {workspace.map((space) => (
            <BoardList.ListItem
              currentWorkspace={space}
              key={space.id}
              akey={space.id}
              onDelete={handleDelete}
            >
              <span className="text-white font-bold">{space.title}</span>
            </BoardList.ListItem>
          ))}
        </>
        <BoardList.AddButton workspace={workspace} setWorkspace={setWorkspace}>
          Add Table
        </BoardList.AddButton>
      </BoardList>
    </main>
  );
}

export default Board;
