// Handle installation and startup events
browser.runtime.onInstalled.addListener(() => {
  try {
    browser.storage.local.set({
      connectedSites: [],
      loggedIn: true
    });
  } catch (error) {
    console.error("Error during onInstalled:", error);
  }
});

browser.runtime.onStartup.addListener(() => {
  try {
    browser.storage.local.set({
      loggedIn: false
    });
  } catch (error) {
    console.error("Error during onStartup:", error);
  }
});

// Get account ID from storage
const getAccountId = () => {
  return new Promise((resolve, reject) => {
    browser.storage.local
      .get("keyStore")
      .then(keystore => {
        try {
          const keys = JSON.parse(keystore["keyStore"]);
          resolve(keys["accountId"]);
        } catch (error) {
          reject("Error parsing keyStore data");
        }
      })
      .catch(error => {
        reject("Error retrieving keyStore: " + error);
      });
  });
};

// Get password from storage
const getPassword = () => {
  return new Promise((resolve, reject) => {
    browser.storage.local
      .get("keyStore")
      .then(keystore => {
        try {
          const keys = JSON.parse(keystore["keyStore"]);
          resolve(keys["password"]);
        } catch (error) {
          reject("Error parsing keyStore data");
        }
      })
      .catch(error => {
        reject("Error retrieving keyStore: " + error);
      });
  });
};

// Check if user is logged in
const checkLoggedIn = () => {
  return new Promise((resolve, reject) => {
    browser.storage.local
      .get("loggedIn")
      .then(loggedIn => {
        resolve(loggedIn.loggedIn);
      })
      .catch(error => {
        reject("Error retrieving loggedIn status: " + error);
      });
  });
};

// Change ownership of a certificate
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
      resolve(certRes);
    } catch (error) {
      reject("Failed to transfer certificate: " + error);
    }
  });
};

// Update the transaction database
const updateDB = txn => {
  return new Promise(async (resolve, reject) => {
    try {
      const pendingTxns = await getPendingTrxns();
      const updatedTxns = pendingTxns.filter(
        trxn => !(trxn.to === txn.to && trxn.token_id === txn.token_id)
      );

      await browser.storage.local.set({certPendings: updatedTxns});
      resolve({status: true});
    } catch (error) {
      reject("Error updating transaction database: " + error);
    }
  });
};

// Store failed transactions in the database
const storeInDB = txn => {
  return new Promise((resolve, reject) => {
    browser.storage.local
      .get("certPendings")
      .then(trxns => {
        let trxnData = trxns.certPendings || [];
        if (Array.isArray(txn)) {
          trxnData = [...trxnData, ...txn];
        } else {
          trxnData.push(txn);
        }

        browser.storage.local
          .set({certPendings: trxnData})
          .then(() => resolve({status: true}))
          .catch(error => reject("Error storing transaction: " + error));
      })
      .catch(error => reject("Error retrieving certPendings: " + error));
  });
};

// Get the pending transactions
const getPendingTrxns = () => {
  return new Promise((resolve, reject) => {
    browser.storage.local
      .get("certPendings")
      .then(trxns => {
        resolve(trxns.certPendings || []);
      })
      .catch(error => reject("Error retrieving pending transactions: " + error));
  });
};

// Retry mechanism for NFT ownership transfer
const nftRetryMechanism = async () => {
  console.log("NFT retry triggered");
  try {
    const txns = await getPendingTrxns();
    for (const txn of txns) {
      console.log(txn);
      const res = await changeOwnership(txn.to, txn.token_id);
      console.log(res);
      if (res.ok) {
        const updateRes = await updateDB(txn);
        console.log(updateRes);
        if (updateRes.status) {
          console.log("Pending txn removed successfully");
        } else {
          console.log("Failed to update txn");
        }
      } else {
        console.log("Failed due to backend issue");
      }
    }
  } catch (error) {
    console.error("Error during NFT retry:", error);
  }
};

// Background script message listener
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const sendGoodResponse = (message, data) => {
    sendResponse({from: "Bit-wallet-background-script", message, data});
  };

  if (request.from === "Bit-wallet-content-script") {
    const message = request.message;

    if (message === "checkAccountCreated") {
      const asyncResponse = async () => {
        try {
          const origin = request.data.origin;
          const connectedSites = await browser.storage.local.get("connectedSites");
          let accountId = "";
          const isLoggedIn = await checkLoggedIn();
          if (isLoggedIn && connectedSites.connectedSites.includes(origin)) {
            accountId = await getAccountId();
          }
          sendGoodResponse("checkAccountCreated", {status: true, accountId});
        } catch (error) {
          sendGoodResponse("checkAccountCreated", {status: false});
        }
      };
      asyncResponse();
      return true;
    } else if (message === "acceptConnection") {
      const asyncResponse = async () => {
        try {
          const connectedSites =
            (await browser.storage.local.get("connectedSites")) || [];
          connectedSites.connectedSites.push(request.data.origin);
          await browser.storage.local.set({
            connectedSites: connectedSites.connectedSites
          });

          const accountId = await getAccountId();
          sendGoodResponse("acceptConnection", {status: true, accountId});
        } catch (error) {
          sendGoodResponse("acceptConnection", {status: false});
        }
      };
      asyncResponse();
      return true;
    } else if (message === "checkIsLoggedIn") {
      const asyncResponse = async () => {
        try {
          const loggedIn = await checkLoggedIn();
          const password = await getPassword();
          sendGoodResponse("checkIsLoggedIn", {status: loggedIn, password});
        } catch (error) {
          sendGoodResponse("checkIsLoggedIn", {status: false});
        }
      };
      asyncResponse();
      return true;
    } else if (message === "enterPassword") {
      const asyncResponse = async () => {
        try {
          const password = await getPassword();
          const enteredPassword = request.data.password;
          if (password === enteredPassword) {
            await browser.storage.local.set({loggedIn: true});
            const accountId = await getAccountId();
            sendGoodResponse("acceptConnection", {status: true, accountId});
          } else {
            sendGoodResponse("acceptConnection", {status: false});
          }
        } catch (error) {
          sendGoodResponse("acceptConnection", {status: false});
        }
      };
      asyncResponse();
      return true;
    }
  } else if (request.from === "Bit-extension") {
    if (request.message === "UpdateOwnership") {
      const {to, token_id} = request.data;
      const asyncResponse = async () => {
        try {
          const certRes = await changeOwnership(to, token_id);
          if (certRes.ok) {
            sendGoodResponse("UpdateOwnership", {status: true});
          } else {
            await storeInDB(request.data);
            sendGoodResponse("UpdateOwnership", {status: false});
          }
        } catch (error) {
          sendGoodResponse("UpdateOwnership", {status: false});
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
        sendGoodResponse("TriggerRetry", {msg: "Retried!"});
      };
      asyncResponse();
      return true;
    }
  }
});
