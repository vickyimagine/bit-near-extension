/*global chrome*/
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IoLogIn} from "react-icons/io5";
import {fetchKeys} from "../../../utils";
import {toast} from "react-hot-toast";

const Logout = () => {
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();
  const keyStore = fetchKeys();

  const checkPassword = () => {
    if (keyStore) {
      if (keyStore.password === password) {
        toast.success("Logged In");
        chrome.storage.sync.set({loggedIn: true});
        navigate("/");
      } else {
        toast.error("Wrong Password !");
      }
      setPassword("");
    }
  };

  return (
    <div className='flex flex-col items-center justify-around w-full space-y-6'>
      <h1 className='text-white text-5xl font-bold'>Login</h1>
      <div className='flex flex-col items-start  space-y-3'>
        <p className='text-white font-semibold'>Enter Password</p>
        <input
          type='password'
          className='bg-transparent focus:outline-none text-white ring-1 focus:ring-white transition-all duration-200 ring-slate-400 p-2 px-4 rounded-md w-full'
          placeholder='Password'
          onChange={e => {
            setPassword(e.target.value);
          }}
          autoComplete='off'
          value={password && password}
        />
      </div>
      <button
        className='bit-btn px-8'
        onClick={checkPassword}>
        <span>Login</span>
        <IoLogIn fontSize={21} />
      </button>
    </div>
  );
};

export default Logout;
