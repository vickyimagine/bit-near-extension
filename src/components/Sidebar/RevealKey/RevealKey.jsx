/*global chrome*/

import React, {useState} from "react";
import {Link} from "react-router-dom";
import {fetchKeys} from "../../../utils";
import {toast} from "react-hot-toast";
import {useSelector} from "react-redux";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import {VscEye} from "react-icons/vsc";
import {VscEyeClosed} from "react-icons/vsc";
import {GoEye} from "react-icons/go";
import {GoEyeClosed} from "react-icons/go";

const RevealKey = () => {
  const [password, setPassword] = useState("");
  const [isKey, setIsKey] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const keyStore = fetchKeys();
  const {secretKey} = useSelector(state => state.wallet);

  const checkPassword = () => {
    if (keyStore) {
      if (keyStore.password === password && password) {
        toast.success("Revealed");
        setIsKey(true);
      } else {
        toast.error("Wrong Password !");
      }
      setPassword("");
    }
  };

  return (
    <div className='flex flex-col justify-evenly items-start space-y-4  w-full'>
      <Link
        to='/homescreen'
        className=' self-start ml-3'>
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </Link>
      <div className='flex flex-col items-center gap-y-4  ml-8'>
        <h1 className='text-white text-4xl font-bold '>
          {isKey ? "Secret Key" : "Reveal Secret Key"}
        </h1>
        {isKey ? (
          <>
            <CopyToClipboard text={secretKey}>
              <div
                className='border border-white opacity-85 text-white text-center p-3 px-20 rounded-md cursor-pointer hover:bg-slate-300 hover:text-bitBg active:scale-95 transition-all duration-400 mb-36'
                onClick={() => {
                  toast.success("Secret Key Copied to Clipboard!");
                }}>
                {`${secretKey.slice(0, 22)}...${secretKey.slice(-7)}`}
              </div>
            </CopyToClipboard>
          </>
        ) : (
          <>
            {" "}
            <div className='flex flex-col items-center justify-around px-3  space-y-14 mb-24'>
              <div className='flex flex-col items-start space-y-4 mt-8'>
                <p className='text-white '>Enter Password</p>
                <div className='flex items-center relative  ring-1 focus:ring-white transition-all duration-200 ring-slate-400 p-2 rounded-md'>
                  <input
                    type={showPassword ? "text" : "password"}
                    className='bg-transparent focus:outline-none text-white rounded-md w-64'
                    placeholder='Password'
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                  {showPassword ? (
                    <GoEyeClosed
                      fontSize={28}
                      color='white'
                      className='cursor-pointer'
                      onClick={() => {
                        setShowPassword(false);
                      }}
                    />
                  ) : (
                    <GoEye
                      fontSize={28}
                      color='white'
                      className='cursor-pointer'
                      onClick={() => {
                        setShowPassword(true);
                      }}
                    />
                  )}
                </div>
              </div>
              <button
                className='bit-btn px-8 font-bold'
                onClick={checkPassword}>
                <span>Reveal Key</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RevealKey;
