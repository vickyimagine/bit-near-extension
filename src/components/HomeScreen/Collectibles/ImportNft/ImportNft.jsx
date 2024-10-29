import React, {useState, useCallback} from "react";
import Input from "../Input/Input"; // Importing custom Input component
import {useSelector} from "react-redux/es/hooks/useSelector"; // Redux hook to access state
import {fetchAccountNFT} from "../../../../utils"; // Utility function to fetch NFT data
import toast from "react-hot-toast"; // Toast notifications for user feedback
import {PiArrowBendUpLeftBold} from "react-icons/pi"; // Icon for back button
import engJs from "../../../../Constants/en"; // English translations
import spainJs from "../../../../Constants/es"; // Spanish translations

const ImportNft = ({setImport}) => {
  // Hooks for accessing wallet state
  const {accountId, currentNetwork, secretKey, lang} = useSelector(state => state.wallet);
  const [nftParams, setNftParams] = useState({
    contractId: "", // Store contract ID
    tokenId: "" // Store token ID
  });

  // Callback to handle input parameter changes
  const handleParams = useCallback(e => {
    const {name, value} = e.target; // Destructure name and value from input
    setNftParams(prev => ({...prev, [name]: value})); // Update nftParams state
  }, []);

  // Callback to handle back button click
  const handleBack = useCallback(() => {
    setImport(false); // Set import state to false to go back
  }, [setImport]);

  // Translations based on selected language
  const contractIdTxt = lang === "en" ? engJs.contractId : spainJs.contractId;
  const tokenIdTxt = lang === "en" ? engJs.tokenId : spainJs.tokenId;
  const importTxt = lang === "en" ? engJs.import : spainJs.import;

  // Function to import NFT
  const importNFT = async () => {
    const nftData = JSON.parse(localStorage.getItem("nfts")) || []; // Fetch existing NFTs from localStorage
    const isExist = nftData.some(item => item.token_id === nftParams.tokenId); // Check if NFT already exists

    // Show error if NFT already exists
    if (isExist) {
      toast.error("This NFT already exists in your wallet");
    } else {
      try {
        // Fetch NFT details using the utility function
        const result = await fetchAccountNFT(
          accountId,
          currentNetwork?.type,
          secretKey,
          nftParams.contractId,
          nftParams.tokenId
        );

        // Handle NFT existence check
        if (result === null) {
          toast.error("NFT doesn't exist.");
        } else if (result.owner_id === accountId) {
          // If NFT belongs to the account, add it to localStorage
          result.network = currentNetwork; // Attach current network info
          result.contractId = nftParams.contractId; // Attach contract ID
          nftData.push(result); // Add the NFT to the local storage array
          localStorage.setItem("nfts", JSON.stringify(nftData)); // Update localStorage
        } else {
          // Show error if NFT does not belong to this account
          toast.error("NFT doesn't belong to this account.");
        }
      } catch (error) {
        // Show error if fetching NFT data fails
        toast.error(
          `Account ${
            nftParams.contractId.length > 17
              ? `${nftParams.contractId.slice(0, 4)}...${nftParams.contractId.slice(-6)}`
              : nftParams.contractId
          } doesn't exist on this network.`
        );
      }
    }

    // Reset nftParams state and close import
    setNftParams({
      contractId: "",
      tokenId: ""
    });
    setImport(false);
  };

  return (
    <div className='flex flex-col items-center space-y-10 mt-6'>
      <button
        className='self-start pl-5'
        onClick={handleBack} // Handle back button click
      >
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </button>
      <div className='space-y-3'>
        <Input
          type='text' // Input for contract ID
          name='contractId'
          onChange={handleParams} // Handle change in input value
          placeholder={contractIdTxt} // Placeholder text for input
          value={nftParams.contractId} // Bind value to state
        />
        <Input
          type='number' // Input for token ID
          name='tokenId'
          onChange={handleParams} // Handle change in input value
          placeholder={tokenIdTxt} // Placeholder text for input
          value={nftParams.tokenId} // Bind value to state
        />
      </div>
      <button
        className='bit-btn disabled:cursor-not-allowed px-7'
        disabled={nftParams.contractId === "" || nftParams.tokenId === ""} // Disable button if inputs are empty
        onClick={importNFT} // Handle NFT import action
      >
        <span className='font-bold'>{importTxt}</span> {/* Button text */}
      </button>
    </div>
  );
};

export default ImportNft;
