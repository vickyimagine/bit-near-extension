import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchKeys} from "../../utils/fetchKeyStore";
import {CopyToClipboard} from "react-copy-to-clipboard";

import {GiHamburgerMenu} from "react-icons/gi";
import {HiOutlineClipboardCopy} from "react-icons/hi";
import {HiOutlineArrowUturnDown} from "react-icons/hi2";
import {LuSend} from "react-icons/lu";
import {bitLogo} from "../../Assets";

const Home = () => {
  const [accountId, setAccountId] = useState(null);

  const keyStore = fetchKeys();
  const navigate = useNavigate();

  useEffect(() => {
    if (!keyStore) {
      navigate("/login/account-options");
    }
    setAccountId(keyStore?.accountId);
  }, []);

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between border-b border-gray-700 py-2'>
        <GiHamburgerMenu
          fontSize={27}
          className='cursor-pointer'
        />
        <select className='select select-ghost w-40 max-w-xs border border-gray-600 focus:outline-none'>
          <option
            disabled
            defaultChecked>
            Select Network
          </option>
          <option>Near Mainnet</option>
          <option>Near Testnet</option>
        </select>
        <img
          className='w-16 h-16 object-contain cursor-pointer hover:scale-110 transition-all duration-300'
          src={bitLogo}
          alt=''
        />
      </div>
      <div className='flex justify-center h-10  my-3'>
        <div className='flex items-center justify-center w-1/2 text-center text-white font-bold text-xl rounded-e-lg'>
          Balances
        </div>
        <div className='flex items-center justify-center w-1/2 text-center bg-white text-bitBg font-bold text-xl rounded-e-lg'>
          Collectibles
        </div>
      </div>
      <div className=' space-y-7'>
        <div className='flex items-center justify-between py-2'>
          <span className='font-semibold text-xl text-white'>Wallet ID</span>
          <CopyToClipboard text={accountId && accountId}>
            <div className='flex items-center justify-between gap-x-3 bg-white font-bold text-bitBg rounded-full px-3 p-1 cursor-pointer active:scale-105'>
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
          <div className='flex flex-col items-center space-y-2'>
            <button className='bg-white text-bitBg p-3 rounded-2xl opacity-80 hover:opacity-100 hover:scale-105'>
              <LuSend fontSize={27} />
            </button>
            <span className='text-white'>Send</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <button className='bg-white text-bitBg p-3 rounded-2xl opacity-80 hover:opacity-100 hover:scale-105'>
              <HiOutlineArrowUturnDown
                fontSize={27}
                fontWeight='500'
              />
            </button>
            <span className='text-white'>Receive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
