import React, {useState} from "react";
import ImportNft from "./ImportNft/ImportNft";

const Collectibles = () => {
  const [NFTs, setNFTs] = useState([]);
  const [isImport, setIsImport] = useState(false);

  return (
    <div className='h-80'>
      {isImport ? (
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
              } grid-cols-5 gap-7 h-4/6 overflow-auto`}>
              {NFTs.length !== 0 &&
                NFTs?.map((item, index) => {
                  return <p>NFT {index}</p>;
                })}
            </div>
            <div className='flex flex-col items-center justify-center space-y-3'>
              <p>Don't see your Collectibles</p>
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
