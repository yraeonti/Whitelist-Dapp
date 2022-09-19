
pragma solidity ^0.8.0;

contract Whitelist {

    uint8 public maxWhitelist;

    uint8 public numwhitelistaddresses;
    
    address public owner;

    mapping(address => bool) public whitelistaddresses;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Only owner allowed to set max');
        _;
    }

    function setWhiteListMax(uint8 _max) public onlyOwner {
      maxWhitelist = _max;
    }

    function addAdressTowhitelist() public {
        require(maxWhitelist > 0, 'Whitelist rules not set yet');
        require(!whitelistaddresses[msg.sender], 'Address already whitelisted');
        require(numwhitelistaddresses <= maxWhitelist, 'Max number reached');
        numwhitelistaddresses++;
        whitelistaddresses[msg.sender] = true;
        
    }




}