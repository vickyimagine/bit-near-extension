import React, {useState, useCallback} from "react";
import Input from "../Input/Input";
import {IoMdArrowRoundBack} from "react-icons/io";

import {useSelector} from "react-redux/es/hooks/useSelector";
import {fetchAccountNFT} from "../../../../utils";
import toast from "react-hot-toast";

const ImportNft = ({setImport}) => {
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
    const nftData = JSON.parse(localStorage.getItem("nfts")) || [];
    const isExist = nftData.some(item => item.token_id === nftParams.tokenId);

    if (isExist) {
      toast.error("This NFT already exists in your wallet");
    } else {
      try {
        const result = await fetchAccountNFT(
          accountId,
          currentNetwork?.type,
          secretKey,
          nftParams.contractId,
          nftParams.tokenId
        );

        if (result === null) {
          toast.error("NFT doesn't exist.");
        } else if (result.owner_id === accountId) {
          result.network = currentNetwork;
          result.contractId = nftParams.contractId;
          nftData.push(result);
          localStorage.setItem("nfts", JSON.stringify(nftData));
        } else {
          toast.error("NFT doesn't belong to this account.");
        }
      } catch (error) {
        console.log(error);
        toast.error(
          `Account ${
            nftParams.contractId.length > 17
              ? `${nftParams.contractId.slice(0, 4)}...${nftParams.contractId.slice(-6)}`
              : nftParams.contractId
          } doesn't exist on this network.`
        );
      }
    }

    setNftParams({
      contractId: "",
      tokenId: ""
    });
    setImport(false);
  };

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
        className='bit-btn disabled:cursor-not-allowed disabled:opacity-75'
        disabled={nftParams.contractId === "" || nftParams.tokenId === ""}
        onClick={importNFT}>
        Import
      </button>
    </div>
  );
};

export default ImportNft;
