import { settings } from "./utilities/config.js";
import {
  displayConnectedWallet,
  displayGassPrice,
  displayPriceLatestBlock,
} from "./dom/dom.js";
import { apiToken } from "./utilities/api.js";
import { getApi } from "./service/getApi.js";

const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#search");

const itemAccount = document.querySelector("#itemAccount");
const itemFunds = document.querySelector("#itemFunds");

const connectButton = document.querySelector("#connect");

const toAccountInput = document.querySelector("#toAccount");
const amountInput = document.querySelector("#amount");
const sendButton = document.querySelector("#sendTrx");

// välj mellan Anvil_URL, Sepolio_URL och BrowserWallet
const rpc = new Web3(settings.BrowserWallet);

let account;

const initApp = () => {
  console.log("App Started");
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

const sendTransaction = async () => {
  const toAddress = toAccountInput.value;
  const amount = parseFloat(amountInput.value) * Math.pow(10, 18);
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  const accountone = accounts[0];
  const gasPrice = await window.ethereum.request({
    method: "eth_gasPrice",
  });

  try {
    let params = [
      {
        from: accountone,
        to: toAddress,
        value: Number(amount).toString(16), //Number(rpc.utils.toWei(amount, "ether")),
        gas: Number(210000).toString(16),
        gasPrice: gasPrice, //Number(5000000).toString(16),
      },
    ];
    const response = await ethereum.request({
      method: "eth_sendTransaction",
      params: params,
    });
  } catch (error) {
    throw Error(`Transaction failed because of: ${error}`);
  }
};

document.addEventListener("DOMContentLoaded", initApp);
searchButton.addEventListener("click", checkBalance);
connectButton.addEventListener("click", connect);
sendButton.addEventListener("click", sendTransaction);
