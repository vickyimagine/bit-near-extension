import React from "react";
import {MdStart} from "react-icons/md";
import {Link} from "react-router-dom";

const Welcome = ({welcome}) => {
  return (
    <div className='p-3 flex flex-col items-center'>
      <h1 className='text-6xl font-thin text-center leading-snug text-white'>
        Welcome To <p className='font-semibold'>Bitwallet{welcome}</p>
      </h1>
      <Link to='/login/account-options'>
        <button className='bit-btn px-4 mt-20'>
          <p>Click To Start</p>
          <MdStart fontSize={21} />
        </button>
      </Link>
    </div>
  );
};

export default Welcome;
