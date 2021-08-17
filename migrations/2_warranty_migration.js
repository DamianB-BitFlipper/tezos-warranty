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
    // Have different initial administrators for the local 
    // dev network and the florence test network
    var initial_admin;
    if (network === "development") {
        initial_admin = {
            admin: alice.pkh,
            pending_admin: null,
        };
    } else if (network === "florence") {
        initial_admin = {
            admin: pkh,
            pending_admin: null,
        }
    }

    const initial_storage = { 
        ledger:  new MichelsonMap(), 
        operators: new MichelsonMap(),
        reverse_ledger: MichelsonMap.fromLiteral({
            [initial_admin.admin]: [],
        }),
        metadata: MichelsonMap.fromLiteral({ 
            "": 'tezos-storage:contents'.hexEncode(),
        }),
        token_metadata: new MichelsonMap(),
        next_token_id: 0,
        admin: initial_admin,
    };

    deployer.deploy(Warranty, initial_storage);
};
