pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract StakingPool {
    string public name;
    address public owner;
    ERC20 public busdxToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    uint256 public totalStakingBalance;
    uint256 public totalTokenUsed;

    // This unstake is variables used for minting the unstaked tokens.
    mapping(address => uint256) public unStakedUserDetails;
    address[] public unStakers;
    mapping(address => bool) public hasUnstaked;

    // This used for burning the staked tokens.
    uint256 public stakingBalToBeBurned;

    uint256 public totalProjTokens;

    // investor address and allocated project tokens.
    mapping(address => uint256) public projectTokenBalance;

    constructor(ERC20 _busdxToken, string memory _name) {
        busdxToken = _busdxToken;
        name = _name;
        owner = msg.sender;
    }

    function stakeTokens(uint256 _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer tokens to this contract for staking
        busdxToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Update staking balance in temp varialble.
        stakingBalToBeBurned = stakingBalToBeBurned + _amount;

        // Add user to stakers array *only* if they haven't staked already
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw) -- Just updating the pool.
    function unstakeTokens(uint256 _amount) public payable {
        // check the amount is greater than 0
        require(_amount > 0, "staking balance cannot be 0");

        // Fetch staking balance
        uint256 balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Check given amount is available in the balance.
        require(
            _amount <= balance,
            "Your staking balace is lesser than the given amount"
        );

        uint256 remaingBalance = balance - _amount;

        // add unstaked user in the unStakedUserDetails mapping.
        unStakedUserDetails[msg.sender] =
            unStakedUserDetails[msg.sender] +
            _amount;

        // add user to unstakers array *only* if they haven't unstake already.
        if (!hasUnstaked[msg.sender]) {
            unStakers.push(msg.sender);
        }

        hasUnstaked[msg.sender] = true;

        // Reset staking balance
        stakingBalance[msg.sender] = remaingBalance;

        // Update staking status
        if (remaingBalance == 0) {
            isStaking[msg.sender] = false;
        }

        // Require that staking pool has enough tokens
        require(busdxToken.balanceOf(address(this)) >= _amount);

        // Send the unstaked token to respective investor.
        // busdxToken.transferFrom(address(this), msg.sender, _amount);
        busdxToken.transfer(msg.sender, _amount);
    }

    function totalStakeBalance() public returns (uint256 bal) {
        uint256 balance;
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            balance = stakingBalance[recipient] + balance;
        }
        totalStakingBalance = balance;
        return balance;
    }

    // find the percentage for each staked users.
    function getPercentage(uint256 _investedAmount, uint256 _tempTotalStaking)
        internal
        pure
        returns (uint256 percentage)
    {
        return ((_investedAmount * 100000000000000000) / _tempTotalStaking);
        // return (tempPercentage * 100);
    }

    // Transfer remaining token to respective investors.
    function transferTokenToInvestor(
        uint256 _calculatedProjectTokens,
        address projectOwnerAddress
    ) public payable {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Check the total staked token is equal or greater than total project token.
        uint256 tempTotalStaking = totalStakeBalance();

        // Require that staking pool has enough tokens
        require(busdxToken.balanceOf(address(this)) >= tempTotalStaking);

        // Find total staking is greater or lesser.
        if (tempTotalStaking >= _calculatedProjectTokens) {
            // Total staking is greater.
            uint256 projectCompletedMintedToken;

            // Issue tokens to all stakers
            for (uint256 i = 0; i < stakers.length; i++) {
                address recipient = stakers[i];
                uint256 percentage = getPercentage(
                    stakingBalance[recipient],
                    tempTotalStaking
                );
                // Allocated Launchpad token.
                uint256 allocatedTokens = (_calculatedProjectTokens *
                    percentage) / 100000000000000000;

                saveProjectTokenInvestor(recipient, allocatedTokens);

                // uint256 finalAllocatedTokens = allocatedTokens *
                //     _projectTokenPrice;

                uint256 balance = (stakingBalance[recipient] - allocatedTokens);
                if (balance > 0) {
                    busdxToken.transfer(recipient, balance);
                    delete stakingBalance[recipient];
                    delete hasStaked[recipient];
                    totalTokenUsed = totalTokenUsed + balance;
                    projectCompletedMintedToken =
                        projectCompletedMintedToken +
                        balance;
                }
            }
            // delete stakers; No need to delete the stakers now.

            // Sending the remaing token staked to project owner.
            // check the totalstaking - projectCompletedMintedToken.
            uint256 noOfTokenToBeSentToProjOwner = tempTotalStaking -
                projectCompletedMintedToken;

            busdxToken.transfer(
                projectOwnerAddress,
                noOfTokenToBeSentToProjOwner
            );

            totalTokenUsed = totalTokenUsed + noOfTokenToBeSentToProjOwner;
        } else {
            require(tempTotalStaking > 0, "Amount should not be less than 0");
            // Issue tokens to all stakers
            for (uint256 i = 0; i < stakers.length; i++) {
                address recipient = stakers[i];
                uint256 percentage = getPercentage(
                    stakingBalance[recipient],
                    tempTotalStaking
                );
                // Allocated Launchpad token.
                uint256 allocatedTokens = (tempTotalStaking * percentage) /
                    100000000000000000;

                saveProjectTokenInvestor(recipient, allocatedTokens);

                delete stakingBalance[recipient];
                delete hasStaked[recipient];
            }

            // Send Total staking token to Project Owner
            busdxToken.transfer(projectOwnerAddress, tempTotalStaking);
            totalTokenUsed = totalTokenUsed + tempTotalStaking;
        }
    }

    // Save project token to investors.
    function saveProjectTokenInvestor(
        address recipient,
        uint256 allocatedTokens
    ) private {
        // save allocated launch pad token to investor.
        projectTokenBalance[recipient] =
            projectTokenBalance[recipient] +
            allocatedTokens;
    }

    // get Stakers list
    function getStakersList()
        public
        view
        returns (address[] memory stakersList)
    {
        return stakers;
    }

    //Total Launch pad token allocated to investor.
    function totalProjToken() public returns (uint256 bal) {
        uint256 balance;
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            balance = projectTokenBalance[recipient] + balance;
        }
        totalProjTokens = balance;
        return balance;
    }

    // Send ProjectToken to Investors.
    function sendProjTokenInvestor(
        ERC20 projectToken,
        uint256 projectTokenPrice
    ) public {
        // Only owner can access it.
        require(msg.sender == owner, "Needs to call by owner..");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = projectTokenBalance[recipient];
            balance = balance / projectTokenPrice;
            uint256 finalBal = balance * (10**projectToken.decimals());

            if (finalBal > 0) {
                uint256 allowance = projectToken.allowance(
                    msg.sender,
                    address(this)
                );
                require(allowance >= finalBal, "Check the token allowance");
                require(
                    projectToken.balanceOf(msg.sender) >= finalBal,
                    "Admin amount is not enough.."
                );
                projectToken.transferFrom(msg.sender, recipient, finalBal);
            }
        }
    }

    function deleteVariables() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        delete stakers;
        delete unStakers;
    }
}
