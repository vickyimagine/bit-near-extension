import React, {useState} from "react";
import {IoMdArrowRoundBack} from "react-icons/io";
import {transferNFT} from "../../../../utils/methods/nearMethods";
import {useSelector} from "react-redux";
import toast from "react-hot-toast";

const TransferNft = ({setIsTransfer, nft, setCardOpen}) => {
  const {accountId, currentNetwork, secretKey} = useSelector(state => state.wallet);

  const [recipient, setRecipient] = useState("");
  const [transferring, setTransferring] = useState(false);

  const {token_id, contractId} = nft;

  // console.log(nft);

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
        toast.success("Transer Success !");
        setIsTransfer(false);
        setCardOpen(false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error occured while transferring");
      console.log(`Error occured while transferring in client side:${error}`);
    }
    setRecipient("");
    setTransferring(false);
  };

  return (
    <div className='flex flex-col  space-y-10'>
      <div className='relative flex items-center justify-center my-5 mb-8'>
        <button
          className='absolute bit-btn left-0'
          onClick={() => {
            setIsTransfer(false);
          }}>
          <IoMdArrowRoundBack fontSize={21} />
        </button>
        {/* <span className='text-2xl text-white font-semibold'>{Number(amount)} NEAR</span> */}
      </div>
      <div className='flex p-2  rounded-md focus:ring-white ring-1 ring-slate-400 bg-transparent transparent-all duration-200'>
        <span className='w-1/5 text-white font-semibold'>Transfer To</span>
        <input
          type='text'
          className='text-end w-4/5 bg-transparent focus:outline-none text-white'
          placeholder='Account ID'
          onChange={e => setRecipient(e.target.value)}
          value={recipient}
        />
      </div>
      <button
        className='bit-btn'
        disabled={transferring}
        onClick={transferNft}>
        Transfer{" "}
      </button>
    </div>
  );
};

export default TransferNft;
