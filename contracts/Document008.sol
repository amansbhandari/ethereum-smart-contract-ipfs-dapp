//SPDX-License-Identifier: Dalhousie

pragma solidity >=0.7.0 <0.9.0;

contract Document008 {
    string details = ""; //details of the agreement

    bytes32 hashCode; //hashcode of the details of the agreement

    string status = ""; //accepted or rejected

    function submitAgreement008(string memory _details) public {
        details = _details; //set the details of the agreement
        hashCode = keccak256(abi.encodePacked(_details)); //hashing using keccak256
    }

    function retrieveAgreement008()
        public
        view
        returns (
            //returns the details and its hash
            bytes32,
            string memory
        )
    {
        return (hashCode, details);
    }

    function approveAgreement008()
        public
    //changes the status of document to approved
    {
        status = "approved";
    }

    function cancelAgreement008()
        public
    //changes the status of document to cancelled
    {
        status = "cancelled";
    }
}
