import React, {useState, useEffect} from "react";
import Transaction from "./Transaction/Transaction";
import {useSelector} from "react-redux";

const RecentTrxns = () => {
  const pageSize = 4; // Number of transactions per page
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);

  const {accountId, currentNetwork} = useSelector(state => state.wallet);

  const totalPages = Math.ceil(transactions?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleData = transactions.slice(startIndex, endIndex);

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
    const API_KEY = process.env.REACT_APP_NEARBLOCKS_APIKEY; // Replace with your actual API key
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
      //   console.log(filteredData);
      setTransactions(filteredData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getTrxnData();
  }, [accountId, currentNetwork]);

  return (
    <>
      {transactions.length === 0 ? (
        <p className='bit-btn mt-36 hover:scale-100 cursor-default'>
          No Transaction Found
        </p>
      ) : (
        <div className='h-[350px] space-y-2'>
          <div className='space-y-2 h-72 overflow-y-clip'>
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
            <p className='text-white mx-1 font-bold'>{currentPage}</p>
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
