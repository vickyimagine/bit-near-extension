import React, {useState, useRef, useEffect} from "react";
import "./Send.css";

import ReceiverDetails from "./ReceiverDetails";
import {Link} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";

const Send = ({accountId}) => {
  const [inputLength, setInputLength] = useState(0);
  const [amount, setAmount] = useState(null);
  const [nextStep, setNextStep] = useState(false);

  // Create a reference to the input element
  const inputRef = useRef(null);
  const accountBalance = 21;
  useEffect(() => {
    // Focus on the input element when the component is mounted
    inputRef.current.focus();
  }, []);

  return (
    <div className='flex flex-col space-y-8 mt-3'>
      {nextStep ? (
        <ReceiverDetails
          setNextStep={setNextStep}
          amount={amount}
        />
      ) : (
        <>
          <Link
            to='/homescreen'
            className='bit-btn w-fit self-start'>
            <IoMdArrowRoundBack fontSize={21} />
          </Link>
          <input
            ref={inputRef} // Attach the ref to the input element
            className={`${
              inputLength < 6 ? "text-5xl" : inputLength < 11 ? "text-4xl" : "text-3xl"
            } text-center outline-none font-semibold h-20 bg-transparent input-field`}
            type='text'
            maxlength={18}
            placeholder='0'
            value={amount}
            onChange={e => {
              setInputLength(e.target.value.length);
              setAmount(e.target.value);
            }}
          />
          <button
            className='bit-btn w-fit px-3 self-center'
            onClick={() => {
              setInputLength(String(accountBalance).length);
              setAmount(accountBalance);
            }}>
            Use Max
          </button>
          <div className='flex justify-between items-center text-white'>
            <span>Available to Send</span>
            <span className='font-semibold text-xl'>{accountBalance} NEAR</span>
          </div>
          <button
            className='bit-btn disabled:hover:scale-100 disabled:hover:cursor-not-allowed disabled:opacity-75'
            disabled={inputLength === 0}
            onClick={() => {
              setNextStep(true);
            }}>
            Continue
          </button>
        </>
      )}
    </div>
  );
};

export default Send;
