import React from "react"; // Import React
import {PiArrowBendUpLeftBold} from "react-icons/pi"; // Import back arrow icon
import {CgUserAdd} from "react-icons/cg"; // Import user add icon
import {LuDownload} from "react-icons/lu"; // Import download icon
import {Link} from "react-router-dom"; // Import Link for routing
import {useSelector} from "react-redux"; // Import Redux hook
import engJs from "../../../Constants/en"; // Import English translations
import spainJs from "../../../Constants/es"; // Import Spanish translations
import {LangDrop} from "../.."; // Import language dropdown component

const AccountOptions = () => {
  const {lang} = useSelector(state => state.wallet); // Access language state from Redux

  // Translations
  const translations = lang === "en" ? engJs : spainJs; // Simplify language handling
  const {createAccount, or, importAccount, termsConds} = translations; // Destructure translations for clarity

  return (
    <div className='flex flex-col items-center w-full justify-between'>
      <LangDrop
        isMainScreen={false}
        classNames='mt-8 mr-3'
      />
      <Link
        className='self-start px-4 -mt-36'
        to='/login/welcome'>
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </Link>

      <div className='flex flex-col items-center gap-y-2'>
        <Link to='/login/new-account'>
          <button className='bit-btn px-28 py-4 font-bold flex items-center justify-center'>
            <p className='mr-2'>{createAccount}</p>
            <CgUserAdd fontSize={21} />
          </button>
        </Link>
        <p className='text-col_1'>{or}</p>
        <Link to='/login/import-account'>
          <button className='bit-btn bg-white px-28 py-4 font-bold flex items-center justify-center'>
            <p className='mr-2'>{importAccount}</p>
            <LuDownload fontSize={21} />
          </button>
        </Link>
      </div>
      <Link
        to='/terms'
        className='text-white underline'>
        {termsConds}
      </Link>
    </div>
  );
};

export default AccountOptions;
