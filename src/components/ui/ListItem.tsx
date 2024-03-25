import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

type Workspace = {
    id: number;
    title: string;
    backgroundColor:string;
  };
  
  type ListItemProps = {
    children: JSX.Element[] | JSX.Element;
    akey: number;
    currentWorkspace: Workspace;
    onDelete: (key: number) => void;
  };
  
 export function ListItem({ children, currentWorkspace, onDelete, akey }: ListItemProps) {
    return (
      <li key={akey}  className="relative origin-top-left overflow-hidden group/item">
        <button
          onClick={() => onDelete(akey)}
          type="button"
          className="bg-gray-200 group-hover/item:-translate-x-9 p-1 duration-500 rounded-md absolute -right-7 top-2"
        >
          <IoClose fontSize={20} />
        </button>
        <Link to={`/board/workspace/${akey}`}>
          <div className={`h-[100px] p-2 ${currentWorkspace.backgroundColor} .backgroundColor} rounded-md`}>
            {children}
          </div>
        </Link>
      </li>
    );
  }