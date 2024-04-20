import { useEffect } from "react";

export const useClickOutside = (ref: React.RefObject<any>, callback: () => void) => {
  useEffect(() => {
    const handler = (event: MouseEvent) => {

      if (!(event.target instanceof HTMLElement)) {
        return;
      }

      if (event.target?.scrollHeight > event.target?.clientHeight) {
        return;
      }

      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, [ref, callback]);
};
