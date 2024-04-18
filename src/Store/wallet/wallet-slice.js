/*global chrome*/
import {createSlice} from "@reduxjs/toolkit";

import {networks} from "../../Constants/networks";

const initialState = {
  currentNetwork: JSON.parse(localStorage.getItem("network")) || networks[0],
  accountId: null,
  balance: null,
  secretKey: null,
  lang: localStorage.getItem("lang") || "en"
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setCurrentNetwork(state, action) {
      state.currentNetwork = action.payload;
      chrome.storage.sync.set({network: action.payload});
      localStorage.setItem("network", JSON.stringify(action.payload));
    },
    setAccountId(state, action) {
      state.accountId = action.payload;
    },
    setBalance(state, action) {
      state.balance = action.payload;
    },
    setSecretKey(state, action) {
      state.secretKey = action.payload;
    },
    setLang(state, action) {
      localStorage.setItem("lang", action.payload);
      state.lang = action.payload;
      chrome.storage.sync.set({lang: action.payload});
    }
  }
});

export const {setCurrentNetwork, setAccountId, setBalance, setSecretKey, setLang} =
  walletSlice.actions;

export default walletSlice.reducer;
