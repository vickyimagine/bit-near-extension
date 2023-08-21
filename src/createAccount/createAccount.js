import Typography from "@mui/material/Typography";
import React from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImportAccount from "./importAccount";
import NewAccount from "./newAccount";

const CreateOrImport = (props) => {
  const [importOpen, setImportOpen] = React.useState(false);
  const [newOpen, setNewOpen] = React.useState(false);
  return (
    <div className="createOrImportContainer">
      {!importOpen && !newOpen && (
        <>
          <div>
            <Button
              variant="contained"
              sx={{ margin: "20px" }}
              startIcon={<ArrowBackIcon />}
              onClick={() => props.sethasStarted(false)}
              fullWidth={false}
            >
              Back
            </Button>
          </div>
          <div className="createOptionContainer">
            <Typography variant="subtitle1" gutterBottom color="white">
              If you have not created wallet before, you can choose below option
            </Typography>
            <Button
              variant="contained"
              sx={{ margin: "20px" }}
              endIcon={<PersonAddIcon />}
              onClick={() => setNewOpen(true)}
            >
              Create a wallet
            </Button>
          </div>
          <div className="createOptionContainer">
            <Typography variant="subtitle1" gutterBottom color="white">
              If you have created wallet before, you can choose below option
            </Typography>
            <Button
              variant="contained"
              sx={{ margin: "20px" }}
              endIcon={<FileCopyIcon />}
              onClick={() => setImportOpen(true)}
            >
              Import Wallet
            </Button>
          </div>
          <Button variant="text" sx={{ margin: "20px" }}>
            Terms {"&"} Conditions
          </Button>
        </>
      )}

      <ImportAccount open={importOpen} setOpen={setImportOpen} />
      <NewAccount open={newOpen} setOpen={setNewOpen} />
    </div>
  );
};

const CreateAccount = () => {
  const [hasStarted, sethasStarted] = React.useState(false);
  return (
    <>
      {hasStarted ? (
        <CreateOrImport sethasStarted={sethasStarted} />
      ) : (
        <div className="createAccountContainer">
          <Typography variant="h3" gutterBottom color="primary">
            Welcome To BitWallet
          </Typography>
          <Typography variant="h6" gutterBottom color="primary">
            from
          </Typography>
          <img
            src="https://beimagine.tech/wp-content/uploads/2022/04/BITlogo-white.png"
            alt="Beyond Imagination Technologies"
            height="100px"
          />
          <Button
            variant="contained"
            sx={{ margin: "20px" }}
            endIcon={<PlayArrowIcon />}
            onClick={() => sethasStarted(true)}
          >
            Click To Start
          </Button>
        </div>
      )}
    </>
  );
};

export default CreateAccount;
