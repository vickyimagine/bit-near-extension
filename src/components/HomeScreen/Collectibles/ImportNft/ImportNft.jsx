import React, {useState, useCallback} from "react";
import Input from "../Input/Input";
import {IoMdArrowRoundBack} from "react-icons/io";

import {useSelector} from "react-redux/es/hooks/useSelector";
import {fetchAccountNFT} from "../../../../utils";
import toast from "react-hot-toast";
// import {nftData} from "../../../../Constants/dummyNFT";

const ImportNft = ({setImport, setNfts}) => {
  const {accountId, currentNetwork, secretKey} = useSelector(state => state.wallet);
  const [nftParams, setNftParams] = useState({
    contractId: "",
    tokenId: ""
  });

  const handleParams = useCallback(e => {
    const {name, value} = e.target;
    setNftParams(prev => ({...prev, [name]: value}));
  }, []);

  const handleBack = useCallback(() => {
    setImport(false);
  }, [setImport]);

  const importNFT = async () => {
    try {
      const nftData = localStorage.getItem("nfts");
      const result = await fetchAccountNFT(
        accountId,
        currentNetwork?.type,
        secretKey,
        nftParams.contractId,
        nftParams.tokenId
      );

      if (result === null) {
        setNftParams({
          contractId: "",
          tokenId: ""
        });
        return toast.error("NFT doesn't exist.");
      }

      // Parse the existing data or initialize an empty array
      const existingData = nftData ? JSON.parse(nftData) : [];

      // Push the new NFT data
      existingData.push(result);

      // Store the updated data in local storage
      localStorage.setItem("nfts", JSON.stringify(existingData));
    } catch (error) {
      toast.error(`Account ${nftParams.contractId} doesn't exist on this network.`);
    }

    // Reset form and state
    setNftParams({
      contractId: "",
      tokenId: ""
    });
    setImport(false);
  };

  //wallet connection
  //NFT showcase

  return (
    <div className='flex flex-col items-center space-y-7 mt-6'>
      <button
        className='bit-btn self-start px-4'
        onClick={handleBack}>
        <IoMdArrowRoundBack fontSize={21} />
        <p>Back</p>
      </button>
      <Input
        name='contractId'
        onChange={handleParams}
        placeholder='Contract Id'
        value={nftParams.contractId}
      />
      <Input
        name='tokenId'
        onChange={handleParams}
        placeholder='Token Id'
        value={nftParams.tokenId}
      />
      <button
        className='bit-btn'
        onClick={importNFT}>
        Import
      </button>
    </div>
  );
};

export default ImportNft;
