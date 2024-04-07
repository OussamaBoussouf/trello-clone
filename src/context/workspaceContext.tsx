import React, { createContext, useReducer } from "react";
import { workspaceReducer } from "../reducer/reducer";

interface WorkspaceAction {
  type: string;
  payload: any;
}

type Task = {
  id: number;
  title: string;
  tasks: [];
};

type Workspace = {
  id: number;
  title: string;
  backgroundColor: string;
};


type ColumnStr = {
  id: number,
  title: string
}

type Columns = {
  [key: number] : ColumnStr[],
}

const dataFromLocalStorage = localStorage.getItem("workspace");
const initialWorkspace: Workspace[] = dataFromLocalStorage
  ? JSON.parse(dataFromLocalStorage)
  : [];

const columns : =   

// {title: string, tasks: string[]}

export const WorkspaceContext = createContext<{
  workspace: Workspace[];
  dispatch: React.Dispatch<WorkspaceAction>;
}>({
  workspace: initialWorkspace,
  dispatch: () => null,
});

function WorkspaceProvider({ children }: { children: JSX.Element }) {
  const dataFromLocalStorage = localStorage.getItem("workspace");
  const workspaceList: Workspace[] = dataFromLocalStorage
    ? JSON.parse(dataFromLocalStorage)
    : [];
  //   const [workspace, setWorkspace] = useState(workspaceList);
  const [workspace, dispatch] = useReducer(workspaceReducer, workspaceList);
  return (
    <WorkspaceContext.Provider value={{ workspace, dispatch }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export default WorkspaceProvider;
