/*global chrome*/
import React, {useEffect} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";

import toast from "react-hot-toast";

import {Link, useNavigate} from "react-router-dom";
import {fetchBalance, fetchKeys} from "../../../utils";
import {GoArrowUpRight} from "react-icons/go";
import {GoArrowDownLeft} from "react-icons/go";
import {RiFileCopyLine} from "react-icons/ri";
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
    // console.log(secretKey);/
    if (secretKey && accountId) {
      //To ensure no null value is passed in the function
      // console.log(secretKey)/;
      const accountBalance = await fetchBalance(
        accountId,
        currentNetwork?.type,
        secretKey
      );
      // console.log(accountBalance);
      // chrome.storage.sync.set({balance: accountBalance});
      dispatch(setBalance(accountBalance));
    }
  };

  //useEffects

  // useEffect(() => {
  //   chrome.storage.sync.get("loggedIn").then(res => {
  //     if (!res.loggedIn) {
  //       navigate("/logout");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    fetchAccountBal();
  }, [currentNetwork, accountId]);

  useEffect(() => {
    if (!keyStore) {
      navigate("/login/welcome");
    }
  }, []);

  if (!keyStore) return null;
  return (
    <div className='h-80 space-y-8 border-t border-gray-500 py-2 '>
      <div className='flex items-center justify-between px-5 py-1'>
        <span className='font-semibold text-xl text-white'>Wallet ID</span>
        <CopyToClipboard text={accountId}>
          <div
            className='flex items-center justify-between gap-x-3 font-normal font-inter rounded-md px-3 p-1 cursor-pointer active:scale-105 text-white'
            onClick={() => {
              toast.success("Wallet Id Copied !");
            }}>
            {`${accountId?.slice(0, 4)}...${accountId?.slice(-6)}`}
            <RiFileCopyLine
              fontSize={21}
              color='#D8DD00'
            />
          </div>
        </CopyToClipboard>
      </div>
      <div className='flex flex-col text-white text-center'>
        <span className='flex flex-col items-center font-semibold '>
          <span className='text-7xl font-syncopate bg-gradient-to-r from-[#a107d9] to-[#00B2FF] w-fit text-transparent bg-clip-text inline-block'>
            {balance}
          </span>{" "}
          <span className='font-syne font-light text-4xl'>NEAR</span>
        </span>
      </div>
      <div className='flex justify-center items-center space-x-6 '>
        <Link
          to='/send'
          className='flex flex-col items-center space-y-2'>
          <button className='bit-btn text-bitBg p-3 px-8 rounded-full hover:scale-105 gap-x-2 font-bold py-3'>
            Send
            <GoArrowUpRight fontSize={24} />
          </button>
        </Link>
        <Link
          to='/receive'
          className='flex flex-col items-center space-y-2'>
          <button className='bit-btn text-bitBg p-3 px-6 gap-x-2  hover:scale-105 font-bold'>
            Receive
            <GoArrowDownLeft fontSize={24} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Balances;
