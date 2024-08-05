import React, {useState} from "react";
import {nftDownload} from "../../../../utils/methods/downloadNFT";
import {TbExternalLink} from "react-icons/tb";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {BiSolidCopy} from "react-icons/bi";
import {HiOutlineDownload} from "react-icons/hi";
import {LuSend} from "react-icons/lu";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import toast from "react-hot-toast";
import TransferNft from "../../Collectibles/TransferNft/TransferNft";
import {useSelector} from "react-redux";
import engJs from "../../../../Constants/en";
import spainJs from "../../../../Constants/es";
const CertificateCard = ({card, setCardOpen, isOwned}) => {
  //hooks
  const {lang} = useSelector(state => state.wallet);
  const [isExpandedName, setIsExpandedName] = useState(false);
  const [isExpandedOrgName, setIsExpandedOrgName] = useState(false);
  const [isExpandedDescription, setIsExpandedDescription] = useState(false);
  const [isExpandedAddress, setIsExpandedAddress] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);

  //translations
  const nameTxt = lang === "en" ? engJs.name : spainJs.name;
  const addressTxt = lang === "en" ? engJs.address : spainJs.address;
  const descpTxt = lang === "en" ? engJs.descp : spainJs.descp;
  const downloadTxt = lang === "en" ? engJs.download : spainJs.download;
  const transferTxt = lang === "en" ? engJs.transfer : spainJs.transfer;
  const orgNameTxt = lang === "en" ? engJs.orgName : spainJs.orgName;

  //functions
  const toggleExpandedName = () => {
    setIsExpandedName(!isExpandedName);
  };

  const toggleExpandedOrgName = () => {
    setIsExpandedOrgName(!isExpandedOrgName);
  };

  const toggleExpandedDescription = () => {
    setIsExpandedDescription(!isExpandedDescription);
  };
  const toggleExpandedAddress = () => {
    setIsExpandedAddress(!isExpandedAddress);
  };

  const truncateText = (text, isExpanded) => {
    return isExpanded ? text : `${text?.split(" ")?.slice(0, 5)?.join(" ")}`;
  };

  // console.log(process.env.REACT_APP_BIT_CONTRACT);

  let aspectRatio = 1;
  if (card.width && card.height) {
    aspectRatio = card.width / card.height;
  }

  console.log(aspectRatio);

  return (
    <>
      {isTransfer ? (
        <TransferNft
          setIsTransfer={setIsTransfer}
          nft={card}
          setCardOpen={setCardOpen}
          certTransfer={true}
        />
      ) : (
        <div
          className='flex flex-col items-center mt-2 space-y-7'
          style={{height: "310px", overflowY: "scroll"}}>
          <div className='flex flex-col justify-start w-full space-y-2 gap-x-5'>
            <button
              className='w-fit px-5 self-start pb-3'
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
                src={card?.image}
                alt={card?.name}
                className='w-40 cursor-pointer bg-gradient-to-b from-white to-[#B3E1FF] p-[6px] py-[8px] rounded-xl'
                style={{
                  aspectRatio: aspectRatio,
                  height: "fit-content"
                }}
              />
              <div className='flex flex-col space-y-2 w-2/3'>
                <div className='flex justify-start w-full text-white border-b border-white'>
                  <p className='text-xl font-bold w-1/2 border-r border-white'>
                    Token Id{" "}
                  </p>
                  <p className='flex items-center justify-evenly font-inter gap-x-4 text-lg font-bold w-1/2 '>
                    {card?.token_id}
                    <div className='flex'>
                      <a
                        className='border-r border-white mr-1 pr-1'
                        href={`https://nearblocks.io/nft-token/${card?.contractId}/${card?.token_id}`}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <TbExternalLink fontSize={21} />
                      </a>
                      <CopyToClipboard
                        text={card?.contractId}
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
                <div className='h-36 overflow-scroll text-white space-y-2 flex flex-col items-start '>
                  <div className='flex gap-x-3  w-full'>
                    <p className='w-1/2 '>{nameTxt}</p>
                    <p className='flex flex-col w-1/2 font-inter font-light'>
                      {card?.name}
                    </p>
                  </div>

                  <div className='flex gap-x-3 w-full '>
                    <p className='w-1/2 '>{orgNameTxt}</p>
                    <p className='flex flex-col w-1/2 font-inter font-light'>
                      {truncateText(card?.orgName, isExpandedOrgName)}
                      {card?.orgName?.split(" ")?.length > 5 &&
                        !isExpandedOrgName &&
                        `...`}
                      {card?.orgName?.split(" ")?.length > 5 && (
                        <button
                          onClick={toggleExpandedOrgName}
                          className='text-white text-xs self-end -translate-y-4'>
                          {isExpandedOrgName ? "Read less" : "Read more"}
                        </button>
                      )}
                    </p>
                  </div>
                  <div className='flex gap-x-3 w-full '>
                    <p className='w-1/2 '>{addressTxt}</p>
                    <p className='flex flex-col w-1/2 font-inter font-light '>
                      {truncateText(card?.address, isExpandedAddress)}
                      {card?.address?.split(" ")?.length > 5 &&
                        !isExpandedAddress &&
                        `...`}
                      {card?.address?.split(" ")?.length > 5 && (
                        <button
                          onClick={toggleExpandedAddress}
                          className='text-white text-xs self-end -translate-y-4'>
                          {isExpandedAddress ? "Read less" : "Read more"}
                        </button>
                      )}
                    </p>
                  </div>
                  <div className='flex gap-x-3 w-full '>
                    <p className='w-1/2 '>{descpTxt}</p>
                    <p className='flex flex-col w-1/2 font-inter font-light'>
                      {truncateText(card?.description, isExpandedDescription)}
                      {card?.description?.split(" ")?.length > 5 &&
                        !isExpandedDescription &&
                        `...`}
                      {card?.description?.split(" ")?.length > 5 && (
                        <button
                          onClick={toggleExpandedDescription}
                          className='text-white text-xs self-end -translate-y-4'>
                          {isExpandedDescription ? "Read less" : "Read more"}
                        </button>
                      )}
                    </p>
                  </div>
                  <div className='flex gap-x-3 w-full '>
                    <p className='w-1/2 '>Is Verified</p>
                    <p className='w-1/2 font-inter font-light'>
                      {card?.isVerified ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isOwned && (
            <div className='max-h-36 flex space-x-6'>
              <button
                className='bit-btn w-fit h-fit gap-x-3 flex items-center justify-center px-5 font-bold'
                onClick={() => {
                  nftDownload(card?.image);
                }}>
                {downloadTxt} <HiOutlineDownload fontSize={22} />
              </button>
              <button
                className='bit-btn w-fit h-fit gap-x-3  flex items-center justify-center px-5 font-bold'
                onClick={() => {
                  setIsTransfer(true);
                }}>
                {transferTxt} <LuSend fontSize={22} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CertificateCard;
