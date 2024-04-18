import React from "react";
import {sidebarLinks} from "../../Constants/sidebarData";
import {AiFillCloseSquare} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import engJs from "../../Constants/en";
import spainJs from "../../Constants/es";

const Sidebar = () => {
  const {lang} = useSelector(state => state.wallet);
  const navigate = useNavigate();
  const aboutTxt = lang === "en" ? engJs.aboutUs : spainJs.aboutUs;
  const termsTxt = lang === "en" ? engJs.termsConds : spainJs.termsConds;
  const privacyTxt = lang === "en" ? engJs.privacyPolicy : spainJs.privacyPolicy;
  const revealKeyTxt = lang === "en" ? engJs.revealSecretKey : spainJs.revealSecretKey;
  const logoutTxt = lang === "en" ? engJs.logout : spainJs.logout;
  const resetTxt = lang === "en" ? engJs.reset : spainJs.reset;
  const titles = [aboutTxt, termsTxt, privacyTxt, revealKeyTxt, logoutTxt, resetTxt];

  return (
    <div className='flex flex-col   py-6 z-10 rounded-xl bg-white'>
      <div>
        {sidebarLinks?.map((item, index) => {
          return (
            <span
              key={index}
              className=' hover:bg-col_1 flex items-center gap-x-3 py-6 cursor-pointer font-semibold text-lg pl-5 pt-2 p-1  transition-all duration-400'
              onClick={() => {
                item.handler();
                navigate(item.destination);
              }}>
              <img
                src={item.logo}
                alt='Img  '
              />
              {titles[index]}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
