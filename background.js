chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    privateKey:
      "0000000000000000000000000000000000000000000000000000000000000001",
    provider: "",
  });
});

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    if (port.name === "savePrivateKey") {
      chrome.storage.sync.set({
        privateKey: msg.privateKey,
        provider: msg.provider,
      });

      port.postMessage({ status: "Success", privateKey: msg.privateKey });
    } else if (port.name === "getAccount") {
      chrome.storage.sync.get("privateKey", ({ privateKey, provider }) => {
        port.postMessage({
          status: "Success",
          privateKey: privateKey,
          provider: provider,
        });
      });
    } else if (port.name === "expandView") {
      chrome.tabs.create({ url: "index.html" }, function (tab) {});
    } else if (port.name === "webConnection") {
      port.postMessage({ message: "Background Script responded." });
      var port2 = chrome.runtime.connect({
        name: "BackgroundToPopupConnection",
      });
      port2.postMessage({
        message: "BackgroundToPopupConnection requested by background script",
      });
    }
  });
});
