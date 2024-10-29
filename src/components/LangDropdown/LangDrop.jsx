import React, {useState} from "react";
import {langs} from "../../Constants/langs"; // Importing language data
import {useDispatch, useSelector} from "react-redux"; // Redux hooks
import {setLang} from "../../Store/wallet/wallet-slice"; // Action to set language
import {MdOutlineLanguage} from "react-icons/md"; // Language icon

const LangDropdown = ({isMainScreen, classNames, buttonClass}) => {
  // Hooks
  const {lang} = useSelector(state => state.wallet); // Access language from Redux state
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
  const dispatch = useDispatch();

  // Initial language display based on selected language
  const initialLang = lang === "en" ? "English" : "Spanish";
  const [inputData, setInputData] = useState({lang: initialLang});

  // Functions
  const toggleDropdown = () => setIsOpen(prev => !prev); // Toggle dropdown state

  const selectLang = language => {
    dispatch(setLang(language.key)); // Dispatch action to set selected language
    setInputData({lang: language.lang, key: language.key}); // Update input data
    setIsOpen(false); // Close dropdown
  };

  return (
    <div className={`relative inline-block text-right self-end ${classNames}`}>
      <button
        className={`select-button flex justify-center items-center gap-x-2 select-button-ghost w-36 max-w-xs text-white bg-transparent focus:outline-none rounded-md p-1 ${buttonClass}`}
        onClick={toggleDropdown}>
        <MdOutlineLanguage
          className='cursor-pointer'
          fontSize={24}
          color='white'
        />
        {!isMainScreen && inputData.lang}
      </button>
      {isOpen && (
        <div
          className={`absolute ${
            isMainScreen ? "-left-9" : ""
          } rounded-md mt-2 w-36 bg-white px-2`}>
          {langs.map((item, idx) => (
            <button
              key={item.key} // Use item.key as a unique key
              className={`flex items-center rounded-md justify-center py-2 gap-x-3 font-bold bg-white ${
                idx === 0
                  ? "border-b-[#7e787880] rounded-b-none border-[white] border"
                  : ""
              } text-black hover:bg-gray-100 w-full`}
              onClick={() => selectLang(item)}>
              <img
                src={item.img}
                className='w-5 h-5'
                alt={item.lang}
              />
              {item.lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LangDropdown;
