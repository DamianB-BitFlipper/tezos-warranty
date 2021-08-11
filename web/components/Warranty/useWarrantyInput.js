import { useState, useEffect } from 'react';

import { Tezos } from 'hooks/use-beacon';

export function useWarrantyInput() {
    const [contractInstance, setContractInstance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStorage, setCurrentStorage] = useState(null);

    useEffect(() => { 
        // Once the `contractInstance` is set, load the current storage
        if (contractInstance != null) {
            getStorage();
        }
    }, [contractInstance]);

    return {
        connect,
        mint,
        isLoading,
        currentStorage,
    };

    async function connect(contractAddress) {
        setIsLoading(true);
        const contract = await connectContract(contractAddress);
        setContractInstance(contract);
        setIsLoading(false);
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
        setCurrentStorage(storage);
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
            return null;
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

    async function mint() {
        setIsLoading(true);
        try {
            const op = await contractInstance.methods['mint'](
                'tz1Zgd3LHuryw6rBzsQKnBMVqu99KzWankj8',
                'Serial-69',
                365,
                '',
                1
            ).send();
            await op.confirmation();
            await getStorage();
        } catch (error) {
            window.alert(error.message);
            setIsLoading(false);
        }
    }
}
