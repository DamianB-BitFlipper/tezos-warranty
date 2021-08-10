import { useState } from 'react';

import { Tezos } from 'hooks/use-beacon';
import signs from './signs';

export function useCalculatorInput() {
  const [contractInstance, setContractInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  return {
    submit,
    isLoading,
    connect,
    currentValue,
  };

  async function connect(contractAddress) {
    const contract = await connectContract(contractAddress);
    setContractInstance(contract);
  }

  async function submit(firstInt, secondInt, sign) {
    setIsLoading(true);
    try {
      const op = await operate(firstInt, secondInt, sign);
      await op.confirmation();
      await getStorage();
    } catch (error) {
      window.alert(error.message);
      setIsLoading(false);
    }
  }

  async function getStorage() {
    setIsLoading(true);
    const storage = await contractInstance.storage();
    setCurrentValue(storage.toNumber());
    setIsLoading(false);
  }

  async function connectContract(contractAddress) {
    setIsLoading(true);

    try {
      const contract = await Tezos.wallet.at(contractAddress);
      setIsLoading(false);
      return contract;
    } catch (error) {
      window.alert(error.message);
    }
  }

  async function operate(firstInt, secondInt, sign) {
    switch (sign) {
      case signs.PLUS:
        return await action('add', firstInt, secondInt);
      case signs.MINUS:
        return action('subtract', firstInt, secondInt);
      case signs.MUL:
        return action('multiply', firstInt, secondInt);
      case signs.DIV:
        return action('divide', firstInt, secondInt);
      default:
        return alert(`not supported ${sign}`);
    }
  }

  async function action(actionName, firstInt, secondInt) {
    return await contractInstance.methods[actionName](
      firstInt,
      secondInt
    ).send();
  }
}
