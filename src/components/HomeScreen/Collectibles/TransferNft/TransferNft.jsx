/*global chrome*/
import React, {useState} from "react";
import {transferNFT} from "../../../../utils/methods/nearMethods";
import {useSelector} from "react-redux";
import toast from "react-hot-toast";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import engJs from "../../../../Constants/en";
import spainJs from "../../../../Constants/es";
import {contactBackground} from "../../../../utils/methods/contactBackground";

const TransferNft = ({setIsTransfer, nft, setCardOpen, certTransfer}) => {
  const {accountId, currentNetwork, secretKey, lang} = useSelector(state => state.wallet);
  const [recipient, setRecipient] = useState("");
  const [transferring, setTransferring] = useState(false);
  const {token_id, contractId} = nft;

  // Translations
  const translations = {
    transfer: lang === "en" ? engJs.transfer : spainJs.transfer,
    cancel: lang === "en" ? engJs.cancel : spainJs.cancel,
    transferTo: lang === "en" ? engJs.transferTo : spainJs.transferTo
  };

  const updateStorage = async () => {
    try {
      const nftData = JSON.parse(localStorage.getItem("nfts")) || [];
      const updatedNfts = nftData.filter(
        NFT => !(NFT.token_id === token_id && NFT.contractId === contractId)
      );
      localStorage.setItem("nfts", JSON.stringify(updatedNfts));
    } catch (error) {
      console.error(`Error updating storage: ${error}`);
    }
  };

  const transferNft = async () => {
    if (!recipient) {
      toast.error("Please enter a valid recipient account ID.");
      return;
    }

    setTransferring(true);
    toast.loading("Transferring NFT...");

    try {
      const res = await transferNFT(
        token_id.toString(),
        accountId,
        contractId,
        recipient,
        currentNetwork?.type,
        secretKey
      );
      toast.dismiss();

      if (res.status) {
        toast.success("NFT transferred successfully on the blockchain!");
        await updateStorage();

        if (certTransfer || contractId === process.env.REACT_APP_BIT_CONTRACT) {
          const data = await contactBackground("UpdateOwnership", {
            ...nft,
            to: recipient
          });
          if (data?.status) {
            toast.success("Certificate transferred successfully!");
          } else {
            toast.error("Certificate transfer failed.");
          }
        }
      } else {
        toast.error("Transfer error from the blockchain.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred while transferring. Please try again.");
      console.error(`Transfer error: ${error}`);
    } finally {
      setIsTransfer(false);
      setCardOpen(false);
      setRecipient("");
      setTransferring(false);
    }
  };

  return (
    <div className='flex flex-col space-y-10'>
      <div className='relative flex items-center justify-center my-5 mb-8'>
        <button
          className='absolute left-0'
          onClick={() => setIsTransfer(false)}>
          <PiArrowBendUpLeftBold
            fontSize={28}
            color='white'
          />
        </button>
      </div>
      <div className='flex p-2 rounded-md ring-1 ring-slate-400 bg-transparent duration-200'>
        <span className='w-1/4 text-white font-semibold'>{translations.transferTo}</span>
        <input
          type='text'
          className='text-end w-4/5 bg-transparent font-inter focus:outline-none text-white'
          placeholder='Account ID'
          onChange={e => setRecipient(e.target.value)}
          value={recipient}
        />
      </div>

      <button
        className='bit-btn disabled:cursor-not-allowed'
        disabled={transferring || !recipient}
        onClick={transferNft}>
        {translations.transfer}
      </button>

      <button
        onClick={() => setCardOpen(false)}
        className='border-b w-fit self-center bit-btn bg-white px-7'>
        {translations.cancel}
      </button>
    </div>
  );
};

export default TransferNft;
