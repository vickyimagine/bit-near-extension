import React from "react";
import ButtonAppBar from "../appbar/Appbar";
import AccountInfo from "../accountInfo/accountinfo";
import AccountBalance from "../accountbalance/accountbalance";
import SendReceive from "../sendrecieve/sendrecieve";
import Assetbar from "../assetbar/assetbar";
import { useContext } from "react";
import AccountContext from "../../context/accountContext";

import AboutUs from "../aboutus/aboutus";
import Terms from "../termsandconditions/termsandconditions";
import PrivacyPolicy from "../privacypolicy/privacypolicy";
import CreateAccount from "../../createAccount/createAccount";

const HomeScreen = () => {
  return (
    <>
      <ButtonAppBar />
      <AccountInfo />
      <AccountBalance />
      <SendReceive />
      <Assetbar />
    </>
  );
};

const Layout = () => {
  const account = useContext(AccountContext);
  return (
    <>
      <div style={{ color: "white" }}>{account.localprivateKey}</div>
      {account.privateKey ===
      "0000000000000000000000000000000000000000000000000000000000000001" ? (
        <CreateAccount />
      ) : (
        <>
          {account.view === "home" && <HomeScreen />}
          {account.view === "aboutUs" && <AboutUs />}
          {account.view === "terms" && <Terms />}
          {account.view === "privacy" && <PrivacyPolicy />}
          {account.view === "createAccount" && <CreateAccount />}
        </>
      )}
    </>
  );
};

export default Layout;
