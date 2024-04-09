import React, {useState, useEffect} from "react";
import {nftDownload} from "../../../../utils/methods/downloadNFT";
import {IoMdArrowRoundBack} from "react-icons/io";
import {HiOutlineDownload} from "react-icons/hi";
import {LuSend} from "react-icons/lu";
import TransferNft from "../TransferNft/TransferNft";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import {TbExternalLink} from "react-icons/tb";
import {useSelector} from "react-redux";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {BiSolidCopy} from "react-icons/bi";
import toast from "react-hot-toast";

const NFTCard = ({nft, setCardOpen}) => {
  const {currentNetwork} = useSelector(state => state.wallet);

  const [isTransfer, setIsTransfer] = useState(false);
  const [nftData, setNftData] = useState({
    tokenId: "",
    contractId: "",
    title: "",
    description: "",
    media: ""
  });

  useEffect(() => {
    if (nft) {
      setNftData({
        tokenId: nft?.token_id,
        contractId: nft?.contractId,
        title: nft?.metadata?.title,
        description: nft?.metadata?.description,
        media: nft?.metadata?.media
      });
    }
  }, []);

  return (
    <>
      {isTransfer ? (
        <TransferNft
          setIsTransfer={setIsTransfer}
          setCardOpen={setCardOpen}
          nft={nft}
          certTransfer={false}
        />
      ) : (
        <>
          <div className='flex flex-col items-center mt-2 '>
            <div className='flex flex-col justify-start w-full space-y-3 gap-x-5'>
              <button
                className=' w-fit px-5 self-start pb-3'
                onClick={() => {
                  setCardOpen(false);
                }}>
                <PiArrowBendUpLeftBold
                  fontSize={28}
                  color='white'
                />
              </button>
              <div className='flex px-5 space-x-8'>
                <img
                  src={nftData?.media}
                  alt={nftData?.title}
                  className=' h-24 w-40 object-cover cursor-pointer bg-gradient-to-b from-white to-[#B3E1FF] p-[6px] py-[8px] rounded-xl '
                />
                <div className='flex flex-col space-y-3  w-2/3'>
                  <div className='flex justify-start w-full text-white  border-b border-white'>
                    <p className='text-xl font-bold w-1/2  border-r border-white'>
                      Token Id{" "}
                    </p>
                    <p className=' flex items-center justify-evenly font-inter gap-x-4 text-lg font-bold w-1/2 '>
                      {nftData?.tokenId}
                      <div className='flex'>
                        <a
                          className='border-r border-white mr-1 pr-1'
                          href={
                            currentNetwork.type === "mainnet"
                              ? `https://nearblocks.io/nft-token/${nftData?.contractId}/${nftData?.tokenId}`
                              : `https://testnet.nearblocks.io/nft-token/${nftData?.contractId}/${nftData?.tokenId}`
                          }
                          target='_blank'>
                          <TbExternalLink fontSize={21} />
                        </a>
                        <CopyToClipboard
                          text={nftData?.contractId}
                          onCopy={() => {
                            toast.success("Contract ID copied to clipboard!");
                          }}>
                          <BiSolidCopy
                            fontSize={21}
                            className='cursor-pointer'
                          />
                        </CopyToClipboard>
                      </div>
                    </p>
                  </div>
                  <div className='h-36 overflow-scroll  text-white space-y-2 flex flex-col items-start '>
                    <div className='flex gap-x-3  w-full'>
                      <p className='w-1/2 '>Title</p>
                      <p className=' w-1/2 font-inter font-light'>{nftData?.title}</p>
                    </div>
                    <div className='flex gap-x-3 w-full '>
                      <p className=' w-1/2 '>Description</p>
                      <p className=' w-1/2 font-inter font-light'>
                        {nftData?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=' max-h-40 mt-5 flex space-x-6'>
              <button
                className='bit-btn w-fit h-fit gap-x-3 flex items-center justify-center px-5 font-bold'
                onClick={() => {
                  nftDownload(nftData?.media);
                }}>
                Download <HiOutlineDownload fontSize={22} />
              </button>
              <button
                className='bit-btn w-fit h-fit gap-x-3  flex items-center justify-center px-5 font-bold'
                onClick={() => setIsTransfer(true)}>
                Transfer <LuSend fontSize={22} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NFTCard;
