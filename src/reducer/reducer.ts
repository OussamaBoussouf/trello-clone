interface WorkspaceAction {
    type: string;
    payload: any;
}

type Workspace = {
    id: number;
    title: string;
    backgroundColor: string;
    allTask: any[];
};



export function workspaceReducer(state: Workspace[], action : WorkspaceAction) {
  switch (action.type) {
    case "addWorkspace":
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
            id: state.length + 1,
            title: action.payload.title,
            backgroundColor: selectedColor,
          },
        ])
      );
      const newState = [
        ...state,
        {
          id: state.length + 1,
          title: action.payload.title,
          backgroundColor: selectedColor,
          allTask: [],
        },
      ];

      return newState;

      default:
        return state;
  }
}
