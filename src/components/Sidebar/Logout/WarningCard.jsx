/*global chrome*/
import React from "react";
import {HiOutlineInformationCircle} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";

const WarningCard = ({setIsWarning}) => {
  const {lang} = useSelector(state => state.wallet);

  const warningTxt = lang === "en" ? engJs.warningCardTxt : spainJs.warningCardTxt;
  const proceedTxt = lang === "en" ? engJs.proceedTxt : spainJs.proceedTxt;
  const resetPassTxt = lang === "en" ? engJs.resetPassword : spainJs.resetPassword;
  const navigate = useNavigate();
  const handleReset = () => {
    chrome.storage.sync.set({loggedIn: true});
    navigate("/login/import-account");
  };
  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl shadow-black rounded p-6 h-72 w-80 justify-evenly text-justify flex flex-col items-center space-y-2 z-20 '>
      <h2 className='text-xl font-bold mb-2'>{resetPassTxt}</h2>
      <p className='text-sm text-red-400'>
        <HiOutlineInformationCircle
          fontSize={24}
          className='inline-block'
        />{" "}
        {warningTxt}
      </p>
      <button
        className='bit-btn'
        onClick={handleReset}>
        {proceedTxt}
      </button>
    </div>
  );
};

export default WarningCard;
