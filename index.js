var Web3 = require("web3");

let details = "{price:12ETH, item:rent-bmw3series}"; //Agreement between parties

var submitAgreement = async function () {
  const web3 = new Web3(
    Web3.givenProvider ||
      "https://ropsten.infura.io/v3/5cc256b4d68347b6984c3f3c8e747cad"
  );
  const accounts = await web3.eth.requestAccounts();

  web3.eth.defaultAccount = accounts[0];
  console.log("\nUsing account  " + web3.eth.defaultAccount);

  var myContract = new web3.eth.Contract(abi, contractAddr, {
    from: web3.eth.defaultAccount,
  });

  console.log("\nSubmitting Agreement ", details);

  myContract.methods
    .submitAgreement008(details)
    .send({ from: web3.eth.defaultAccount, gas: 3000000 })
    .then(function (transactionDetails) {
      console.log(
        "\nSubmitted Agreement with below transaction " + transactionDetails
      );

      retreiveAgreement();
    })
    .catch((error) => {
      console.log(error);
    });
};

var retreiveAgreement = async function () {
  var web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/5cc256b4d68347b6984c3f3c8e747cad"
    )
  );
  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];

  var myContract = new web3.eth.Contract(abi, contractAddr, {
    from: web3.eth.defaultAccount,
  });

  console.log("\nBuyer is retreiving the agreement..");

  myContract.methods
    .retrieveAgreement008()
    .call({ from: web3.eth.defaultAccount, gas: 3000000 })
    .then(function (value) {
      console.log("\nBuyer calculating the hashcode of agreement..");
      const hash = web3.utils.soliditySha3(
        "{price:10ETH, item:rent-bmw3series}"
      );
      console.log("\nCalculated haschode of document at buyer's end ", hash);

      console.log(
        "\nAgreement and hashcode retreived from the contract are ",
        value
      );

      var obj = JSON.parse(JSON.stringify(value));

      if (hash == obj[0]) {
        console.log(
          "\n******* Buyer's calculated hashcode MATCHES with the retreived hashcode from contract *******"
        );

        console.log("\nBuyer is APPROVING the contract..");

        approveContract();
      } else {
        console.log(
          "\n******* Buyer's calculated hashcode DOESN'T MATCH with the retreived hashcode from contract *******"
        );

        console.log("\nBuyer is CANCELLING the contract..");

        cancelContract();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

var approveContract = async function () {
  var web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/5cc256b4d68347b6984c3f3c8e747cad"
    )
  );
  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];

  var myContract = new web3.eth.Contract(abi, contractAddr, {
    from: web3.eth.defaultAccount,
  });

  myContract.methods
    .approveAgreement008()
    .call({ from: web3.eth.defaultAccount, gas: 3000000 })
    .then(function (value) {
      console.log("\nStatus of the contract changed to APPROVED");
    })
    .catch((error) => {
      console.log(error);
    });
};

var cancelContract = async function () {
  var web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/5cc256b4d68347b6984c3f3c8e747cad"
    )
  );
  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];

  var myContract = new web3.eth.Contract(abi, contractAddr, {
    from: web3.eth.defaultAccount,
  });

  myContract.methods
    .cancelAgreement008()
    .call({ from: web3.eth.defaultAccount, gas: 3000000 })
    .then(function (value) {
      console.log("\nStatus of the contract changed to CANCELLED");
    })
    .catch((error) => {
      console.log(error);
    });
};

let contractAddr = "0x0e34b8a81Bb7ce3bCCd5c84FE4cf48B47E37e6B6";
let abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_details",
        type: "string",
      },
    ],
    name: "submitAgreement008",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieveAgreement008",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
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
    name: "approveAgreement008",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cancelAgreement008",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

submitAgreement()
  .then(() => {})
  .catch((msg) => {
    console.log(msg);
  });
