// Listening to connection-popup
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.from === "Bit-wallet-connection-popup") {
    if (request.message === "accept") {
      contentScriptToBackgroundScript("acceptConnection", {
        origin: request.origin
      });
    }
    if (request.message === "reject") {
      contentScriptToInjectScript("rejected", request.data);
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
const contentScriptToBackgroundScript = async (message, data) => {
  try {
    const response = await browser.runtime.sendMessage({
      from: "Bit-wallet-content-script",
      message,
      data
    });

    if (response.from === "Bit-wallet-background-script") {
      if (response.message === "checkAccountCreated" && response.data.status) {
        contentScriptToInjectScript("checkAccountCreated", response.data);
      } else if (response.message === "acceptConnection" && response.data.status) {
        contentScriptToInjectScript("accepted", response.data);
      } else if (response.message === "checkIsLoggedIn") {
        if (response.data.status) {
          injectConnectionScript(response.data.origin);
        } else {
          injectPasswordScript(response.data.password);
        }
      }
    }
  } catch (error) {
    console.error("Error communicating with background script:", error);
  }
};

// Listening to Inject Script
window.addEventListener("message", e => {
  if (e.data.from === "Bit-wallet-inject-script") {
    const {message, origin} = e.data;
    if (message === "checkAccountCreated") {
      contentScriptToBackgroundScript("checkAccountCreated", {origin});
    }
    if (message === "connectionRequest") {
      checkIsLoggedIn(origin);
    }
  }
});

const checkIsLoggedIn = origin => {
  contentScriptToBackgroundScript("checkIsLoggedIn", {origin});
};

// Opening connection-popup
const injectConnectionScript = origin => {
  const leftpos = (screen.width - 360).toString();
  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=350,height=550,left=${leftpos},top=0`;
  const newURL = browser.runtime.getURL("connection-popup.html");
  window.open(newURL, "Bit-wallet", params);

  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "connectRequestOrigin") {
      sendResponse({origin});
    }
  });
};

// Opening password-popup
const injectPasswordScript = password => {
  const leftpos = (screen.width - 360).toString();
  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=350,height=600,left=${leftpos},top=0`;
  const newURL = browser.runtime.getURL("password-popup.html");
  window.open(newURL, "Bit-wallet", params);

  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "getPassword") {
      sendResponse({password});
    }
  });
};

// Injecting inject-script
const injectInitialScript = () => {
  const script = document.createElement("script");
  script.type = "module";
  script.src = browser.runtime.getURL("inject-script.js");
  script.onload = () => {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
  };
  (document.head || document.documentElement).appendChild(script);
};

injectInitialScript();

// Sending messages
const contentScriptToInjectScript = (message, data) => {
  window.postMessage({from: "Bit-wallet-content-script", message, data});
};
