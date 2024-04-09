import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {generateSeedPhrase} from "near-seed-phrase";
import {getAccountId} from "../../../utils";
import EnterPhrase from "../EnterPhrase/EnterPhrase";
import {encrypt} from "n-krypta"; //For es6
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import {FaArrowRight} from "react-icons/fa6";

import {CopyToClipboard} from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import {HiMiniArrowLongRight} from "react-icons/hi2";
const NewAccount = () => {
  const [phrase, setPhrase] = useState(null);
  const [isEnterPhrase, setIsEnterPhrase] = useState(false);
  const [keyStore, setKeyStore] = useState(null);

  const generateStore = () => {
    let keys = generateSeedPhrase();
    setKeyStore({
      publicKey: keys.publicKey,
      secretKey: encrypt(keys.secretKey.slice(8), keys.publicKey),
      accountId: getAccountId(keys.publicKey.slice(8))
    });
    setPhrase(keys.seedPhrase);
  };

  useEffect(() => {
    generateStore();
  }, []);

  return isEnterPhrase ? (
    <EnterPhrase
      phrase={phrase && phrase.split(" ")}
      setIsEnterPhrase={setIsEnterPhrase}
      keyStore={keyStore}
    />
  ) : (
    <div className='flex flex-col items-center w-full justify-between mt-3'>
      <Link
        className='self-start px-4'
        to='/login/account-options'>
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </Link>
      <h1 className='text-white text-[28px] font-bold'>Backup Phrase</h1>
      <p className='text-white text-center font-inter font-light text-sm leading-relaxed'>
        Your secret phrase helps you to backup and restore your BIT wallet account.Keep
        your seed phrase key confidential.Access of this key to any other person could
        give them access of this wallet
      </p>
      <CopyToClipboard text={phrase && phrase}>
        <div
          className='border bg-white hover:bg-col_1  opacity-85 text-black font-semibold text-center p-2 text-xs rounded-xl cursor-pointer hover:text-bitBg active:scale-95 transition-all duration-400'
          onClick={() => {
            toast.success("Copied in your clipboard !");
          }}>
          {phrase && phrase}
        </div>
      </CopyToClipboard>
      <p className='text-white text-sm text-center'>
        Copy the secret phrase by clicking on the above box and save it at a secure
        location.You 'll be asked to enter the secret phrase next.
      </p>
      <button
        className='bit-btn px-7 mb-3'
        onClick={() => {
          setIsEnterPhrase(true);
        }}>
        <p className='flex gap-x-2 items-center  font-bold'>
          Next{" "}
          <FaArrowRight
            fontSize={22}
            color='black'
          />
        </p>
      </button>
    </div>
  );
};

export default NewAccount;
