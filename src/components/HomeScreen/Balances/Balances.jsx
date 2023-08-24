import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";

import {HiOutlineClipboardCopy} from "react-icons/hi";
import {HiOutlineArrowUturnDown} from "react-icons/hi2";
import {LuSend} from "react-icons/lu";
import {Link} from "react-router-dom";

const Balances = ({accountId}) => {
  return (
    <div className='space-y-7 border-t border-gray-500 py-2'>
      <div className='flex items-center justify-between py-2'>
        <span className='font-semibold text-xl text-white'>Wallet ID</span>
        <CopyToClipboard text={accountId && accountId}>
          <div className='flex items-center justify-between gap-x-3 bg-white font-bold text-bitBg rounded-md px-3 p-1 cursor-pointer active:scale-105'>
            {`${accountId?.slice(0, 4)}...${accountId?.slice(-6)}`}
            <HiOutlineClipboardCopy fontSize={21} />
          </div>
        </CopyToClipboard>
      </div>
      <div className='flex flex-col text-white text-center'>
        <span className=' text-6xl font-semibold'>21 USD</span>
        <span className='opacity-90'>Available Balance</span>
      </div>
      <div className='flex justify-around'>
        <Link
          to='/send'
          className='flex flex-col items-center space-y-2'>
          <button className='bg-white text-bitBg p-3 rounded-2xl opacity-80 hover:opacity-100 hover:scale-105'>
            <LuSend fontSize={27} />
          </button>
          <span className='text-white'>Send</span>
        </Link>
        <Link
          to='/receive'
          className='flex flex-col items-center space-y-2'>
          <button className='bg-white text-bitBg p-3 rounded-2xl opacity-80 hover:opacity-100 hover:scale-105'>
            <HiOutlineArrowUturnDown fontSize={27} />
          </button>
          <span className='text-white'>Receive</span>
        </Link>
      </div>
    </div>
  );
};

export default Balances;
