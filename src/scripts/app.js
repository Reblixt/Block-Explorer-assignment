import { settings } from "./utilities/config.js";
import {
  displayConnectedWallet,
  displayGassPrice,
  displayPriceLatestBlock,
} from "./dom/dom.js";

const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#search");

const itemAccount = document.querySelector("#itemAccount");
const itemFunds = document.querySelector("#itemFunds");

const connectButton = document.querySelector("#connect");

const toAccountInput = document.querySelector("#toAccount");
const amountInput = document.querySelector("#amount");
const sendButton = document.querySelector("#sendTrx");

const rpc = new Web3(settings.Anvil_URL);

let account;

const initApp = () => {
  console.log("App Started");
  //console.log(rpc);
  displayPriceLatestBlock();
  setInterval(displayPriceLatestBlock, 20000);
  displayGassPrice();
  setInterval(displayGassPrice, 20000);
};

const connect = async () => {
  if (typeof window.ethereum !== undefined) {
    console.log("Browser wallet is connected!");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    connectButton.innerHTML = "Connected";
    displayConnectedWallet(accounts);
    console.log(window.ethereum);
  } else {
    connectButton.innerHTML = "Connect Wallet";
    alert("you need a Compatible browser wallet like Metamask");
  }
};

const checkBalance = async () => {
  account = searchInput.value;
  itemAccount.innerHTML = account;

  const balance = await rpc.eth.getBalance(account);
  itemFunds.innerHTML = rpc.utils.fromWei(balance, "ether");
};

//const sendTransaction = async () =>{ // Fortsätt här!!!!!!!
//const toAddress = toAccountInput.value;
//const amount = amountInput.value;
//
//try {
//const trx = await rpc.eth.sendTransaction({
//from:
//})
//
//
//} catch (error) {
//throw Error(`Transaction failed because of: ${error}`)
//}
//}

document.addEventListener("DOMContentLoaded", initApp);
searchButton.addEventListener("click", checkBalance);
connectButton.addEventListener("click", connect);
//sendButton.addEventListener("click", sendTransaction);
