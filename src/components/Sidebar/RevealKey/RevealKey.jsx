/*global chrome*/

import React, {useState} from "react"; // Import necessary React hooks
import {Link} from "react-router-dom"; // Import Link for routing
import {fetchKeys} from "../../../utils"; // Import utility function to fetch keys
import {toast} from "react-hot-toast"; // Import toast for notifications
import {useSelector} from "react-redux"; // Import Redux hook
import {CopyToClipboard} from "react-copy-to-clipboard"; // Import CopyToClipboard for copying text
import {PiArrowBendUpLeftBold} from "react-icons/pi"; // Import back arrow icon
import {GoEye, GoEyeClosed} from "react-icons/go"; // Import eye icons

import engJs from "../../../Constants/en"; // Import English translations
import spainJs from "../../../Constants/es"; // Import Spanish translations

const RevealKey = () => {
  // State hooks
  const [password, setPassword] = useState(""); // State for password input
  const [isKey, setIsKey] = useState(false); // State to track if key is revealed
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const keyStore = fetchKeys(); // Fetch keyStore data
  const {secretKey, lang} = useSelector(state => state.wallet); // Access wallet state from Redux

  // Translations
  const translations = lang === "en" ? engJs : spainJs; // Simplify language handling
  const {
    revealSecretKey,
    secretKey: secretKeyLabel,
    enterPassword,
    password: passwordLabel
  } = translations;

  // Function to check the password
  const checkPassword = () => {
    if (keyStore && keyStore.password === password && password) {
      toast.success("Revealed");
      setIsKey(true); // Set key as revealed
    } else {
      toast.error("Wrong Password !");
    }
    setPassword(""); // Clear password input
  };

  return (
    <div className='flex flex-col justify-evenly items-start space-y-4 w-full'>
      <Link
        to='/homescreen'
        className='self-start ml-3'>
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </Link>
      <div className='flex flex-col items-center gap-y-4 ml-8'>
        <h1 className='text-white text-4xl font-bold'>
          {isKey ? secretKeyLabel : revealSecretKey}
        </h1>
        {isKey ? (
          <CopyToClipboard text={secretKey}>
            <div
              className='border border-white opacity-85 text-white text-center p-3 px-20 rounded-md cursor-pointer hover:bg-slate-300 hover:text-bitBg active:scale-95 transition-all duration-400 mb-36'
              onClick={() => toast.success("Secret Key Copied to Clipboard!")}>
              {`${secretKey.slice(0, 22)}...${secretKey.slice(-7)}`}
            </div>
          </CopyToClipboard>
        ) : (
          <div className='flex flex-col items-center justify-around px-3 space-y-14 mb-24'>
            <div className='flex flex-col items-start space-y-4 mt-8'>
              <p className='text-white'>{enterPassword}</p>
              <div className='flex items-center relative ring-1 focus:ring-white transition-all duration-200 ring-slate-400 p-2 rounded-md'>
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type based on showPassword
                  className='bg-transparent focus:outline-none text-white font-inter rounded-md w-64'
                  placeholder={passwordLabel}
                  onChange={e => setPassword(e.target.value)} // Update password state
                  value={password}
                />
                {showPassword ? (
                  <GoEyeClosed
                    fontSize={28}
                    color='white'
                    className='cursor-pointer'
                    onClick={() => setShowPassword(false)} // Hide password
                  />
                ) : (
                  <GoEye
                    fontSize={28}
                    color='white'
                    className='cursor-pointer'
                    onClick={() => setShowPassword(true)} // Show password
                  />
                )}
              </div>
            </div>
            <button
              className='bit-btn px-8 font-bold'
              onClick={checkPassword}>
              <span>{revealSecretKey}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevealKey;
