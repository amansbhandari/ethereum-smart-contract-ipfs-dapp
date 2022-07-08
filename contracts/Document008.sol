//SPDX-License-Identifier: Dalhousie

pragma solidity >=0.7.0 <0.9.0;

contract Document008 {
    string buyerDigiSign008 = ""; //Digital Signature of buyer

    string sellerDigiSign008 = ""; //Digital Signature of seller

    function setBuyerDigiSign008(string memory _digiSign) public {
        buyerDigiSign008 = _digiSign; //set buyers digital signature
    }

    function setSellerDigiSign008(string memory _digiSign) public {
        sellerDigiSign008 = _digiSign; //set seller digital signature
    }

    function getBuyerDigiSign008()
        public
        view
        returns (
            //returns the buyer digi sign
            string memory
        )
    {
        return (buyerDigiSign008);
    }

    function getSellerDigiSign008()
        public
        view
        returns (
            //returns the seller digi sign
            string memory
        )
    {
        return (sellerDigiSign008);
    }
}
