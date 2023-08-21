import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useContext } from "react";
import AccountContext from "../../context/accountContext";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Qrcode from "../sendrecieve/qrcode";

export default function AccountDetail(props) {
  const { onClose, open } = props;
  const account = useContext(AccountContext);

  const [passwordDialogOpen, setPasswordDialogOpen] = React.useState(false);
  const [passwordIncorrectWarning, setPasswordIncorrectWarning] =
    React.useState(false);
  const [privateKeyDialog, setPrivateKeyDialog] = React.useState(false);

  const handleClose = () => {
    setPasswordDialogOpen(false);
    setPasswordIncorrectWarning(false);
    setPrivateKeyDialog(false);
    onClose(false);
  };

  const checkPassword = () => {
    let enteredPassword = document.getElementById(
      "passwordFieldForPrivateKey"
    ).value;
    return enteredPassword === "1234";
  };

  const EnterPassword = () => {
    return (
      <>
        <TextField
          id="passwordFieldForPrivateKey"
          label="Password"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "10px" }}
          onClick={() => {
            if (checkPassword()) {
              setPasswordDialogOpen(false);
              setPrivateKeyDialog(true);
              setPasswordIncorrectWarning(false);
            } else {
              setPasswordIncorrectWarning(true);
            }
          }}
        >
          Submit
        </Button>
        {passwordIncorrectWarning && passwordDialogOpen && (
          <Alert severity="error">Incorrect Password.</Alert>
        )}
      </>
    );
  };

  const PrivateKey = () => {
    return (
      <>
        <Typography variant="body2" color="text.secondary">
          Private Key (Click to copy)
        </Typography>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={() => {
            navigator.clipboard.writeText(account.privateKey);
          }}
        >
          <div style={{ width: "280px", wordWrap: "break-word" }}>
            {account.privateKey}
          </div>
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "10px" }}
          onClick={() => {
            setPasswordDialogOpen(false);
            setPrivateKeyDialog(false);
            setPasswordIncorrectWarning(false);
          }}
        >
          Done
        </Button>
        <Alert severity="error">Warning: Never share your private key.</Alert>
      </>
    );
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
        <DialogTitle>
          Account1
          <Button
            variant="filled"
            onClick={() => {
              navigator.clipboard.writeText(account.account);
            }}
          >
            <EditIcon />
          </Button>
        </DialogTitle>
        <div>
          <Button
            variant="outlined"
            color="info"
            fullWidth
            endIcon={<ContentCopyIcon />}
            onClick={() => {
              navigator.clipboard.writeText(account.account);
            }}
          >
            <div style={{ width: "190px", wordWrap: "break-word" }}>
              {account.account}
            </div>
          </Button>
        </div>

        <Qrcode />
        {!passwordDialogOpen && !privateKeyDialog && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setPasswordDialogOpen(true);
            }}
          >
            Export Private Key
            <VisibilityOffIcon />
          </Button>
        )}
        {passwordDialogOpen && <EnterPassword />}
        {privateKeyDialog && <PrivateKey />}
      </div>
    </Dialog>
  );
}
