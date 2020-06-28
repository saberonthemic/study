pragma solidity ^0.5.16;

contract SimpleStorage {
    struct Cylinder{
        int cylinderId; // 钢瓶id
        string outaddress; //出发地
        string toaddredd; //接受地
        string Time; // 到达时间
    }
    string storedData; // 存储图片hash
    //address add;
    function set(string memory x) public {
        storedData = x;
    }
    function get() public view returns (string memory x) {
        if(msg.sender != address(0xEA381Ae658a08430b3a8EFD49a66e2F40Ee0Ccc4)){
            return '权限不足';
        }else{
            return storedData;
        }
    }
    function getsender() public view returns(address add){
        return add = msg.sender;
    }
}

