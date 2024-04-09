import React, {useState} from "react";

import {Balances, Collectibles, Certificates, RecentTrxns} from "..";

const HomeScreen = ({isSideBar, setIsSidebar}) => {
  const [btnText, setBtnText] = useState("Balance");

  const activeStyle =
    "flex items-center justify-center w-1/2 text-center bit-btn  text-bitBg  cursor-pointer transition-all duration-300 font-bold rounded-xl px-5 ";
  const inActiveStyle =
    "flex items-center justify-center w-1/2 text-center  text-white  cursor-pointer transition-all duration-300 rounded-xl";

  return (
    <div className={isSideBar && "pointer-events-none"}>
      <div className='flex  justify-center h-10  my-3 space-x-5'>
        <div
          className={btnText === "Balance" ? activeStyle : inActiveStyle}
          onClick={e => {
            setBtnText(e.target.textContent);
          }}>
          Balance
        </div>
        <div
          className={btnText === "Collectibles" ? activeStyle : inActiveStyle}
          onClick={e => setBtnText(e.target.textContent)}>
          Collectibles
        </div>
        <div
          className={btnText === "Certificates" ? activeStyle : inActiveStyle}
          onClick={e => setBtnText(e.target.textContent)}>
          Certificates
        </div>
        <div
          className={btnText === "Transactions" ? activeStyle : inActiveStyle}
          onClick={e => setBtnText(e.target.textContent)}>
          Transactions
        </div>
      </div>
      {btnText === "Balance" ? (
        <Balances />
      ) : btnText === "Collectibles" ? (
        <Collectibles />
      ) : btnText === "Certificates" ? (
        <Certificates />
      ) : (
        <RecentTrxns />
      )}
    </div>
  );
};

export default HomeScreen;
