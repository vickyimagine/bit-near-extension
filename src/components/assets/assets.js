import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { getAccountBalance } from "../scripts/accounts";
import "./assets.css";
import { useContext } from "react";
import AccountContext from "../../context/accountContext";

const Assets = () => {
  const account = useContext(AccountContext);
  const [mybalance, setmybalance] = useState(0);
  useEffect(() => {
    poppulatebalance();
  }, []);

  const poppulatebalance = async () => {
    let rawbalance = await account.getAccountBalance();
    let readablebalance = Math.floor(parseInt(rawbalance) / 10 ** 14) / 10000;
    setmybalance(readablebalance);
  };
  return (
    <div className="assetscontainer">
      <Typography variant="button" display="block" gutterBottom color="primary">
        MATIC
      </Typography>
      <Typography variant="button" display="block" gutterBottom color="primary">
        {mybalance} MATIC
      </Typography>
    </div>
  );
};

export default Assets;
