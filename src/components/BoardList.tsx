import { ListItem } from "./ui/ListItem";
import { AddButton } from "./ui/AddButton";

function BoardList({ children }: { children: JSX.Element[] }) {
  return <ul className="grid gap-3 grid-cols-auto-fill">{children}</ul>;
}

BoardList.ListItem = ListItem;
BoardList.AddButton = AddButton;

export default BoardList;
