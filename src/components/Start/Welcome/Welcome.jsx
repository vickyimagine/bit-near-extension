import React from "react";
import {MdStart} from "react-icons/md";
import {Link} from "react-router-dom";

const Welcome = () => {
  return (
    <div className='p-3 flex flex-col items-center'>
      <h1 className='text-6xl font-thin text-center leading-snug text-white'>
        Welcome To <p className='font-semibold'>Bitwallet</p>
      </h1>
      <Link to='/login/account-options'>
        <button className='flex justify-center space-x-3 items-center bg-white text-cyan-900 font-semibold p-2 px-4 mt-20  rounded-md shadow-lg hover:scale-105 transition-all duration-200 hover:shadow-gray-400'>
          <p>Click To Start</p>
          <MdStart fontSize={21} />
        </button>
      </Link>
    </div>
  );
};

export default Welcome;
