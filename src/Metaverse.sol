// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Address: 0xb5e5344Fb210af5EC1C9a0e328583793F4373f60

contract Metaverse is ERC721, Ownable {

    constructor() ERC721("META", "MTV"){}

    using Counters for Counters.Counter;
    Counters.Counter private supply;

    uint256 public maxSupply = 100;
    uint256 public cost = 1 ether;

    mapping(address => Building[]) NFTOwners;

    struct Building {
        string name;
        int8 w;
        int8 h;
        int8 d;
        int8 x;
        int8 y;
        int8 z;
    }

    Building[] public buildings;

    function getBuildings() external view returns (Building[] memory){
        return buildings;
    }

    function totalSupply() external view returns (uint256) {
        return supply.current();
    }

    function mint(string memory _buildingName, int8 _w, int8 _h, int8 _d, int8 _x, int8 _y, int8 _z) external payable {
        require(supply.current() <= maxSupply, "Max supply exceeded");
        require(msg.value >= cost, "Insufficient funds");
        supply.increment();
        _safeMint(msg.sender, supply.current());
        Building memory _newBuilding = Building(_buildingName, _w, _h, _d, _x, _y, _z);
        buildings.push(_newBuilding);
        NFTOwners[msg.sender].push(_newBuilding);
    }

    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function ownerBuildings() external view returns(Building[] memory){
        return NFTOwners[msg.sender];
    }

}