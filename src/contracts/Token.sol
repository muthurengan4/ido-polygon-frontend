pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Token is ERC20, Ownable, AccessControl {
    bytes32 public constant MINTER_BURNER_ROLE =
        keccak256("MINTER_BURNER_ROLE");

    uint256 public totalBurnedToken;
    uint256 public totalMintedToken;

    constructor() ERC20("BUSDX Test Token", "BUSDXT") {
        _mint(msg.sender, 1000000 * (10**uint256(decimals())));
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function grandAccessRole(address minterBurnerAddress) public onlyOwner {
        _setupRole(MINTER_BURNER_ROLE, minterBurnerAddress);
    }

    function revokeAccess(string memory role, address account)
        public
        onlyOwner
    {
        bytes32 roleName = keccak256(abi.encodePacked(role));
        require(
            roleName != DEFAULT_ADMIN_ROLE,
            "ModifiedAccessControl: cannot revoke default admin role"
        );
        require(
            hasRole(roleName, account),
            "Couldn't find this address in the roles. "
        );
        revokeRole(roleName, account);
    }

    function mint(address to, uint256 amount) public {
        // Check that the calling account has the minter role
        require(
            hasRole(MINTER_BURNER_ROLE, msg.sender),
            "Caller is not a minter"
        );
        _mint(to, amount);
        totalMintedToken = totalMintedToken + amount;
    }

    function burn(address from, uint256 amount) public {
        // Check that the calling account has the Burner role
        require(
            hasRole(MINTER_BURNER_ROLE, msg.sender),
            "Caller is not a Burner"
        );
        _burn(from, amount);
        totalBurnedToken = totalBurnedToken + amount;
    }
}
