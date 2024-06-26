import React, {useState, useRef, useEffect} from "react";
import "./Send.css";
import ReceiverDetails from "./ReceiverDetails";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import engJs from "../../Constants/en";
import spainJs from "../../Constants/es";
const Send = () => {
  //hooks
  const {balance, lang} = useSelector(state => state.wallet);
  const [inputLength, setInputLength] = useState(0);
  const [amount, setAmount] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  // Create a reference to the input element
  const inputRef = useRef(null);

  //translations
  const useMaxTxt = lang === "en" ? engJs.useMax : spainJs.useMax;
  const availToSendTxt = lang === "en" ? engJs.availToSend : spainJs.availToSend;
  const continueTxt = lang === "en" ? engJs.continue : spainJs.continue;

  //useEffects
  useEffect(() => {
    // Focus on the input element when the component is mounted
    inputRef.current.focus();
  }, []);

  return (
    <div className='flex flex-col space-y-10 mt-3 border-t border-gray-500 pt-8'>
      {nextStep ? (
        <ReceiverDetails
          setNextStep={setNextStep}
          amount={amount}
        />
      ) : (
        <>
          <Link
            to='/homescreen'
            className=' w-fit self-start pl-4'>
            <PiArrowBendUpLeftBold
              fontSize={28}
              color='white'
            />
          </Link>
          <div className='flex flex-col items-center space-y-2'>
            <input
              ref={inputRef} // Attach the ref to the input element
              className={`${
                inputLength < 6 ? "text-5xl" : inputLength < 11 ? "text-4xl" : "text-3xl"
              } text-center outline-none font-semibold h-20 font-syncopate bg-transparent input-field text-white placeholder:text-white`}
              type='text'
              maxLength={18}
              placeholder='0'
              value={amount}
              onChange={e => {
                setInputLength(e.target.value.length);
                setAmount(e.target.value);
              }}
            />
            <button
              className='bit-btn bg-white rounded-lg font-bold w-fit px-4 self-center'
              onClick={() => {
                setInputLength(String(balance).length);
                setAmount(balance);
              }}>
              {useMaxTxt}
            </button>
          </div>
          <div className='flex flex-col space-y-3'>
            <div className='flex justify-between items-center text-white '>
              <span className='font-syne'>{availToSendTxt}</span>
              <span className=' font-syncopate'>{balance} NEAR</span>
            </div>
            <button
              className={`bit-btn font-bold w-fit self-center px-36 disabled:hover:scale-100 disabled:hover:cursor-not-allowed disabled:opacity-75 disabled:text-bitBg `}
              disabled={amount === 0 || balance === 0 || Number(amount) > Number(balance)}
              onClick={() => {
                setNextStep(true);
              }}>
              {continueTxt}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Send;
