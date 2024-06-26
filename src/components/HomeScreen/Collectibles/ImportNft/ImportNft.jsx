import React, {useState, useCallback} from "react";
import Input from "../Input/Input";
import {useSelector} from "react-redux/es/hooks/useSelector";
import {fetchAccountNFT} from "../../../../utils";
import toast from "react-hot-toast";
import {PiArrowBendUpLeftBold} from "react-icons/pi";
import engJs from "../../../../Constants/en";
import spainJs from "../../../../Constants/es";

const ImportNft = ({setImport}) => {
  //hooks
  const {accountId, currentNetwork, secretKey, lang} = useSelector(state => state.wallet);
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

  //translations
  const contractIdTxt = lang === "en" ? engJs.contractId : spainJs.contractId;
  const tokenIdTxt = lang === "en" ? engJs.tokenId : spainJs.tokenId;
  const importTxt = lang === "en" ? engJs.import : spainJs.import;

  //functions
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
        // console.log(error);
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
    <div className='flex flex-col items-center space-y-10 mt-6'>
      <button
        className=' self-start pl-5 '
        onClick={handleBack}>
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </button>
      <div className='space-y-3'>
        <Input
          type='text'
          name='contractId'
          onChange={handleParams}
          placeholder={contractIdTxt}
          value={nftParams.contractId}
        />
        <Input
          type='numer'
          name='tokenId'
          onChange={handleParams}
          placeholder={tokenIdTxt}
          value={nftParams.tokenId}
        />
      </div>
      <button
        className='bit-btn disabled:cursor-not-allowed px-7 '
        disabled={nftParams.contractId === "" || nftParams.tokenId === ""}
        onClick={importNFT}>
        <span className='font-bold'>{importTxt}</span>
      </button>
    </div>
  );
};

export default ImportNft;
