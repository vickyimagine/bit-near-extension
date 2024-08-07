/*global chrome*/
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FiLogIn} from "react-icons/fi";
import {fetchKeys} from "../../../utils";
import {toast} from "react-hot-toast";
import {GoEye} from "react-icons/go";
import {GoEyeClosed} from "react-icons/go";
import {useSelector} from "react-redux";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";
import WarningCard from "./WarningCard";
const Logout = () => {
  //hooks
  const {lang} = useSelector(state => state.wallet);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const navigate = useNavigate();
  const keyStore = fetchKeys();

  //translations
  const loginTxt = lang === "en" ? engJs.login : spainJs.login;
  const enterPassTxt = lang === "en" ? engJs.enterPassword : spainJs.enterPassword;
  const passwordTxt = lang === "en" ? engJs.password : spainJs.password;
  const forgotTxt = lang === "en" ? engJs.forgotPassword : spainJs.forgotPassword;

  const checkPassword = () => {
    if (keyStore) {
      if (keyStore.password === password && password) {
        toast.success("Logged In");
        // chrome.storage.sync.set({loggedIn: true});
        navigate("/");
      } else {
        toast.error("Wrong Password !");
      }
      setPassword("");
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-around w-full `}
      onClick={() => {
        isWarning && setIsWarning(false);
      }}>
      <h1 className='text-white text-5xl font-bold'>{loginTxt}</h1>
      <div className='flex flex-col items-start  space-y-3'>
        <p className='text-white font-semibold'>{enterPassTxt}</p>
        <div className='flex items-center relative'>
          <input
            type={showPassword ? "text" : "password"}
            className='bg-transparent focus:outline-none text-white ring-1 focus:ring-white transition-all duration-200 ring-slate-400 p-2 px-5 rounded-md w-72 font-inter'
            placeholder={passwordTxt}
            onChange={e => {
              setPassword(e.target.value);
            }}
            autoComplete='off'
            value={password && password}
          />
          {showPassword ? (
            <GoEye
              fontSize={28}
              color='white'
              className='absolute z-20 right-3 cursor-pointer'
              onClick={() => {
                setShowPassword(false);
              }}
            />
          ) : (
            <GoEyeClosed
              fontSize={28}
              color='white'
              className='absolute z-20 right-3 cursor-pointer'
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )}
        </div>
      </div>
      <div className='space-y-3 flex flex-col items-center'>
        <button
          className='bit-btn justify-center space-x-2 px-8'
          onClick={checkPassword}>
          <span>{loginTxt}</span>
          <FiLogIn fontSize={20} />
        </button>
        <button
          className='text-white cursor-pointer disabled:cursor-default'
          disabled={isWarning}
          onClick={() => {
            setIsWarning(true);
          }}>
          {forgotTxt} ?
        </button>
        {isWarning && <WarningCard setIsWarning={setIsWarning} />}
      </div>
    </div>
  );
};

export default Logout;
