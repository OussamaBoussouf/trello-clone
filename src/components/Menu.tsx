import { createContext, useContext, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { useClickOutside } from "../hooks/useClickOutside";

const MenuContext = createContext(null);

function Menu({ children }: { children: JSX.Element[] | JSX.Element }) {
 
  return (
      <div className="p-2 group/item relative">{children}</div>
  );
}

function Item({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
    <li className="flex space-x-4 cursor-pointer p-2 border-b-[1px]">
      {children}
    </li>
  );
}

function List({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
    <>
        <ul className="invisible group-hover/item:visible absolute left-4 w-48 bg-white shadow-md p-3 rounded-md">
          {children}
        </ul>
    </>
  );
}

function Button() {
  return (
    <button
      type="button"
      className="hover:bg-gray-300 p-2 rounded-full"
    >
      <GoKebabHorizontal size={20} />
    </button>
  )
}

Menu.Item = Item;
Menu.List = List;
Menu.Button = Button;

export default Menu;
