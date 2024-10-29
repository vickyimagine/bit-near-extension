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
  const {lang} = useSelector(state => state.wallet);
  const [isExpanded, setIsExpanded] = useState({
    name: false,
    orgName: false,
    description: false,
    address: false
  });
  const [isTransfer, setIsTransfer] = useState(false);

  // Text Translations
  const translations = lang === "en" ? engJs : spainJs;
  const {
    name: nameTxt,
    address: addressTxt,
    descp: descpTxt,
    download: downloadTxt,
    transfer: transferTxt,
    orgName: orgNameTxt
  } = translations;

  // Expand toggle function
  const toggleExpand = field => setIsExpanded(prev => ({...prev, [field]: !prev[field]}));

  const truncateText = (text, isExpanded) =>
    isExpanded ? text : `${text?.split(" ")?.slice(0, 5)?.join(" ")}`;

  // Calculate aspect ratio if width and height are provided
  const aspectRatio = card.width && card.height ? card.width / card.height : 1;

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
          <div className='flex flex-col w-full space-y-2'>
            <button
              className='w-fit px-5 pb-3'
              onClick={() => setCardOpen(false)}>
              <PiArrowBendUpLeftBold
                fontSize={28}
                color='white'
              />
            </button>

            <div className='flex px-5 space-x-8'>
              <img
                src={card?.image}
                alt={card?.name}
                className='w-40 bg-gradient-to-b from-white to-[#B3E1FF] p-[6px] py-[8px] rounded-xl cursor-pointer'
                style={{aspectRatio, height: "fit-content"}}
              />

              <div className='flex flex-col w-2/3 space-y-2'>
                <div className='flex border-b border-white text-white'>
                  <p className='text-xl font-bold w-1/2 border-r'>Token Id</p>
                  <p className='flex items-center gap-x-4 w-1/2 font-inter font-bold'>
                    {card?.token_id}
                    <div className='flex'>
                      <a
                        href={`https://nearblocks.io/nft-token/${card?.contractId}/${card?.token_id}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='border-r pr-1 mr-1'>
                        <TbExternalLink fontSize={21} />
                      </a>
                      <CopyToClipboard
                        text={card?.contractId}
                        onCopy={() => toast.success("Contract ID copied to clipboard!")}>
                        <BiSolidCopy
                          fontSize={21}
                          className='cursor-pointer'
                        />
                      </CopyToClipboard>
                    </div>
                  </p>
                </div>

                <div className='h-36 overflow-scroll text-white space-y-2'>
                  {[
                    {label: nameTxt, value: card?.name, expanded: "name"},
                    {label: orgNameTxt, value: card?.orgName, expanded: "orgName"},
                    {label: addressTxt, value: card?.address, expanded: "address"},
                    {label: descpTxt, value: card?.description, expanded: "description"}
                  ].map(({label, value, expanded}) => (
                    <div
                      className='flex gap-x-3 w-full'
                      key={expanded}>
                      <p className='w-1/2'>{label}</p>
                      <p className='flex flex-col w-1/2 font-inter font-light'>
                        {truncateText(value, isExpanded[expanded])}
                        {value?.split(" ")?.length > 5 && (
                          <button
                            onClick={() => toggleExpand(expanded)}
                            className='text-white text-xs self-end -translate-y-4'>
                            {isExpanded[expanded] ? "Read less" : "Read more"}
                          </button>
                        )}
                      </p>
                    </div>
                  ))}
                  <div className='flex gap-x-3 w-full'>
                    <p className='w-1/2'>Is Verified</p>
                    <p className='w-1/2 font-inter font-light'>
                      {card?.isVerified ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isOwned && (
            <div className='flex space-x-6'>
              <button
                className='bit-btn gap-x-3 px-5 font-bold flex items-center'
                onClick={() => nftDownload(card?.image)}>
                {downloadTxt} <HiOutlineDownload fontSize={22} />
              </button>
              <button
                className='bit-btn gap-x-3 px-5 font-bold flex items-center'
                onClick={() => setIsTransfer(true)}>
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
