import { FaRegUser } from "react-icons/fa6";
import BoardList from "../../components/BoardList";

import Title from "../../components/Title";

function Workspace() {
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
      <BoardList>
        <BoardList.ListItem>
          <span className="text-white font-bold">My trello</span>
        </BoardList.ListItem>
        <BoardList.ListItem>
          <span className="text-white font-bold">My trello</span>
        </BoardList.ListItem>
        <BoardList.AddButton>Add Table</BoardList.AddButton>
      </BoardList>
    </main>
  );
}

export default Workspace;
