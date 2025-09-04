import { useState, useEffect } from 'react';

/**
 * Custom hook for using localStorage as state.
 *
 * @param {string} key The key under which the value is stored in localStorage.
 * @param {*} initialValue The initial value if no data exists.
 */
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error loading from localStorage', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;