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
  }
});
