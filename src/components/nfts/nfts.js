import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import { fileDownload } from "../scripts/tools";
import NFTDetail from "./nftDetail";

export default function NFTs(props) {
  const [nftDetailOpen, setNFTDetailOpen] = React.useState(false);
  const [nftDetailNftData, setNFTDetailNftData] = React.useState();

  return (
    <>
      <NFTDetail
        open={nftDetailOpen}
        setOpen={setNFTDetailOpen}
        nftData={nftDetailNftData}
      />
      <ImageList sx={{ width: 465, height: 450 }}>
        {props.nfts.map((item) => (
          <ImageListItem
            key={item.key}
            onClick={() => {
              console.log(item);
              setNFTDetailNftData(item);
              setNFTDetailOpen(true);
            }}
          >
            <img
              src={`${item.image}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.description}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                  onClick={() => fileDownload(item.image)}
                >
                  <DownloadIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
