import {configureStore} from "@reduxjs/toolkit";
import walletSlice from "./wallet/wallet-slice";

export const store = configureStore({
  reducer: {
    wallet: walletSlice
  }
});
