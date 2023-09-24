import React from "react";
import {nftDownload} from "../../../../utils/methods/downloadNFT";

const NFTCard = ({nft, setCardOpen}) => {
  return (
    <>
      <button
        className='bit-btn w-fit px-5'
        onClick={() => {
          setCardOpen(false);
        }}>
        Back
      </button>
      <div className='flex flex-col space-y-5'>
        <div className='flex items-center justify-between space-x-6 px-4'>
          <img
            src={nft?.metadata.media}
            alt=''
            className='h-32 w-32 mx-auto object-contain ring ring-white rounded-lg'
          />
          <button
            className='bit-btn w-fit h-fit '
            onClick={() => {
              nftDownload(nft?.metadata.media);
            }}>
            Download
          </button>
        </div>
        <div className='overflow-auto max-h-36'>
          <div className='flex space-x-2 '>
            <h2 className='font-bold text-white capitalize'>Token Id: </h2>
            <p className='text-white '>{nft?.token_id}</p>
          </div>
          <div className='flex space-x-2 '>
            <h2 className='font-bold text-white capitalize'>Owner Id: </h2>
            <p className='text-white '>{nft?.owner_id}</p>
          </div>
          {Object.keys(nft.metadata).map(key => {
            return (
              nft.metadata[key] !== null && (
                <div className='flex space-x-2 '>
                  <h2 className='font-bold text-white capitalize'>{key}:</h2>
                  <p className='text-white '>{nft.metadata[key]}</p>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NFTCard;
