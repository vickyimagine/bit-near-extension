/*global chrome*/
import React, {useState} from "react";
import {IoMdArrowRoundBack} from "react-icons/io";
import {Link} from "react-router-dom";
import {genFromSecret, getAccountId} from "../../../utils";
import {parseSeedPhrase} from "near-seed-phrase";
import {CreatePassword} from "../../../components";
import {encrypt} from "n-krypta";
import {toast} from "react-hot-toast";

const ImportAccount = () => {
  const [inputData, setInputData] = useState({
    method: "secretKey",
    value: ""
  });
  const [nextPage, setNextPage] = useState(false);

  const handleInput = e => {
    setInputData(prev => {
      return {
        ...prev,
        value: e.target.value
      };
    });
  };
  //Check if input phrase is valid or not

  function checkInputPhrase(input) {
    // Split the input phrase into words using space as the delimiter
    const words = input.trim().split(" ");

    // Check if the number of words is equal to 12
    if (words.length !== 12) {
      throw new Error("Input phrase must contain exactly 12 words.");
    }

    // If the number of words is 12, return true or perform further processing
    return true;
  }

  const importAccount = () => {
    try {
      let accountId, publicKey, secretKey;

      if (inputData.method === "secretKey") {
        const {accId, pubKey, privKey, privateKeyBytes} = genFromSecret(inputData.value);
        if (privateKeyBytes.length !== 64) {
          return toast.error("Invalid Secret Key");
        }

        accountId = accId;
        publicKey = pubKey.slice(8);
        secretKey = privKey.slice(8);
      } else {
        if (!checkInputPhrase(inputData.value)) {
          throw new Error(checkInputPhrase(inputData.value));
        }
        const keyStore = parseSeedPhrase(inputData.value);
        console.log(keyStore);
        accountId = getAccountId(keyStore.publicKey.slice(8));
        publicKey = keyStore.publicKey.slice(8);
        secretKey = keyStore.secretKey.slice(8);
      }

      const newStore = JSON.stringify({
        accountId: accountId,
        publicKey: publicKey,
        secretKey: encrypt(secretKey, publicKey)
      });
      localStorage.setItem("keyStore", newStore);
      chrome.storage.sync.set({
        keyStore: newStore
      });

      setNextPage(true);
    } catch (error) {
      // Handle the error (e.g., display a toast error message)
      toast.error(
        error.message.charAt(0).toUpperCase() + error.message.slice(1).toLowerCase()
      );
    }
    setInputData(prev => ({
      ...prev,
      value: ""
    }));
  };

  return nextPage ? (
    <CreatePassword setNextPage={setNextPage} />
  ) : (
    <div className='flex flex-col justify-between w-full'>
      <Link
        to='/login/account-options'
        className='bit-btn self-start px-4'
        onClick={() => {}}>
        <IoMdArrowRoundBack fontSize={21} />
        <p>Back</p>
      </Link>
      <div className='flex flex-col space-y-4'>
        <h1 className='text-white text-5xl font-bold'>Import Wallet</h1>
        <select
          id='countries'
          className='bg-transparent text-sm rounded-lg text-white p-3 border outline-none w-fit self-end'
          onChange={e => {
            setInputData({
              value: "",
              method: e.target.value
            });
          }}>
          <option
            value='secretKey'
            className='text-black'>
            Secret Key
          </option>
          <option
            value='phrase'
            className='text-black'>
            Phrase
          </option>
        </select>
        <input
          type='text'
          className='p-2 border outline-none bg-transparent rounded-md w-full text-white'
          onChange={handleInput}
          placeholder={
            inputData.method === "secretKey" ? "Enter Secret Key" : "Enter Seed Phrase"
          }
          value={inputData.value}
        />
      </div>
      <div className=' flex justify-center mb-5'>
        <button
          className='bit-btn px-4 disabled:cursor-not-allowed disabled:opacity-75'
          onClick={importAccount}
          disabled={inputData.value === ""}>
          <p>Import</p>
        </button>
      </div>
    </div>
  );
};

export default ImportAccount;
