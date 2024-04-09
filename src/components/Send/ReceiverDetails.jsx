import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";
import {useSelector} from "react-redux";
import {toast} from "react-hot-toast";
import {PiArrowBendUpLeftBold} from "react-icons/pi";

import {transferNear} from "../../utils";

const ReceiverDetails = ({setNextStep, amount}) => {
  const {accountId, currentNetwork, secretKey} = useSelector(state => state.wallet);
  const [recipient, setRecipient] = useState("");
  const [transferring, setTransferring] = useState(false);

  const navigate = useNavigate();

  const sendNear = async () => {
    // if (recipient.length !== 64) {
    //   setRecipient("");
    //   return toast.error("Invalid Account Id");
    // }
    if (recipient === accountId) {
      setRecipient("");
      return toast.error("Same Account Id found");
    }
    toast.loading("Transferring...");
    setTransferring(true);
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
    } catch (error) {
      toast.dismiss();
      toast.error("Transfer Error !");
      // console.log(`Error occured:${error}`);
    }
    navigate("/");
    setTransferring(false);
  };

  return (
    <div className='flex flex-col space-y-16 '>
      <div>
        <div className='relative flex items-center justify-center mb-8'>
          <button
            className='absolute left-4'
            onClick={() => {
              setNextStep(false);
            }}>
            <PiArrowBendUpLeftBold
              fontSize={28}
              color='white'
            />
          </button>
          <span className='text-4xl text-white font-synco_thin'>
            {Number(amount)} <span className=''>NEAR</span>
          </span>
        </div>
        <div className='flex p-2  text-white rounded-md focus:ring-white ring-1 ring-slate-400 transparent-all duration-200 bg-[#FFFFFF4D]'>
          <span className='w-1/5 text-[#FFFFFFB2] font-medium'>Send To</span>
          <input
            type='text'
            className='text-end w-4/5 bg-transparent focus:outline-none text-white '
            placeholder='Account ID'
            onChange={e => {
              setRecipient(e.target.value);
            }}
            value={recipient && recipient}
          />
        </div>
      </div>
      <div className='flex flex-col space-y-7 '>
        <button
          className='bit-btn w-fit self-center px-40 py-3 font-bold disabled:cursor-not-allowed'
          disabled={!recipient || transferring}
          onClick={sendNear}>
          Send
        </button>
        <Link
          to='/homescreen'
          className='border-b w-fit self-center bit-btn bg-white px-7'>
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default ReceiverDetails;
