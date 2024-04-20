import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BoardListContext } from "../../context/BoardListContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ITask {
  id: string;
  content: string;
}

interface TaskItemProps {
  task: ITask;
  id: string;
  columnId: string;
}

function TaskItem({ task, id, columnId }: TaskItemProps) {
  const { dispatchTask } = useContext(BoardListContext);
  const textareaNode = useRef<HTMLTextAreaElement>(null);

  const [isUpdateContentOpen, setIsUpdateContentOpen] = useState(false);
  const [liHeight, setLiHeight] = useState(0);
  const [newContent, setNewContent] = useState(task.content);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        type: "item",
        columnId: columnId,
        task,
      },
    });

  useEffect(() => {
    if (isUpdateContentOpen) {
      textareaNode.current?.focus();
      if (textareaNode.current) {
        textareaNode.current.style.height =
          textareaNode.current.scrollHeight + "px";
      }
    }
  }, [isUpdateContentOpen]);

  useClickOutside(textareaNode, () => setIsUpdateContentOpen(false));

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  const handleDeleteTask = () => {
    dispatchTask({
      type: "deleteTask",
      payload: {
        id: id,
        columnId: columnId,
        taskId: task.id,
      },
    });
  };

  const handleUpdateContent = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key == "Enter") {
      dispatchTask({
        type: "updateContent",
        payload: {
          id: id,
          columnId: columnId,
          taskId: task.id,
          content: newContent,
        },
      });
      setIsUpdateContentOpen(false);
    }
  };

  const handleHeight = () => {
    if (textareaNode.current) {
      textareaNode.current.style.height = 'auto';
      textareaNode.current.style.height = (textareaNode.current.scrollHeight) + 'px';
    }
  };

  return (
    <>
      {isUpdateContentOpen ? (
        <textarea
          value={newContent}
          ref={textareaNode}
          onChange={(event) => setNewContent(event.target.value)}
          onInput={handleHeight}
          onKeyDown={handleUpdateContent}
          className="w-full p-3 resize-none rounded-lg"
          required
        ></textarea>
      ) : (
        <li
          ref={setNodeRef}
          style={style}
          onClick={() => setIsUpdateContentOpen(true)}
          {...attributes}
          {...listeners}
          className="relative list-none group/item cursor-pointer bg-white break-words shadow-md text-wrap rounded-md px-3 py-3 mx-1"
        >
          <button
            type="button"
            className="hover:bg-gray-200 bg-white group-hover/item:visible invisible flex items-center justify-center w-[35px] h-[35px] p-2 rounded-full absolute top-1 right-1"
            onClick={handleDeleteTask}
          >
            <MdDeleteOutline size={18} color="red" />
          </button>
          {task.content}
        </li>
      )}
    </>
  );
}

export default memo(TaskItem);
