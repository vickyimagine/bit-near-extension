import React, {useState} from "react";

import {Balances, Collectibles, Certificates, RecentTrxns} from "..";

const HomeScreen = () => {
  const [btnText, setBtnText] = useState("Balances");

  const activeStyle =
    "flex items-center justify-center w-1/2 text-center bg-white text-bitBg font-bold text-xl  cursor-pointer transition-all duration-300 rounded-md p-2";
  const inActiveStyle =
    "flex items-center justify-center w-1/2 text-center text-white font-bold text-xl  cursor-pointer transition-all duration-300 rounded-md";

  return (
    <div>
      <div className='flex justify-center h-10  my-3 space-x-3'>
        <div
          className={btnText === "Balances" ? activeStyle : inActiveStyle}
          onClick={e => {
            setBtnText(e.target.textContent);
          }}>
          Balances
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
      {btnText === "Balances" ? (
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
