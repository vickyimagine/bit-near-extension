console.log("Loaded Initial script");

const obj = {
  chainId: "",
  enable: () => {},
  isMetamask: true,
  networkVersion: "1",
  request: () => {},
  selectedAddress: "0x98dc705baf20f1acd9522fb4fbdf48ef1dc91f8e",
  send: () => {},
  sendAsync: () => {},
  _events: {},
  _eventsCount: 0,
  _handleAccountsChanged: () => {},
  _handleChainChanged: () => {},
  _handleConnect: () => {},
  _handleDisconnect: () => {},
  _handleStreamDisconnect: () => {},
  _handleUnlockStateChanged: () => {},
  _jsonRpcConnection: () => {},
  _log: [],
  _maxListeners: 100,
  _metamask: {},
  _rpcEngine: () => {},
  _sendSync: () => {},
  _sentwarning: {},
  _state: {},
  _warnOfDeprecion: () => {},
};

window.ethereum = "";

document.addEventListener("InjectProviderIntoInitialScript", (e) => {
  let myProvider = e.detail.ethereum.provider;
  let target = {};

  Object.keys(myProvider).map((myKey) => {
    target[myKey] = myProvider[myKey];
  });
  Object.keys(obj).map((myKey) => {
    if (!Object.keys(myProvider).includes(myKey)) {
      target[myKey] = obj[myKey];
    }
  });

  const handler = {
    get: function (target, prop) {
      if (prop === "_maxListeners") {
        return 100;
      }
    },
  };
  const ethereum = new Proxy(target, handler);

  window.ethereum = ethereum;
});
