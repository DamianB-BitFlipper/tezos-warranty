import { useEffect, useState } from 'react';

export function useTimedLoad(string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    let i = 0;
    let interval = setInterval(() => {
      i = (i % 3) + 1;
      setValue(`${string}${' -'.repeat(i)}`);
    }, 500);
    return () => {
      clearInterval(interval);
      interval = null;
    };
  }, [string]);

  return value;
}
