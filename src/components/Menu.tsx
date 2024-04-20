import { useContext } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { WorkspaceContext } from "../context/BoardListContext";

function Menu({ children }: { children: JSX.Element[] | JSX.Element }) {
  return <div className="p-2 group/item relative">{children}</div>;
}

function Item({ children }: { children: JSX.Element[] | JSX.Element }) {
  return <li className="flex space-x-4 cursor-pointer">{children}</li>;
}

function List({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
    <>
      <ul className="absolute invisible group-hover/item:visible z-10 left-4 w-48 bg-white shadow-md p-1 rounded-md">
        {children}
      </ul>
    </>
  );
}

function DeleteButton({
  columnId,
  onDelete,
}: {
  columnId: number;
  onDelete: (id: number) => void;
}) {
  return (
    <button
      onClick={() => onDelete(columnId)}
      type="button"
      className="p-2 text-start hover:bg-slate-500 hover:text-white w-full"
    >
      Delete column
    </button>
  );
}

function UpdateTitleButton({
  onUpdateTitle,
  id,
}: {
  onUpdateTitle: (id: string) => void;
  id: string;
}) {
  return (
    <button
      onClick={() => onUpdateTitle(id)}
      type="button"
      className="p-2 text-start hover:bg-slate-500 hover:text-white w-full"
    >
      Update title
    </button>
  );
}

function Button() {
  return (
    <button type="button" className="hover:bg-gray-300 p-2 rounded-full">
      <GoKebabHorizontal size={20} />
    </button>
  );
}

Menu.Item = Item;
Menu.List = List;
Menu.Button = Button;
Menu.DeleteButton = DeleteButton;
Menu.UpdateTitleButton = UpdateTitleButton;

export default Menu;
