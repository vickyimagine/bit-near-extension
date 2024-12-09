browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({
    connectedSites: [],
    loggedIn: true
  });
});

browser.runtime.onStartup.addListener(() => {
  browser.storage.sync.set({
    loggedIn: false
  });
});
console.log("started.....");
const getAccountId = () => {
  return browser.storage.sync.get("keyStore").then(keystore => {
    const keys = JSON.parse(keystore["keyStore"]);
    return keys["accountId"];
  });
};

const getPassword = () => {
  return browser.storage.sync.get("keyStore").then(keystore => {
    const keys = JSON.parse(keystore["keyStore"]);
    return keys["password"];
  });
};

const checkLoggedIn = () => {
  return browser.storage.sync.get("loggedIn").then(loggedIn => loggedIn.loggedIn);
};

const changeOwnership = async (to, tokenId) => {
  const certOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to,
      token_id: tokenId
    })
  };

  const certRes = await fetch(
    "https://bitmemoir.com/api/v2/certificate/transferCertificate/",
    certOptions
  );
  return certRes; // Return the whole response to handle `.ok` checks elsewhere
};

const updateDB = async txn => {
  const pendingTxns = await getPendingTrxns();
  const updatedTxns = pendingTxns.filter(
    trxn => !(trxn.to === txn.to && trxn.token_id === txn.token_id)
  );

  await browser.storage.sync.set({certPendings: updatedTxns});
  return {status: true};
};

const storeInDB = async txn => {
  const trxns = await browser.storage.sync.get("certPendings");
  const trxnData = trxns.certPendings || [];

  if (Array.isArray(txn)) {
    trxnData.push(...txn);
  } else {
    trxnData.push(txn);
  }

  await browser.storage.sync.set({certPendings: trxnData});
  return {status: true};
};

const getPendingTrxns = async () => {
  const trxns = await browser.storage.sync.get("certPendings");
  return trxns.certPendings || [];
};

const nftRetryMechanism = async () => {
  console.log("NFT Retry triggered");
  try {
    const txns = await getPendingTrxns();
    for (const txn of txns) {
      console.log(txn);
      const res = await changeOwnership(txn.to, txn.token_id);
      console.log(res);

      if (res.ok) {
        const res = await updateDB(txn);
        console.log(res);
      } else {
        console.log("Failed due to backend");
      }
    }
  } catch (error) {
    console.error(`Error occurred while retrying the transfer: ${error}`);
  }
};

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const sendGoodResponse = (message, data) => {
    sendResponse({from: "Bit-wallet-background-script", message, data});
  };

  if (request.from === "Bit-wallet-content-script") {
    if (request.message === "checkAccountCreated") {
      (async () => {
        let origin = request.data.origin;
        let connectedSites = await browser.storage.sync.get("connectedSites");
        try {
          let accountId = "";
          let isLoggedIn = await checkLoggedIn();
          if (isLoggedIn && connectedSites.connectedSites.includes(origin)) {
            accountId = await getAccountId();
          }
          sendGoodResponse("checkAccountCreated", {
            status: true,
            accountId: accountId
          });
        } catch {
          sendGoodResponse("checkAccountCreated", {status: false});
        }
      })();
      return true;
    }

    // Handle other message types...
  }
  return true; // Indicates async response
});
