import React, {useEffect} from "react";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import {CgUserAdd} from "react-icons/cg";
import {LuDownload} from "react-icons/lu";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";
import {LangDrop} from "../..";

const AccountOptions = () => {
  const {lang} = useSelector(state => state.wallet);

  const createAccountTxt = lang === "en" ? engJs.createAccount : spainJs.createAccount;
  const orTxt = lang === "en" ? engJs.or : spainJs.or;
  const importAccountTxt = lang === "en" ? engJs.importAccount : spainJs.importAccount;
  const termsTxt = lang === "en" ? engJs.termsConds : spainJs.termsConds;
  return (
    <>
      <div className='flex flex-col items-center w-full justify-between'>
        <LangDrop
          isMainScreen={false}
          classNames='mt-8 mr-3'
        />
        <Link
          className=' self-start px-4 -mt-36'
          to='/login/welcome'>
          <PiArrowBendUpLeftBold
            fontSize={28}
            color='white'
          />
        </Link>

        <div className='flex flex-col items-center gap-y-2'>
          <Link to='/login/new-account'>
            <button className='bit-btn px-28 py-4 font-bold'>
              <p>{createAccountTxt}</p>
              <CgUserAdd fontSize={21} />
            </button>
          </Link>
          <p className='text-col_1'>{orTxt}</p>
          <Link to='/login/import-account'>
            <button className='bit-btn bg-white px-28 py-4 font-bold'>
              <p>{importAccountTxt}</p>
              <LuDownload fontSize={21} />
            </button>
          </Link>
        </div>
        <Link
          to='/terms'
          className='text-white underline'>
          {termsTxt}
        </Link>
      </div>
    </>
  );
};

export default AccountOptions;
