/*global chrome*/
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Terms from "../../Sidebar/Terms&Conditions/Terms";
import toast from "react-hot-toast";
import {decrypt} from "n-krypta";
import {GoEye} from "react-icons/go";
import {GoEyeClosed} from "react-icons/go";
import {FaArrowRight} from "react-icons/fa6";
import {useSelector} from "react-redux";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";
import {LangDrop} from "../..";

const EnterPassword = () => {
  //hooks
  const {lang} = useSelector(state => state.wallet);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const keyStore = JSON.parse(localStorage.getItem("tempKeystore"))?.keyStore;

  //translations
  const createPasswordText =
    lang === "en" ? engJs.createPassword : spainJs.createPassword;
  const passwordTxt = lang === "en" ? engJs.password : spainJs.password;
  const confirmPasswordTxt =
    lang === "en" ? engJs.confirmPassword : spainJs.confirmPassword;
  const iAcceptTxt = lang === "en" ? engJs.iAcceptAll : spainJs.iAcceptAll;
  const termsCondsTxt = lang === "en" ? engJs.termsConds : spainJs.termsConds;
  const nextTxt = lang === "en" ? engJs.next : spainJs.next;

  //useEffects
  useEffect(() => {
    localStorage.setItem("onPassword", true);
  }, []);

  //functions
  const storeWalletObject = async secretKey => {
    // console.log(secretKey);
    // chrome.storage.sync.set({
    //   secretKey
    // });
  };
  const handleSave = async () => {
    if (!(password.length >= 8)) {
      toast.error("Password length should be greater than 8 characters");
    } else if (password !== confirmPassword) {
      toast.error("Password didn't match!", {
        style: {
          marginTop: "9px"
        }
      });
    } else {
      const decryptedKey = decrypt(keyStore.secretKey, keyStore.publicKey);
      await storeWalletObject(decryptedKey);

      // Modify the object by adding a new field
      keyStore.password = password;

      // Stringify the updated object
      const updatedJSON = JSON.stringify(keyStore);

      // Store the updated JSON string back into local storage
      localStorage.setItem("keyStore", updatedJSON);
      localStorage.removeItem("tempKeystore");
      localStorage.removeItem("onPassword");

      // chrome.storage.sync.set({
      //   keyStore: updatedJSON
      // });
      toast.success("Welcome to Bitwallet", {
        style: {
          marginTop: "20px"
        }
      });
      navigate("/homescreen");
    }
    setPassword("");
    setConfirmPassword("");
    setChecked(false);
  };

  return terms ? (
    <Terms setTerms={setTerms} />
  ) : (
    <div className='flex flex-col w-full items-center space-y-8 '>
      <LangDrop isMainScreen={false} />
      <div className='flex flex-col w-full space-y-4 p-6 mt-6 rounded-md h-fit '>
        <h1 className='text-white text-3xl font-bold self-center mb-2 '>
          {createPasswordText}
        </h1>
        <div className='flex items-center relative py-2 '>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={passwordTxt}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`p-2 px-2 focus:outline-none ring-bitBg  bg-transparent border-b caret-white text-white w-full font-inter placeholder:text-white placeholder:font-extralight`}
          />

          {showPassword ? (
            <GoEyeClosed
              fontSize={24}
              color='white'
              className='absolute z-20 right-0 cursor-pointer'
              onClick={() => {
                setShowPassword(false);
              }}
            />
          ) : (
            <GoEye
              fontSize={24}
              color='white'
              className='absolute z-20 right-0 cursor-pointer'
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )}
        </div>
        <div className='flex items-center relative'>
          <input
            type='text'
            placeholder={confirmPasswordTxt}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className={`p-2 px-2 focus:outline-none ring-bitBg  bg-transparent border-b caret-white text-white w-full font-inter placeholder:text-white placeholder:font-extralight`}
          />
        </div>

        <div className='flex items-center gap-x-3 '>
          <div
            className={`flex items-center  mt-4 ${
              !checked && "ring-1 ring-white"
            } h-fit w-fit rounded-sm`}>
            <input
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
              id='yellow-checkbox'
              type='checkbox'
              className={`w-4 h-4  checked:accent-col_1 ${
                checked ? "opacity-100" : "opacity-0"
              } cursor-pointer`}
            />
          </div>
          <p className='text-white mt-4'>
            <span className='font-thin'>{iAcceptTxt} </span>
            <button
              className='font-medium text-white cursor-pointer pl-1 text-base'
              onClick={() => {
                setTerms(true);
              }}>
              {termsCondsTxt}
            </button>
          </p>
        </div>
      </div>

      <button
        className={"bit-btn px-8 py-2 disabled:cursor-not-allowed"}
        disabled={
          password.length === 0 || confirmPassword.length === 0 || checked === false
        }
        onClick={() => {
          handleSave();
        }}>
        <p className='text-lg font-bold'>{nextTxt}</p>
        <FaArrowRight fontSize={22} />
      </button>
    </div>
  );
};

export default EnterPassword;
