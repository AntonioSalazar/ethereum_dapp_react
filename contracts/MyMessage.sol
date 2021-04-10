// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MyMessage{

    string public myMessage;
    event MessageSent(string myMessage);

    function setMessage(string memory _message) public returns(string memory){
        myMessage = _message;
        emit MessageSent(myMessage);
        return myMessage;

    }

    function getMessage() public view returns (string memory){
        return myMessage;
    }

}
