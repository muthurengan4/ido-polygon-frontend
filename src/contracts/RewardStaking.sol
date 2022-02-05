pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@openzeppelin/contracts/security/Pausable.sol";

contract RewardStaking is Ownable, AccessControl, ReentrancyGuard, Pausable {
    string public name;
    ERC20 public busdxToken;
    ERC20 public busd;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    // This unstake is variables used for minting the unstaked tokens.
    mapping(address => uint256) public unStakedUserDetails;
    address[] public unStakers;
    mapping(address => bool) public hasUnstaked;

    // Reward Distribution
    address public rewardsDistribution;

    uint256 public rewardRate = 30;

    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    // busd reward
    mapping(address => uint256) public busdRewards;
    uint256 public busdRewardAllocated;
    uint256 public previousBalance;

    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    // save TimeStamp
    mapping(address => uint256) public stakedTimeStamp;

    uint256 public grantBalance;

    // using SafeMath for uint256;
    /* ========== EVENTS ========== */

    event RewardAdded(uint256 reward);
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardsDurationUpdated(uint256 newDuration);
    event Recovered(address token, uint256 amount);

    constructor(
        ERC20 _busdxToken,
        ERC20 _busd,
        string memory _name,
        address _rewardsDistribution,
        address _ownerAddress
    ) {
        busdxToken = _busdxToken;
        busd = _busd;
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

    function numberOfStakers() public view returns (uint256) {
        return stakers.length;
    }

    function addGrandAmount(uint256 _amount) external onlyOwner {
        busdxToken.transferFrom(msg.sender, address(this), _amount);
        grantBalance = _amount + grantBalance;
    }

    function removeGrandAmount(uint256 _amount) external onlyOwner {
        require(
            _amount <= grantBalance,
            "Amount should be less than grandAmount"
        );
        grantBalance = grantBalance - _amount;
    }

    function removeBUSD() external onlyOwner {
        require(busd.balanceOf(address(this)) > 0, "There is no BUSD balance");
        busd.transfer(owner(), busd.balanceOf(address(this)));
    }

    function timeStampDiff(address account) public view returns (uint256) {
        return block.timestamp - stakedTimeStamp[account];
    }

    function rewardTokenPerAnnum(address account)
        public
        view
        returns (uint256)
    {
        return (_balances[account] * rewardRate) / 100;
    }

    function earned(address account) public view returns (uint256) {
        uint256 tempTimeStamp = timeStampDiff(account) / 60;

        uint256 rewardPerMin = rewardTokenPerAnnum(account) / 525600;

        uint256 rewardAmount = rewardPerMin * tempTimeStamp;

        return rewardAmount + rewards[account];
    }

    function busdEarned(address account, uint256 balance)
        public
        view
        returns (uint256)
    {
        uint256 rewardPercentage = (_balances[account] * 100000000000000000) /
            _totalSupply;

        uint256 alloctedBusdReward = (balance * rewardPercentage) /
            100000000000000000;

        return alloctedBusdReward;
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    function stake(uint256 amount)
        external
        nonReentrant
        whenNotPaused
        updateReward(msg.sender)
    {
        require(amount > 0, "Cannot stake 0");
        _totalSupply = _totalSupply + amount;
        _balances[msg.sender] = _balances[msg.sender] + amount;
        busdxToken.transferFrom(msg.sender, address(this), amount);
        // Updating current timestamp.
        stakedTimeStamp[msg.sender] = block.timestamp;
        // Add user to stakers array *only* if they haven't staked already
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount)
        public
        nonReentrant
        updateReward(msg.sender)
    {
        require(amount > 0, "Cannot withdraw 0");
        require(_balances[msg.sender] > 0, "Only staked user can be Unstaked.");
        _totalSupply = _totalSupply - amount;
        _balances[msg.sender] = _balances[msg.sender] - amount;
        busdxToken.transfer(msg.sender, amount);
        // Updating current timestamp.
        stakedTimeStamp[msg.sender] = block.timestamp;

        // add unstaked user in the unStakedUserDetails mapping.
        unStakedUserDetails[msg.sender] =
            unStakedUserDetails[msg.sender] +
            amount;
        // add user to unstakers array *only* if they haven't unstake already.
        if (!hasUnstaked[msg.sender]) {
            unStakers.push(msg.sender);
        }

        hasUnstaked[msg.sender] = true;

        // Update staking status
        if (_balances[msg.sender] == 0) {
            isStaking[msg.sender] = false;
        }

        emit Withdrawn(msg.sender, amount);
    }

    function getReward() public nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        require(
            reward <= grantBalance,
            "Grand balance is less please contact Admin"
        );
        if (reward > 0) {
            rewards[msg.sender] = 0;
            busdxToken.transfer(msg.sender, reward);
            grantBalance = grantBalance - reward;
            // Updating current timestamp.
            stakedTimeStamp[msg.sender] = block.timestamp;
            emit RewardPaid(msg.sender, reward);
        }
    }

    function exit() external {
        withdraw(_balances[msg.sender]);
        getReward();
    }

    function stakeRewardTokens()
        external
        nonReentrant
        whenNotPaused
        updateReward(msg.sender)
    {
        uint256 amount = rewards[msg.sender];
        require(
            amount <= grantBalance,
            "Grand balance is less please contact Admin"
        );
        require(amount > 0, "Reward amount should be greater than 0");
        // Make the reward amount 0.
        rewards[msg.sender] = 0;

        _totalSupply = _totalSupply + amount;
        _balances[msg.sender] = _balances[msg.sender] + amount;
        // Updating current timestamp.
        stakedTimeStamp[msg.sender] = block.timestamp;
        grantBalance = grantBalance - amount;
        // Add user to stakers array *only* if they haven't staked already
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
        emit Staked(msg.sender, amount);
    }

    // Distribute BUSD Reward.
    function distributeBUSDReward() external onlyOwner {
        uint256 balance = busd.balanceOf(address(this));
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            if (isStaking[recipient] == true) {
                uint256 getRewardAmount = busdEarned(recipient, balance);
                require(
                    getRewardAmount <= busd.balanceOf(address(this)),
                    "Reward balance is not available."
                );
                busd.transfer(recipient, getRewardAmount);
            }
        }
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

    function setRewardRate(uint256 _rewardRate) external onlyOwner {
        rewardRate = _rewardRate;
    }

    modifier updateReward(address account) {
        if (account != address(0)) {
            rewards[account] = earned(account);
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
