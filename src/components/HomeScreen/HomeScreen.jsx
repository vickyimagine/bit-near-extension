import React, {useState} from "react";

import {Balances, Collectibles} from "../../components";

const HomeScreen = () => {
  const [btnText, setBtnText] = useState("Balances");

  const activeStyle =
    "flex items-center justify-center w-1/2 text-center bg-white text-bitBg font-bold text-xl  cursor-pointer transition-all duration-300 rounded-md";
  const inActiveStyle =
    "flex items-center justify-center w-1/2 text-center text-white font-bold text-xl  cursor-pointer transition-all duration-300 rounded-md";

  return (
    <div>
      <div className='flex justify-center h-10  my-3'>
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
      </div>
      {btnText === "Balances" ? <Balances /> : <Collectibles />}
    </div>
  );
};

export default HomeScreen;
