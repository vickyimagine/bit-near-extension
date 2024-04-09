import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import QRCode from "react-qr-code";

import {PiArrowBendUpLeftBold} from "react-icons/pi";

const Receive = () => {
  const {accountId} = useSelector(state => state.wallet);

  return (
    <div className='flex items-center pl-5 border-t border-gray-500 pt-8'>
      <Link
        className=' w-fit self-start mr-8'
        to='/homescreen'>
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </Link>
      <div className='flex flex-col items-center justify-center bg-white p-3 px-5 py-3  rounded-lg'>
        <QRCode
          value={accountId && accountId}
          size={250}
        />

        <p className='text-center mt-5 font-bold'>Please scan this to send NEAR</p>
      </div>
    </div>
  );
};

export default Receive;
