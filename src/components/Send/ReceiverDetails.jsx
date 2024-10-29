import React, {useState} from "react"; // Import React and useState
import {Link, useNavigate} from "react-router-dom"; // Import Link and useNavigate for routing
import {IoMdArrowRoundBack} from "react-icons/io"; // Import icon
import {useSelector} from "react-redux"; // Import Redux hook
import {toast} from "react-hot-toast"; // Import toast for notifications
import {PiArrowBendUpLeftBold} from "react-icons/pi"; // Import back arrow icon
import engJs from "../../Constants/en"; // Import English translations
import spainJs from "../../Constants/es"; // Import Spanish translations
import {transferNear} from "../../utils"; // Import transfer function

const ReceiverDetails = ({setNextStep, amount}) => {
  // Hooks
  const {accountId, currentNetwork, secretKey, lang} = useSelector(state => state.wallet); // Access Redux state
  const [recipient, setRecipient] = useState(""); // State for recipient's account ID
  const [transferring, setTransferring] = useState(false); // State to track transfer status
  const navigate = useNavigate(); // Hook for navigation

  // Translations
  const translations = lang === "en" ? engJs : spainJs; // Simplify language handling
  const {sendTo, send, cancel} = translations;

  // Functions
  const sendNear = async () => {
    if (recipient === accountId) {
      setRecipient("");
      return toast.error("Same Account ID found"); // Error for same account ID
    }

    toast.loading("Transferring...");
    setTransferring(true); // Set transferring state to true

    try {
      const txn = await transferNear(
        accountId,
        currentNetwork?.type,
        secretKey,
        recipient,
        amount
      );

      const {
        transaction: {hash}
      } = txn; // Destructure transaction hash
      toast.dismiss();
      toast.success(`Hash: ${hash.slice(0, 5)}...${hash.slice(-4)}`); // Display success message
    } catch (error) {
      toast.dismiss();
      toast.error("Transfer Error!"); // Error message for transfer failure
      // console.error(`Error occurred: ${error}`); // Log error for debugging
    } finally {
      setTransferring(false); // Reset transferring state
      navigate("/"); // Navigate back to the home screen
    }
  };

  return (
    <div className='flex flex-col space-y-16'>
      <div>
        <div className='relative flex items-center justify-center mb-8'>
          <button
            className='absolute left-4'
            onClick={() => setNextStep(false)}>
            <PiArrowBendUpLeftBold
              fontSize={28}
              color='white'
            />
          </button>
          <span className='text-4xl text-white font-synco_thin'>
            {Number(amount)} <span>NEAR</span>
          </span>
        </div>
        <div className='flex p-2 text-white rounded-md focus:ring-white ring-1 ring-slate-400 bg-[#FFFFFF4D]'>
          <span className='w-1/5 text-[#FFFFFFB2] font-medium'>{sendTo}</span>
          <input
            type='text'
            className='text-end w-4/5 font-inter bg-transparent focus:outline-none text-white'
            placeholder='Account ID'
            onChange={e => setRecipient(e.target.value)} // Update recipient state
            value={recipient} // Set input value to recipient state
          />
        </div>
      </div>
      <div className='flex flex-col space-y-7'>
        <button
          className='bit-btn w-fit self-center px-40 py-3 font-bold disabled:cursor-not-allowed'
          disabled={!recipient || transferring} // Disable if no recipient or if transferring
          onClick={sendNear}>
          {send}
        </button>
        <Link
          to='/homescreen'
          className='border-b w-fit self-center bit-btn bg-white px-7'>
          {cancel}
        </Link>
      </div>
    </div>
  );
};

export default ReceiverDetails;
