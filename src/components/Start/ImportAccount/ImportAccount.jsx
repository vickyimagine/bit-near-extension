import React from "react";
import {IoMdArrowRoundBack} from "react-icons/io";
import {Link} from "react-router-dom";

const ImportAccount = () => {
  return (
    <div className='flex flex-col justify-between w-full'>
      <Link
        to='/login/account-options'
        className='bit-btn self-start px-4'
        onClick={() => {}}>
        <IoMdArrowRoundBack fontSize={21} />
        <p>Back</p>
      </Link>
      <div className='flex flex-col space-y-4'>
        <h1 className='text-white text-5xl font-bold'>Import Wallet</h1>
        <select
          id='countries'
          className='bg-transparent text-sm rounded-lg text-white p-3 border outline-none w-fit self-end'>
          <option
            value='secretKey'
            className='text-black'>
            Secret Key
          </option>
          <option
            value='phrase'
            className='text-black'>
            Phrase
          </option>
        </select>
        <input
          type='text'
          className='p-2 border outline-none bg-transparent rounded-md w-full text-white'
        />
      </div>
      <div>
        <Link
          to='/login/password'
          className='bit-btn self-start px-4'
          onClick={() => {}}>
          <p>Import</p>
        </Link>
      </div>
    </div>
  );
};

export default ImportAccount;
