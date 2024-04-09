/*global chrome*/
import React, {useState} from "react";
import {IoMdArrowRoundBack} from "react-icons/io";
import {Link} from "react-router-dom";
import {genFromSecret, getAccountId} from "../../../utils";
import {parseSeedPhrase} from "near-seed-phrase";
import {CreatePassword} from "../../../components";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import {toast} from "react-hot-toast";
import {encrypt} from "n-krypta";
import {IoIosArrowDown} from "react-icons/io";

const ImportAccount = () => {
  const [inputData, setInputData] = useState({
    method: "Secret Key",
    value: ""
  });
  const [keyStore, setKeyStore] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  const methods = ["Secret Key", "Phrase"];
  const handleInput = e => {
    setInputData(prev => {
      return {
        ...prev,
        value: e.target.value
      };
    });
  };

  const toggleDropdown = () => {
    setIsOpen(prev => {
      return !prev;
    });
  };

  const selectMethod = method => {
    // dispatch(setCurrentNetwork(network));
    setInputData({method, value: ""});
    setIsOpen(false);
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

      if (inputData.method === "Secret Key") {
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
        // console.log(keyStore);
        accountId = getAccountId(keyStore.publicKey.slice(8));
        publicKey = keyStore.publicKey.slice(8);
        secretKey = keyStore.secretKey.slice(8);
      }

      const newStore = {
        accountId: accountId,
        publicKey: publicKey,
        secretKey: encrypt(secretKey, publicKey)
      };
      setKeyStore(newStore);

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
    <CreatePassword
      setNextPage={setNextPage}
      keyStore={keyStore}
    />
  ) : (
    <div className='flex flex-col justify-between w-full'>
      <Link
        to='/login/account-options'
        className=' self-start px-4 pt-3'>
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </Link>
      <div className='flex flex-col space-y-5'>
        <h1 className='text-white text-4xl font-bold self-center'>Import Wallet</h1>
        <div className='flex flex-col space-y-2'>
          <div className='relative inline-block text-right self-end'>
            <button
              className='select-button flex justify-center self-end items-center gap-x-2 select-button-ghost w-36 max-w-xs border text-white bg-transparent border-white focus:outline-none rounded-md p-1 '
              onClick={toggleDropdown}>
              {inputData.method}{" "}
              <IoIosArrowDown
                fontSize={24}
                className={`hover:scale-105 ${
                  isOpen && "rotate-180"
                } transition-all duration-300`}
              />
            </button>
            {isOpen && (
              <div className=' absolute rounded-md mt-2 w-36 bg-white px-2'>
                {methods.map((item, idx) => (
                  <button
                    key={item}
                    className={`flex items-center rounded-md justify-center py-2 font-bold bg-white ${
                      idx === 0 &&
                      " border-b-[#7e787880] rounded-b-none border-[white] border"
                    }  text-black hover:bg-gray-100 w-full `}
                    onClick={() => {
                      selectMethod(item);
                    }}>
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type='text'
            className='p-2 border outline-none bg-transparent rounded-lg w-full text-white'
            onChange={handleInput}
            placeholder={
              inputData.method === "Secret Key" ? "Enter Secret Key" : "Enter Seed Phrase"
            }
            value={inputData.value}
          />
        </div>
      </div>
      <div className=' flex justify-center mb-5'>
        <button
          className='bit-btn px-4 disabled:cursor-not-allowed'
          onClick={importAccount}
          disabled={inputData.value === ""}>
          <p>Import</p>
        </button>
      </div>
    </div>
  );
};

export default ImportAccount;
