/*global chrome*/

import React, {useState} from "react";
import {Link} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";
import {fetchKeys} from "../../../utils";
import {toast} from "react-hot-toast";
import {useSelector} from "react-redux";
import {CopyToClipboard} from "react-copy-to-clipboard";

const RevealKey = () => {
  const [password, setPassword] = useState();
  const [isKey, setIsKey] = useState();

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
    <div className='flex flex-col justify-between '>
      <Link
        to='/homescreen'
        className='bit-btn w-fit self-start'>
        <IoMdArrowRoundBack fontSize={21} />
      </Link>
      <h1 className='text-white text-5xl font-bold'>Reveal Secret Key</h1>
      {isKey ? (
        <>
          <CopyToClipboard text={secretKey}>
            <div
              className='border border-white opacity-85 text-white text-center p-3  rounded-md cursor-pointer hover:bg-slate-300 hover:text-bitBg active:scale-95 transition-all duration-400 mb-36'
              onClick={() => {
                toast.success("Copied!");
              }}>
              {`${secretKey.slice(0, 16)}...${secretKey.slice(-7)}`}
            </div>
          </CopyToClipboard>
        </>
      ) : (
        <>
          {" "}
          <div className='flex flex-col items-center justify-around w-full space-y-6 mb-24'>
            <div className='flex flex-col items-start space-y-3'>
              <p className='text-white font-semibold'>Enter Password</p>
              <div className='flex items-center relative'>
                <input
                  type='text'
                  className='bg-transparent focus:outline-none text-white ring-1 focus:ring-white transition-all duration-200 ring-slate-400 p-2 px-4 rounded-md w-full'
                  placeholder='Password'
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </div>
            </div>
            <button
              className='bit-btn px-8'
              onClick={checkPassword}>
              <span>Reveal Key</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RevealKey;
