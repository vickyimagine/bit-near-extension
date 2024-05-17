/*global chrome*/

//dock which gets data from bridge and pass to the react components
export const contactBackground = async (msg, configs) => {
  const {message, data} = await dataFromBackground(msg, configs);
  // console.log(message, data);
  if (message === "UpdateOwnership") {
    // console.log(data);
    return data;
  } else if (message === "getPendingCerts") {
    // console.log(data.txns);
    return data.txns;
  } else if (message === "TriggerRetry") {
    console.log(data.msg);
  }
};

//bridge to pass data between background and frontend
const dataFromBackground = (message, data) => {
  return new Promise((res, rej) => {
    try {
      chrome.runtime.sendMessage(
        {
          from: "Bit-extension",
          message,
          data
        },
        function (response) {
          //   console.log(response);
          if (response.from === "Bit-wallet-background-script") {
            // console.log(response);
            res(response);
          }
        }
      );
    } catch (error) {
      rej(false);
    }
  });
};
