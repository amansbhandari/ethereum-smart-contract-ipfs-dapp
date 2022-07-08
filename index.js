import { createRequire } from "module";
import { create } from "ipfs-http-client";
import { AbortController } from "node-abort-controller";
const require = createRequire(import.meta.url);
var Web3 = require("web3");
const crypto = require("crypto");

let contractAddr = "0x5d3D6bbdF96aF1ef09a4EE6C9ff3AC335E95f6E2";
let abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_digiSign",
        type: "string",
      },
    ],
    name: "setBuyerDigiSign008",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_digiSign",
        type: "string",
      },
    ],
    name: "setSellerDigiSign008",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBuyerDigiSign008",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getSellerDigiSign008",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

const buyerKeyPair008 = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "der",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "der",
  },
});

const sellerKeyPair008 = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "der",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "der",
  },
});

// connect to the default API address http://localhost:5001
const client = create();

var MFS_path008 = "/buyer-seller-agreement";

global.AbortController = AbortController;
let details = "{price:12ETH, item:rent-bmw3series}"; //Agreement between parties

const web3 = new Web3(
  new Web3.providers.HttpProvider("http://127.0.0.1:8545/")
);

const accounts = await web3.eth.getAccounts();
web3.eth.defaultAccount = accounts[0];
console.log("\nUsing eth default account:: " + web3.eth.defaultAccount);

var myContract = new web3.eth.Contract(abi, contractAddr, {
  from: web3.eth.defaultAccount,
});

var readDocumentFromIPFS008 = async function () {
  return client.files.stat(MFS_path008, { hash: true }).then(async (r) => {
    let ipfsAddr008 = r.cid.toString();
    //reading the content
    const resp = await client.cat(ipfsAddr008);
    let content = [];
    for await (const chunk of resp) {
      content = [...content, ...chunk];
      const raw = Buffer.from(content).toString("utf8");
      return raw;
    }
  });
};

var getBuyerDigiSign008 = async function () {
  //Storing the signature on smart contract
  return myContract.methods
    .getBuyerDigiSign008()
    .call({ from: web3.eth.defaultAccount, gas: 3000000 })
    .then(function (value) {
      return value;
    })
    .catch((error) => {
      console.log(error);
    });
};

var getSellerDigiSign008 = async function () {
  //Storing the signature on smart contract
  return myContract.methods
    .getSellerDigiSign008()
    .call({ from: web3.eth.defaultAccount, gas: 3000000 })
    .then(function (value) {
      return value;
    })
    .catch((error) => {
      console.log(error);
    });
};

var setBuyerDigiSign008 = async function (signature) {
  //Storing the signature on smart contract
  myContract.methods
    .setBuyerDigiSign008(signature)
    .send({ from: web3.eth.defaultAccount, gas: 3000000 })
    .then(function (transactionDetails) {
      console.log(
        "Stored the buyer's digital signature on smart contract through setter method.."
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

var setSellerDigiSign008 = async function (signature) {
  //Storing the signature on smart contract
  myContract.methods
    .setSellerDigiSign008(signature)
    .send({ from: web3.eth.defaultAccount, gas: 3000000 })
    .then(function (transactionDetails) {})
    .catch((error) => {
      console.log(error);
    });
};

var submitAgreement008 = async function () {
  global.AbortController = AbortController;
  const agreement008 =
    "Seller will deliver item to buyer in 3 days of purchase!";
  console.log(
    "\nSaving the agreement between buyer and seller in local IPFS: " +
      agreement008
  );

  return client.files
    .write(MFS_path008, new TextEncoder().encode(agreement008), {
      create: true,
    })
    .then(async (r) => {
      client.files.stat(MFS_path008, { hash: true }).then(async (r) => {
        let ipfsAddr008 = r.cid.toString();
        console.log("Stored file on IPFS with address ", ipfsAddr008);

        fetchAndSignDocBuyer008()
          .then(() => {
            fetchAndSignDocSeller008()
              .then(() => {
                verifyBuyerDigiSign008()
                  .then(() => {
                    verifySellerDigiSign008()
                      .then(() => {
                        return;
                      })
                      .catch((msg) => {
                        console.log(msg);
                      });
                  })
                  .catch((msg) => {
                    console.log(msg);
                  });
              })
              .catch((msg) => {
                console.log(msg);
              });
          })
          .catch((msg) => {
            console.log(msg);
          });
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

var fetchAndSignDocBuyer008 = async function () {
  console.log("\n############### Buyer Signing document ###############");
  const raw = await readDocumentFromIPFS008();
  console.log(
    "Buyer read the document from IPFS with content:: " + '"' + raw + '"'
  );

  const privateKey = crypto.createPrivateKey({
    key: buyerKeyPair008.privateKey,
    type: "pkcs8",
    format: "der",
  });
  console.log("Buyer will sign the document now..");
  //--Sign document ---
  const sign = crypto.createSign("SHA256");
  console.log("Hashing SHA256..");
  sign.update(raw);
  sign.end();
  const signature = sign.sign(privateKey).toString("base64");
  console.log("Encrypting the hash with buyer's private key..");
  console.log("Signature of buyer completed successfully!");
  console.log("Digital signature is ", signature);

  await setBuyerDigiSign008(signature);
};

var fetchAndSignDocSeller008 = async function () {
  console.log("\n############### Seller Signing document ###############");
  const raw = await readDocumentFromIPFS008();
  console.log(
    "Seller read the document from IPFS with content:: " + '"' + raw + '"'
  );

  const privateKey = crypto.createPrivateKey({
    key: sellerKeyPair008.privateKey,
    type: "pkcs8",
    format: "der",
  });
  console.log("Seller will sign the document now..");
  //--Sign document ---
  const sign = crypto.createSign("SHA256");
  console.log("Hashing SHA256..");
  sign.update(raw);
  sign.end();
  const signature = sign.sign(privateKey).toString("base64");
  console.log("Encrypting the hash with seller's private key..");
  console.log("Signature of seller completed successfully!");
  console.log("Digital signature is ", signature);

  setSellerDigiSign008(signature);
};

var verifyBuyerDigiSign008 = async function () {
  console.log("\n############### Verify buyer's signatures ###############");

  const raw = await readDocumentFromIPFS008();
  console.log("Read plain text of document from IPFS..");
  const value = await getBuyerDigiSign008();
  console.log("Fetch buyer's signature from smart contract (getter method)..");
  console.log("Seller will now verify the digital sign of Buyer..");
  const sign = Buffer.from(value, "base64");
  const publicKey = crypto.createPublicKey({
    key: buyerKeyPair008.publicKey,
    type: "spki",
    format: "der",
  });
  console.log("Using public key of buyer..");

  const verify = crypto.createVerify("SHA256");
  verify.update(raw);
  verify.end();
  console.log("Hashing the plain text gotten from IPFS..");
  let result = verify.verify(publicKey, sign);
  console.log("Digital sign of buyer verified with result:: ", result);
};

var verifySellerDigiSign008 = async function () {
  console.log("\n############### Verify seller's signatures ###############");

  const raw = await readDocumentFromIPFS008();
  console.log("Read plain text of document from IPFS..");
  const value = await getSellerDigiSign008();
  console.log("Fetch seller's signature from smart contract (getter method)..");
  console.log("Buyer will now verify the digital sign of Seller..");
  const sign = Buffer.from(value, "base64");
  const publicKey = crypto.createPublicKey({
    key: sellerKeyPair008.publicKey,
    type: "spki",
    format: "der",
  });
  console.log("Using public key of seller..");

  const verify = crypto.createVerify("SHA256");
  verify.update(raw);
  verify.end();
  console.log("Hashing the plain text gotten from IPFS..");
  let result = verify.verify(publicKey, sign);
  console.log("Digital sign of seller verified with result:: ", result);

  console.log("\nThe signature of both buyer and seller are vaerified..");
  console.log("Hurrrayy !! Approving the agreement!!");
};

submitAgreement008()
  .then(() => {})
  .catch((msg) => {
    console.log(msg);
  });
