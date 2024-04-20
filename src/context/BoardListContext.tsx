import React, { createContext, useReducer } from "react";

import { columnReducer } from "../reducer/columnReducer";

import { boardListReducer } from "../reducer/boardListReducer";
import { taskReducer } from "../reducer/taskReducer";


// interface WorkspaceAction {
//   type: string;
//   payload: any;
// }

// interface ColumnAction {
//   type: string;
//   payload: any;
// }

// type Task = {
//   id: number;
//   title: string;
//   tasks: [];
// };

interface IBoardList {
  id: string;
  title: string;
};

interface BoardListAction {
  type: string;
  payload: any;
}  

interface IColumn {
  id: string;
  columnTitle: string;
};

interface Columns {
  [key: string]: IColumn[];
};

interface ColumnAction {
  type: string;
  payload: any;
}

interface ITask{
  id: string;
  content: string;
}

interface ITaskList {
  [key: string]: ITask[];
}

interface Tasks {
  [key: string]: ITaskList;
}

interface TaskAction {
  type: string;
  payload: any;
}


interface IContext {
  boardList: IBoardList[];
  columns: Columns;
  tasks: Tasks;
  dispatchBoardList: React.Dispatch<BoardListAction>;
  dispatchColumn: React.Dispatch<ColumnAction>;
  dispatchTask: React.Dispatch<TaskAction>;
}



// type IColumn = {
//   id: number,
//   columnTitle: string
// }

// type Columns = {
//   [key: number] : IColumn[],
// }

const boardList = localStorage.getItem("boardList");
const columns = localStorage.getItem("columns");
const tasks = localStorage.getItem("tasks");

const initialColumnList: Columns = columns
  ? JSON.parse(columns)
  : {};
const initialBoardList: IBoardList[] = boardList
  ? JSON.parse(boardList)
  : [];

const initialTasks: Tasks = tasks ? JSON.parse(tasks)
: {};

export const BoardListContext = createContext<IContext>({
  tasks: initialTasks,
  boardList: initialBoardList,
  columns: initialColumnList,
  dispatchBoardList: () => {},
  dispatchColumn: () => {},
  dispatchTask: () => {},
});


function BoardListProvider({ children }: { children: JSX.Element }) {


  const [boardList, dispatchBoardList] = useReducer(boardListReducer, initialBoardList);
  const [columns, dispatchColumn] = useReducer(columnReducer, initialColumnList);
  const [tasks, dispatchTask] = useReducer(taskReducer, initialTasks);

  return (
    <BoardListContext.Provider value={{boardList, columns, tasks, dispatchColumn, dispatchBoardList, dispatchTask}}>
      {children}
    </BoardListContext.Provider>
  );
}

export default BoardListProvider;
