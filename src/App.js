/*global chrome*/

import ButtonAppBar from "./components/appbar/Appbar";
import "./App.css";
import config from "./config.json";
import AccountInfo from "./components/accountInfo/accountinfo";
import AccountBalance from "./components/accountbalance/accountbalance";
import SendReceive from "./components/sendrecieve/sendrecieve";
import Assetbar from "./components/assetbar/assetbar";
import CreateAccount from "./createAccount/createAccount";
import { getAccount } from "./components/scripts/accounts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AccountState from "./context/accountState";
import Layout from "./components/layout/layout";
import { useEffect, useState } from "react";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="appContainer">
      <ThemeProvider theme={darkTheme}>
        <AccountState>
          <Layout />
        </AccountState>
      </ThemeProvider>
    </div>
  );
}

export default App;
