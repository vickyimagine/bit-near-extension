import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { getAccountNFTs } from "../scripts/accounts";
import NFTs from "./nfts";
import NftContract from "./nftContract";
import AccountContext from "../../context/accountContext";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function NFTContainer() {
  const account = React.useContext(AccountContext);
  const [expanded, setExpanded] = React.useState("panel1");
  const [nftData, setNftData] = React.useState({});

  React.useEffect(() => {
    poppulatenfts();
  }, [account.networkRPC]);

  const poppulatenfts = () => {
    account.getAccountNFTs().then((res) => {
      if (res !== "Server error") {
        let mynftdata = {};
        res.ownedNfts.map((nft) => {
          mynftdata[nft.contract.address] = [];
        });
        res.ownedNfts.map((nft) => {
          mynftdata[nft.contract.address].push({
            title: nft.title,
            description: nft.description,
            image: nft.media[0].raw,
            tokenId: nft.id.tokenId,
            contract: nft.contract.address,
            key: nft.contract.address + nft.id.tokenId,
          });
        });
        setNftData({ ...mynftdata });
      }
    });
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {Object.keys(nftData).map((contract) => {
        return (
          <Accordion
            expanded={expanded === contract}
            onChange={handleChange(contract)}
            key={contract}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <NftContract contract={contract} />
            </AccordionSummary>
            <AccordionDetails>
              <NFTs nfts={nftData[contract]} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
