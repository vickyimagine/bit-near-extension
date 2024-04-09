import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {transferNFT} from "../../../../utils/methods/nearMethods";
import {useSelector} from "react-redux";
import toast from "react-hot-toast";
import {PiArrowBendUpLeftBold} from "react-icons/pi";

const TransferNft = ({setIsTransfer, nft, setCardOpen, certTransfer}) => {
  const {accountId, currentNetwork, secretKey} = useSelector(state => state.wallet);

  const [recipient, setRecipient] = useState("");
  const [transferring, setTransferring] = useState(false);

  const {token_id, contractId} = nft;

  const transferNft = async () => {
    if (!recipient) {
      toast.error("Invalid Recipient");
      return;
    }
    try {
      setTransferring(true);
      toast.loading("Transferring NFT...");
      const res = await transferNFT(
        token_id,
        accountId,
        contractId,
        recipient,
        currentNetwork?.type,
        secretKey
      );

      if (res.status) {
        const nftData = JSON.parse(localStorage.getItem("nfts")) || [];
        const updatedNfts = nftData.filter(
          NFT => !(NFT.token_id === token_id && NFT.contractId === contractId)
        );
        localStorage.setItem("nfts", JSON.stringify(updatedNfts));
        toast.dismiss();
        toast.success("NFT Transferred!");
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
          const res = await fetch(
            "http://15.206.186.148/api/v2/certificate/transferCertificate/",
            certOptions
          )
            .then(res => res.json())
            .then(data => {
              console.log(data);
              toast.dismiss();
              toast.success("Certificate Transferred!");
            });
        }
      } else {
        console.log("in Error");
        toast.dismiss();
        toast.error("Transfer Error from blockchain !");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error occured while transferring");
      // console.log(`Error occured while transferring in client side:${error}`);
    }
    setIsTransfer(false);
    setCardOpen(false);
    setRecipient("");
    setTransferring(false);
  };

  const testTransfer = async () => {
    const certOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        to: recipient,
        token_id: token_id
      })
    };
    const res = await fetch(
      "http://15.206.186.148/api/v2/certificate/transferCertificate/",
      certOptions
    )
      .then(res => res.json())
      .then(data => console.log(data));
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
        <span className='w-1/4 text-white font-semibold'>Transfer To</span>
        <input
          type='text'
          className='text-end w-4/5 bg-transparent focus:outline-none text-white'
          placeholder='Account ID'
          onChange={e => setRecipient(e.target.value)}
          value={recipient}
        />
      </div>
      <button
        className='bit-btn disabled:cursor-not-allowed'
        disabled={transferring || !recipient}
        onClick={transferNft}>
        Transfer{" "}
      </button>
      <button
        onClick={() => {
          setCardOpen(false);
        }}
        className='border-b w-fit self-center bit-btn bg-white px-7'>
        Cancel
      </button>
    </div>
  );
};

export default TransferNft;
