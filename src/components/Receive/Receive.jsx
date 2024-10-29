import React from "react";
import {useSelector} from "react-redux"; // Redux hook
import {Link} from "react-router-dom"; // Link for routing
import QRCode from "react-qr-code"; // QR code component
import {PiArrowBendUpLeftBold} from "react-icons/pi"; // Icon component
import engJs from "../../Constants/en"; // English translations
import spainJs from "../../Constants/es"; // Spanish translations

const Receive = () => {
  // Hooks
  const {accountId, lang} = useSelector(state => state.wallet); // Access account ID and language

  // Translations
  const qrTxt = lang === "en" ? engJs.qrText : spainJs.qrText;

  return (
    <div className='flex items-center pl-5 border-t border-gray-500 pt-8'>
      <Link
        className='w-fit self-start mr-8'
        to='/homescreen'>
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </Link>
      <div className='flex flex-col items-center justify-center bg-white p-3 rounded-lg'>
        <QRCode
          value={accountId || ""}
          size={250}
        />{" "}
        {/* Use empty string if accountId is undefined */}
        <p className='text-center mt-5 font-bold text-sm w-48'>{qrTxt}</p>
      </div>
    </div>
  );
};

export default Receive;
