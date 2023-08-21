import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import AccountDetail from "../accountInfo/accountdetail";
import Send from "./send";

export default function SendReceive() {
  const [accountDetailOpen, setAccountDetailOpen] = React.useState(false);
  const [sendOpen, setSendOpen] = React.useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar
          style={{
            justifyContent: "space-between",
          }}
        >
          <div className="sendreceivebuttons">
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                setSendOpen(true);
              }}
            >
              Send
            </Button>
            <Button
              variant="contained"
              endIcon={<CallReceivedIcon />}
              onClick={() => setAccountDetailOpen(true)}
            >
              Receive
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <AccountDetail onClose={setAccountDetailOpen} open={accountDetailOpen} />
      <Send onClose={setSendOpen} open={sendOpen} />
    </Box>
  );
}
