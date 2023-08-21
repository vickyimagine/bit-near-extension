import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { ethers } from "ethers";
import { saveAccount } from "../components/scripts/accounts";
import AccountBalance from "../components/accountbalance/accountbalance";
import { useContext } from "react";
import AccountContext from "../context/accountContext";
import Web3 from "web3";

const ImportAccount = (props) => {
  const account = useContext(AccountContext);
  const { open, setOpen } = props;
  const [isChecked, setIsChecked] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleImport = () => {
    let privateKey = document.getElementById(
      "outlined-password-input-for-importing-wallet"
    ).value;

    let prefixedPrivateKey = "0x" + privateKey;

    if (privateKey === "") {
      setIsError(true);
      setErrorMessage("Enter private key.");
    } else if (!isChecked) {
      setIsError(true);
      setErrorMessage("Please accept terms and conditions.");
    } else {
      if (
        ethers.utils.isHexString(privateKey, 32) ||
        ethers.utils.isHexString(prefixedPrivateKey, 32)
      ) {
        setIsError(false);
        // let web3 = new Web3(account.web3RPC);
        let web3 = new Web3.providers.HttpProvider(account.web3RPC);
        console.log(web3);
        saveAccount(prefixedPrivateKey, web3).then((res) => {
          if (res.status === "Success") {
            account.setPrivateKey(res.privateKey);
            account.setView("home");
          }
        });
      } else {
        setIsError(true);
        setErrorMessage("Invalid private key.");
      }
    }
  };

  return (
    <>
      {open && (
        <div className="createOrImportContainer">
          <div>
            <Button
              variant="contained"
              sx={{ margin: "20px" }}
              startIcon={<ArrowBackIcon />}
              onClick={() => setOpen(false)}
              fullWidth={false}
            >
              Back
            </Button>
          </div>
          <TextField
            id="outlined-password-input-for-importing-wallet"
            label="Private Key"
            variant="outlined"
            color="secondary"
          />
          <div className="acceptTermsAndConditions">
            <Checkbox onClick={() => setIsChecked(!isChecked)} />
            <Typography
              variant="subtitle1"
              gutterBottom
              color="white"
              style={{ padding: "0px", margin: "0px" }}
            >
              Accept terms and Conditions
            </Typography>
          </div>
          {isError && <Alert severity="error">{errorMessage}</Alert>}
          <Button
            variant="contained"
            sx={{ margin: "20px" }}
            onClick={() => {
              handleImport();
            }}
            fullWidth={false}
          >
            Import
          </Button>
        </div>
      )}
    </>
  );
};

export default ImportAccount;
