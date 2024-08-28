import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export default function useLocalStorageState<T>(
  initialState: T,
  key: string
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : (initialState as T);
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
