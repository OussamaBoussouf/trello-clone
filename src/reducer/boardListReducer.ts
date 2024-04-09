interface IBoardList {
  id: string;
  title: string;
}

interface BoardListAction {
  type: string;
  payload: any;
}

export function boardListReducer(
  state: IBoardList[],
  action: BoardListAction
): IBoardList[] {
  switch (action.type) {
    case "addBoard": {
      const temp = [
        ...state,
        { id: action.payload.id, title: action.payload.title },
      ];
      localStorage.setItem("boardList", JSON.stringify(temp));
      return temp;
    }

    case "deleteBoard": {
      const temp = [...state];
      const newTemp = temp.filter((ele) => ele.id != action.payload.id);
      localStorage.setItem("boardList", JSON.stringify(newTemp));
      return newTemp;
    }

    default:
      return state;
  }
}
