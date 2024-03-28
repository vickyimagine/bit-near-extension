import React, {useState} from "react";
import {nftDownload} from "../../../../utils/methods/downloadNFT";
import {IoMdArrowRoundBack} from "react-icons/io";
import {HiOutlineDownload} from "react-icons/hi";
import {LuSend} from "react-icons/lu";
import TransferNft from "../TransferNft/TransferNft";

const NFTCard = ({nft, setCardOpen}) => {
  const [isTransfer, setIsTransfer] = useState(false);

  return (
    <>
      {isTransfer ? (
        <TransferNft
          setIsTransfer={setIsTransfer}
          setCardOpen={setCardOpen}
          nft={nft}
        />
      ) : (
        <>
          <button
            className='bit-btn w-fit px-5'
            onClick={() => {
              setCardOpen(false);
            }}>
            <IoMdArrowRoundBack fontSize={21} />
          </button>
          <div className='flex flex-col items-center space-y-10 mt-4'>
            <div className='flex items-center justify-between space-x-6 px-4 '>
              <img
                src={nft?.metadata.media}
                alt=''
                className='h-44 w-44 mx-auto object-contain'
              />
              <div className='flex flex-col overflow-y-auto max-h-36'>
                <div className='flex space-x-2'>
                  <h2 className='font-bold text-white capitalize'>Token Id</h2>
                  <p className='text-white '>{nft?.token_id}</p>
                </div>

                {Object.keys(nft.metadata).map((key, idx) => {
                  return (
                    nft.metadata[key] !== null &&
                    key !== "media" && (
                      <div
                        className='flex text-start space-x-2'
                        key={idx}>
                        <h2 className='font-bold text-white capitalize'>{key}</h2>
                        <p className='text-white '>{nft.metadata[key]}</p>
                      </div>
                    )
                  );
                })}
              </div>
            </div>

            <div className='overflow-auto max-h-36 flex gap-x-20'>
              <button
                className='bit-btn w-fit h-fit gap-x-3 flex items-center justify-center'
                onClick={() => {
                  nftDownload(nft?.metadata?.media);
                }}>
                Download <HiOutlineDownload fontSize={28} />
              </button>
              <button
                className='bit-btn w-fit h-fit gap-x-3 flex items-center justify-center'
                onClick={() => setIsTransfer(true)}>
                Transfer <LuSend fontSize={28} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NFTCard;
