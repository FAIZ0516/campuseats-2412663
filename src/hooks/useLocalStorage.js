import { useEffect, useState } from "react";

// Same idea as useState, but the value is also saved in localStorage,
// so it is still there after the page is refreshed.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      // saved text is not valid JSON (or storage is blocked), use the default
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or not allowed, the app still works, it just won't remember
    }
  }, [key, value]);

  return [value, setValue];
}
