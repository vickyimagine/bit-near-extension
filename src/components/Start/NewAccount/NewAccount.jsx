import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {generateSeedPhrase} from "near-seed-phrase";
import {getAccountId} from "../../../utils";
import EnterPhrase from "../EnterPhrase/EnterPhrase";
import {encrypt} from "n-krypta"; //For es6

import {CopyToClipboard} from "react-copy-to-clipboard";
import {IoMdArrowRoundBack} from "react-icons/io";

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
    <div className='flex flex-col items-center w-full justify-between'>
      <Link
        className='bit-btn self-start px-4'
        to='/login/account-options'>
        <IoMdArrowRoundBack fontSize={21} />
        <p>Back</p>
      </Link>
      <h1 className='text-white text-4xl font-bold'>Backup Phrase</h1>
      <p className='text-white text-center'>
        Your secret phrase helps you to backup and restore your BIT wallet account.Keep
        your seed phrase key confidential.Access of this key to any other person could
        give them access of this wallet
      </p>
      <CopyToClipboard text={phrase && phrase}>
        <div className='border border-white opacity-85 text-white text-center p-3 rounded-md cursor-pointer hover:bg-slate-300 hover:text-bitBg active:scale-95 transition-all duration-400'>
          {phrase && phrase}
        </div>
      </CopyToClipboard>
      <p className='text-white font-semibold text-center'>
        Copy the secret phrase by clicking on the above box and save it at a secure
        location.You 'll be asked to enter the secret phrase next.
      </p>
      <button
        className='bit-btn px-8'
        onClick={() => {
          setIsEnterPhrase(true);
        }}>
        <p>Next</p>
      </button>
    </div>
  );
};

export default NewAccount;
