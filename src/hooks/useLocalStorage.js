import { useEffect, useState } from "react";

function readSaved(key, initialValue) {
  if (key === null) return initialValue; // no key (guest): nothing to read
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  } catch {
    // saved text is not valid JSON (or storage is blocked), use the default
    return initialValue;
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readSaved(key, initialValue));
  const [prevKey, setPrevKey] = useState(key);

  // Key changed: load the value saved under the new key straight away,
  // before anything is saved, so one user's data never goes to another key.
  if (key !== prevKey) {
    setPrevKey(key);
    setValue(readSaved(key, initialValue));
  }

  useEffect(() => {
    if (key === null) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or not allowed, the app still works, it just won't remember
    }
  }, [key, value]);

  return [value, setValue];
}
