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
        password: request.data.password
      });
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
        } else if (response.message === "checkIsLoggedIn") {
          if (response.data.status) {
            injectConnectionScript(origin);
            // injectPasswordScript(response.data.password);
          } else {
            injectPasswordScript(response.data.password);
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
      checkIsLoggedIn(origin);
    }
  }
});

const checkIsLoggedIn = origin => {
  contentScriptToBackgroundScript("checkIsLoggedIn", {
    origin
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
const injectPasswordScript = password => {
  let leftpos = (parseInt(screen.width) - 360).toString();
  let params =
    "scrollbars=no,resizeable=no,status=no,location=no,toolbar=no,menubar=no,width=350,height=600,left=" +
    leftpos +
    ",top=0";
  let newURL = chrome.runtime.getURL("password-popup.html");
  window.open(newURL, "Bit-wallet", params);
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "getPassword") {
      sendResponse({password});
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
