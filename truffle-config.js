require("babel-register");
require("babel-polyfill");
require("dotenv").config();
// const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic =
 "4c5de6588be72ac56343370dbec6563ee3cf1f01804f623ae97b5a071c7b2c87";
const privateKeys = process.env.PRIVATE_KEYS || "";
const mnemonicMatic =
 "a7ee7ec7228e961b453f30a0f599a1f32406967e9c8145450911dffb651af84a";

module.exports = {
 networks: {
  development: {
   host: "127.0.0.1",
   port: 7545,
   network_id: "*", // Match any network id
  },
  bsctestnet: {
   provider: () =>
    new HDWalletProvider(
     mnemonic.split(","),
     `https://data-seed-prebsc-1-s2.binance.org:8545`
    ),
   network_id: 97, // 3 for ropsten, 97 for bsc test
   confirmations: 2,
   timeoutBlocks: 2000,
   skipDryRun: true,
   networkCheckTimeout: 1000000,
  },
  ropsten: {
   provider: function () {
    return new HDWalletProvider(
     privateKeys.split(","), // Array of account private keys
     `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}` // Url to an Ethereum Node
    );
   },
   gas: 5000000,
   gasPrice: 25000000000,
   network_id: 3,
   skipDryRun: true,
  },
  matic: {
   provider: () =>
    new HDWalletProvider(
     mnemonicMatic.split(","),
     `https://rpc-mumbai.maticvigil.com`
    ),
   network_id: 80001,
   confirmations: 2,
   timeoutBlocks: 200,
   skipDryRun: true,
  },
 },
 contracts_directory: "./src/contracts/",
 contracts_build_directory: "./src/abis/",
 compilers: {
  solc: {
   version: "^0.8.0",
   optimizer: {
    enabled: true,
    runs: 200,
   },
   evmVersion: "petersburg",
  },
 },
};
