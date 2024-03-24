import React, {useEffect, useRef } from "react";

export const useClickOutside = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!menu.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return menu;
};
