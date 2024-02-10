const functionCallScript = () => {
  console.log("Started FunctionCallScript");
  async function getBalance() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({active: true, currentWindow: false}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "getBalance"}, res => {
          document.querySelector(".bal-para").innerHTML = res.balance;
        });
      });
    });
  }
  getBalance();
  function handleApprove() {
    chrome.tabs.query({active: true, currentWindow: false}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        from: "Bit-wallet-function-popup",
        message: "approve"
      });
      window.close();
    });
  }

  function handleDeny() {
    chrome.tabs.query({active: true, currentWindow: false}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        from: "Bit-wallet-function-popup",
        message: "deny"
      });
      window.close();
    });
  }

  var approveBtn = document.getElementById("approveButton");
  approveBtn.onclick = handleApprove;
  var denyBtn = document.getElementById("denyButton");
  denyBtn.onclick = handleDeny;
};

window.onload = functionCallScript;
