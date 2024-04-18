import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {transferNFT} from "../../../../utils/methods/nearMethods";
import {useSelector} from "react-redux";
import toast from "react-hot-toast";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import engJs from "../../../../Constants/en";
import spainJs from "../../../../Constants/es";

const TransferNft = ({setIsTransfer, nft, setCardOpen, certTransfer}) => {
  const {accountId, currentNetwork, secretKey, lang} = useSelector(state => state.wallet);

  const transferTxt = lang === "en" ? engJs.transfer : spainJs.transfer;
  const cancelTxt = lang === "en" ? engJs.cancel : spainJs.cancel;
  const transferToTxt = lang === "en" ? engJs.transferTo : spainJs.transferTo;

  const [recipient, setRecipient] = useState("");
  const [transferring, setTransferring] = useState(false);

  const {token_id, contractId} = nft;
  console.log(nft);
  const updateStorage = async () => {
    try {
      const nftData = JSON.parse(localStorage.getItem("nfts")) || [];
      console.log(nftData);
      const updatedNfts = nftData.filter(
        NFT => !(NFT.token_id === token_id && NFT.contractId === contractId)
      );
      console.log(updatedNfts);
      localStorage.setItem("nfts", JSON.stringify(updatedNfts));
    } catch (error) {
      console.log(`Error occurred while updating storage: ${error}`);
    }
  };

  const transferNft = async () => {
    if (!recipient) {
      toast.error("Invalid Recipient");
      return;
    }
    try {
      setTransferring(true);
      toast.loading("Transferring NFT...");
      const res = await transferNFT(
        token_id.toString(),
        accountId,
        contractId,
        recipient,
        currentNetwork?.type,
        secretKey
      );

      if (res.status) {
        toast.dismiss();
        toast.success("NFT Transferred on blockchain!");
        await updateStorage();
        if (certTransfer || contractId === process.env.REACT_APP_BIT_CONTRACT) {
          const certOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              to: recipient,
              token_id: token_id
            })
          };
          const certRes = await fetch(
            "https://bitmemoir.com/api/v2/certificate/transferCertificate/",
            certOptions
          );
          if (certRes.ok) {
            toast.success("Certificate Transferred!");
          } else {
            throw new Error("Failed to transfer certificate");
          }
        }
      } else {
        toast.dismiss();
        toast.error("Transfer Error from blockchain!");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error occurred while transferring");
      console.error(`Error occurred while transferring in client side: ${error}`);
    } finally {
      setIsTransfer(false);
      setCardOpen(false);
      setRecipient("");
      setTransferring(false);
    }
  };

  return (
    <div className='flex flex-col  space-y-10'>
      <div className='relative flex items-center justify-center my-5 mb-8'>
        <button
          className='absolute left-0'
          onClick={() => {
            setIsTransfer(false);
          }}>
          <PiArrowBendUpLeftBold
            fontSize={28}
            color='white'
          />
        </button>
        {/* <span className='text-2xl text-white font-semibold'>{Number(amount)} NEAR</span> */}
      </div>
      <div className='flex p-2  rounded-md focus:ring-white ring-1 ring-slate-400 bg-transparent transparent-all duration-200'>
        <span className='w-1/4 text-white font-semibold'>{transferToTxt}</span>
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
        {transferTxt}
      </button>
      <button
        onClick={() => {
          setCardOpen(false);
        }}
        className='border-b w-fit self-center bit-btn bg-white px-7'>
        {cancelTxt}
      </button>
    </div>
  );
};

export default TransferNft;
