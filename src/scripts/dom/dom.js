import { getApi } from "../service/getApi.js";
import { apiToken } from "../utilities/api.js";
import { settings } from "../utilities/config.js";

const connectedWallet = document.querySelector("#connectedWallet");
const connectedFunds = document.querySelector("#balance");

const priceSpan = document.querySelector("#price");
const latestBlock = document.querySelector("#latestBlock");
const gasPrice = document.querySelector("#gassPriceSpan");

const rpc = new Web3(settings.BrowserWallet);

export const displayConnectedWallet = async (accounts) => {
  connectedWallet.innerHTML = accounts[0];

  const balance = await rpc.eth.getBalance(accounts[0]);
  connectedFunds.innerHTML = rpc.utils.fromWei(balance, "ether");
};

export const displayPriceLatestBlock = async () => {
  const block = await rpc.eth.getBlock("latest");

  if (block === null) return;
  latestBlock.innerHTML = block.number;

  const results = await getApi(apiToken.Ether);
  const ethPrice = results.result.ethusd;
  const trimmedEthPrice = Math.floor(ethPrice * 100) / 100;

  priceSpan.innerHTML = trimmedEthPrice;
};

export const displayGassPrice = async () => {
  const results = await getApi(apiToken.Gas_Price);

  let baseFee;
  if (results.error && results.error.message) {
    const match = results.error.message.match(/baseFee: (\d+)/);
    if (match) {
      baseFee = parseInt(match[1], 10);
    }
  }
  const baseFeeGwei = baseFee / 1000000000;
  gasPrice.innerHTML = baseFeeGwei;
};
