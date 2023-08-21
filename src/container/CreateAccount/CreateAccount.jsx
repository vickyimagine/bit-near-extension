import React from "react";
// import {setupWalletSelector} from "@near-wallet-selector/core";
import {useNavigate} from "react-router-dom";
import {genKeys} from "../../utils/generateKeys";

const CreateAccount = () => {
  const generatePairs = () => {};

  return (
    <div
      className='text-3xl text-white'
      onClick={generatePairs}>
      Generate
    </div>
  );
};

export default CreateAccount;
