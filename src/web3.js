import abi from "./abi/abi.json" assert { type: "json" };

// 0xb5e5344Fb210af5EC1C9a0e328583793F4373f60

const blockchain = new Promise((res, err) => {
  if (typeof window.ethereum == "undefined") {
    err("You should install Metamask to use it!");
  }

  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
    abi,
    "0xd3DBE867ae75c6231e9cba988F3AFb4b362344f3"
  );

  web3.eth.getAccounts().then((accounts) => {
    console.log("My account is: ", accounts[0]);
  });

  web3.eth.getAccounts().then((accounts) => {
    contract.methods
      .totalSupply()
      .call({ from: accounts[0] })
      .then((supply) => {
        console.log("Current supply of NFT tokens: ", supply);
      });
  });

  web3.eth.getAccounts().then((accounts) => {
    contract.methods
      .maxSupply()
      .call({ from: accounts[0] })
      .then((maxSupply) => {
        console.log("Maximum supply of NFT tokens: ", maxSupply);
      });
  });

  web3.eth.getAccounts().then((accounts) => {
    contract.methods
      .ownerBuildings()
      .call({ from: accounts[0] })
      .then((ownerBuildings) => {
        console.log("Owner buildings: ", ownerBuildings);
      });
  });

  web3.eth.getAccounts().then((accounts) => {
    contract.methods
      .totalSupply()
      .call({ from: accounts[0] })
      .then((supply) => {
        contract.methods
          .getBuildings()
          .call({ from: accounts[0] })
          .then((data) => {
            res({ supply: supply, building: data });
          });
      });
  });
});

export default blockchain;
