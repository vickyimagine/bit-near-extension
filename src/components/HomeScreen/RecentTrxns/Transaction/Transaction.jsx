import React from "react";
import {BsSendFill} from "react-icons/bs";
import {IoMdKey} from "react-icons/io";
import {TbExternalLink} from "react-icons/tb";
import {MdOutlineImage} from "react-icons/md";
import {useSelector} from "react-redux";
import engJs from "./../../../../Constants/en";
import spainJs from "./../../../../Constants/es";
import {getElapsedTime} from "../../../../utils/methods/unixToElapsed";

const Transaction = ({data}) => {
  const {accountId, currentNetwork, lang} = useSelector(state => state.wallet);
  const isNftTxn = data?.nft !== undefined;
  const isIncoming = !isNftTxn && data?.receiver_account_id === accountId;
  const trxnAmount = (!isNftTxn && data?.actions_agg.deposit / 10 ** 24) || "";
  const isAccessKey = !isNftTxn && data?.actions[0].action === "ADD_KEY";
  const isMint = isNftTxn && data?.cause === "MINT";
  const isNFTIncoming = isNftTxn && data?.affected_account_id === accountId;

  const sentBtn = lang === "en" ? engJs.sent : spainJs.sent;
  const receiveBtn = lang === "en" ? engJs.receive : spainJs.receive;
  const fromTxt = lang === "en" ? engJs.from : spainJs.from;
  const toTxt = lang === "en" ? engJs.to : spainJs.to;
  const forTxt = lang === "en" ? engJs.for : spainJs.for;

  return (
    <div>
      <div
        className='bit-btn rounded-xl bg-white font-inter cursor-pointer text-sm'
        aria-label='Transaction details'>
        <div className='w-fit mr-1'>
          {isNftTxn ? (
            <MdOutlineImage fontSize={28} />
          ) : isAccessKey ? (
            <IoMdKey fontSize={21} />
          ) : isIncoming ? (
            <BsSendFill
              fontSize={21}
              className='rotate-180 text-green-500'
            />
          ) : (
            <BsSendFill
              fontSize={21}
              className='text-red-500'
            />
          )}
        </div>

        <div className='w-2/3'>
          {isNftTxn ? (
            <p className='font-bold'>
              {data?.cause} {data?.nft?.symbol}
            </p>
          ) : isAccessKey ? (
            <p className='font-bold'>Access Key Added</p>
          ) : (
            <p className='font-bold'>{isIncoming ? receiveBtn : sentBtn} NEAR</p>
          )}

          {isNftTxn ? (
            isMint ? (
              <p className=''>{`${fromTxt} ${data?.nft.contract.slice(
                0,
                4
              )}...${data?.nft.contract?.slice(-6)}`}</p>
            ) : isNFTIncoming ? (
              <p className=''>{`${data?.involved_account_id?.slice(
                0,
                4
              )}...${data?.involved_account_id?.slice(-6)}`}</p>
            ) : (
              <p className=''>{`${toTxt} ${data?.involved_account_id?.slice(
                0,
                4
              )}...${data?.involved_account_id?.slice(-6)}`}</p>
            )
          ) : isAccessKey ? (
            <p className=''>{`${forTxt} ${data?.predecessor_account_id?.slice(
              0,
              4
            )}...${data?.predecessor_account_id?.slice(-6)}`}</p>
          ) : (
            <p className=''>
              {isIncoming
                ? `${fromTxt} ${data?.predecessor_account_id?.slice(
                    0,
                    4
                  )}...${data?.predecessor_account_id?.slice(-6)}`
                : `${toTxt} ${data?.receiver_account_id?.slice(
                    0,
                    4
                  )}...${data?.predecessor_account_id?.slice(-6)}`}
            </p>
          )}
        </div>

        <div className='w-2/3 pl-5'>
          {isNftTxn ? (
            <p className={`text-blue-800 font-bold`}>Token Id: {data?.token_id}</p>
          ) : (
            !isAccessKey && (
              <p
                className={`${isIncoming ? "text-green-500" : "text-red-500"} font-bold`}>
                {isIncoming ? "+" : "-"}
                {String(trxnAmount).length > 8
                  ? (trxnAmount / 10 ** 3).toFixed(2) + " K"
                  : (trxnAmount / 10 ** 24).toFixed(2) + " NEAR"}
              </p>
            )
          )}
          <p className='text-xs text-gray-400'>{getElapsedTime(data?.block_timestamp)}</p>
        </div>
        <div className='w-fit'>
          <a
            href={`https://explorer.near.org/transactions/${data?.tx_hash}`}
            target='_blank'
            rel='noopener noreferrer'>
            <TbExternalLink fontSize={21} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
