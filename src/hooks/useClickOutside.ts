import { useEffect } from "react";

export const useClickOutside = (ref: any, callback: () => void) => {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      console.log(ref.current);
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, [ref, callback]);
};
