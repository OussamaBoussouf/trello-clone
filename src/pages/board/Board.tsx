import { FaRegUser } from "react-icons/fa6";
import BoardList from "../../components/BoardList";

import Title from "../../components/Title";
import { useContext } from "react";
import { BoardListContext } from "../../context/BoardListContext";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import AddBoardButton from "../../components/ui/AddBoardButton";

function Board() {
  const { boardList, dispatchBoardList, dispatchColumn, dispatchTask } = useContext(BoardListContext);

 
  const handleDeleteBoard = (boardId: string) => {
    dispatchBoardList({
      type: "deleteBoard",
      payload: {
        id: boardId
      }
    });

    dispatchColumn({
      type: "deleteColumnSpace",
      payload: {
        columnId: boardId
      }
    });

    dispatchTask({
      type: "deleteEntireTaskSpace",
      payload: {
        tasksContainerId: boardId
      }
    });
  }

  return (
    <main className="container mx-auto pt-28">
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
      <ul className="grid gap-3 grid-cols-auto-fill">
        {boardList.map((board) => (
          <li key={board.id} className="relative origin-top-left overflow-hidden group/item">
            <div
              role="button"
              className="bg-gray-200 group-hover/item:-translate-x-9 p-1 duration-500 rounded-md absolute -right-7 top-2"
              onClick={() => handleDeleteBoard(board.id)}
            >
              <IoClose fontSize={20} />
            </div>
            <Link to={`/board/workspace/${board.id}`}>
              <div
                className={`h-[100px] p-2 bg-green-400 rounded-md font-bold`}
              >
                {board.title}
              </div>
            </Link>
          </li>
        ))}
        <AddBoardButton />
      </ul>
      {/* <BoardList>
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
        <BoardList.AddButton>
          Add Table
        </BoardList.AddButton>
      </BoardList> */}
    </main>
  );
}

export default Board;
