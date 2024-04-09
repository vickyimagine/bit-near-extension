import React, {useEffect} from "react";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import {CgUserAdd} from "react-icons/cg";
import {LuDownload} from "react-icons/lu";
import {Link} from "react-router-dom";

const AccountOptions = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <div className='flex flex-col items-center w-full justify-between'>
        <Link
          className=' self-start px-4 mt-3'
          to='/login/welcome'>
          <PiArrowBendUpLeftBold
            fontSize={28}
            color='white'
          />
        </Link>

        <div className='flex flex-col items-center gap-y-2'>
          <Link to='/login/new-account'>
            <button className='bit-btn px-28 py-4 font-bold'>
              <p>Create Account</p>
              <CgUserAdd fontSize={21} />
            </button>
          </Link>
          <p className='text-col_1'>OR</p>
          <Link to='/login/import-account'>
            <button className='bit-btn bg-white px-28 py-4 font-bold'>
              <p>Import Account</p>
              <LuDownload fontSize={21} />
            </button>
          </Link>
        </div>
        <Link
          to='/terms'
          className='text-white underline'>
          Terms & Conditions
        </Link>
      </div>
    </>
  );
};

export default AccountOptions;
