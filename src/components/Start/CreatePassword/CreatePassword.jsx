import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";

const Cryptr = require("cryptr");

const EnterPassword = ({setNextPage}) => {
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [finalPassword, setFinalPassword] = useState("");

  const navigate = useNavigate();

  const handleSave = async () => {
    // Retrieve the stored JSON string from local storage
    const storedJSON = localStorage.getItem("keyStore");

    // Parse the JSON string into an object
    const storedObject = JSON.parse(storedJSON);

    //Hash the password and store it in DB
    const cryptr = new Cryptr("bit-wallet-password", {
      pbkdf2Iterations: 1000,
      saltLength: 10
    });
    const encryptedString = cryptr.encrypt(password);

    // Modify the object by adding a new field
    storedObject.password = encryptedString;

    // Stringify the updated object
    const updatedJSON = JSON.stringify(storedObject);

    // Store the updated JSON string back into local storage
    localStorage.setItem("keyStore", updatedJSON);

    navigate("/homescreen");
  };

  return (
    <div className='flex flex-col w-full items-center space-y-8'>
      <button
        className='bit-btn self-start px-4'
        onClick={() => {
          setNextPage(false);
          localStorage.removeItem("keyStore");
        }}>
        <IoMdArrowRoundBack fontSize={21} />
        <p>Back</p>
      </button>
      <div className='flex flex-col w-full space-y-4 gap-y-3 border border-white p-6 rounded-md h-fit'>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={`p-2 px-4 focus:outline-none ring-bitBg  bg-transparent border-b caret-white text-white`}
        />
        <input
          type='text'
          placeholder='Confirm Password'
          value={finalPassword}
          onChange={e => setFinalPassword(e.target.value)}
          className={`p-2 px-4 focus:outline-none ring-bitBg  bg-transparent border-b caret-white text-white ${
            finalPassword.length > 0 &&
            finalPassword !== password &&
            `border-b-2 border-red-600`
          }`}
        />
        <div className='flex gap-x-3'>
          <input
            type='checkbox'
            className='checkbox'
            onClick={e => {
              setChecked(e.target.checked);
            }}
          />
          <p>
            Accept{" "}
            <span className='font-semibold text-white cursor-pointer border-b'>
              Terms & Conditions
            </span>
          </p>
        </div>
      </div>
      <button
        className={`bit-btn px-8 ${
          (finalPassword.length === 0 ||
            password.length === 0 ||
            !checked ||
            password !== finalPassword) &&
          "opacity-70 cursor-not-allowed"
        }`}
        onClick={() => {
          handleSave();
        }}>
        <p>Next</p>
      </button>
    </div>
  );
};

export default EnterPassword;
