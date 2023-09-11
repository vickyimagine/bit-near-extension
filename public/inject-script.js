const sendMessage = (message, data) => {
  window.postMessage({ from: "Bit-wallet-inject-script", message, data });
};

window.addEventListener("message", (e) => {
  if (e.data.from === "Bit-wallet-content-script") {
    let message = e.data.message;
    let data = e.data.data;
    if (message === "checkAccountCreated" && data.status) {
      createProvider(data);
    }
  }
});

// check if account created
sendMessage("checkAccountCreated", null);

const createProvider = async (data) => {
  const provider = { accountId: data.accountId };
  provider.connect = (args, kwargs) => {
    sendMessage("connectionRequest", null);
    return connectionRequest;
  };
  window.bit = provider;
};

const connectionRequest = new Promise((resolve, reject) => {
  window.addEventListener("message", (e) => {
    if (e.data.from === "Bit-wallet-content-script") {
      let message = e.data.message;
      let data = e.data.data;
      if (message === "accepted" && data.status) {
        createProvider(data);
        resolve(data.publickey);
      } else if (message === "rejected" && data.status) {
        reject("User denied connection.");
      }
    }
  });
});
