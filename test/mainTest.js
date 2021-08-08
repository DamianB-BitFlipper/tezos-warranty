const assert = require('assert');

const { MichelsonMap } = require('@taquito/taquito');
const { alice } = require('../scripts/sandbox/accounts');

const contractName = 'Warranty2';
const Warranty = artifacts.require(contractName);

// https://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex
String.prototype.hexEncode = function(){
    var hex, i;
    var result = "";

    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

contract(Warranty, async () => {
    let instance = null;

    before(async () => {
        const initial_storage = { 
            ledger:  new MichelsonMap(), 
            operators: new MichelsonMap(),
            reverse_ledger: new MichelsonMap(),
            metadata: MichelsonMap.fromLiteral({ 
                "": 'tezos-storage:contents'.hexEncode(),
            }),
            token_metadata: new MichelsonMap(),
            next_token_id: 0,
            admin: alice.pkh,
        }

        instance = await Warranty.deployed();

        //console.log(instance);
        //await instance.defaults(initial_storage);
        //await instance.storage();
    });

    it('Simple Test', async () => {
        await instance.main(69);
        const storage = await instance.storage();
        console.log(storage);
    });
});
