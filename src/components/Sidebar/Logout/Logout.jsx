import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IoLogIn} from "react-icons/io5";
import {fetchKeys} from "../../../utils";
import {toast} from "react-hot-toast";

const Cryptr = require("cryptr");

const Logout = () => {
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();
  const keyStore = fetchKeys();

  const checkPassword = () => {
    setPassword("");
    const cryptr = new Cryptr("bit-wallet-password", {
      pbkdf2Iterations: 1000,
      saltLength: 10
    });
    const decrypted = cryptr.decrypt(keyStore?.password);
    if (password === decrypted) {
      toast.success("Logged In");
      navigate("/");
    } else {
      toast.error("Wrong Password!!");
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
