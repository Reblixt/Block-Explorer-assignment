import { settings } from "../utilities/config.js";
import { itISWalletAddress } from "./controll.js";
import {
  getConnectedAddress,
  displayConnectedWallet,
  createTransactionList,
} from "../dom/dom.js";

const searchButton = document.querySelector("#searchButton");
const connectButton = document.querySelector("#connect");
const searchInput = document.querySelector("#search");

const itemAccount = document.querySelector("#itemAccount");
const itemFunds = document.querySelector("#itemFunds");

const toAccountInput = document.querySelector("#toAccount");
const amountInput = document.querySelector("#amount");
const sendButton = document.querySelector("#sendTrx");

// välj mellan Anvil_URL, Sepolio_URL och BrowserWallet. Dessa finns vid config.js
const rpc = new Web3(settings.Sepolio_URL);

let account;

export async function getTHash(tHash) {
  const response = await rpc.eth.getTransaction(tHash);
  console.log(response);
  createTransactionList(response);
  return response;
}

export const connect = async () => {
  if (typeof window.ethereum !== undefined) {
    console.log("Browser wallet is connected!");
    const accounts = await getConnectedAddress();
    connectButton.innerHTML = "Connected";
    displayConnectedWallet(accounts);
  } else {
    connectButton.innerHTML = "Connect Wallet";
    alert("you need a Compatible browser wallet like Metamask");
  }
};

export const checkBalance = async () => {
  account = itISWalletAddress(searchInput.value);
  itemAccount.innerHTML = account;

  const balance = await rpc.eth.getBalance(account);
  itemFunds.innerHTML = rpc.utils.fromWei(balance, "ether");
};

export const sendTransactions = async () => {
  const toAddress = itISWalletAddress(toAccountInput.value);
  const amount = parseFloat(amountInput.value) * Math.pow(10, 18);
  const accounts = await getConnectedAddress();
  const accountone = accounts[0];
  const gasPrice = await window.ethereum.request({
    method: "eth_gasPrice",
  });
  try {
    let params = [
      {
        from: accountone,
        to: toAddress,
        value: Number(amount).toString(16),
        gas: Number(210000).toString(16),
        gasPrice: gasPrice,
      },
    ];
    const response = await ethereum.request({
      method: "eth_sendTransaction",
      params: params,
    });

    const results = await rpc.eth.getTransaction(response);
    setTimeout(() => {
      console.log(results);
      createTransactionList(results);
    }, 3000);
  } catch (error) {
    throw Error(`Transaction failed because of: ${error}`);
  }
};

connectButton.addEventListener("click", connect);
searchButton.addEventListener("click", checkBalance);
sendButton.addEventListener("click", sendTransactions);
