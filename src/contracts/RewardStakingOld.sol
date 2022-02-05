pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@openzeppelin/contracts/security/Pausable.sol";

contract RewardStakingOld is Ownable, AccessControl, ReentrancyGuard, Pausable {
    string public name;
    ERC20 public busdxToken;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    uint256 public totalStakingBalance;

    // This unstake is variables used for minting the unstaked tokens.
    mapping(address => uint256) public unStakedUserDetails;
    address[] public unStakers;
    mapping(address => bool) public hasUnstaked;

    // Reward token balance
    uint256 public rewardBalance;

    // Reward percentage
    uint256 public rewardPercentage;

    // Reward Distribution
    address public rewardsDistribution;

    uint256 public periodFinish = 0;
    uint256 public rewardRate = 0;
    uint256 public rewardsDuration = 7 days;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    using SafeMath for uint256;
    /* ========== EVENTS ========== */

    event RewardAdded(uint256 reward);
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardsDurationUpdated(uint256 newDuration);
    event Recovered(address token, uint256 amount);

    constructor(
        ERC20 _busdxToken,
        string memory _name,
        address _rewardsDistribution,
        address _ownerAddress
    ) {
        busdxToken = _busdxToken;
        name = _name;
        rewardsDistribution = _rewardsDistribution;
        _setupRole(DEFAULT_ADMIN_ROLE, _ownerAddress);
        _setupRole(MINTER_ROLE, _ownerAddress);
        _setupRole(BURNER_ROLE, _ownerAddress);
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    function lastTimeRewardApplicable() public view returns (uint256) {
        return block.timestamp < periodFinish ? block.timestamp : periodFinish;
    }

    function rewardPerToken() public view returns (uint256) {
        if (_totalSupply == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored.add(
                lastTimeRewardApplicable()
                    .sub(lastUpdateTime)
                    .mul(rewardRate)
                    .mul(1e18)
                    .div(_totalSupply)
            );
    }

    function earned(address account) public view returns (uint256) {
        return
            _balances[account]
                .mul(rewardPerToken().sub(userRewardPerTokenPaid[account]))
                .div(1e18)
                .add(rewards[account]);
    }

    function getRewardForDuration() external view returns (uint256) {
        return rewardRate.mul(rewardsDuration);
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    function stake(uint256 amount)
        external
        nonReentrant
        whenNotPaused
        updateReward(msg.sender)
    {
        require(amount > 0, "Cannot stake 0");
        _totalSupply = _totalSupply.add(amount);
        _balances[msg.sender] = _balances[msg.sender].add(amount);
        busdxToken.transferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount)
        public
        nonReentrant
        updateReward(msg.sender)
    {
        require(amount > 0, "Cannot withdraw 0");
        _totalSupply = _totalSupply.sub(amount);
        _balances[msg.sender] = _balances[msg.sender].sub(amount);
        busdxToken.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function getReward() public nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            busdxToken.transfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }

    function exit() external {
        withdraw(_balances[msg.sender]);
        getReward();
    }

    // Reward distribution receipient contract.

    modifier onlyRewardsDistribution() {
        require(
            msg.sender == rewardsDistribution,
            "Caller is not RewardsDistribution contract"
        );
        _;
    }

    function setRewardsDistribution(address _rewardsDistribution)
        external
        onlyOwner
    {
        rewardsDistribution = _rewardsDistribution;
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    function notifyRewardAmount(uint256 reward)
        external
        onlyRewardsDistribution
        updateReward(address(0))
    {
        if (block.timestamp >= periodFinish) {
            rewardRate = reward.div(rewardsDuration);
        } else {
            uint256 remaining = periodFinish.sub(block.timestamp);
            uint256 leftover = remaining.mul(rewardRate);
            rewardRate = reward.add(leftover).div(rewardsDuration);
        }

        // Ensure the provided reward amount is not more than the balance in the contract.
        // This keeps the reward rate in the right range, preventing overflows due to
        // very high values of rewardRate in the earned and rewardsPerToken functions;
        // Reward + leftover must be less than 2^256 / 10^18 to avoid overflow.
        uint256 balance = busdxToken.balanceOf(address(this));
        require(
            rewardRate <= balance.div(rewardsDuration),
            "Provided reward too high"
        );

        lastUpdateTime = block.timestamp;
        periodFinish = block.timestamp.add(rewardsDuration);
        emit RewardAdded(reward);
    }

    // Added to support recovering LP Rewards from other systems such as BAL to be distributed to holders
    function recoverERC20(address tokenAddress, uint256 tokenAmount)
        external
        onlyOwner
    {
        require(
            tokenAddress != address(busdxToken),
            "Cannot withdraw the staking token"
        );
        ERC20(tokenAddress).transfer(owner(), tokenAmount);
        emit Recovered(tokenAddress, tokenAmount);
    }

    function setRewardsDuration(uint256 _rewardsDuration) external onlyOwner {
        require(
            block.timestamp > periodFinish,
            "Previous rewards period must be complete before changing the duration for the new period"
        );
        rewardsDuration = _rewardsDuration;
        emit RewardsDurationUpdated(rewardsDuration);
    }

    // function grandMinterRole(address minterAddress) public onlyOwner {
    //     _setupRole(MINTER_ROLE, minterAddress);
    // }

    // function grandBurnerRole(address burnerAddress) public onlyOwner {
    //     _setupRole(BURNER_ROLE, burnerAddress);
    // }

    // function revokeMinterAccess(address minterAddress) public onlyOwner {
    //     require(
    //         hasRole(MINTER_ROLE, minterAddress),
    //         "Couldn't find this address in the roles. "
    //     );
    //     revokeRole(MINTER_ROLE, minterAddress);
    // }

    // function revokeBurnerAccess(address burnerAddress) public onlyOwner {
    //     require(
    //         hasRole(BURNER_ROLE, burnerAddress),
    //         "Couldn't find this address in the roles. "
    //     );
    //     revokeRole(BURNER_ROLE, burnerAddress);
    // }

    // function stakeTokens(uint256 _amount) public {
    //     // Require amount greater than 0
    //     require(_amount > 0, "amount cannot be 0");

    //     // Trasnfer Mock Dai tokens to this contract for staking
    //     busdxToken.transferFrom(msg.sender, address(this), _amount);

    //     // Update staking balance
    //     stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

    //     // Add user to stakers array *only* if they haven't staked already
    //     if (!hasStaked[msg.sender]) {
    //         stakers.push(msg.sender);
    //     }

    //     // Update staking status
    //     isStaking[msg.sender] = true;
    //     hasStaked[msg.sender] = true;
    // }

    // // Unstaking Tokens (Withdraw) -- Just updating the pool.
    // function unstakeTokens(uint256 _amount) public payable {
    //     // check the amount is greater than 0
    //     require(_amount > 0, "staking balance cannot be 0");

    //     // Fetch staking balance
    //     uint256 balance = stakingBalance[msg.sender];

    //     // Require amount greater than 0
    //     require(balance > 0, "staking balance cannot be 0");

    //     // Check given amount is available in the balance.
    //     require(
    //         _amount <= balance,
    //         "Your staking balace is lesser than the given amount"
    //     );

    //     uint256 remaingBalance = balance - _amount;

    //     // add unstaked user in the unStakedUserDetails mapping.
    //     unStakedUserDetails[msg.sender] =
    //         unStakedUserDetails[msg.sender] +
    //         _amount;

    //     // add user to unstakers array *only* if they haven't unstake already.
    //     if (!hasUnstaked[msg.sender]) {
    //         unStakers.push(msg.sender);
    //     }

    //     hasUnstaked[msg.sender] = true;

    //     // Reset staking balance
    //     stakingBalance[msg.sender] = remaingBalance;

    //     // Update staking status
    //     if (remaingBalance == 0) {
    //         isStaking[msg.sender] = false;
    //     }

    //     // Require that staking pool has enough tokens
    //     require(busdxToken.balanceOf(address(this)) >= _amount);

    //     // Send the unstaked token to respective investor.
    //     // busdxToken.transferFrom(address(this), msg.sender, _amount);
    //     busdxToken.transfer(msg.sender, _amount);
    // }

    // function totalStakeBalance() public returns (uint256 bal) {
    //     uint256 balance;
    //     for (uint256 i = 0; i < stakers.length; i++) {
    //         address recipient = stakers[i];
    //         balance = stakingBalance[recipient] + balance;
    //     }
    //     totalStakingBalance = balance;
    //     return balance;
    // }

    // // get Stakers list
    // function getStakersList()
    //     public
    //     view
    //     returns (address[] memory stakersList)
    // {
    //     return stakers;
    // }

    // // Receive Reward token from the admin.
    // function receiveRewardToken(uint256 _amount) public onlyOwner {
    //     // check the amount is greater than 0
    //     require(_amount > 0, "staking balance cannot be 0");

    //     rewardBalance = rewardBalance + _amount;

    //     // Trasnfer tokens to this contract for staking
    //     busdxToken.transferFrom(msg.sender, address(this), _amount);
    // }

    // function getRewardBalance(address _walletAddress)
    //     public
    //     returns (uint256 stakingAmount)
    // {
    //     uint256 tempStakingBalance = stakingBalance[_walletAddress];

    //     // Calculate the amount with staking balance.
    // }

    // function deleteVariables() public onlyOwner {
    //     // Only owner can call this function

    //     delete stakers;
    //     delete unStakers;
    // }

    // uint256 tempBalance = _balances[account];
    // tempBalance = tempBalance * rewardPerToken(account);
    // tempBalance = tempBalance / 1e18;
    // tempBalance = tempBalance + rewards[account];
    // return tempBalance;
    // return
    //     _balances[account].mul(rewardPerToken(account)).div(1e18).add(
    //         rewards[account]
    //     );

    // function rewardPerToken(address account) public view returns (uint256) {
    //     uint256 tempTimeStamp = block.timestamp - stakedTimeStamp[account];
    //     uint256 tempCalValue = rewardRate * 1e18;
    //     tempCalValue = tempCalValue / 525600;
    //     tempCalValue = tempCalValue * tempTimeStamp;
    //     return tempCalValue;
    //     // return rewardRate.div(525600).mul(tempTimeStamp).mul(1e18);
    // }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = lastTimeRewardApplicable(); // nope
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
