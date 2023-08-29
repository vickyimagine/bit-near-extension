import React, {useState, useCallback} from "react";
import Input from "../Input/Input";
import {IoMdArrowRoundBack} from "react-icons/io";

import {useSelector} from "react-redux/es/hooks/useSelector";
import {fetchAccountNFT} from "../../../../utils";

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
    const result = await fetchAccountNFT(
      accountId,
      currentNetwork?.type,
      secretKey,
      nftParams.contractId,
      nftParams.tokenId
    );
    setNfts(prev => {
      return [...prev, result];
    });
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
        className='bit-btn'
        onClick={importNFT}>
        Import
      </button>
    </div>
  );
};

export default ImportNft;
