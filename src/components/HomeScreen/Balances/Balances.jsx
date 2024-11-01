/* global chrome */
import React, {useEffect} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import {fetchBalance, fetchKeys} from "../../../utils";
import {GoArrowUpRight, GoArrowDownLeft} from "react-icons/go";
import {RiFileCopyLine} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {setBalance, setPendingCerts} from "../../../Store/wallet/wallet-slice";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";
import {contactBackground} from "../../../utils/methods/contactBackground";

/**
 * Balances component displays the wallet's balance and provides
 * send/receive actions. It fetches balance and pending certificates
 * on network or account changes.
 */
const Balances = () => {
  const {accountId, balance, currentNetwork, secretKey, lang} = useSelector(
    state => state.wallet
  );
  const dispatch = useDispatch();
  const keyStore = fetchKeys();
  const navigate = useNavigate();

  // Translation setup based on language preference
  const sendTxt = lang === "en" ? engJs.send : spainJs.send;
  const receiveTxt = lang === "en" ? engJs.receive : spainJs.receive;
  const walletTxt = lang === "en" ? engJs.walletId : spainJs.walletId;

  /**
   * Fetches and dispatches the current account balance.
   * Only runs if secretKey and accountId are defined.
   */
  const fetchAccountBal = async () => {
    // console.log(secretKey);
    if (secretKey && accountId) {
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

  /**
   * Fetches and dispatches pending certificates.
   * Communicates with background script to retrieve pending data.
   */
  const getPendingCerts = async () => {
    const data = await contactBackground("getPendingCerts");
    // console.log(data);
    if (data) {
      dispatch(setPendingCerts(data));
    }
  };

  // Checks if the user is logged in; redirects if not
  // useEffect(() => {
  //   chrome.storage.sync.get("loggedIn").then(res => {
  //     if (!res.loggedIn) {
  //       navigate("/logout");
  //     }
  //   });
  // }, []);

  // Initial call to fetch pending certificates
  // useEffect(() => {
  //   getPendingCerts();
  // }, []);

  // Fetch balance on account or network change
  useEffect(() => {
    fetchAccountBal();
  }, [currentNetwork, accountId]);

  // Ensure key store and BitV4 status before navigating away
  useEffect(() => {
    const isBitV4 = localStorage.getItem("isBitV4");
    // console.log(isBitV4);
    if (!keyStore || !isBitV4) {
      navigate("/login/welcome");
    }
  }, [keyStore, navigate]);

  // Display nothing if keyStore is unavailable
  if (!keyStore) return null;

  return (
    <div className='h-80 space-y-8 border-t border-gray-500 py-2'>
      {/* Display Wallet ID with Copy Functionality */}
      <div className='flex items-center justify-between px-5 py-1'>
        <span className='font-semibold text-xl text-white'>{walletTxt}</span>
        <CopyToClipboard text={accountId}>
          <div
            className='flex items-center gap-x-3 font-normal font-inter rounded-md px-3 p-1 cursor-pointer active:scale-105 text-white'
            onClick={() => toast.success("Wallet ID Copied!")}>
            {`${accountId?.slice(0, 4)}...${accountId?.slice(-6)}`}
            <RiFileCopyLine
              fontSize={21}
              color='#D8DD00'
            />
          </div>
        </CopyToClipboard>
      </div>

      {/* Display Account Balance */}
      <div className='flex flex-col text-white text-center'>
        <span className='flex flex-col items-center font-semibold'>
          <span className='text-7xl font-syncopate bg-gradient-to-r from-[#a107d9] to-[#00B2FF] w-fit text-transparent bg-clip-text inline-block'>
            {balance || 0}
          </span>
          <span className='font-syne font-light text-4xl'>NEAR</span>
        </span>
      </div>

      {/* Send and Receive Buttons */}
      <div className='flex justify-center items-center space-x-6'>
        <Link
          to='/send'
          className='flex flex-col items-center space-y-2'>
          <button className='bit-btn text-bitBg p-3 px-8 rounded-full hover:scale-105 gap-x-2 font-bold py-3'>
            {sendTxt}
            <GoArrowUpRight fontSize={24} />
          </button>
        </Link>
        <Link
          to='/receive'
          className='flex flex-col items-center space-y-2'>
          <button className='bit-btn text-bitBg p-3 px-6 gap-x-2 hover:scale-105 font-bold'>
            {receiveTxt}
            <GoArrowDownLeft fontSize={24} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Balances;
