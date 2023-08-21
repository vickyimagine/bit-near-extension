import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getAccountBalance } from "../scripts/accounts";
import { useContext } from "react";
import AccountContext from "../../context/accountContext";

export default function AccountBalance() {
  const account = useContext(AccountContext);
  const [mybalance, setmybalance] = useState(0);
  useEffect(() => {
    poppulatebalance();
  }, [account.networkRPC]);

  const poppulatebalance = async () => {
    let rawbalance = await account.getAccountBalance();
    console.log(rawbalance);
    let readablebalance = Math.floor(parseInt(rawbalance) / 10 ** 14) / 10000;
    console.log(readablebalance);
    setmybalance(readablebalance);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar
          style={{
            justifyContent: "space-between",
          }}
        >
          <div className="accountBalance">
            <Typography variant="h5" gutterBottom>
              {mybalance} Matic
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
