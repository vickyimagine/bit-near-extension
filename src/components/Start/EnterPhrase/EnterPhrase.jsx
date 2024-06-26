/*global chrome*/
import React, {useState} from "react";
import {shuffle} from "../../../utils";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import {BsArrowCounterclockwise} from "react-icons/bs";
import {HiMiniArrowLongRight} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";

const EnterPhrase = ({phrase, setIsEnterPhrase, keyStore}) => {
  //hooks
  const {lang} = useSelector(state => state.wallet);
  const navigate = useNavigate();
  const [originalArray, setOriginalArray] = useState(phrase);
  const [checkedArray, setCheckedArray] = useState([]);
  const isPhraseCorrect = checkedArray.join("") === phrase.join("");

  //translations
  const enterPhrsTxt = lang === "en" ? engJs.enterPhrsTxt1 : spainJs.enterPhrsTxt1;
  const retryTxt = lang === "en" ? engJs.retry : spainJs.retry;
  const nextTxt = lang === "en" ? engJs.next : spainJs.next;

  //functions
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
      const newStore = {
        publicKey: keyStore.publicKey,
        secretKey: keyStore.secretKey,
        accountId: keyStore.accountId
      };
      navigate("/login/create-password");
    }
  };

  return (
    <div className='flex flex-col w-full justify-start mt-3 space-y-7 items-center'>
      <button
        className='self-start px-4'
        onClick={() => {
          setIsEnterPhrase(false);
        }}>
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </button>
      <div className='grid grid-cols-6 border bg-col_1 border-white h-1/4 pt-2  justify-center rounded-lg w-full px-2'>
        {checkedArray &&
          checkedArray.map(item => (
            <button
              key={item}
              className='flex justify-center items-center m-1 p-2 h-fit  text-white bg-black rounded-md'
              onClick={() => {
                deleteCheckedWord(item);
              }}>
              {item}
            </button>
          ))}
      </div>
      <p className='text-white '>{enterPhrsTxt}</p>
      <div className='grid grid-cols-6 border pt-2 px-2 border-col_1 h-1/4  w-full  rounded-md'>
        {originalArray.map(item => (
          <button
            key={item}
            className='flex justify-center items-center p-2 h-fit m-1  text-white border border-white rounded-lg  text-sm '
            onClick={() => {
              updateCheckedArray(item);
            }}>
            {item}
          </button>
        ))}
      </div>

      {isPhraseCorrect ? (
        <button
          className={`bit-btn px-7 flex items-center gap-x-2 ${
            checkedArray.length !== 12 && "hidden"
          } cursor-pointer`}
          onClick={saveKeyStore}>
          {nextTxt}
          <HiMiniArrowLongRight fontSize={24} />
        </button>
      ) : (
        <button
          className={`bit-btn  bg-white px-7 flex items-center gap-x-2 opacity-90 ${
            checkedArray.length !== 12 && "hidden"
          } cursor-pointer`}
          onClick={resetPhrase}>
          {retryTxt}
          <BsArrowCounterclockwise fontSize={24} />
        </button>
      )}
    </div>
  );
};

export default EnterPhrase;
