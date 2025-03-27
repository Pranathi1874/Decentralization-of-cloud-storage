// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Access {
        address user; 
        bool access; // true (granted) or false (revoked)
    }

    mapping(address => string[]) public files; // Stores IPFS CIDs instead of URLs
    mapping(address => mapping(address => bool)) public ownership;
    mapping(address => Access[]) public accessList;
    mapping(address => mapping(address => bool)) public previousData;

    event FileUploaded(address indexed user, string ipfsHash);
    event AccessGranted(address indexed owner, address indexed user);
    event AccessRevoked(address indexed owner, address indexed user);

    // Upload file (store IPFS hash)
    function uploadFile(string memory _ipfsHash) external {
        files[msg.sender].push(_ipfsHash);
        emit FileUploaded(msg.sender, _ipfsHash);
    }

    // Grant access to another user
    function allow(address user) external {
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
        emit AccessGranted(msg.sender, user);
    }

    // Revoke access
    function disallow(address user) external {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
        emit AccessRevoked(msg.sender, user);
    }

    // Retrieve stored file hashes (IPFS CIDs)
    function display(address _user) external view returns (string[] memory) {
        require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access");
        return files[_user];
    }

    // View access list
    function shareAccess() external view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
