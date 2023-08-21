// document.addEventListener("scroll", () => {
//   console.log("Scroll");
//   console.log(window);
// });

let privateKey = "";
let provider = "";

const poppulateProvider = () => {
  chrome.storage.sync.get("privateKey", (res) => {
    console.log(res);
    privateKey = res.privateKey;
    chrome.storage.sync.get("provider", (res) => {
      console.log(res);
      provider = res.provider;
      injectInitialScript();
    });
  });
};

const emitProviderInjecterEvent = () => {
  const event = new CustomEvent("InjectProviderIntoInitialScript", {
    detail: {
      ethereum: {
        isMetamask: true,
        privateKey: privateKey,
        provider: provider,
      },
    },
  });
  document.dispatchEvent(event);
};

const injectInitialScript = () => {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("myScript.js");
  script.onload = () => {
    emitProviderInjecterEvent();
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
  };
  (document.head || document.documentElement).appendChild(script);
};

poppulateProvider();
