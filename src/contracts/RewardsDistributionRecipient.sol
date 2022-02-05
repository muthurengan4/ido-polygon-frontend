pragma solidity ^0.8.2;

// Inheritance
import "@openzeppelin/contracts/access/Ownable.sol";

// https://docs.synthetix.io/contracts/source/contracts/rewardsdistributionrecipient
abstract contract RewardsDistributionRecipient is Ownable {
    function notifyRewardAmount(uint256 reward) external virtual;
}
