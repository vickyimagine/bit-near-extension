import React, {useState, useEffect} from "react";
import Transaction from "./Transaction/Transaction";
import {useSelector} from "react-redux";
import {Oval} from "react-loader-spinner";

const RecentTrxns = () => {
  const pageSize = 3; // Number of transactions per page
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [btnText, setBtnText] = useState("Native");

  const {accountId, currentNetwork} = useSelector(state => state.wallet);

  const totalPages = Math.ceil(transactions?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleData = transactions.slice(startIndex, endIndex);
  const API_KEY = process.env.REACT_APP_NEARBLOCKS_APIKEY; // Replace with your actual API key
  const isNativeTxn = btnText === "Native";

  const activeStyle =
    "flex items-center justify-center w-1/2 text-center bg-white text-bitBg font-bold text-xl  cursor-pointer transition-all duration-300 rounded-md p-2";
  const inActiveStyle =
    "flex items-center justify-center w-1/2 text-center text-white font-bold text-xl  cursor-pointer transition-all duration-300 rounded-md";

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getTrxnData = async () => {
    setIsLoader(true);
    const endpoint =
      currentNetwork.type === "testnet"
        ? `https://api-testnet.nearblocks.io/v1/account/${accountId}/txns`
        : `https://api.nearblocks.io/v1/account/${accountId}/txns`;

    const headers = {
      Authorization: `Bearer ${API_KEY}`
    };

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      //   console.log(data);
      const filteredData = data.txns.filter(item => {
        return item.predecessor_account_id !== "system";
      });

      return filteredData;
      //   console.log(filteredData);
      // setTransactions(filteredData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getNftTxns = async () => {
    const endpoint =
      currentNetwork.type === "testnet"
        ? `https://api-testnet.nearblocks.io/v1/account/${accountId}/nft-txns`
        : `https://api.nearblocks.io/v1/account/${accountId}/nft-txns`;

    const headers = {
      Authorization: `Bearer ${API_KEY}`
    };

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data)
      return data.txns;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAllTrxns = async () => {
    if (isNativeTxn) {
      setTransactions(await getTrxnData());
    } else {
      setTransactions(await getNftTxns());
    }

    setIsLoader(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchAllTrxns();
  }, [accountId, currentNetwork, btnText]);

  return (
    <>
      <div className='flex justify-center h-10  my-3 space-x-3'>
        <div
          className={btnText === "Native" ? activeStyle : inActiveStyle}
          onClick={e => {
            setBtnText(e.target.textContent);
          }}>
          Native
        </div>
        <div
          className={btnText === "Tokens" ? activeStyle : inActiveStyle}
          onClick={e => setBtnText(e.target.textContent)}>
          Tokens
        </div>
      </div>
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
      ) : transactions.length === 0 ? (
        <div className='h-72 flex items-center justify-center'>
          <button className='bit-btn flex top-20 hover:scale-100 cursor-default'>
            No Transaction Found
          </button>
        </div>
      ) : (
        <div className='h-full space-y-2'>
          <div className='space-y-2 h-56 overflow-y-clip'>
            {visibleData?.map((item, index) => (
              <Transaction
                key={index}
                data={item}
              />
            ))}
          </div>
          <div className='flex justify-center mt-1 gap-x-4 items-center'>
            <button
              onClick={handlePreviousPage}
              className={`bit-btn px-3 p-1 ${
                currentPage === 1 ? "cursor-not-allowed hover:scale-100 opacity-75" : ""
              }`}
              disabled={currentPage === 1}>
              Previous
            </button>
            <p className='text-white mx-1 font-bold'>
              {currentPage} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              className={`bit-btn px-3 p-1 ${
                currentPage === totalPages
                  ? "cursor-not-allowed hover:scale-100 opacity-75"
                  : ""
              }`}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentTrxns;
