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

const NewAccount = (props) => {
  const account = useContext(AccountContext);
  const { open, setOpen } = props;
  const [enterPhraseOpen, setEnterPhraseOpen] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [secretPhrase, setSecretPhrase] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    const wallet = ethers.Wallet.createRandom();
    setSecretPhrase(wallet.mnemonic.phrase);
  }, []);

  const handleNext = () => {
    setIsError(false);
    if (!isChecked) {
      setIsError(true);
      setErrorMessage("Please accept terms and conditions.");
    } else {
      setEnterPhraseOpen(true);
    }
  };

  const EnterPhrase = () => {
    const secretPhraseArray = secretPhrase.split(" ");
    const [selectedPhraseArray, setSelectedPhraseArray] = React.useState([]);
    const shuffle = (array) => {
      let shuffledArray = [];

      while (shuffledArray.length < array.length) {
        let randomIndex = Math.floor(Math.random() * 100) % array.length;
        if (!shuffledArray.includes(array[randomIndex])) {
          shuffledArray.push(array[randomIndex]);
        }
      }
      return shuffledArray;
    };

    const handleSave = () => {
      setIsError(false);
      let enteredPhrase = selectedPhraseArray.join(" ");
      if (enteredPhrase !== secretPhrase) {
        setIsError(true);
        setErrorMessage("Incorrect Secret Phrase.");
      } else {
        let walletMnemonic = ethers.Wallet.fromMnemonic(secretPhrase);
        let privateKey = walletMnemonic.privateKey;
        saveAccount(privateKey, account.provider).then((res) => {
          if (res.status === "Success") {
            account.setPrivateKey(res.privateKey);
            account.setView("home");
            setEnterPhraseOpen(false);
          }
        });
      }
    };

    return (
      <>
        <div className="seedPhraseArrayContainer">
          {selectedPhraseArray.length > 0 &&
            selectedPhraseArray.map((word) => {
              return (
                <Button
                  variant="outlined"
                  key={word + "selected"}
                  sx={{ margin: "5px" }}
                  onClick={() => {
                    setSelectedPhraseArray([
                      ...selectedPhraseArray.splice(
                        0,
                        selectedPhraseArray.indexOf(word)
                      ),
                      ...selectedPhraseArray.splice(
                        selectedPhraseArray.indexOf(word) + 1,
                        selectedPhraseArray.length
                      ),
                    ]);
                  }}
                >
                  {word}
                </Button>
              );
            })}
        </div>
        <Typography variant="subtitle1" gutterBottom color="white">
          Select the words in order of the secret phrase.
        </Typography>
        <div className="seedPhraseArrayContainer">
          {shuffle(secretPhraseArray).map((word) => {
            return (
              <>
                {!selectedPhraseArray.includes(word) && (
                  <Button
                    variant="outlined"
                    key={word}
                    sx={{ margin: "5px" }}
                    onClick={() => {
                      setSelectedPhraseArray([...selectedPhraseArray, word]);
                    }}
                  >
                    {word}
                  </Button>
                )}
              </>
            );
          })}
        </div>
        {isError && <Alert severity="error">{errorMessage}</Alert>}
        <Button
          variant="contained"
          sx={{ margin: "20px" }}
          fullWidth={false}
          onClick={handleSave}
        >
          Save
        </Button>
      </>
    );
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
          <Typography variant="h3" gutterBottom color="primary">
            Backup Phrase
          </Typography>

          <>
            {!enterPhraseOpen ? (
              <>
                <Typography variant="subtitle1" gutterBottom color="white">
                  Your secreat phrase helps you to backup and restore your BIT
                  wallet account. Keep your seed phrase key confidential. Access
                  of this key to any other person could give them access of this
                  wallet
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigator.clipboard.writeText(secretPhrase);
                  }}
                >
                  {secretPhrase}
                </Button>
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
                <Typography variant="subtitle1" gutterBottom color="white">
                  Copy the secret phrase and save it at a secure location.
                  You'll be asked to enter the secret phrase next.
                </Typography>
                {isError && <Alert severity="error">{errorMessage}</Alert>}
                <Button
                  variant="contained"
                  sx={{ margin: "20px" }}
                  fullWidth={false}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </>
            ) : (
              <EnterPhrase />
            )}
          </>
        </div>
      )}
    </>
  );
};

export default NewAccount;
