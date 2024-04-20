

interface WorkspaceAction {
  type: string;
  payload: any;
}
interface Task {
  id: any;
  title: string;
  tasks: string[];
}

type Workspace = {
  id: any;
  title: string;
  backgroundColor: string;
  allTask: Task[];
};

export function workspaceReducer(state: Workspace[], action: WorkspaceAction) {
  switch (action.type) {
    case "addWorkspace": {
      const colors = [
        "bg-green-400",
        "bg-red-500",
        "bg-orange-500",
        "bg-amber-500",
        "bg-emerald-500",
      ];
      const selectedColor = colors[Math.floor(Math.random() * 5)];
      localStorage.setItem(
        "workspace",
        JSON.stringify([
          ...state,
          {
            id: action.payload.id,
            title: action.payload.title,
            backgroundColor: selectedColor,
          },
        ])
      );
      const newState = [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          backgroundColor: selectedColor,
        },
      ];

      return newState;
    }

    case "deleteWorkspace": {
      const deleteTask = confirm(
        "Do you really want to delete this workspace?"
      );
      console.log("Delete task");
      if (deleteTask) {
        const availabelTasks = state.filter(
          (ele) => ele.id != action.payload.index
        );
        localStorage.setItem("workspace", JSON.stringify(availabelTasks));
        return availabelTasks;
      }
      return state;
    }

    case "addColumn": {
      const newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].id === action.payload.id) {
          newState[i].allTask.push({
            id: uuidv4(),
            title: action.payload.title,
            tasks: [],
          });
        }
      }
      localStorage.setItem("workspace", JSON.stringify(newState));
      return newState;
    }

    case "deleteColumn": {
      const newState = [...state];
      const answer = confirm("Do you want to delete this column?");
      if (answer) {
        for (let i = 0; i < newState.length; i++) {
          if (newState[i].id == action.payload.workspaceId) {
            const newTasks = newState[i].allTask.filter(
              (ele: Task) => ele.id != action.payload.columnId
            );
            newState[i].allTask = newTasks;
            console.log(newState);
          }
        }
        localStorage.setItem("workspace", JSON.stringify(newState));
      }
      return newState;
    }

    case "addTask": {
      const newState = [...state];
      const workspace = newState.find(
        (ele) => ele.id == action.payload.workspaceId
      );
      if (workspace) {
        const task = workspace?.allTask.find(
          (ele) => ele.id == action.payload.taskId
        );
        task?.tasks.push(action.payload.text);
      }
      localStorage.setItem("workspace", JSON.stringify(newState));
      return newState;
    }

    case "updateTitle": {
      const newState = [...state];
      const workspace = newState.find(
        (ele) => ele.id == action.payload.workspaceId
      );
      const task = workspace?.allTask.find(
        (ele) => ele.id == action.payload.columnId
      );
      if (task) {
        task.title = action.payload.newTitle;
      }

      localStorage.setItem("workspace", JSON.stringify(newState));
      return newState;
    }

    default:
      return state;
  }
}
