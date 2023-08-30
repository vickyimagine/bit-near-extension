import React, {useEffect} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {HiOutlineClipboardCopy} from "react-icons/hi";
import {HiOutlineArrowUturnDown} from "react-icons/hi2";
import {LuSend} from "react-icons/lu";

import {Link, useNavigate} from "react-router-dom";
import {fetchBalance, fetchKeys} from "../../../utils";

import {useDispatch, useSelector} from "react-redux";
import {setBalance} from "../../../Store/wallet/wallet-slice";

const Balances = () => {
  //hooks
  const {accountId, balance, currentNetwork, secretKey} = useSelector(
    state => state.wallet
  );
  const dispatch = useDispatch();
  const keyStore = fetchKeys();
  const navigate = useNavigate();

  //functions
  const fetchAccountBal = async () => {
    if (secretKey && accountId) {
      //To ensure no null value is passed in the function
      const accountBalance = await fetchBalance(
        accountId,
        currentNetwork?.type,
        secretKey
      );
      dispatch(setBalance(accountBalance));
    }
  };

  //useEffects
  useEffect(() => {
    fetchAccountBal();
  }, [currentNetwork, accountId]);

  useEffect(() => {
    if (!keyStore) {
      navigate("/login/welcome");
    }
  });

  if (!keyStore) return null;
  return (
    <div className='space-y-7 border-t border-gray-500 py-2'>
      <div className='flex items-center justify-between py-2'>
        <span className='font-semibold text-xl text-white'>Wallet ID</span>
        <CopyToClipboard text={accountId}>
          <div className='flex items-center justify-between gap-x-3 bg-white font-bold text-bitBg rounded-md px-3 p-1 cursor-pointer active:scale-105'>
            {`${accountId?.slice(0, 4)}...${accountId?.slice(-6)}`}
            <HiOutlineClipboardCopy fontSize={21} />
          </div>
        </CopyToClipboard>
      </div>
      <div className='flex flex-col text-white text-center'>
        <span className=' text-6xl font-semibold'>{balance} NEAR</span>
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
