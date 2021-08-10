import { useState } from 'react';
import signs from './signs';

export function useInts() {
  const [firstInt, setFirstInt] = useState(0);
  const [secondInt, setSecondInt] = useState(0);
  const [sign, setSign] = useState(signs.PLUS);
  return { firstInt, setFirstInt, secondInt, setSecondInt, sign, setSign };
}
