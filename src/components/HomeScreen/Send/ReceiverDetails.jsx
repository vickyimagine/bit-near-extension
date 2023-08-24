import React from "react";
import {Link} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";

const ReceiverDetails = ({setNextStep, amount}) => {
  return (
    <div className='flex flex-col  space-y-10'>
      <div className='relative flex items-center justify-center my-5 mb-8'>
        <button
          className='absolute bit-btn left-0'
          onClick={() => {
            setNextStep(false);
          }}>
          {" "}
          <IoMdArrowRoundBack fontSize={21} />
        </button>
        <span className='text-2xl text-white font-semibold'>{amount} NEAR</span>
      </div>
      <div className='flex p-2  rounded-md focus:ring-white ring-1 ring-slate-400 bg-transparent transparent-all duration-200'>
        <span className='w-1/5 text-white font-semibold'>Send To</span>
        <input
          type='text'
          className='text-end w-4/5 bg-transparent focus:outline-none text-white'
          placeholder='Account ID'
        />
      </div>
      <button className='bit-btn'>Send </button>
      <Link
        to='/homescreen'
        className='border-b w-fit self-center bit-btn'>
        Cancel
      </Link>
    </div>
  );
};

export default ReceiverDetails;
