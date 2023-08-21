import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import AccountContext from "../../context/accountContext";

const AboutUs = () => {
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
          About Us
        </Typography>
        <Typography variant="h6" gutterBottom color={"white"}>
          About Beyond Imagination Technologies
        </Typography>
        <Typography variant="body1" gutterBottom color={"white"}>
          <p>
            Beyond Imagination Technologies (BIT) was founded as the first
            Indian start-up with the idea of nurturing the Blockchain/Web3
            technology and building cost-effective, safe and secure solutions
            that fit the market needs and help address the major market problems
            in all possible classes and verticals of organisations, thereby
            creating a conducive environment for its fair growth and development
            in India.
          </p>
          <p>
            Within a short span, Beyond Imagination has grown in leaps and
            bounds. They have signed joint development programs with highly
            esteemed institutions in India within a few months of starting
            operations and are also increasingly engaging with large
            corporations, high-net-worth individuals, and big institutions.
            Enabling a cost-effective and easy transition for users from web 2.0
            to web 3.0 has been one of the major reasons for their success. They
            have successfully bridged the gap between market need and the use of
            blockchain-aided solutions for sustainable business growth by
            providing tailored solutions to start-ups, enterprises, and
            governments and helping them solve pain points in their ecosystems .
          </p>
          <p>
            Currently, BIT has many pilots and production-ready applications
            such as Smart Contracting, Credential Management, and Digital
            Certificate Issuing Platform, to name a few, tailored for different
            sectors and government bodies.
          </p>
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

export default AboutUs;
