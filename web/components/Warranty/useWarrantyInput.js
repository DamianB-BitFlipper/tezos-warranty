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
        transfer,
        isLoading,
        currentStorage,
    };

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

    async function connect(contractAddress) {
        setIsLoading(true);
        const contract = await connectContract(contractAddress);
        setContractInstance(contract);
        setIsLoading(false);
    }

    async function getStorage() {
        setIsLoading(true);
        const storage = await contractInstance.storage();
        setCurrentStorage(storage);
        setIsLoading(false);
    }

    async function mint(owner, 
                        serial_number, 
                        warranty_duration, 
                        warranty_conditions, 
                        num_transfers_allowed) {
        setIsLoading(true);
        try {
            const op = await contractInstance.methods['mint'](
                owner, serial_number, warranty_duration,
                warranty_conditions, num_transfers_allowed
            ).send();
            await op.confirmation();
            await getStorage();
        } catch (error) {
            window.alert(error.message);
        }
        setIsLoading(false);
    }

    /***
        Transfer a the `token_ids` from a single `owner` to a single `recipient`
     ***/
    async function transfer(owner, 
                            recipient,
                            token_ids) { 
        setIsLoading(true);
        var transfer_arg = [{
            from_: owner,
            txs: token_ids.map((token_id) => {
                return {
                    to_: recipient,
                    token_id: token_id,
                    amount: 1,
                };
            }),
        }];

        try {
            const op = await contractInstance.methods['transfer'](
                transfer_arg
            ).send();
            await op.confirmation();
            await getStorage();
        } catch (error) {
            window.alert(error.message);
        }
        setIsLoading(false);
    }
}
