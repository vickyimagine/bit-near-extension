import React from "react";
import {MdStart} from "react-icons/md";
import {Link} from "react-router-dom";
import {BiRightArrow} from "react-icons/bi";

const Welcome = () => {
  return (
    <div className='p-3 mt-8 gap-y-4 flex flex-col items-center font-syne'>
      <h1 className='text-6xl font-thin text-center leading-tight text-white'>
        Welcome To <p className=' text-[#3498DB] font-nico'>BitWallet</p>
      </h1>
      <Link to='/login/account-options'>
        <button className='bit-btn px-20 py-4 mt-20 font-semibold'>
          <p>Click To Start</p>
          <BiRightArrow fontSize={18} />
        </button>
      </Link>
    </div>
  );
};

export default Welcome;
