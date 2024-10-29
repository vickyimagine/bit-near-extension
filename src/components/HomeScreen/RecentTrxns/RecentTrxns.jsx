import React, {useState, useEffect} from "react";
import Transaction from "./Transaction/Transaction";
import {useSelector} from "react-redux";
import {Oval} from "react-loader-spinner";
import toast from "react-hot-toast";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";

const RecentTrxns = () => {
  // Hooks
  const {accountId, currentNetwork, lang} = useSelector(state => state.wallet);
  const nativeTxt = lang === "en" ? engJs.nativeTxt : spainJs.nativeTxt; // Get native text based on language
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [transactions, setTransactions] = useState([]); // Store transactions
  const [isLoader, setIsLoader] = useState(false); // Loader state
  const [btnText, setBtnText] = useState(nativeTxt); // Button text for toggling transaction type
  const pageSize = 3; // Number of transactions to display per page
  const totalPages = Math.ceil(transactions?.length / pageSize); // Calculate total pages
  const startIndex = (currentPage - 1) * pageSize; // Starting index for pagination
  const endIndex = startIndex + pageSize; // Ending index for pagination
  const visibleData = transactions?.slice(startIndex, endIndex); // Slice transactions for current page
  const API_KEY = process.env.REACT_APP_NEARBLOCKS_APIKEY; // API key from environment variables
  const isNativeTxn = btnText === nativeTxt; // Determine if native transactions are selected

  // Translations based on selected language
  const prevTxt = lang === "en" ? engJs.previous : spainJs.previous;
  const nextTxt = lang === "en" ? engJs.next : spainJs.next;
  const sentTxt = lang === "en" ? engJs.sent : spainJs.sent;
  const noTxnTxt = lang === "en" ? engJs.noTxn : spainJs.noTxn;

  // Styles for active and inactive buttons
  const activeStyle =
    "flex items-center justify-center w-1/2 px-2 text-center bg-white text-bitBg font-bold text-base cursor-pointer transition-all duration-300 rounded-xl ";
  const inActiveStyle =
    "flex items-center justify-center w-1/2 text-center text-white font-bold text-base cursor-pointer transition-all duration-300 rounded-xl border";

  // Function to navigate to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Increment current page
    }
  };

  // Function to navigate to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrement current page
    }
  };

  // Fetch native transaction data
  const getTrxnData = async () => {
    setIsLoader(true); // Show loader while fetching data
    const endpoint =
      currentNetwork.type === "testnet"
        ? `https://api3-testnet.nearblocks.io/v1/account/${accountId}/txns`
        : `https://api3.nearblocks.io/v1/account/${accountId}/txns`;

    const headers = {
      Authorization: `Bearer ${API_KEY}` // Set authorization header
    };

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`); // Handle errors
      }

      const data = await response.json();
      // Filter out unwanted transactions
      const filteredData = data?.txns?.filter(
        item =>
          item.predecessor_account_id !== "system" &&
          item.actions[0].action !== "FUNCTION_CALL" &&
          item.actions[0].action !== "DEPLOY_CONTRACT"
      );

      return filteredData; // Return filtered transactions
    } catch (error) {
      // Handle error (optional toast for user feedback)
      // toast.error("Error occurred while fetching transactions!");
    } finally {
      setIsLoader(false); // Hide loader
    }
  };

  // Fetch NFT transaction data
  const getNftTxns = async () => {
    const endpoint =
      currentNetwork.type === "testnet"
        ? `https://api3-testnet.nearblocks.io/v1/account/${accountId}/nft-txns`
        : `https://api3.nearblocks.io/v1/account/${accountId}/nft-txns`;

    const headers = {
      Authorization: `Bearer ${API_KEY}` // Set authorization header
    };

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`); // Handle errors
      }

      const data = await response.json();
      return data?.txns; // Return NFT transactions
    } catch (error) {
      // Handle error (optional toast for user feedback)
      // toast.error("Error occurred getting NFT transactions!");
    }
  };

  // Fetch all transactions based on selected type
  const fetchAllTrxns = async () => {
    if (isNativeTxn) {
      setTransactions(await getTrxnData()); // Fetch and set native transactions
    } else {
      setTransactions(await getNftTxns()); // Fetch and set NFT transactions
    }
  };

  // useEffects for managing component state and side effects
  useEffect(() => {
    setBtnText(nativeTxt); // Reset button text on language change
  }, [lang]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on account or network change
    fetchAllTrxns(); // Fetch transactions when account, network, or button text changes
  }, [accountId, currentNetwork, btnText, lang]);

  return (
    <>
      <div className='border-t border-gray-500 px-4'>
        {/* Button for selecting transaction type */}
        <div className='flex justify-center h-10 my-4 space-x-3'>
          <div
            className={btnText === nativeTxt ? activeStyle : inActiveStyle}
            onClick={e => {
              setBtnText(e.target.textContent); // Update button text on click
            }}>
            {nativeTxt}
          </div>
          <div
            className={btnText === "Token" ? activeStyle : inActiveStyle}
            onClick={e => setBtnText(e.target.textContent)}>
            Token
          </div>
        </div>

        {/* Loader or transactions display */}
        {isLoader ? (
          <div className='flex flex-col space-y-2 justify-center items-center h-72'>
            <Oval
              height={80}
              width={80}
              color='white'
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor='transparent'
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
            <p className='font-bold text-white text-xl'>Fetching Transactions...</p>
          </div>
        ) : transactions?.length === 0 || !transactions ? (
          <div className='h-52 flex items-center justify-center'>
            <button className='bit-btn flex px-24 hover:scale-100 cursor-default font-bold'>
              {noTxnTxt}
            </button>
          </div>
        ) : (
          <div className='h-full flex flex-col justify-center'>
            {/* Display list of transactions */}
            <div className='space-y-3 h-52 mb-2 overflow-y-clip'>
              {visibleData?.map((item, index) => (
                <Transaction
                  key={index}
                  data={item} // Pass transaction data to Transaction component
                />
              ))}
            </div>
            {/* Pagination controls */}
            <div className='flex justify-center gap-x-4 items-center'>
              <button
                onClick={handlePreviousPage}
                className={`bit-btn text-base rounded-xl px-3 p-1 bg-white font-bold ${
                  currentPage === 1 ? "cursor-not-allowed hover:scale-100 opacity-75" : ""
                }`}
                disabled={currentPage === 1}>
                {prevTxt}
              </button>
              <p className='text-white mx-1 text-sm font-inter'>
                {currentPage} of {totalPages} {/* Show current page and total pages */}
              </p>
              <button
                onClick={handleNextPage}
                className={`bit-btn px-5 p-1 text-base rounded-xl fold-bold ${
                  currentPage === totalPages
                    ? "cursor-not-allowed hover:scale-100 opacity-75"
                    : ""
                }`}
                disabled={currentPage === totalPages}>
                {nextTxt}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecentTrxns;
