import React from "react";
import {IoMdArrowRoundBack} from "react-icons/io";
import {Link} from "react-router-dom";

const AccountOptions = () => {
  return (
    <>
      <div className='flex flex-col items-center w-full space-y-10 p-4'>
        <Link
          className='flex self-start justify-center space-x-3 items-center bg-white text-cyan-900 font-semibold p-2 px-4 rounded-md hover:scale-105 transition-all duration-200'
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
          <button className='bg-white w-3/5 rounded-md p-2 text-cyan-900 font-semibold hover:scale-105 transition-all duration-200'>
            Create Account
          </button>
        </Link>
        <Link
          className='flex flex-col items-center space-y-3 border-2 border-white p-2 rounded-md
        '
          to='/login/import-account'>
          <p className='text-center text-white '>
            If you have created wallet before, you can choose below option
          </p>
          <button className='bg-white w-3/5 rounded-md p-2 text-cyan-900 font-semibold hover:scale-105 transition-all duration-200'>
            Import Account
          </button>
        </Link>
        <Link className='text-white'>Terms & Conditions</Link>
      </div>
    </>
  );
};

export default AccountOptions;
