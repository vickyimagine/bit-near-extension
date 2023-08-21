import React, { useState, useEffect, useContext } from "react";
import AccountContext from "../../context/accountContext";
import Typography from "@mui/material/Typography";
import { getContractInfo } from "../scripts/accounts";

const NftContract = (props) => {
  const account = useContext(AccountContext);
  const [contractName, setContractName] = useState("loading..");
  useEffect(() => {
    account.getContractInfo(props.contract).then((res) => {
      if (res !== "Server error") {
        setContractName(res);
      }
    });
  });
  return <Typography>{contractName}</Typography>;
};

export default NftContract;
