/*global chrome*/
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";
import {AiFillEye} from "react-icons/ai";
import Terms from "../../Sidebar/Terms&Conditions/Terms";
import toast from "react-hot-toast";

const EnterPassword = ({setNextPage}) => {
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [finalPassword, setFinalPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!password.length > 8) {
      toast.error("Password length should be greater than 8 characters");
      return;
    }
    // Retrieve the stored JSON string from local storage
    const storedJSON = localStorage.getItem("keyStore");

    // Parse the JSON string into an object
    const storedObject = JSON.parse(storedJSON);

    // Modify the object by adding a new field
    storedObject.password = password;

    // Stringify the updated object
    const updatedJSON = JSON.stringify(storedObject);

    // Store the updated JSON string back into local storage
    localStorage.setItem("keyStore", updatedJSON);

    chrome.storage.sync.set({
      keyStore: updatedJSON
    });

    navigate("/homescreen");
  };

  return terms ? (
    <Terms setTerms={setTerms} />
  ) : (
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
        <div className='flex items-center relative'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`p-2 px-4 focus:outline-none ring-bitBg  bg-transparent border-b caret-white text-white w-full`}
          />
          <AiFillEye
            fontSize={28}
            color='white'
            className='absolute z-10 right-0 cursor-pointer'
            onMouseDown={() => {
              setShowPassword(true);
            }}
            onMouseUp={() => {
              setShowPassword(false);
            }}
          />
        </div>
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
          <p className='text-white'>
            Accept{" "}
            <button
              className='font-bold text-white cursor-pointer border-b'
              onClick={() => {
                setTerms(true);
              }}>
              Terms & Conditions
            </button>
          </p>
        </div>
      </div>

      <button
        className={`bit-btn px-8 ${
          (finalPassword.length === 0 ||
            password.length === 0 ||
            checked === false ||
            password !== finalPassword) &&
          "opacity-70 cursor-not-allowed"
        }`}
        disabled={
          finalPassword.length === 0 ||
          password.length === 0 ||
          checked === false ||
          password !== finalPassword
        }
        onClick={() => {
          handleSave();
        }}>
        <p>Next</p>
      </button>
    </div>
  );
};

export default EnterPassword;
