pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract FLibra {
  
  // structs
  struct Item {
    string itemName;
    uint256 price;
    address owner;
    bool selling;
  }

  //events
  event PostItem(string itemName, uint256 price, address owner, bool selling);

  mapping(address => Item) public Items;
  Item[] public allItems; 


  constructor() public {

  }

  function setItem(string memory _itemName, uint256 _price) public {
    Items[msg.sender] = Item(_itemName, _price, msg.sender, true);
    allItems.push(Item(_itemName, _price, msg.sender, true));
    emit PostItem(_itemName, _price, msg.sender, true);
  }

  function getItem() public view returns (Item memory) {
    return Items[msg.sender];
  } 

  function getAllItem(uint256 _id) public view returns (Item memory) {
    return allItems[_id];
  } 

  function getNumberOfItem() public view returns (uint256) {
    return allItems.length;
  }
}