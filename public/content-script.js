// Listening to connection-popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.from === "Bit-wallet-connection-popup") {
    if (request.message === "accept") {
      contentScriptToBackgroundScript("acceptConnection", {
        origin: request.origin
      });
    }
    if (request.message === "reject") {
      contentScriptToInjectScript("rejected", response.data);
    }
  }
  if (request.from === "Bit-wallet-password-popup") {
    if (request.message === "password") {
      contentScriptToBackgroundScript("enterPassword", {
        password: request.data.password,
        siteOrigin: request.data.siteOrigin,
        functionMessage: request.data.functionMessage
      });
    }
  }
  if (request.from === "Bit-wallet-function-popup") {
    if (request.message === "approve") {
      contentScriptToBackgroundScript("getNearConnectionFromContent", {});
    } else if (request.message === "deny") {
      contentScriptToInjectScript("Denied", {status: false});
    }
  }
});

// Communicating with Background Script
const contentScriptToBackgroundScript = (message, data) => {
  chrome.runtime.sendMessage(
    {from: "Bit-wallet-content-script", message, data},
    function (response) {
      if (response.from === "Bit-wallet-background-script") {
        if (response.message === "checkAccountCreated" && response.data.status) {
          contentScriptToInjectScript("checkAccountCreated", response.data);
        } else if (response.message === "acceptConnection" && response.data.status) {
          contentScriptToInjectScript("accepted", response.data);
        } else if (response.message === "passwordToConnection" && response.data.status) {
          if (!response.data.isSiteConnected) {
            injectConnectionScript(origin);
          } else if (response.data.isSiteConnected) {
            contentScriptToInjectScript("accepted", response.data);
          }
        } else if (response.message === "passwordToFunction" && response.data.status) {
          injectFunctionCallScript(response.data.accountBalance);
        } else if (
          response.message === "nearConnectionFromBackground" &&
          response.data.status
        ) {
          contentScriptToInjectScript("nearObjectFromContentToInject", response.data);
        } else if (response.message === "checkIsLoggedInFromBackground") {
          if (response.data.message === "forWalletConnection") {
            if (response.data.loginStatus && !response.data.isSiteConnected) {
              injectConnectionScript(origin);
              // injectPasswordScript(response.data.password);
            } else if (response.data.loginStatus && response.data.isSiteConnected) {
              contentScriptToInjectScript("accepted", response.data);
            } else if (!response.data.loginStatus) {
              injectPasswordScript(response.data.password, origin);
            }
          } else if (response.data.message === "forFunctionCall") {
            if (response.data.loginStatus) {
              injectFunctionCallScript(response.data.accountBalance);
            } else if (!response.data.loginStatus) {
              injectPasswordScript(response.data.password, origin, "functionMessage");
            }
          }
        }
      }
    }
  );
};

// Listening to Inject Script
window.addEventListener("message", e => {
  if (e.data.from === "Bit-wallet-inject-script") {
    let message = e.data.message;
    let origin = e.origin;
    if (message === "checkAccountCreated") {
      contentScriptToBackgroundScript("checkAccountCreated", {
        origin
      });
    }
    if (message === "connectionRequest") {
      console.log("connection in content");
      checkIsLoggedIn(origin, "forWalletConnection");
    }
    if (message === "getNearConnectionFromInject") {
      checkIsLoggedIn(origin, "forFunctionCall");
    }
  }
});

const checkIsLoggedIn = (origin, message) => {
  contentScriptToBackgroundScript("checkIsLoggedInFromContent", {
    origin,
    message
  });
};

// Opening connection-popup
const injectConnectionScript = origin => {
  let leftpos = (parseInt(screen.width) - 360).toString();
  let params =
    "scrollbars=no,resizeable=no,status=no,location=no,toolbar=no,menubar=no,width=350,height=550,left=" +
    leftpos +
    ",top=0";
  let newURL = chrome.runtime.getURL("connection-popup.html");
  window.open(newURL, "Bit-wallet", params);
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "connectRequestOrigin") {
      sendResponse({origin});
    }
  });
};
// Opening password-popup
const injectPasswordScript = (password, origin, funcMessage) => {
  let leftpos = (parseInt(screen.width) - 360).toString();
  let params =
    "scrollbars=no,resizeable=no,status=no,location=no,toolbar=no,menubar=no,width=350,height=600,left=" +
    leftpos +
    ",top=0";
  let newURL = chrome.runtime.getURL("password-popup.html");
  window.open(newURL, "Bit-wallet", params);
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "getPassword") {
      sendResponse({password, origin, funcMessage});
    }
  });
};

// Opening function-call-popup
const injectFunctionCallScript = balance => {
  let leftpos = (parseInt(screen.width) - 360).toString();
  let params =
    "scrollbars=no,resizeable=no,status=no,location=no,toolbar=no,menubar=no,width=350,height=600,left=" +
    leftpos +
    ",top=0";
  let newURL = chrome.runtime.getURL("function-call-popup.html");
  window.open(newURL, "Bit-wallet", params);
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "getBalance") {
      sendResponse({balance});
    }
  });
};

//Injecting inject-script
const injectInitialScript = () => {
  const script = document.createElement("script");
  script.type = "module";
  script.src = chrome.runtime.getURL("inject-script.js");
  script.onload = () => {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
  };
  (document.head || document.documentElement).appendChild(script);
};

injectInitialScript();

/// Sending messages
const contentScriptToInjectScript = (message, data) => {
  window.postMessage({from: "Bit-wallet-content-script", message, data});
};
