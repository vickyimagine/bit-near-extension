chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    connectedSites: [],
    loggedIn: true
  });
});

chrome.runtime.onStartup.addListener(() => {
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

const getAccountObject = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("secretKey", async keys => {
      if (chrome.runtime.lastError) {
        reject(false);
      } else {
        chrome.storage.sync.get("network", async network => {
          const accountId = await getAccountId();
          const networkData = network["network"];
          const keyStore = {
            secretKey: keys["secretKey"],
            accountId: accountId,
            type: networkData.type
          };
          resolve(keyStore);
        });
      }
    });
  });
};

const getPassword = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("keyStore", keystore => {
      // console.log(keystore);
      if (chrome.runtime.lastError) {
        reject(false);
      } else {
        // console.log(keystore["keyStore"]);
        const keys = JSON.parse(keystore["keyStore"]);

        const password = keys["password"];
        resolve(password);
      }
    });
  });
};

const getAccountBalance = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("balance", balance => {
      // console.log(keystore);
      if (chrome.runtime.lastError) {
        reject(false);
      } else {
        // console.log(keystore["keyStore"]);
        const bal = balance["balance"];

        resolve(bal);
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
        let connectedSites = await chrome.storage.sync.get("connectedSites");
        let siteArr = connectedSites.connectedSites;
        if (!siteArr.includes(request.data.origin)) {
          siteArr = [...siteArr, request.data.origin];
          await chrome.storage.sync.set({
            connectedSites: siteArr
          });
        }
        try {
          let accountId = await getAccountId();
          sendGoodResponse("acceptConnection", {
            status: true,
            accountId: accountId,
            message: request.data.message
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
    else if (message === "checkIsLoggedInFromContent") {
      const asyncResponse = async () => {
        let loggedIn = await checkLoggedIn();
        let password = await getPassword();
        let accountId = await getAccountId();
        let accountBalance = await getAccountBalance();

        let connectedSites = await chrome.storage.sync.get("connectedSites");
        let siteArr = connectedSites.connectedSites;
        let isOriginConnected = siteArr.includes(request.data.origin);
        if (
          request.data.message === "forFunctionCall" &&
          loggedIn &&
          !isOriginConnected
        ) {
          siteArr = [...siteArr, request.data.origin];
          await chrome.storage.sync.set({connectedSites: siteArr});
        }

        try {
          // console.log(request.data.origin);
          // console.log(connectedSites);
          // console.log("islogin");
          // console.log(loggedIn);

          sendGoodResponse("checkIsLoggedInFromBackground", {
            loginStatus: loggedIn,
            isSiteConnected: isOriginConnected,
            password: password,
            message: request.data.message,
            accountId: accountId,
            accountBalance: accountBalance
          });
        } catch {
          sendGoodResponse("checkIsLoggedInFromBackground", {
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
        let accountId = await getAccountId();
        let accountBalance = await getAccountBalance();
        let enteredPassword = request.data.password;
        let connectedSites = await chrome.storage.sync.get("connectedSites");
        // console.log(request.data.siteOrigin);
        let isOriginConnected = connectedSites.connectedSites.includes(
          request.data.siteOrigin
        );

        if (password === enteredPassword) {
          chrome.storage.sync.set({
            loggedIn: true
          });

          try {
            if (request.data.functionMessage === "functionMessage") {
              sendGoodResponse("passwordToFunction", {
                status: true,
                accountBalance
              });
            }
            sendGoodResponse("passwordToConnection", {
              status: true,
              isSiteConnected: isOriginConnected,
              accountId
            });
          } catch {
            sendGoodResponse("passwordToConnection", {
              status: false
            });
          }
        } else {
          sendGoodResponse("PasswordToConnection", {
            status: false
          });
        }
      };
      asyncResponse();
      return true;
    } else if (message === "getNearConnectionFromContent") {
      const asyncResponse = async () => {
        try {
          let accountObj = await getAccountObject();
          sendGoodResponse("nearConnectionFromBackground", {
            status: true,
            nearConnection: accountObj
          });
        } catch {
          sendGoodResponse("nearConnectionFromBackground", {
            status: false
          });
        }
      };
      asyncResponse();
      return true;
    }
  }
});
