const { pkh } = require('../faucet.json');
const { alice } = require('../scripts/sandbox/accounts');

const { MichelsonMap } = require('@taquito/taquito');

const Warranty = artifacts.require("Warranty");

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

module.exports = async(deployer, network, _accounts)  => {
    var initial_storage;

    if (network === "development") {
        initial_storage = { 
            ledger:  new MichelsonMap(), 
            operators: new MichelsonMap(),
            reverse_ledger: new MichelsonMap(),
            metadata: MichelsonMap.fromLiteral({ 
                "": 'tezos-storage:contents'.hexEncode(),
            }),
            token_metadata: new MichelsonMap(),
            next_token_id: 0,
            admin: {
                admin: alice.pkh,
                pending_admin: null,
            }
        }
    } else if (network === "florence") {
        initial_storage = { 
            ledger:  new MichelsonMap(), 
            operators: new MichelsonMap(),
            reverse_ledger: new MichelsonMap(),
            metadata: MichelsonMap.fromLiteral({ 
                "": 'tezos-storage:contents'.hexEncode(),
            }),
            token_metadata: new MichelsonMap(),
            next_token_id: 0,
            admin: {
                admin: pkh,
                pending_admin: null,
            }
        }
    }

    deployer.deploy(Warranty, initial_storage);
};
