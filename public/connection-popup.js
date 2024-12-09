const connectionScript = () => {
  async function poppulateOrigin() {
    try {
      const tabs = await browser.tabs.query({active: true, currentWindow: true});
      const res = await browser.tabs.sendMessage(tabs[0].id, {
        message: "connectRequestOrigin"
      });
      document.getElementById("origin").innerHTML = res.origin;
    } catch (error) {
      console.error("Error fetching origin:", error);
    }
  }

  poppulateOrigin();

  async function handleConnect() {
    try {
      const origin = document.getElementById("origin").innerHTML;
      const tabs = await browser.tabs.query({active: true, currentWindow: true});
      await browser.tabs.sendMessage(tabs[0].id, {
        from: "Bit-wallet-connection-popup",
        message: "accept",
        origin: origin
      });
      window.close();
    } catch (error) {
      console.error("Error handling connect:", error);
    }
  }

  async function handleReject() {
    try {
      const tabs = await browser.tabs.query({active: true, currentWindow: true});
      await browser.tabs.sendMessage(tabs[0].id, {
        message: "reject",
        from: "Bit-wallet-connection-popup"
      });
      window.close();
    } catch (error) {
      console.error("Error handling reject:", error);
    }
  }

  document.getElementById("connectButton").onclick = handleConnect;
  document.getElementById("rejectButton").onclick = handleReject;
};

window.onload = connectionScript;
