const connectionScript = () => {
  async function getPassword() {
    return new Promise((resolve, reject) => {
      browser.tabs
        .query({active: true, currentWindow: true})
        .then(tabs => {
          if (tabs.length > 0) {
            browser.tabs
              .sendMessage(tabs[0].id, {message: "getPassword"})
              .then(res => {
                if (res && res.password) {
                  resolve(res.password);
                } else {
                  reject("Failed to retrieve password");
                }
              })
              .catch(err => {
                console.error("Error sending message to tab:", err);
                reject("Error retrieving password");
              });
          } else {
            reject("No active tab found");
          }
        })
        .catch(err => {
          console.error("Error querying tabs:", err);
          reject("Error querying tabs");
        });
    });
  }

  async function handleSubmit() {
    try {
      let password = await getPassword();
      let enteredPassword = document.getElementById("password").value.trim();
      if (password !== enteredPassword) {
        document.getElementById("status").innerText = "Password Invalid!";
        document.getElementById("status").style.color = "red";
        document.getElementById("password").value = ""; // Clear input for retry
      } else {
        browser.tabs
          .query({active: true, currentWindow: true})
          .then(tabs => {
            if (tabs.length > 0) {
              browser.tabs
                .sendMessage(tabs[0].id, {
                  from: "Bit-wallet-password-popup",
                  message: "password",
                  data: {password: enteredPassword}
                })
                .then(() => {
                  window.close();
                })
                .catch(err => {
                  console.error("Error sending message after password entry:", err);
                });
            }
          })
          .catch(err => {
            console.error("Error querying tabs for submit:", err);
          });
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  }

  document.getElementById("enterButton").onclick = handleSubmit;
};

window.onload = connectionScript;
