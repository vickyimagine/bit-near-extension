import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import AccountContext from "../../context/accountContext";

const PrivacyPolicy = () => {
  const account = useContext(AccountContext);
  return (
    <div>
      <Box sx={{ padding: "20px" }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => account.setView("home")}
        >
          Back
        </Button>
        <Typography variant="h3" gutterBottom color={"primary"}>
          Privacy Policy
        </Typography>
        <Typography variant="h6" gutterBottom color={"white"}>
          About Beyond Imagination Technologies
        </Typography>
        <Typography variant="body1" gutterBottom color={"white"}>
          <p>Pending...</p>
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => account.setView("home")}
        >
          Back
        </Button>
      </Box>
    </div>
  );
};

export default PrivacyPolicy;
