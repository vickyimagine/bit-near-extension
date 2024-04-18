import React, {useState} from "react";
import {langs} from "../../Constants/langs";
import {useDispatch, useSelector} from "react-redux";
import {setLang} from "../../Store/wallet/wallet-slice";
import {IoIosArrowDown} from "react-icons/io";
import {MdOutlineLanguage} from "react-icons/md";

const LangDropdown = ({isMainScreen, classNames, buttonClass}) => {
  const {lang} = useSelector(state => state.wallet);
  const [isOpen, setIsOpen] = useState(false);
  const [inputData, setInputData] = useState({
    lang: lang === "en" ? "English" : "Spanish",
    value: ""
  });

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(prev => {
      return !prev;
    });
  };

  const selectLang = lang => {
    dispatch(setLang(lang.key));
    setInputData({lang: lang.lang, key: lang.key});
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-right self-end ${classNames} `}>
      <button
        className={`select-button flex justify-center self-end items-center gap-x-2 select-button-ghost w-36 max-w-xs  text-white bg-transparent  focus:outline-none rounded-md p-1 ${buttonClass}`}
        onClick={() => {
          if (!isMainScreen) {
            toggleDropdown();
          }
        }}>
        <MdOutlineLanguage
          className='cursor-pointer'
          fontSize={24}
          color='white'
          onClick={() => {
            if (isMainScreen) {
              toggleDropdown();
            }
          }}
        />
        {!isMainScreen && inputData.lang}
      </button>
      {isOpen && (
        <div
          className={`absolute ${
            isMainScreen && "-left-9"
          } rounded-md mt-2 w-36 bg-white px-2`}>
          {langs.map((item, idx) => (
            <button
              key={item.lang}
              className={`flex items-center rounded-md justify-center py-2 gap-x-3 font-bold bg-white ${
                idx === 0 && " border-b-[#7e787880] rounded-b-none border-[white] border"
              }  text-black hover:bg-gray-100 w-full `}
              onClick={() => {
                selectLang(item);
              }}>
              <img
                src={item.img}
                className='w-5 h-5'
                alt=''
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
