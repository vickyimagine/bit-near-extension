import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import Dialog from "@mui/material/Dialog";
import { fileDownload } from "../scripts/tools";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import CircularProgress from "@mui/material/CircularProgress";
import AccountContext from "../../context/accountContext";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

function MediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props?.nftData?.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props?.nftData?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props?.nftData?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          endIcon={<DownloadIcon />}
          onClick={() => fileDownload(props.nftData.image)}
        >
          Download
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            props.setTransferCardOpen(true);
            props.setOpen(true);
          }}
        >
          Transfer
        </Button>
      </CardActions>
    </Card>
  );
}

function TransferCard(props) {
  const account = React.useContext(AccountContext);
  const [gas, setGas] = React.useState("calculating...");
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [toAddress, setToAddress] = React.useState("");
  const [isTransferring, setIsTransferring] = React.useState(false);
  React.useEffect(() => {
    account
      .transferNftGasEstimate(
        props.nftData.contract,
        props.nftData.tokenId,
        "0xE858f0370b101cD3F58E03F18BFA1240a591b5Fa"
      )
      .then((res) => {
        setGas(res);
        setButtonDisabled(false);
      });
  }, []);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props?.nftData?.image}
        alt="green iguana"
      />
      <CardContent>
        <FormControl
          sx={{ m: 0 }}
          variant="standard"
          fullWidth
          onChange={(e) => setToAddress(e.target.value)}
        >
          <InputLabel htmlFor="demo-customized-textbox">
            Transfer To:
          </InputLabel>
          <BootstrapInput id="demo-customized-textbox" />
        </FormControl>

        <Typography variant="body2" color="text.secondary">
          Contract: {props?.nftData?.contract}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Token Id: {Number(props?.nftData?.tokenId)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Estimated Gas: {gas} matic
        </Typography>
      </CardContent>
      <CardActions>
        {isTransferring ? (
          <Button variant="contained">
            <CircularProgress color="inherit" />
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={async () => {
              setIsTransferring(true);
              await account
                .transferNft(
                  props.nftData.contract,
                  parseInt(Number(props.nftData.tokenId)),
                  toAddress
                )
                .then((res) => {
                  console.log(res);
                  if (
                    res.confirmations !== "undefined" &&
                    parseInt(res.confirmations) > 0
                  ) {
                    setIsTransferring(false);
                    document.location.reload();
                  }
                })
                .catch((err) => setIsTransferring(false));
              setIsTransferring(false);
            }}
            disabled={buttonDisabled}
          >
            Transfer
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default function NFTDetail(props) {
  const [transferCardOpen, setTransferCardOpen] = React.useState(false);
  const open = props.open;
  const setOpen = props.setOpen;

  const handleClose = () => {
    setTransferCardOpen(false);
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {transferCardOpen ? (
          <TransferCard nftData={props?.nftData} />
        ) : (
          <MediaCard
            nftData={props?.nftData}
            setTransferCardOpen={setTransferCardOpen}
            setOpen={setOpen}
          />
        )}
      </Dialog>
    </div>
  );
}
