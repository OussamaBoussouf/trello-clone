import { arrayMove } from "@dnd-kit/sortable";

interface TaskAction {
  type: string;
  payload: any;
}

interface ITask {
  id: string;
  content: string;
}

interface ITaskList {
  [key: string]: ITask[];
}

interface Tasks {
  [key: string]: ITaskList;
}

export function taskReducer(state: Tasks, action: TaskAction): Tasks {
  switch (action.type) {
    case "addTask": {
      const temp = { ...state };
      if (!temp[action.payload.id]) {
        temp[action.payload.id] = {};
      }

      if (!temp[action.payload.id][action.payload.columnId]) {
        temp[action.payload.id][action.payload.columnId] = [];
      } else {
        temp[action.payload.id][action.payload.columnId].push({
          id: action.payload.taskId,
          content: action.payload.content,
        });
      }
      localStorage.setItem("tasks", JSON.stringify(temp));
      return temp;
    }

    case "deleteTask": {
      const temp = { ...state };
      temp[action.payload.id][action.payload.columnId] = temp[
        action.payload.id
      ][action.payload.columnId].filter(
        (task) => task.id != action.payload.taskId
      );
      localStorage.setItem("tasks", JSON.stringify(temp));
      return temp;
    }

    case "deleteEntireTasks": {
      const temp = { ...state };
      if (
        temp[action.payload.id] &&
        temp[action.payload.id][action.payload.columnId]
      ) {
        delete temp[action.payload.id][action.payload.columnId];
        localStorage.setItem("tasks", JSON.stringify(temp));
        return temp;
      }
      return temp;
    }

    case "deleteEntireTaskSpace": {
      const temp = { ...state };
      if (temp[action.payload.tasksContainerId]) {
        delete temp[action.payload.tasksContainerId];
        localStorage.setItem("tasks", JSON.stringify(temp));
        return temp;
      }
      return temp;
    }

    case "updateContent": {
      const temp = { ...state };
      temp[action.payload.id][action.payload.columnId].forEach((task) => {
        if (task.id == action.payload.taskId) {
          task.content = action.payload.content;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(temp));
      return temp;
    }

    case "sortTasks": {
      const temp = { ...state };
      const activeContainerId = action.payload.active.data.current.columnId;
      const overContainerId = action.payload.over?.data.current?.columnId;
      let oldIndex;
      let newIndex;

      temp[action.payload.id][activeContainerId].forEach((task, index) => {
        if (task.id == action.payload.active?.id) {
          oldIndex = index;
        }
      });

      temp[action.payload.id][overContainerId].forEach((task, index) => {
        if (task.id == action.payload.over?.id) {
          newIndex = index;
        }
      });
      // if (oldIndex && newIndex) {
        const newArrangement = arrayMove(
          temp[action.payload.id][overContainerId],
          oldIndex,
          newIndex
        );
        temp[action.payload.id][overContainerId] = newArrangement;
      // }
      return temp;
    }

    case "rearrangeTasks": {
      const temp = { ...state };
      let newIndex;
      const activeContainerId = action.payload.active.data.current.columnId;
      const overContainerId = action.payload.over?.data.current?.columnId;

      temp[action.payload.id][activeContainerId] = temp[action.payload.id][
        activeContainerId
      ].filter((task) => task.id != action.payload.active.id);

      if (temp[action.payload.id][overContainerId].length == 0) {
        temp[action.payload.id][overContainerId].push(
          action.payload.active.data.current.task
        );
        return temp;
      }

      temp[action.payload.id][overContainerId].forEach((task, index) => {
        if (task.id == action.payload.over?.id) {
          newIndex = index;
        }
      });

      temp[action.payload.id][overContainerId].splice(
        newIndex,
        0,
        action.payload.active.data.current.task
      );

      return temp;
    }

    default:
      return state;
  }
}
