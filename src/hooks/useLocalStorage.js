import { useState, useEffect } from 'react';

const getLocalValue = (key, initValue) => {
  // SSR Next.js
  if (typeof window === 'undefined') return initValue;

  // if a value is already in localStorage, return it
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  // return value of a function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => getLocalValue(key, initValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
