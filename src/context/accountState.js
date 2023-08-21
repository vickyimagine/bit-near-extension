import React, { useState, useEffect } from "react";
import AccountContext from "./accountContext";
import useAccount from "../components/scripts/accounts";
import { getAccount } from "../components/scripts/accounts";

const AccountState = (props) => {
  const [view, setView] = useState("home");
  const [privateKey, setPrivateKey] = useState(
    "0000000000000000000000000000000000000000000000000000000000000001"
  );

  // "92bfafe7893e38f548b722308adf1628e214ff8bec5afcf2a3ece8aca05bf2b5"
  // const networkList = {
  //   polygonMainnet:
  //     "https://eth-mainnet.g.alchemy.com/v2/ic6lk9pJ5p-6Zg-6T5vXj9adRiOwxgOL",
  //   polygonTestnet:
  //     "https://polygon-mumbai.g.alchemy.com/v2/qgntfG4-Q_3_4C7v6i0wg709xT8_-Fcc",
  // };
  const networkList = {
    polygonMainnet:
      "https://polygon-mainnet.g.alchemy.com/v2/n6g7hc56CHM2vlLOtdx0Bnf2XWGZrGlH",
    polygonTestnet:
      "https://polygon-mumbai.g.alchemy.com/v2/qgntfG4-Q_3_4C7v6i0wg709xT8_-Fcc",
  };

  const [networkRPC, setNetworkRPC] = useState("polygonMainnet");
  const web3RPC = networkList[networkRPC];

  const {
    getAccountAddress,
    getAccountBalance,
    getNetworkDetails,
    getAccountNFTs,
    getContractInfo,
    transferNftGasEstimate,
    transferNft,
    transferMatic,
    provider,
    wallet,
  } = useAccount(networkList[networkRPC], privateKey);

  const account = getAccountAddress();

  useEffect(() => {
    getAccount().then((res) => {
      if (res.privateKey === "") {
        setView("createAccount");
      } else {
        setPrivateKey(res.privateKey);
      }
    });
  }, []);

  return (
    <AccountContext.Provider
      value={{
        account,
        privateKey,
        setPrivateKey,
        view,
        setView,
        getAccountBalance,
        getNetworkDetails,
        getAccountNFTs,
        getContractInfo,
        transferNftGasEstimate,
        transferNft,
        transferMatic,
        networkRPC,
        setNetworkRPC,
        provider,
        wallet,
        web3RPC,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountState;
