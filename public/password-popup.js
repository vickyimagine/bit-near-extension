const connectionScript = () => {
  async function getPassword() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({active: true, currentWindow: false}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "getPassword"}, res => {
          resolve(res);
        });
      });
    });
  }

  async function handleSubmit() {
    let {password, origin, funcMessage} = await getPassword();
    let enteredPassword = document.getElementById("password").value;
    if (password !== enteredPassword) {
      document.getElementById("status").innerHTML = "Password Invalid!";
    } else {
      chrome.tabs.query({active: true, currentWindow: false}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          from: "Bit-wallet-password-popup",
          message: "password",
          data: {
            password: enteredPassword,
            siteOrigin: origin,
            functionMessage: funcMessage
          },
          origin: origin
        });
        window.close();
      });
    }
  }

  var enterbtn = document.getElementById("enterButton");
  enterbtn.onclick = handleSubmit;
};

window.onload = connectionScript;
