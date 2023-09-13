import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";
import {useSelector} from "react-redux";
import {toast} from "react-hot-toast";

import {transferNear} from "../../utils";

const ReceiverDetails = ({setNextStep, amount}) => {
  const {accountId, currentNetwork, secretKey} = useSelector(state => state.wallet);
  const [recipient, setRecipient] = useState(null);

  const navigate = useNavigate();

  const sendNear = async () => {
    toast.loading("Transferring...");
    try {
      setRecipient("");
      const txn = await transferNear(
        accountId,
        currentNetwork?.type,
        secretKey,
        recipient,
        amount
      );

      const {
        transaction: {hash}
      } = txn;
      toast.dismiss();
      toast.success(`Hash: ${hash.slice(0, 5)}...${hash.slice(-4)}`);
      navigate("/");
    } catch (error) {
      toast.dismiss();
      console.log(`Error occured:${error}`);
    }
  };

  return (
    <div className='flex flex-col  space-y-10'>
      <div className='relative flex items-center justify-center my-5 mb-8'>
        <button
          className='absolute bit-btn left-0'
          onClick={() => {
            setNextStep(false);
          }}>
          <IoMdArrowRoundBack fontSize={21} />
        </button>
        <span className='text-2xl text-white font-semibold'>{Number(amount)} NEAR</span>
      </div>
      <div className='flex p-2  rounded-md focus:ring-white ring-1 ring-slate-400 bg-transparent transparent-all duration-200'>
        <span className='w-1/5 text-white font-semibold'>Send To</span>
        <input
          type='text'
          className='text-end w-4/5 bg-transparent focus:outline-none text-white'
          placeholder='Account ID'
          onChange={e => {
            setRecipient(e.target.value);
          }}
          value={recipient && recipient}
        />
      </div>
      <button
        className='bit-btn'
        onClick={sendNear}>
        Send{" "}
      </button>
      <Link
        to='/homescreen'
        className='border-b w-fit self-center bit-btn'>
        Cancel
      </Link>
    </div>
  );
};

export default ReceiverDetails;
