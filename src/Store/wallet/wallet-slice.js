import {createSlice} from "@reduxjs/toolkit";
import {networks} from "../../Data/networks";

const initialState = {
  currentNetwork: networks[0],
  accountId: null,
  balance: null
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setCurrentNetwork(state, action) {
      state.currentNetwork = action.payload;
    },
    setAccountId(state, action) {
      state.accountId = action.payload;
    },
    setBalance(state, action) {
      state.balance = action.payload;
    }
  }
});

export const {setCurrentNetwork, setAccountId, setBalance} = walletSlice.actions;

export default walletSlice.reducer;
