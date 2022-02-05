const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");
const StakingPool = artifacts.require("StakingPool");
const RewardStaking = artifacts.require("RewardStaking");

module.exports = async function (deployer) {
 // Deploy Token
 // await deployer.deploy(Token);
 // const token = await Token.deployed();

 // // Deploy EthSwap
 // await deployer.deploy(EthSwap, token.address);
 // const ethSwap = await EthSwap.deployed();

 // Deploy StakingPool
 await deployer.deploy(
  StakingPool,
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", // BUSD token address - 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
  "Project X Launch Token Pool"
 );

 // Deploy Reward staking contract
 await deployer.deploy(
  RewardStaking,
  "0xf729f4D13A9C9556875D20BACf9EBd0bF891464c", // BUSDX token address. -  0xf729f4D13A9C9556875D20BACf9EBd0bF891464c
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", // BUSD Token address. - 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
  "Reward Staking",
  "0x382c865562AedDd0CAe7Eae7103aaA6F0D70a798",
  "0x382c865562AedDd0CAe7Eae7103aaA6F0D70a798"
 );
 const stakingPool = await StakingPool.deployed();

 // Transfer all tokens to EthSwap (1 million)
 // await token.transfer(ethSwap.address, "1000000000000000000000000");
};
