/*global chrome*/
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FiLogIn} from "react-icons/fi";
import {fetchKeys} from "../../../utils";
import {toast} from "react-hot-toast";
import {VscEye} from "react-icons/vsc";
import {VscEyeClosed} from "react-icons/vsc";

const Logout = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const keyStore = fetchKeys();

  const checkPassword = () => {
    if (keyStore) {
      if (keyStore.password === password && password) {
        toast.success("Logged In");
        // chrome.storage.sync.set({loggedIn: true});
        navigate("/");
      } else {
        toast.error("Wrong Password !");
      }
      setPassword("");
    }
  };

  return (
    <div className='flex flex-col items-center justify-around w-full'>
      <h1 className='text-white text-5xl font-bold'>Login</h1>
      <div className='flex flex-col items-start  space-y-3'>
        <p className='text-white font-semibold'>Enter Password</p>
        <div className='flex items-center relative'>
          <input
            type={showPassword ? "text" : "password"}
            className='bg-transparent focus:outline-none text-white ring-1 focus:ring-white transition-all duration-200 ring-slate-400 p-2 px-5 rounded-md w-72'
            placeholder='Password'
            onChange={e => {
              setPassword(e.target.value);
            }}
            autoComplete='off'
            value={password && password}
          />
          {showPassword ? (
            <VscEye
              fontSize={28}
              color='white'
              className='absolute z-20 right-3 cursor-pointer'
              onClick={() => {
                setShowPassword(false);
              }}
            />
          ) : (
            <VscEyeClosed
              fontSize={28}
              color='white'
              className='absolute z-20 right-3 cursor-pointer'
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )}
        </div>
      </div>
      <button
        className='bit-btn justify-center space-x-2 px-8'
        onClick={checkPassword}>
        <span>Login</span>
        <FiLogIn fontSize={20} />
      </button>
    </div>
  );
};

export default Logout;
