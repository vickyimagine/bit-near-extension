chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    connectedSites: [],
    loggedIn: true
  });
  // updateDB();
});

chrome.runtime.onStartup.addListener(() => {
  // console.log("ON startup");
  chrome.storage.sync.set({
    loggedIn: false
  });
});

const getAccountId = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("keyStore", keystore => {
      if (chrome.runtime.lastError) {
        reject(false);
      } else {
        const keys = JSON.parse(keystore["keyStore"]);
        const accountId = keys["accountId"];
        resolve(accountId);
      }
    });
  });
};

const getPassword = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("keyStore", keystore => {
      if (chrome.runtime.lastError) {
        reject(false);
      } else {
        const keys = JSON.parse(keystore["keyStore"]);

        const password = keys["password"];
        resolve(password);
      }
    });
  });
};
const checkLoggedIn = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("loggedIn", loggedIn => {
      if (chrome.runtime.lastError) {
        reject(false);
      } else {
        resolve(loggedIn.loggedIn);
      }
    });
  });
};

const changeOwnership = (to, tokenId) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      console.log(certRes);
      resolve(certRes);
    } catch (error) {
      reject(false);
    }
  });
};

const updateDB = txn => {
  return new Promise(async (resolve, reject) => {
    const pendingTxns = await getPendingTrxns();
    const updatedTxns = pendingTxns.filter(
      trxn => !(trxn.to === txn.to && trxn.token_id === txn.token_id)
    );

    chrome.storage.sync.set({certPendings: updatedTxns}, function () {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve({status: true});
      }
    });
  });
};

//stores the failed txns into chrome storage
const storeInDB = txn => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("certPendings", trxns => {
      let trxnData = trxns.certPendings || [];

      // If txns is an array, concatenate it with trxnData
      if (Array.isArray(txn)) {
        trxnData = [...trxnData, ...txn];
      } else {
        // If txns is a single object, add it to trxnData
        trxnData.push(txn);
      }

      chrome.storage.sync.set({certPendings: trxnData}, function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve({status: true});
        }
      });
    });
  });
};

//get the pending trxns
const getPendingTrxns = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("certPendings", trxns => {
      let trxnData = trxns.certPendings || [];

      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(trxnData);
      }
    });
  });
};

const nftRetryMechanism = async () => {
  console.log("nft Retry triggered");
  try {
    //fetch the pending txn from chrome storage
    const txns = await getPendingTrxns();
    //try to resend them one by one
    for (const txn of txns) {
      console.log(txn);
      const res = await changeOwnership(txn.to, txn.token_id);
      console.log(res);
      //if got OK response remove that specific txn from the pending txns array
      if (res.ok) {
        const res = await updateDB(txn);
        console.log(res);
        if (res.status) {
          console.log("Pending txn removed successfully");
        } else {
          console.log("Updating txn failed..");
        }
      } else {
        console.log("Failed due to backend ");
      }
    }
  } catch (error) {
    console.log(`Error occured while retrying the transfer:${error}`);
  }
};

// Background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const sendGoodResponse = (message, data) => {
    sendResponse({from: "Bit-wallet-background-script", message, data});
  };

  if (request.from === "Bit-wallet-content-script") {
    let message = request.message;
    // Initial check
    if (message === "checkAccountCreated") {
      const asyncResponse = async () => {
        let origin = request.data.origin;
        let connectedSites = await chrome.storage.sync.get("connectedSites");
        try {
          let accountId = "";
          let isLoggedIn = checkLoggedIn();
          if (isLoggedIn && connectedSites.connectedSites.includes(origin)) {
            accountId = await getAccountId();
          }
          sendGoodResponse("checkAccountCreated", {
            status: true,
            accountId: accountId
          });
        } catch {
          sendGoodResponse("checkAccountCreated", {
            status: false
          });
        }
      };
      asyncResponse();
      return true;
    }
    // Connection request
    else if (message === "acceptConnection") {
      const asyncResponse = async () => {
        let connectedSites = (await chrome.storage.sync.get("connectedSites")) || [];
        connectedSites.connectedSites.push(request.data.origin);
        await chrome.storage.sync.set({
          connectedSites: connectedSites.connectedSites
        });
        try {
          let accountId = await getAccountId();
          sendGoodResponse("acceptConnection", {
            status: true,
            accountId: accountId
          });
        } catch {
          sendGoodResponse("acceptConnection", {
            status: false
          });
        }
      };
      asyncResponse();
      return true;
    }
    // Logged In  Check
    else if (message === "checkIsLoggedIn") {
      const asyncResponse = async () => {
        let loggedIn = await checkLoggedIn();
        let password = await getPassword();
        try {
          sendGoodResponse("checkIsLoggedIn", {
            status: loggedIn,
            password: password
          });
        } catch {
          sendGoodResponse("checkIsLoggedIn", {
            status: false
          });
        }
      };
      asyncResponse();
      return true;
    }
    // Enter Password
    else if (message === "enterPassword") {
      const asyncResponse = async () => {
        let password = await getPassword();
        let enteredPassword = request.data.password;
        if (password === enteredPassword) {
          chrome.storage.sync.set({
            loggedIn: true
          });
          try {
            let accountId = await getAccountId();
            sendGoodResponse("acceptConnection", {
              status: true,
              accountId: accountId
            });
          } catch {
            sendGoodResponse("acceptConnection", {
              status: false
            });
          }
        } else {
          sendGoodResponse("acceptConnection", {
            status: false
          });
        }
      };
      asyncResponse();
      return true;
    }
  } else if (request.from === "Bit-extension") {
    // console.log(request);
    if (request.message === "UpdateOwnership") {
      console.log(request.data);
      const {to, token_id} = request.data;
      const asyncResponse = async () => {
        const certRes = await changeOwnership(to, token_id);
        if (certRes.ok) {
          // Extracting JSON data from response
          console.log("Cert transferred successfully");
          sendGoodResponse("UpdateOwnership", {
            status: true
          });
        } else {
          const res = await storeInDB(request.data);
          console.log("stored in dB");
          console.log(res);
          console.log("Cert Transfer failed from backedn");
          // console.log("not transfered");
          sendGoodResponse("UpdateOwnership", {status: false});

          // throw new Error("Failed to transfer certificate");
        }
      };
      asyncResponse();
      return true;
    } else if (request.message === "getPendingCerts") {
      const asyncResponse = async () => {
        const txns = await getPendingTrxns();

        sendGoodResponse("getPendingCerts", {txns});
      };
      asyncResponse();
      return true;
    } else if (request.message === "TriggerRetry") {
      const asyncResponse = async () => {
        await nftRetryMechanism();
        sendGoodResponse("TriggerRetry", {msg: "Retried !"});
      };
      asyncResponse();
      return true;
    }
  }
});
