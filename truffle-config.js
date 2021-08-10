const { mnemonic, secret, password, email } = require('./faucet.json');
const { alice } = require('./scripts/sandbox/accounts');

module.exports = {
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  networks: {
    development: {
      host: "http://localhost",
      port: 20000,
      network_id: "*",
      secretKey: alice.sk,
      type: "tezos"
    },
    florence: {
      host: 'http://florencenet.tezos.co.il',
      port: 8732, //172.15.67.251.55983',
      network_id: '*',
      secret,
      mnemonic,
      password,
      email,
      type: 'tezos',
    },
  }
};
