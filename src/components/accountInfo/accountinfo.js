import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AccountDetail from "./accountdetail";
import { useContext } from "react";
import AccountContext from "../../context/accountContext";

export default function AccountInfo() {
  const account = useContext(AccountContext);
  const [isMenu, setIsMenu] = useState(false);
  const [address, setAddress] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [accountDetailOpen, setAccountDetailOpen] = useState(false);

  useEffect(() => {
    let myaddress = account.account;
    setFullAddress(myaddress);
    let myshoretenedaddress = shortenaddress(myaddress);
    setAddress(myshoretenedaddress);
  }, []);

  const shortenaddress = (address) => {
    let first5letters = address.slice(0, 5);
    let last4letters = address.slice(38);
    return first5letters + "...." + last4letters;
  };

  const handleClose = () => {
    setIsMenu(false);
  };

  const handleMenu = () => {
    setAccountDetailOpen(true);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar
          style={{
            justifyContent: "space-between",
          }}
        >
          <div className="connectIndicator">
            <div className="connectDot"></div>
            Connected
          </div>

          <div className="accountDetail">
            <div className="accountName">
              Account1
              <div className="accountNumber">{address}</div>
            </div>

            <Button
              variant="filled"
              onClick={() => {
                navigator.clipboard.writeText(fullAddress);
              }}
            >
              <ContentCopyIcon />
            </Button>
          </div>

          <IconButton size="large" onClick={handleMenu} color="inherit">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AccountDetail onClose={setAccountDetailOpen} open={accountDetailOpen} />
    </Box>
  );
}
