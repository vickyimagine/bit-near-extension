import React from "react";
import {IoMdArrowRoundBack} from "react-icons/io";
import {FaUserPlus} from "react-icons/fa";
import {BiImport} from "react-icons/bi";
import {Link} from "react-router-dom";

const AccountOptions = () => {
  return (
    <>
      <div className='flex flex-col items-center w-full justify-between'>
        <Link
          className='bit-btn self-start px-4'
          to='/login/welcome'>
          <IoMdArrowRoundBack fontSize={21} />
          <p>Back</p>
        </Link>
        <Link
          className='flex flex-col items-center space-y-3 border-2 border-white p-2 rounded-md '
          to='/login/new-account'>
          <p className='text-center text-white '>
            If you have not created wallet before, you can choose below option
          </p>
          <button className='bit-btn w-3/5'>
            <p>Create Account</p>
            <FaUserPlus fontSize={21} />
          </button>
        </Link>
        <Link
          className='flex flex-col items-center space-y-3 border-2 border-white p-2 rounded-md
        '
          to='/login/import-account'>
          <p className='text-center text-white '>
            If you have created wallet before, you can choose below option
          </p>
          <button className='bit-btn w-3/5'>
            <p>Import Account</p>
            <BiImport fontSize={21} />
          </button>
        </Link>
        <Link className='text-white'>Terms & Conditions</Link>
      </div>
    </>
  );
};

export default AccountOptions;
