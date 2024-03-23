import { Link } from "react-router-dom";

function ListItem({ children }: { children: JSX.Element }) {
  return (
    <li>
      <Link to="./">
        <div className="h-[100px] p-2 bg-green-400 rounded-md">{children}</div>
      </Link>
    </li>
  );
}

function BoardList({ children }: { children: JSX.Element[] }) {
  return <ul className="grid gap-3 grid-cols-auto-fill">{children}</ul>;
}

function CreateButton({ children }: { children: string }) {
  return (
    <li>
      <div
        role="button"
        className="cursor-pointer max-w-[214px] h-[100px] p-2 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center"
      >
        <span className="text-sm">{children}</span>
      </div>
    </li>
  );
}

BoardList.ListItem = ListItem;
BoardList.AddButton = CreateButton;

export default BoardList;
