import React, {useState, useRef, useEffect} from "react"; // Import necessary React hooks
import "./Send.css"; // Import CSS styles
import ReceiverDetails from "./ReceiverDetails"; // Import ReceiverDetails component
import {Link} from "react-router-dom"; // Import Link for routing
import {useSelector} from "react-redux"; // Import Redux hook
import {PiArrowBendUpLeftBold} from "react-icons/pi"; // Import back arrow icon
import engJs from "../../Constants/en"; // Import English translations
import spainJs from "../../Constants/es"; // Import Spanish translations

const Send = () => {
  // Hooks
  const {balance, lang} = useSelector(state => state.wallet); // Access wallet state from Redux
  const [inputLength, setInputLength] = useState(0); // State to track input length
  const [amount, setAmount] = useState(0); // State for transfer amount
  const [nextStep, setNextStep] = useState(false); // State to track the next step in the process
  const inputRef = useRef(null); // Create a reference for the input element

  // Translations
  const translations = lang === "en" ? engJs : spainJs; // Simplify language handling
  const {useMax, availToSend, continue: continueTxt} = translations;

  // Effects
  useEffect(() => {
    inputRef.current.focus(); // Focus on the input when component mounts
  }, []);

  return (
    <div className='flex flex-col space-y-10 mt-3 border-t border-gray-500 pt-8'>
      {nextStep ? (
        <ReceiverDetails
          setNextStep={setNextStep}
          amount={amount}
        /> // Render ReceiverDetails if nextStep is true
      ) : (
        <>
          <Link
            to='/homescreen'
            className='w-fit self-start pl-4'>
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
              maxLength={18} // Set max length for the input
              placeholder='0'
              value={amount} // Bind value to amount state
              onChange={e => {
                setInputLength(e.target.value.length); // Update input length state
                setAmount(e.target.value); // Update amount state
              }}
            />
            <button
              className='bit-btn bg-white rounded-lg font-bold w-fit px-4 self-center'
              onClick={() => {
                setInputLength(String(balance).length); // Update input length to balance length
                setAmount(balance); // Set amount to max balance
              }}>
              {useMax} {/* Button text */}
            </button>
          </div>
          <div className='flex flex-col space-y-3'>
            <div className='flex justify-between items-center text-white'>
              <span className='font-syne'>{availToSend}</span>
              <span className='font-syncopate'>{balance} NEAR</span>
            </div>
            <button
              className={`bit-btn font-bold w-fit self-center px-36 disabled:hover:scale-100 disabled:hover:cursor-not-allowed disabled:opacity-75 disabled:text-bitBg`}
              disabled={amount === 0 || balance === 0 || Number(amount) > Number(balance)} // Disable button based on conditions
              onClick={() => setNextStep(true)} // Move to the next step on click
            >
              {continueTxt} {/* Button text */}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Send;
