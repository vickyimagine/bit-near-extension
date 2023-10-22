import React from "react";
import {nftDownload} from "../../../../utils/methods/downloadNFT";
import {IoMdArrowRoundBack} from "react-icons/io";

const CertificateCard = ({card, setCardOpen}) => {
  return (
    <div>
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
            src={card?.image}
            alt=''
            className='h-44 w-44 mx-auto object-contain'
          />
          <div className='flex flex-col overflow-y-auto max-h-36'>
            <div className='flex space-x-2'>
              <h2 className='font-bold text-white capitalize'>Name</h2>
              <p className='text-white '>{card?.name}</p>
            </div>
            <div className='flex space-x-2'>
              <h2 className='font-bold text-white capitalize'>Token Id</h2>
              <p className='text-white '>{card?.id}</p>
            </div>
            <div className='flex space-x-2'>
              <h2 className='font-bold text-white capitalize'>CID</h2>
              <p className='text-white '>{card?.cid}</p>
            </div>
          </div>
        </div>

        <div className='overflow-auto max-h-36'>
          <button
            className='bit-btn w-fit h-fit'
            onClick={() => {
              nftDownload(card?.image);
            }}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
