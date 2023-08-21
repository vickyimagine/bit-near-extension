import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useState, useContext } from "react";
import AccountContext from "../../context/accountContext";

export default function Send(props) {
  const account = useContext(AccountContext);
  const { onClose, open } = props;
  const [warningMessageOpen, setWarningMessageOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [statusType, setStatusType] = useState("error");
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DialogTitle>Transfer Matic</DialogTitle>
        <TextField
          id="addressFieldToTransferMatic"
          label="Recipients's Address"
          variant="outlined"
        />
        <TextField
          id="valueFieldToTransferMatic"
          label="Value"
          variant="outlined"
          sx={{ margin: "20px 0px 0px 0px" }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "10px" }}
          onClick={() => {
            setWarningMessageOpen(false);
            const recipient = document.getElementById(
              "addressFieldToTransferMatic"
            ).value;
            const value = document.getElementById(
              "valueFieldToTransferMatic"
            ).value;

            if (recipient === "") {
              setWarningMessageOpen(true);
              setStatusType("error");
              setStatus("Enter recipient address.");
            } else if (value === "") {
              setWarningMessageOpen(true);
              setStatusType("error");
              setStatus("Enter value.");
            } else
              account
                .transferMatic(recipient, value)
                .then((res) => {
                  console.log(res);
                  setWarningMessageOpen(true);
                  setStatusType("success");
                  setStatus("Transfer Successfull.");
                })
                .catch((err) => {
                  console.log(err);
                  setWarningMessageOpen(true);
                  setStatusType("error");
                  setStatus("Something went wrong. PLease try again.");
                });
          }}
        >
          Send
        </Button>
        {warningMessageOpen && <Alert severity={statusType}>{status}</Alert>}
      </div>
    </Dialog>
  );
}
