import { settings } from "./utilities/config.js";
import {
  createTransactionList,
  displayConnectedWallet,
  displayGassPrice,
  displayPriceLatestBlock,
  getConnectedAddress,
} from "./dom/dom.js";

const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#search");

const itemAccount = document.querySelector("#itemAccount");
const itemFunds = document.querySelector("#itemFunds");

const connectButton = document.querySelector("#connect");

const toAccountInput = document.querySelector("#toAccount");
const amountInput = document.querySelector("#amount");
const sendButton = document.querySelector("#sendTrx");

// välj mellan Anvil_URL, Sepolio_URL och BrowserWallet. Dessa finns vid config.js
const rpc = new Web3(settings.Sepolio_URL);

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
    const accounts = await getConnectedAddress();
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
    // Bugg funnen! Om du (Michael) vet varför buggen är här så hade jag älskat en förklaring
    // Om man kommenterar ut rad 83 med hash.from, to och value så får man error i consolen
    // och Transaction uppgifterna visas inte.
    const hash = await getTHash(response);
    console.log("Hash kod rad 81", hash);
    console.log("From: ", hash.from, "To: ", hash.to, "Value ", hash.value);

    createTransactionList(hash);
  } catch (error) {
    throw Error(`Transaction failed because of: ${error}`);
  }
};

async function getTHash(tHash) {
  const response = await rpc.eth.getTransaction(tHash);
  console.log(response);
  return response;
}

document.addEventListener("DOMContentLoaded", initApp);
searchButton.addEventListener("click", checkBalance);
connectButton.addEventListener("click", connect);
sendButton.addEventListener("click", sendTransaction);
