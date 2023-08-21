/*global chrome*/
import { ethers } from "ethers";
import ABI from "./contractABI.json";

const useAccount = (networkRPC, privateKey) => {
  const provider = new ethers.providers.JsonRpcProvider(networkRPC);

  const wallet = new ethers.Wallet(privateKey, provider);

  const getAccountBalance = async () => {
    return (await wallet.getBalance()).toString();
  };

  const getAccountAddress = () => {
    return wallet.address;
  };

  const getNetworkDetails = async () => {
    let network = await wallet.provider.getNetwork();
    console.log(network);
  };

  const getAccountNFTs = async () => {
    const baseURL = networkRPC + "/getNFTs/";
    const ownerAddr = getAccountAddress();
    const fetchURL = `${baseURL}?owner=${ownerAddr}`;
    return await fetch(fetchURL)
      .then((response) => response.json())
      // .then((response) => JSON.stringify(response, null, 2))
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.log("error", error);
        return "Server error";
      });
  };

  const getContractInfo = async (address) => {
    const mycontract = new ethers.Contract(address, ABI, wallet.provider);
    return await mycontract
      .name()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return "Server error";
      });
  };

  const transferNftGasEstimate = async (address, tokenId, to) => {
    const mycontract = new ethers.Contract(address, ABI, wallet.provider);
    const transferFrom = getAccountAddress();
    return await mycontract.estimateGas
      .transferFrom(transferFrom, to, tokenId)
      .then((res) => {
        return ethers.utils.formatEther(res);
      });
  };
  const transferNft = async (address, tokenId, to) => {
    const mycontract = new ethers.Contract(address, ABI, wallet);
    const transferFrom = getAccountAddress();
    const transferhash = await mycontract
      .transferFrom(transferFrom, to, tokenId)
      .then((res) => {
        return res.hash;
      });
    return await provider.waitForTransaction(transferhash).then((res) => {
      return res;
    });
  };

  const transferMatic = async (address, value) => {
    const transferTxHash = await wallet
      .sendTransaction({
        to: address,
        value: ethers.utils.parseEther(value),
      })
      .then((res) => {
        return res.hash;
      });

    return await provider.waitForTransaction(transferTxHash).then((res) => {
      return res;
    });
  };

  return {
    getAccountAddress,
    getAccountBalance,
    getNetworkDetails,
    getAccountNFTs,
    getContractInfo,
    transferNftGasEstimate,
    transferNft,
    transferMatic,
    provider,
    wallet,
  };
};

export default useAccount;

// Saving Account..........................................................................

const runBackgroundScript = async (privateKey) => {
  console.log("Background Script");
  console.log("BackgroundScript", privateKey);
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    func: runContentScripts,
    args: [privateKey],
  });
};

function runContentScripts(privateKey) {
  var port = chrome.runtime.connect({ name: "savePrivateKey" });
  port.postMessage({ privateKey: privateKey });
  port.onMessage.addListener(function (msg) {
    console.log("Account Saved.");
    console.log(msg);
  });
}

export const saveAccount = async (privateKey, provider) => {
  var port = chrome.runtime.connect({ name: "savePrivateKey" });
  port.postMessage({ privateKey: privateKey, provider: provider });

  let myPromise = new Promise(function (myResolve, myReject) {
    port.onMessage.addListener(function (msg) {
      myResolve(msg);
    });
  });

  return await myPromise.then((res) => {
    return res;
  });
};

// Getting Account............................................................................

const runBackgroundScriptForGetAccount = async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  let returnValue = "Initial value";

  return await chrome.scripting.executeScript(
    {
      target: { tabId: tab.id, allFrames: true },
      func: runContentScriptsForGetAccount,
    },
    (injectionResults) => {
      console.log("These are injection results");
      console.log(injectionResults);
      returnValue = "Final Value";
      return returnValue;
    }
  );
  return returnValue;
};

const runContentScriptsForGetAccount = () => {
  var port = chrome.runtime.connect({ name: "getAccount" });
  port.postMessage({ query: "getAccount" });

  let accountData = "dfgsdfg";
  let myPromise = new Promise(function (myResolve, myReject) {
    port.onMessage.addListener(function (msg) {
      console.log(msg);
      myResolve(msg);
    });
  });

  // myPromise.then((res) => {
  //   console.log("Promise resolved");
  //   console.log(res);
  //   accountData = res;
  // });

  return myPromise;
};

export const getAccount = async () => {
  // return await runBackgroundScriptForGetAccount();

  var port = chrome.runtime.connect({ name: "getAccount" });
  port.postMessage({ query: "getAccount" });

  let myPromise = new Promise(function (myResolve, myReject) {
    port.onMessage.addListener(function (msg) {
      myResolve(msg);
    });
  });

  return await myPromise.then((res) => {
    return res;
  });
};

export const expandView = async () => {
  var port = chrome.runtime.connect({ name: "expandView" });
  port.postMessage({ query: "expandView" });

  let myPromise = new Promise(function (myResolve, myReject) {
    port.onMessage.addListener(function (msg) {
      myResolve(msg);
    });
  });

  return await myPromise.then((res) => {
    return res;
  });
};
