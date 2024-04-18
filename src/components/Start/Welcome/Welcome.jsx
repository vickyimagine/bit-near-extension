import React, {useState, useEffect} from "react";
import {MdStart} from "react-icons/md";
import {Link} from "react-router-dom";
import {BiRightArrow} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {IoIosArrowDown} from "react-icons/io";
import {setLang} from "../../../Store/wallet/wallet-slice";
import {langs} from "../../../Constants/langs";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";
import {MdOutlineLanguage} from "react-icons/md";
import {LangDrop} from "../..";

const Welcome = () => {
  const {lang} = useSelector(state => state.wallet);

  useEffect(() => {
    localStorage.clear();
    // isBitV4 = true;
    localStorage.setItem("lang", lang);
    localStorage.setItem("isBitV4", true);
  }, []);

  const welcomeText = lang === "en" ? engJs.welcomeTo : spainJs.welcomeTo;
  const clickToStart = lang === "en" ? engJs.clickToStart : spainJs.clickToStart;

  return (
    <div className='p-3 mt-5 gap-y-4 flex flex-col items-center font-syne  w-[500px]'>
      <LangDrop isMainScreen={false} />
      <h1 className='text-6xl font-thin text-center leading-tight text-white'>
        {welcomeText}
        <p className=' text-[#3498DB] font-nico'>BitWallet</p>
      </h1>

      <Link to='/login/account-options'>
        <button className='bit-btn px-20 py-4 mt-20 font-semibold'>
          <p>{clickToStart}</p>
          <BiRightArrow fontSize={18} />
        </button>
      </Link>
    </div>
  );
};

export default Welcome;
