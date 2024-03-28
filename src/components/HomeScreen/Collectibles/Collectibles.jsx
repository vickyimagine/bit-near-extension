import React, {useEffect, useState} from "react";
import ImportNft from "./ImportNft/ImportNft";
import NFTCard from "./NFTCard/NFTCard";
import {useSelector} from "react-redux/es/hooks/useSelector";

const Collectibles = () => {
  const [NFTs, setNFTs] = useState([]);
  const [isImport, setIsImport] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [nftCard, setNFTCard] = useState();

  const {currentNetwork} = useSelector(state => state.wallet);

  const fetchStoreNFT = () => {
    const storedNFTs = JSON.parse(localStorage.getItem("nfts")) || [];
    const filteredNFTs = storedNFTs.filter(
      item => item.network.type === currentNetwork.type
    );
    setNFTs(filteredNFTs);
  };

  useEffect(() => {
    fetchStoreNFT();
  }, [localStorage.getItem("nfts"), currentNetwork]);

  return (
    <div className='h-80'>
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
        <>
          <div
            className={`flex flex-col ${
              NFTs.length !== 0 ? "justify-between" : "justify-center"
            } h-72 mt-4`}>
            <div
              className={`${
                NFTs.length !== 0 ? "grid" : "hidden"
              } grid-cols-3 gap-6 h-4/6 overflow-auto p-2`}>
              {NFTs.length !== 0 &&
                NFTs?.map((nft, index) => {
                  return (
                    <img
                      key={index}
                      src={nft?.metadata?.media}
                      alt=''
                      className='h-40 w-40 object-contain cursor-pointer'
                      onClick={() => {
                        setNFTCard(nft);
                        setIsCardOpen(true);
                      }}
                    />
                  );
                })}
            </div>
            <div className='flex flex-col items-center justify-center space-y-3'>
              <p className='text-white font-semibold'>Don't see your Collectibles</p>
              <button
                className='bit-btn'
                onClick={() => {
                  setIsImport(true);
                }}>
                Import Collectibles
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Collectibles;
