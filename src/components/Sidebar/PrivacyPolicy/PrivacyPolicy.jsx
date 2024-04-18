import React from "react";
import {Link} from "react-router-dom";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import {useSelector} from "react-redux";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";

const PrivacyPolicy = () => {
  const {lang} = useSelector(state => state.wallet);

  const privacyTxt = lang === "en" ? engJs.privacyPolicy : spainJs.privacyPolicy;
  const privTxtArray = [];

  for (let i = 1; i <= 99; i++) {
    privTxtArray[i] = lang === "en" ? engJs[`privTxt${i}`] : spainJs[`privTxt${i}`];
  }

  return (
    <div className='flex flex-col items-start w-full space-y-3'>
      <Link
        to='/homescreen'
        className=' w-fit self-start'>
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </Link>
      <h1 className='text-5xl text-white font-semibold'>{privacyTxt}</h1>
      <p className='text-xl font-semibold text-white'>
        {lang === "en" ? "About" : "Sobre"} Beyond Imagination Technologies
      </p>
      <div className='privacy text-white overflow-y-scroll cursor-default'>
        <p>
          {privTxtArray[1]} <b> (“{privTxtArray[2]}”) </b>
          {privTxtArray[3]}
          <br />
          <br />
          {privTxtArray[4]}
          <b> {privTxtArray[5]}</b> {privTxtArray[6]}{" "}
        </p>{" "}
        <br />
        <p>
          <b> {privTxtArray[7]}: </b> <br />
          {privTxtArray[8]}{" "}
        </p>{" "}
        <br />
        <p>
          <b> {privTxtArray[9]} </b> <br />
          {privTxtArray[10]} <br />
          {privTxtArray[11]} :
        </p>{" "}
        <ul className=' list-decimal pl-6 mt-2'>
          <li> {privTxtArray[12]} </li> <li> {privTxtArray[13]} </li>{" "}
          <li> {privTxtArray[14]} </li> <li> {privTxtArray[15]} </li>{" "}
          <li> {privTxtArray[16]}</li>{" "}
        </ul>{" "}
        <br />
        <p>
          {privTxtArray[17]} <b> {privTxtArray[18]} </b>{" "}
        </p>{" "}
        <br />
        <p>{privTxtArray[19]} </p> <br />
        <h2 className='font-bold'> {privTxtArray[20]}</h2>{" "}
        <ul className=' list-decimal pl-6 mt-2'>
          <li>{privTxtArray[21]} </li> <li>{privTxtArray[22]} </li>{" "}
          <li> {privTxtArray[23]} </li> <li>{privTxtArray[24]} </li>{" "}
          <li>{privTxtArray[25]} </li> <li>{privTxtArray[26]} </li>{" "}
        </ul>{" "}
        <br />
        <h2 className='font-bold'> {privTxtArray[27]} </h2> <p> {privTxtArray[28]} </p>{" "}
        <ul className=' list-disc pl-6 mt-2'>
          <li>{privTxtArray[29]} </li> <li> {privTxtArray[30]} </li>{" "}
          <li> {privTxtArray[31]} </li> <li>{privTxtArray[32]} </li>{" "}
          <li> {privTxtArray[33]} </li> <li> {privTxtArray[34]}</li>{" "}
          <li>{privTxtArray[35]} </li> <li> {privTxtArray[36]} </li>{" "}
          <li> {privTxtArray[37]}</li> <li> {privTxtArray[38]}</li>{" "}
          <li>{privTxtArray[39]} </li> <li>{privTxtArray[40]} </li>{" "}
          <li>{privTxtArray[41]}</li> <br />
          <b> {privTxtArray[42]} </b> <li>{privTxtArray[43]} </li>{" "}
          <li>{privTxtArray[44]} </li> <li>{privTxtArray[45]} </li>{" "}
        </ul>{" "}
        <br />
        <p>{privTxtArray[46]} </p> <br />
        <p>{privTxtArray[47]} </p> <br />
        <b> {privTxtArray[48]}</b> <p>{privTxtArray[49]} </p> <br />
        <b> {privTxtArray[50]}: </b> <p>{privTxtArray[51]} </p> <br />
        <b>{privTxtArray[52]}: </b> <p>{privTxtArray[53]} </p> <br />
        <b> {privTxtArray[54]}: </b> <p>{privTxtArray[55]} </p> <br />
        <b> {privTxtArray[56]}</b>{" "}
        <p>
          {privTxtArray[57]}: <br />
          <b> {privTxtArray[58]} </b> {privTxtArray[59]} <br />
          <b>{privTxtArray[60]}</b> {privTxtArray[61]} <br />
          <b>{privTxtArray[62]}</b> {privTxtArray[63]} <br />
          <b> {privTxtArray[64]} </b> {privTxtArray[65]}
          <br />
          <b>{privTxtArray[66]}</b> {privTxtArray[67]} <br />
          <b> {privTxtArray[68]} </b> {privTxtArray[69]}{" "}
        </p>{" "}
        <br />
        <p>{privTxtArray[70]} </p> <br />
        <p> {privTxtArray[71]}: </p>{" "}
        <ul className=' list-decimal pl-6 mt-2'>
          <li>{privTxtArray[72]} </li> <li>{privTxtArray[73]} </li>{" "}
          <li>{privTxtArray[74]} </li>{" "}
        </ul>{" "}
        <br />
        <b>{privTxtArray[75]}: </b> <p>{privTxtArray[76]} </p> <br />
        <b>{privTxtArray[77]}: </b> <p>{privTxtArray[78]} </p> <br />
        <b> {privTxtArray[79]}: </b> <p>{privTxtArray[80]} </p> <br />
        <b>{privTxtArray[81]}: </b>{" "}
        <p>
          {privTxtArray[82]}
          <br />
          {privTxtArray[83]}{" "}
        </p>{" "}
        <p> {privTxtArray[84]}: </p> <p> {privTxtArray[85]}: </p>{" "}
        <p>{privTxtArray[86]}</p>
        {privTxtArray[87]} <br />
        <p>{privTxtArray[88]}</p>{" "}
        <ul className='list-decimal pl-6 mt-2'>
          <li>{privTxtArray[89]} </li> <li>{privTxtArray[90]} </li>{" "}
          <li>{privTxtArray[91]} </li> <li>{privTxtArray[92]} </li>{" "}
          <li>{privTxtArray[93]} </li> <li>{privTxtArray[94]} </li>{" "}
        </ul>{" "}
        <br />
        <b> {privTxtArray[95]}:</b> <p>{privTxtArray[96]} </p> <p>{privTxtArray[97]} </p>{" "}
        <br />
        <b> {privTxtArray[98]} </b> <p>{privTxtArray[99]} </p>{" "}
      </div>{" "}
    </div>
  );
};

export default PrivacyPolicy;
