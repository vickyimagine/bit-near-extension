// Function to send messages from inject-script to content-script
const sendMessage = (message, data) => {
  window.postMessage({from: "Bit-wallet-inject-script", message, data}, "*");
};

// Listen for messages from the content-script
window.addEventListener("message", e => {
  if (e.data.from === "Bit-wallet-content-script") {
    const {message, data} = e.data;
    if (message === "checkAccountCreated" && data.status) {
      createProvider(data);
    }
  }
});

// Check if account is created
sendMessage("checkAccountCreated", null);

// Function to create a provider object
const createProvider = async data => {
  const provider = {
    accountId: data.accountId,
    connect: (args, kwargs) => {
      sendMessage("connectionRequest", null);
      return connectionRequest;
    }
  };

  // Expose the provider globally as `window.bit`
  window.bit = provider;
};

// Promise to handle connection requests
const connectionRequest = new Promise((resolve, reject) => {
  window.addEventListener("message", e => {
    if (e.data.from === "Bit-wallet-content-script") {
      const {message, data} = e.data;
      if (message === "accepted" && data.status) {
        createProvider(data);
        resolve(data.accountId); // Resolve the connection with accountId
      } else if (message === "rejected" && data.status) {
        reject("User denied connection."); // Reject if the user denies connection
      }
    }
  });
});
