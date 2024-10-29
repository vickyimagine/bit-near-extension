import React, {useEffect, useState} from "react";
import ImportNft from "./ImportNft/ImportNft";
import NFTCard from "./NFTCard/NFTCard";
import {useSelector} from "react-redux/es/hooks/useSelector";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";

const Collectibles = () => {
  // Hooks
  const {currentNetwork, lang} = useSelector(state => state.wallet);
  const [NFTs, setNFTs] = useState([]);
  const [isImport, setIsImport] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [nftCard, setNFTCard] = useState();

  // Translations
  const translations = {
    collNotVis: lang === "en" ? engJs.dontSeeCollectibles : spainJs.dontSeeCollectibles,
    importColl: lang === "en" ? engJs.importCollectibles : spainJs.importCollectibles
  };

  // Functions
  const fetchStoreNFT = () => {
    const storedNFTs = JSON.parse(localStorage.getItem("nfts")) || [];
    const filteredNFTs = storedNFTs.filter(
      item => item.network.type === currentNetwork.type
    );
    setNFTs(filteredNFTs);
  };

  // useEffect
  useEffect(() => {
    fetchStoreNFT();
  }, [currentNetwork]);

  // Render logic
  const renderNFTs = () => {
    return NFTs.map(
      (nft, index) =>
        nft?.metadata?.media && (
          <img
            key={index}
            src={nft.metadata.media}
            alt='NFT'
            className='h-24 w-40 object-cover cursor-pointer bg-gradient-to-b from-white to-[#B3E1FF] p-[6px] py-[8px] rounded-xl'
            onClick={() => {
              setNFTCard(nft);
              setIsCardOpen(true);
            }}
          />
        )
    );
  };

  return (
    <div className='h-80 border-t border-gray-500'>
      {isCardOpen ? (
        <NFTCard
          nft={nftCard}
          setCardOpen={setIsCardOpen}
        />
      ) : isImport ? (
        <ImportNft
          setImport={setIsImport}
          setNfts={setNFTs}
        />
      ) : (
        <div
          className={`flex flex-col ${
            NFTs.length !== 0 ? "justify-between" : "justify-center"
          } h-72 mt-4`}>
          {NFTs.length ? (
            <div className='grid grid-cols-3 gap-4 h-4/6 overflow-auto p-2'>
              {renderNFTs()}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center space-y-3'>
              <p className='text-white font-medium'>{translations.collNotVis}</p>
              <button
                className='bit-btn px-24 font-bold'
                onClick={() => setIsImport(true)}>
                {translations.importColl}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Collectibles;
