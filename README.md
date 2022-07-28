## Instruction to run the program

`npm install`

`npm ganache`

`ipfs daemon`

`node index.js`

## Description of the application
### Flow of the application
Figure 1 shows each step taken to solve the notary task for buyer and seller through IPFS and Ethereum smart contract. The agreement between the buyer and seller are first stored [1] in local IPFS. I am saving the path of the file in the Dapp and reads [1] it for buyer. Buyer then digitally signs it using SHA256 hashing and encrypting through RSA [2] with its private key. I am using crypto package to generate the public-private key pairs and verify the digital signature.
Once buyers signs it, the signature is stored in smart contract through method setBuyerDigiSign008() as shown in figure 2. Same steps are also taken for seller to sign and then store the signature in smart contract through method setSellerDigiSign008().
Since now the digital signature sits on blockchain through smart contracts and document sits on IPFS. Next task is to read document and buyer’s digital signature and verify it. Smart contract’s method getBuyerDigiSign008() is invoked from Dapp to get the digital signature of buyer. It is then decrypted in Dapp using buyer’s public key, which results in a hash. The plain text retrieved from IPFS is then hashed using the same algo – SHA256. Both the hashes are compared to verify the authenticity of document and buyer [2]. Same steps are repeated for seller as well.

### Smart contract methods
• setBuyerDigiSign008 – Stores the digital signature of the buyer. The digital signature is constructed in Dapp and set through this method of smart contract.

• setSellerDigiSign008 – Stores the digital signature of the seller. The digital signature is constructed in Dapp and set through this method of smart contract.

• getBuyerDigiSign008 – Gets the digital signature of the buyer. The digital signature is constructed in Dapp and get through this method of smart contract.

• getSellerDigiSign008 – Gets the digital signature of the seller. The digital signature is constructed in Dapp and get through this method of smart contract.
 
<img width="411" alt="image" src="https://user-images.githubusercontent.com/25216571/181626053-d3b3bcbb-3027-4dad-8495-270dc44d932d.png">  
