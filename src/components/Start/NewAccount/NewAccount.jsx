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
import {useSelector} from "react-redux";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";

const NewAccount = () => {
  //hooks
  const tempKeyStore = JSON.parse(localStorage.getItem("tempKeystore"));
  const {lang} = useSelector(state => state.wallet);
  const [phrase, setPhrase] = useState(tempKeyStore?.phrase);
  const [isEnterPhrase, setIsEnterPhrase] = useState(false);
  const [keyStore, setKeyStore] = useState(tempKeyStore?.keyStore);

  //translations
  const backupPhrsTxt = lang === "en" ? engJs.backupPhrs : spainJs.backupPhrs;
  const backupPara1 = lang === "en" ? engJs.backupPhrsTxt1 : spainJs.backupPhrsTxt1;
  const backupPara2 = lang === "en" ? engJs.backupPhrsTxt2 : spainJs.backupPhrsTxt2;
  const nextTxt = lang === "en" ? engJs.next : spainJs.next;

  //useEffects
  useEffect(() => {
    if (!tempKeyStore) {
      generateStore();
    }
  }, []);

  //functions
  const generateStore = () => {
    let keys = generateSeedPhrase();
    setKeyStore({
      publicKey: keys.publicKey,
      secretKey: encrypt(keys.secretKey.slice(8), keys.publicKey),
      accountId: getAccountId(keys.publicKey.slice(8))
    });
    setPhrase(keys.seedPhrase);
  };

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
      <h1 className='text-white text-[28px] font-bold'>{backupPhrsTxt}</h1>
      <p className='text-white text-center font-inter font-light text-sm leading-relaxed'>
        {backupPara1}
      </p>
      <CopyToClipboard text={phrase && phrase}>
        <div
          className='border bg-white hover:bg-col_1  opacity-85 text-black font-semibold text-center p-2 text-xs rounded-xl cursor-pointer hover:text-bitBg active:scale-95 transition-all duration-400'
          onClick={() => {
            toast.success("Copied in your clipboard !");
            localStorage.setItem(
              "tempKeystore",
              JSON.stringify({
                phrase,
                keyStore
              })
            );
          }}>
          {phrase && phrase}
        </div>
      </CopyToClipboard>
      <p className='text-white text-sm text-center'>{backupPara2}</p>
      <button
        className='bit-btn px-7 mb-3'
        onClick={() => {
          setIsEnterPhrase(true);
        }}>
        <p className='flex gap-x-2 items-center  font-bold'>
          {nextTxt}
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
