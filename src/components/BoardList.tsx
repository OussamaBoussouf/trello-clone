import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useClickOutside } from "../hooks/useClickOutside";
import { useRef, useState } from "react";
import { ListItem } from "./ui/ListItem";
import { AddButton } from "./ui/AddButton";

type Workspace = {
  id: number;
  title: string;
  backgroundColor:string;
};

// type ListItemProps = {
//   children: JSX.Element[] | JSX.Element;
//   akey: number;
//   currentWorkspace: Workspace;
//   onDelete: (key: number) => void;
// };

// function ListItem({ children, currentWorkspace, onDelete, akey }: ListItemProps) {
//   console.log(akey);
//   return (
//     <li key={akey}  className="relative origin-top-left overflow-hidden group/item">
//       <button
//         onClick={() => onDelete(akey)}
//         type="button"
//         className="bg-gray-200 group-hover/item:-translate-x-9 p-1 duration-500 rounded-md absolute -right-7 top-2"
//       >
//         <IoClose fontSize={20} />
//       </button>
//       <Link to="./ream">
//         <div className={`h-[100px] p-2 ${currentWorkspace.backgroundColor} .backgroundColor} rounded-md`}>
//           {children}
//         </div>
//       </Link>
//     </li>
//   );
// }

function BoardList({ children }: { children: JSX.Element[] }) {
  return <ul className="grid gap-3 grid-cols-auto-fill">{children}</ul>;
}

// type CreateButtonProps = {
//   children: string;
//   workspace: Workspace[];
//   setWorkspace: React.Dispatch<React.SetStateAction<Workspace[]>>;
// };

// function CreateButton({
//   children,
//   workspace,
//   setWorkspace,
// }: CreateButtonProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   let ref = useClickOutside(setIsOpen);
//   const [inputValue, setInputValue] = useState("");
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const colors = [
//       "bg-green-400",
//       "bg-red-500",
//       "bg-orange-500",
//       "bg-amber-500",
//       "bg-emerald-500",
//     ];

//     const selectedColor = colors[Math.floor(Math.random() * 5)];

//     console.log('RENDER');

//     localStorage.setItem(
//       "workspace",
//       JSON.stringify([
//         ...workspace,
//         {
//           id: workspace.length + 1,
//           title: inputValue,
//           backgroundColor: selectedColor,
//         },
//       ])
//     );
//     setWorkspace([
//       ...workspace,
//       {
//         id: workspace.length + 1,
//         title: inputValue,
//         backgroundColor: selectedColor,
//       },
//     ]);
//     setIsOpen(false);
//     setInputValue("");
//   };


//   return (
//     <li className="relative">
//       <div>
//         <div
//           role="button"
//           onClick={() => setIsOpen(!isOpen)}
//           className="cursor-pointer h-[100px] p-2 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center"
//         >
//           <span className="text-sm">{children}</span>
//         </div>
//         <div
//           ref={ref}
//           className={
//             isOpen
//               ? "absolute top-[0] left-0 w-72 bg-white p-4 rounded-md shadow-lg"
//               : "hidden"
//           }
//         >
//           <div className="mb-5 flex items-center justify-between">
//             <p className="text-center flex-grow text-sm">Create a table</p>
//             <button
//               onClick={() => setIsOpen(false)}
//               type="button"
//               className="rounded-md hover:bg-gray-400 p-1"
//             >
//               <IoClose size={23} className="float-end" />
//             </button>
//           </div>
//           <form onSubmit={(e) => handleSubmit(e)}>
//             <label
//               htmlFor="title"
//               className="after:content-['*'] after:text-red-500 text-[.8rem]"
//             >
//               Title of the table
//             </label>
//             <input
//               type="text"
//               id="title"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               required
//               className="w-full mb-5 p-1 border-[1px] focus:outline-blue-700 rounded-md"
//             />
//             <button
//               type="submit"
//               className="text-sm bg-blue-500 hover:bg-blue-700 w-full py-2 rounded-md text-white"
//             >
//               Create
//             </button>
//           </form>
//         </div>
//       </div>
//     </li>
//   );
// }

BoardList.ListItem = ListItem;
BoardList.AddButton = AddButton;

export default BoardList;
