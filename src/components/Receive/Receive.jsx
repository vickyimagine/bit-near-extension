import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import QRCode from "react-qr-code";
import {IoMdArrowRoundBack} from "react-icons/io";
const Receive = () => {
  const {accountId} = useSelector(state => state.wallet);

  return (
    <div className='flex flex-col space-y-5 mt-3'>
      <Link
        className='bit-btn w-fit '
        to='/homescreen'>
        <IoMdArrowRoundBack fontSize={21} />
      </Link>
      <div className='bg-dark-400 rounded-lg p-3 mx-auto mt-10'>
        <QRCode
          value={accountId && accountId}
          size={250}
        />
      </div>
      <p className='text-center mt-5 text-xl text-white'>Please scan this to send NEAR</p>
    </div>
  );
};

export default Receive;
