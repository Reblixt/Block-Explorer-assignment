import { apiToken } from "../utilities/api.js";
import { settings } from "../utilities/config.js";
import HttpClient from "../utilities/http.js";

const connectedWallet = document.querySelector("#connectedWallet");
const connectedFunds = document.querySelector("#balance");

const priceSpan = document.querySelector("#price");
const latestBlock = document.querySelector("#latestBlock");

const rpc = new Web3(settings.Anvil_URL);

export const displayConnectedWallet = async (accounts) => {
  connectedWallet.innerHTML = accounts[0];

  const balance = await rpc.eth.getBalance(accounts[0]);
  connectedFunds.innerHTML = rpc.utils.fromWei(balance, "ether");
};

export const displayPriceLatestBlock = async () => {
  // Fortsätt här sedan!!!!!!!!
  const block = await rpc.eth.getBlock("latest");

  //////////  if (block === null) return;
  latestBlock.innerHTML = block.number;

  const ethPriceApi = apiToken.Ether;
  const http = new HttpClient(ethPriceApi);
  const results = await http.get();
  const ethPrice = results.result.ethusd;
  const trimmedEthPrice = Math.floor(ethPrice * 100) / 100;

  priceSpan.innerHTML = trimmedEthPrice;
};

export const displayGassPrice = async () => {
  const gasPriceApi = apiToken.Gas_Price;
  const http = new HttpClient(gasPriceApi);
  const results = await http.get();

  let baseFee;
  if (results.error && results.error.message) {
    const match = results.error.message.match(/baseFee: (\d+)/);
    if (match) {
      baseFee = parseInt(match[1], 10);
    }
  }
  const baseFeeGwei = baseFee / 1000000000;
  const baseFeeEth = baseFee ** -18;
  console.log("Gwei", baseFeeGwei);
  console.log("eth", baseFeeEth);
};
