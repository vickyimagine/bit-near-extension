import React, {useState, useEffect} from "react";
import Transaction from "./Transaction/Transaction";
import {useSelector} from "react-redux";
import {Oval} from "react-loader-spinner";
import toast from "react-hot-toast";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";

const RecentTrxns = () => {
  //hooks
  const {accountId, currentNetwork, lang} = useSelector(state => state.wallet);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [btnText, setBtnText] = useState(nativeTxt);
  const pageSize = 3; // Number of transactions per page
  const totalPages = Math.ceil(transactions?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleData = transactions?.slice(startIndex, endIndex);
  const API_KEY = process.env.REACT_APP_NEARBLOCKS_APIKEY; // Replace with your actual API key
  const isNativeTxn = btnText === nativeTxt;

  //translations
  const prevTxt = lang === "en" ? engJs.previous : spainJs.previous;
  const nextTxt = lang === "en" ? engJs.next : spainJs.next;
  const sentTxt = lang === "en" ? engJs.sent : spainJs.sent;
  const noTxnTxt = lang === "en" ? engJs.noTxn : spainJs.noTxn;
  const nativeTxt = lang === "en" ? engJs.nativeTxt : spainJs.nativeTxt;

  //styles
  const activeStyle =
    "flex items-center justify-center w-1/2 px-2 text-center bg-white text-bitBg font-bold text-base  cursor-pointer transition-all duration-300 rounded-xl ";
  const inActiveStyle =
    "flex items-center justify-center w-1/2 text-center text-white font-bold  text-base  cursor-pointer transition-all duration-300 rounded-xl border";

  //functions
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
        ? `https://api3-testnet.nearblocks.io/v1/account/${accountId}/txns`
        : `https://api3.nearblocks.io/v1/account/${accountId}/txns`;

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
      // console.log(data);
      // const filterData = data.txns.filter(
      //   item => item.predecessor_account_id !== "system"
      // );

      // const filteredDataFunc = filterData.filter(
      //   item => item.actions[0].action !== "FUNCTION_CALL"
      // );
      const filteredData = data?.txns?.filter(
        item =>
          item.predecessor_account_id !== "system" &&
          item.actions[0].action !== "FUNCTION_CALL" &&
          item.actions[0].action !== "DEPLOY_CONTRACT"
      );

      // const filterData = data?.txns.filter(item => item.actions[0].action === "TRANSFER");
      // console.log(filteredData);
      return filteredData;
      //   console.log(filteredData);
      // setTransactions(filteredData);
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  const getNftTxns = async () => {
    const endpoint =
      currentNetwork.type === "testnet"
        ? `https://api3-testnet.nearblocks.io/v1/account/${accountId}/nft-txns`
        : `https://api3.nearblocks.io/v1/account/${accountId}/nft-txns`;

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
      // console.log(data);
      return data?.txns;
    } catch (error) {
      // console.error("Error:", error);
      // toast.error("Error occured getting transactions !");
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

  //useEffects
  useEffect(() => {
    setBtnText(nativeTxt);
  }, [lang]);

  useEffect(() => {
    setCurrentPage(1);
    fetchAllTrxns();
  }, [accountId, currentNetwork, btnText, lang]);

  return (
    <>
      <div className=' border-t border-gray-500 px-4 '>
        <div className='flex justify-center h-10  my-4 space-x-3 '>
          <div
            className={btnText === nativeTxt ? activeStyle : inActiveStyle}
            onClick={e => {
              setBtnText(e.target.textContent);
            }}>
            {nativeTxt}
          </div>
          <div
            className={btnText === "Token" ? activeStyle : inActiveStyle}
            onClick={e => setBtnText(e.target.textContent)}>
            Token
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
        ) : transactions?.length === 0 || !transactions ? (
          <div className='h-52 flex items-center justify-center  '>
            <button className='bit-btn flex px-24 hover:scale-100 cursor-default font-bold'>
              {noTxnTxt}
            </button>
          </div>
        ) : (
          <div className='h-full  flex flex-col justify-center '>
            <div className='space-y-3 h-52 mb-2  overflow-y-clip'>
              {visibleData?.map((item, index) => (
                <Transaction
                  key={index}
                  data={item}
                />
              ))}
            </div>
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
                {currentPage} of {totalPages}
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
