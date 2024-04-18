import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";
const Terms = ({setTerms}) => {
  const {lang} = useSelector(state => state.wallet);
  const termsTxt = lang === "en" ? engJs.termsConds : spainJs.termsConds;
  const termsPara1 = lang === "en" ? engJs.termsPara1 : spainJs.termsPara1;
  const termsHead2 = lang === "en" ? engJs.termHead2 : spainJs.termHead2;
  const termsPara2 = lang === "en" ? engJs.termsPara2 : spainJs.termsPara2;
  const termsHead3 = lang === "en" ? engJs.termsHead3 : spainJs.termsHead3;
  const termsPara3 = lang === "en" ? engJs.termsPara3 : spainJs.termsPara3;
  const termsHead4 = lang === "en" ? engJs.termsHead4 : spainJs.termsHead4;
  const termsPara4 = lang === "en" ? engJs.termsPara4 : spainJs.termsPara4;
  const termsHead5 = lang === "en" ? engJs.termsHead5 : spainJs.termsHead5;
  const termsPara5 = lang === "en" ? engJs.termsPara5 : spainJs.termsPara5;
  const termsHead6 = lang === "en" ? engJs.termsHead6 : spainJs.termsHead6;
  const termsPara6 = lang === "en" ? engJs.termsPara6 : spainJs.termsPara6;
  const termsHead7 = lang === "en" ? engJs.termsHead7 : spainJs.termsHead7;
  const termsPara7 = lang === "en" ? engJs.termsPara7 : spainJs.termsPara7;
  const termsHead8 = lang === "en" ? engJs.termsHead8 : spainJs.termsHead8;
  const termsPara8 = lang === "en" ? engJs.termsPara8 : spainJs.termsPara8;
  const termsHead9 = lang === "en" ? engJs.termsHead9 : spainJs.termsHead9;
  const termsPara9 = lang === "en" ? engJs.termsPara9 : spainJs.termsPara9;
  const termsHead10 = lang === "en" ? engJs.termsHead10 : spainJs.termsHead10;
  const termsPara10 = lang === "en" ? engJs.termsPara10 : spainJs.termsPara10;
  const termsHead11 = lang === "en" ? engJs.termsHead11 : spainJs.termsHead11;
  const termsPara11 = lang === "en" ? engJs.termsPara11 : spainJs.termsPara11;
  const termsHead12 = lang === "en" ? engJs.termsHead12 : spainJs.termsHead12;
  const termsPara12 = lang === "en" ? engJs.termsPara12 : spainJs.termsPara12;
  const termsHead13 = lang === "en" ? engJs.termsHead13 : spainJs.termsHead13;
  const termsPara13 = lang === "en" ? engJs.termsPara13 : spainJs.termsPara13;
  const termsHead14 = lang === "en" ? engJs.termsHead14 : spainJs.termsHead14;
  const termsPara14 = lang === "en" ? engJs.termsPara14 : spainJs.termsPara14;
  const termsHead15 = lang === "en" ? engJs.termsHead15 : spainJs.termsHead15;
  const termsPara15 = lang === "en" ? engJs.termsPara15 : spainJs.termsPara15;

  return (
    <div className='flex flex-col items-start w-full'>
      {setTerms !== (null || undefined) ? (
        <button
          className=' w-fit self-start'
          onClick={() => setTerms(false)}>
          <PiArrowBendUpLeftBold
            fontSize={28}
            color='white'
          />
        </button>
      ) : (
        <Link
          to='/homescreen'
          className=' w-fit self-start'>
          <PiArrowBendUpLeftBold
            fontSize={28}
            color='white'
          />
        </Link>
      )}

      <h1 className='text-5xl text-white font-semibold mt-3'>{termsTxt}</h1>

      <div className='terms text-white overflow-y-scroll cursor-default space-y-3'>
        <p>{termsPara1}</p>
        <span className='font-bold text-white text-xl'>{termsHead2}:</span>
        <p>{termsPara2}</p>
        <span className='font-bold text-white text-xl'>{termsHead3}</span>
        <p>{termsPara3}</p>
        <span className='font-bold text-white text-xl'>{termsHead4}</span>
        <p>{termsPara4}</p>
        <span className='font-bold text-white text-xl'>{termsHead5}:</span>
        <p>{termsPara5}</p>

        <span className='font-bold text-white text-xl'>{termsHead6}</span>
        <p>{termsPara6}</p>
        <span className='font-bold text-white text-xl'>{termsHead7}:</span>
        <p>{termsPara7}</p>
        <span className='font-bold text-white text-xl'>{termsHead8}:</span>
        <p>{termsPara8}</p>

        <span className='font-bold text-white text-xl'>{termsHead9}:</span>
        <p>{termsPara9}</p>
        <span className='font-bold text-white text-xl'>{termsHead10}</span>
        <p>{termsPara10}</p>

        <span className='font-bold text-white text-xl'>{termsHead11}:</span>
        <p>{termsPara11}</p>
        <span className='font-bold text-white text-xl'>{termsHead12}:</span>
        <p>{termsPara12}</p>
        <span className='font-bold text-white text-xl'>{termsHead13}:</span>
        <p>{termsPara13}</p>
        <span className='font-bold text-white text-xl'>{termsHead14}:</span>
        <p>{termsPara14}</p>
        <span className='font-bold text-white text-xl'>{termsHead15}:</span>
        <p>{termsPara15}</p>
      </div>
    </div>
  );
};

export default Terms;
