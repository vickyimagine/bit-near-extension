import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import engJs from "../../Constants/en";
import spainJs from "../../Constants/es";

import {Balances, Collectibles, Certificates, RecentTrxns} from "..";

const HomeScreen = ({isSideBar, setIsSidebar}) => {
  const {lang} = useSelector(state => state.wallet);
  const balanceTxt = lang === "en" ? engJs.balance : spainJs.balance;
  const collectiblesTxt = lang === "en" ? engJs.collectibles : spainJs.collectibles;
  const certificateTxt = lang === "en" ? engJs.certificates : spainJs.certificates;
  const txnTxt = lang === "en" ? engJs.txn : spainJs.txn;

  const buttons = [balanceTxt, collectiblesTxt, certificateTxt, txnTxt];

  const [btnText, setBtnText] = useState(balanceTxt);
  const [buttonId, setbuttonId] = useState(0);

  useEffect(() => {
    setBtnText(buttons[buttonId]);
  }, [lang]);

  const activeStyle =
    "flex items-center justify-center w-1/2 text-center bit-btn text-lg text-bitBg  cursor-pointer transition-all duration-300 font-semibold rounded-xl px-4 ";
  const inActiveStyle =
    "flex items-center justify-center w-1/2 text-lg text-center  text-white  cursor-pointer transition-all duration-300 rounded-xl";

  return (
    <div className={isSideBar && "pointer-events-none"}>
      <div className='flex  justify-center h-10  my-3 space-x-3 '>
        <div
          className={btnText === balanceTxt ? activeStyle : inActiveStyle}
          onClick={e => {
            setbuttonId(0);
            setBtnText(e.target.textContent);
          }}>
          {balanceTxt}
        </div>
        <div
          className={btnText === collectiblesTxt ? activeStyle : inActiveStyle}
          onClick={e => {
            setbuttonId(1);
            setBtnText(e.target.textContent);
          }}>
          {collectiblesTxt}
        </div>
        <div
          className={btnText === certificateTxt ? activeStyle : inActiveStyle}
          onClick={e => {
            setbuttonId(2);
            setBtnText(e.target.textContent);
          }}>
          {certificateTxt}
        </div>
        <div
          className={btnText === txnTxt ? activeStyle : inActiveStyle}
          onClick={e => {
            setbuttonId(3);
            setBtnText(e.target.textContent);
          }}>
          {txnTxt}
        </div>
      </div>
      {btnText === balanceTxt ? (
        <Balances />
      ) : btnText === collectiblesTxt ? (
        <Collectibles />
      ) : btnText === certificateTxt ? (
        <Certificates />
      ) : (
        <RecentTrxns />
      )}
    </div>
  );
};

export default HomeScreen;
