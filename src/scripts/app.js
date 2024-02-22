import {
  checkBalance,
  connect,
  sendTransactions,
} from "./service/ethFunctions.js";
import { displayGassPrice, displayPriceLatestBlock } from "./dom/dom.js";

const initApp = () => {
  console.log("App Started");
  displayPriceLatestBlock();
  setInterval(displayPriceLatestBlock, 20000);
  displayGassPrice();
  setInterval(displayGassPrice, 20000);
  connect;
  checkBalance;
  sendTransactions;
};

document.addEventListener("DOMContentLoaded", initApp);
