import React, { createContext, useReducer } from "react";

import { columnReducer } from "../reducer/columnReducer";

import { boardListReducer } from "../reducer/boardListReducer";


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

interface IContext {
  boardList: IBoardList[];
  columns: Columns;
  dispatchBoardList: React.Dispatch<BoardListAction>;
  dispatchColumn: React.Dispatch<ColumnAction>;
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

const initialColumnList: Columns = columns
  ? JSON.parse(columns)
  : [];
const initialBoardList: IBoardList[] = boardList
  ? JSON.parse(boardList)
  : [];


export const BoardListContext = createContext<IContext>({
  boardList: initialBoardList,
  columns: initialColumnList,
  dispatchBoardList: () => {},
  dispatchColumn: () => {}
});


function BoardListProvider({ children }: { children: JSX.Element }) {


  const [boardList, dispatchBoardList] = useReducer(boardListReducer, initialBoardList);
  const [columns, dispatchColumn] = useReducer(columnReducer, initialColumnList);

  return (
    <BoardListContext.Provider value={{boardList, columns, dispatchColumn, dispatchBoardList}}>
      {children}
    </BoardListContext.Provider>
  );
}

export default BoardListProvider;
