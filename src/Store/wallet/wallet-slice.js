import {createSlice} from "@reduxjs/toolkit";
import browser from "webextension-polyfill"; // Import the polyfill for compatibility
import {networks} from "../../Constants/networks";

const initialState = {
  currentNetwork: JSON.parse(localStorage.getItem("network")) || networks[0],
  accountId: null,
  balance: null,
  secretKey: null,
  lang: localStorage.getItem("lang") || "en",
  pendingCerts: []
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setCurrentNetwork(state, action) {
      state.currentNetwork = action.payload;
      localStorage.setItem("network", JSON.stringify(action.payload));

      // Use browser.storage.sync to persist the network state
      browser.storage.sync.set({network: action.payload}).catch(error => {
        console.error("Failed to store network in sync storage:", error);
      });
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

      // Use browser.storage.sync to persist the language preference
      browser.storage.sync.set({lang: action.payload}).catch(error => {
        console.error("Failed to store language in sync storage:", error);
      });
    },
    setPendingCerts(state, action) {
      state.pendingCerts = action.payload;

      // Optionally sync pending certificates (if required to persist them)
      browser.storage.sync.set({pendingCerts: action.payload}).catch(error => {
        console.error("Failed to store pendingCerts in sync storage:", error);
      });
    }
  }
});

export const {
  setCurrentNetwork,
  setAccountId,
  setBalance,
  setSecretKey,
  setLang,
  setPendingCerts
} = walletSlice.actions;

export default walletSlice.reducer;
