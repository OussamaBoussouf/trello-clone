import { arrayMove } from "@dnd-kit/sortable";

interface IColumn {
  id: string;
  columnTitle: string;
}

interface Columns {
  [key: string]: IColumn[];
}

interface ColumnAction {
  type: string;
  payload: any;
}

export function columnReducer(state: Columns, action: ColumnAction): Columns {
  switch (action.type) {
    case "addColumn": {
      const temp = { ...state };
      if (temp[action.payload.id]) {
        temp[action.payload.id] = [
          ...temp[action.payload.id],
          { id: action.payload.columnId, columnTitle: action.payload.title },
        ];
      } else {
        temp[action.payload.id] = [
          { id: action.payload.columnId, columnTitle: action.payload.title },
        ];
      }

      localStorage.setItem("columns", JSON.stringify(temp));

      return temp;
    }

    case "deleteColumn": {
      const temp = { ...state };
      temp[action.payload.id] = temp[action.payload.id].filter(
        (column) => column.id != action.payload.columnId
      );
      localStorage.setItem("columns", JSON.stringify(temp));
      return temp;
    }

    case "deleteColumnSpace": {
      const temp = { ...state };
      delete temp[action.payload.columnId];
      localStorage.setItem("columns", JSON.stringify(temp));
      return temp;
    }

    case "updateColumnTitle": {
      const temp = { ...state };
      temp[action.payload.id].forEach((column) => {
        if (column.id == action.payload.columnId) {
          column.columnTitle = action.payload.newTitle;
        }
      });
      localStorage.setItem("columns", JSON.stringify(temp));
      return temp;
    }

    case "reArrangeColumns": {
      const temp = { ...state };
      const selectedColumn = temp[action.payload.id];
      const oldIndex = action.payload.active.data.current?.sortable.index;
      const newIndex = action.payload.over.data.current?.sortable.index;
      const newArrangement = arrayMove(selectedColumn, oldIndex, newIndex);
      temp[action.payload.id] = newArrangement;
      localStorage.setItem("columns", JSON.stringify(temp));
      return temp;
    }

    default: {
      return state;
    }
  }
}
