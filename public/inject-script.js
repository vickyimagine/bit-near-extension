window.bit = {accountId: ""};

const sendMessage = (message, data) => {
  window.postMessage({from: "Bit-wallet-inject-script", message, data});
};

window.addEventListener("message", e => {
  if (e.data.from === "Bit-wallet-content-script") {
    let message = e.data.message;
    let data = e.data.data;
    if (message === "checkAccountCreated" && data.status) {
      createProvider(data);
    }
  }
});

console.log("this is inject");

// check if account created
sendMessage("checkAccountCreated", null);

const createProvider = async (data, message) => {
  let provider = {};
  provider.connect = (args, kwargs) => {
    sendMessage("connectionRequest", null);

    return connectionRequest;
  };
  provider.nearConnection = (args, kwargs) => {
    sendMessage("getNearConnectionFromInject", null);

    return nearConnection;
  };

  window.bit = provider;
};

let connectionRequest = new Promise((resolve, reject) => {
  window.addEventListener("message", e => {
    if (e.data.from === "Bit-wallet-content-script") {
      let message = e.data.message;
      let data = e.data.data;
      if (message === "accepted" && (data.status || data.loginStatus)) {
        createProvider(data, "connection");
        console.log(data.accountId);
        resolve(data.accountId);
      } else if (message === "rejected" && data.status) {
        reject("User denied connection.");
      }
    }
  });
});

const nearConnection = new Promise((resolve, reject) => {
  window.addEventListener("message", e => {
    if (e.data.from === "Bit-wallet-content-script") {
      let message = e.data.message;
      let data = e.data.data;
      if (message === "nearObjectFromContentToInject" && data.status) {
        createProvider(data, "nearConnection");
        resolve(data.nearConnection);
      } else if (message === "Denied" && !data.status) {
        reject("User denied Call.");
      } else if (data.message === "LOGIN_CONNECTION_ERROR") {
        reject(data.description);
      }
    }
  });
});
