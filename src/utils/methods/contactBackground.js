import browser from "webextension-polyfill"; // Import the polyfill

// Dock which gets data from bridge and passes it to React components
export const contactBackground = async (msg, configs) => {
  try {
    const {message, data} = await dataFromBackground(msg, configs);

    if (message === "UpdateOwnership") {
      return data;
    } else if (message === "getPendingCerts") {
      return data.txns;
    } else if (message === "TriggerRetry") {
      console.log(data.msg);
    }
  } catch (error) {
    console.error("Error in contactBackground:", error);
    return null;
  }
};

// Bridge to pass data between background and frontend
const dataFromBackground = (message, data) => {
  return new Promise((resolve, reject) => {
    try {
      browser.runtime
        .sendMessage({
          from: "Bit-extension",
          message,
          data
        })
        .then(response => {
          if (response && response.from === "Bit-wallet-background-script") {
            resolve(response);
          } else {
            reject(new Error("Unexpected response from background script"));
          }
        })
        .catch(error => {
          console.error("Error in sendMessage:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};
