const connectionScript = () => {
  console.log("Started connection");
  function poppulateOrigin() {
    chrome.tabs.query({active: true, currentWindow: false}, function (tabs) {
      // console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {message: "connectRequestOrigin"}, res => {
        // console.log(res);
        document.getElementById("origin").innerHTML = res.origin;
      });
    });
  }

  poppulateOrigin();
  function handleConnect() {
    let origin = document.getElementById("origin").innerHTML;
    chrome.tabs.query({active: true, currentWindow: false}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        from: "Bit-wallet-connection-popup",
        message: "accept",
        origin: origin
      });
      window.close();
    });
  }

  function handleReject() {
    chrome.tabs.query({active: true, currentWindow: false}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: "reject",
        from: "Bit-wallet-connection-popup"
      });
      window.close();
    });
  }

  var connectbtn = document.getElementById("connectButton");
  connectbtn.onclick = handleConnect;
  var rejectbtn = document.getElementById("rejectButton");
  rejectbtn.onclick = handleReject;
};

window.onload = connectionScript;
