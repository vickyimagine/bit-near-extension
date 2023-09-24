/*global chrome*/
import React, {useState} from "react";
import {IoMdArrowRoundBack} from "react-icons/io";
import {shuffle} from "../../../utils";
import {CreatePassword} from "../../../components";

const EnterPhrase = ({phrase, setIsEnterPhrase, keyStore}) => {
  const [originalArray, setOriginalArray] = useState(phrase);
  const [checkedArray, setCheckedArray] = useState([]);
  const [nextPage, setNextPage] = useState(false);

  //Add element in the above box array
  const updateCheckedArray = word => {
    const newOriginalArray = shuffle(originalArray.filter(item => item !== word));
    setOriginalArray(newOriginalArray);
    setCheckedArray(prev => {
      return [...prev, word];
    }); // Add the word to checkedArray
  };

  //Remove element from the above box array
  const deleteCheckedWord = word => {
    const newCheckedArray = checkedArray.filter(item => item !== word);
    setCheckedArray(newCheckedArray); // Remove the word from checkedArray
    setOriginalArray(prev => {
      return [...prev, word];
    });
  };

  //Reset the phrase to let user enter the phrase again
  const resetPhrase = () => {
    setCheckedArray([]);
    setOriginalArray([...phrase]);
  };

  //Storing the Key Pairs and Seed to local storage
  const saveKeyStore = () => {
    if (keyStore) {
      const newStore = JSON.stringify({
        publicKey: keyStore.publicKey,
        secretKey: keyStore.secretKey,
        accountId: keyStore.accountId
      });
      chrome.storage.sync.set({
        keyStore: newStore
      });
      localStorage.setItem("keyStore", newStore);
    }
    setNextPage(true);
  };

  return nextPage ? (
    <CreatePassword setNextPage={setNextPage} />
  ) : (
    <div className='flex flex-col w-full justify-between items-center'>
      <button
        className='bit-btn self-start px-4'
        onClick={() => {
          setIsEnterPhrase(false);
        }}>
        <IoMdArrowRoundBack fontSize={21} />
        <p>Back</p>
      </button>
      <div className='flex flex-wrap border border-white h-1/4 justify-center rounded-md w-full'>
        {checkedArray &&
          checkedArray.map(item => (
            <button
              key={item}
              className='flex justify-center items-center m-1 p-1 h-fit  text-bitBg bg-white rounded-md'
              onClick={() => {
                deleteCheckedWord(item);
              }}>
              {item}
            </button>
          ))}
      </div>
      <p className='text-white font-semibold'>
        Select the words in order of the secret phrase.
      </p>
      <div className='flex flex-wrap border border-white h-1/4 w-full justify-center rounded-md'>
        {originalArray.map(item => (
          <button
            key={item}
            className='flex justify-center items-center m-1 p-1 h-fit text-white border border-white rounded-md'
            onClick={() => {
              updateCheckedArray(item);
            }}>
            {item}
          </button>
        ))}
      </div>

      <button
        className={`bit-btn ${checkedArray.length !== 12 && "hidden"} cursor-pointer`}
        onClick={checkedArray.join("") === phrase.join("") ? saveKeyStore : resetPhrase}>
        {checkedArray.join("") === phrase.join("") ? "Next" : "Retry"}
      </button>
    </div>
  );
};

export default EnterPhrase;
