import React from "react";
import {BsSendFill, BsArrow90DegDown} from "react-icons/bs";
import {IoMdKey} from "react-icons/io";
import {TbExternalLink} from "react-icons/tb";
import {RiNftLine} from "react-icons/ri";
import {MdOutlineImage} from "react-icons/md";
import {useSelector} from "react-redux";
import engJs from "./../../../../Constants/en";
import spainJs from "./../../../../Constants/es";
import {getElapsedTime} from "../../../../utils/methods/unixToElapsed";

const Transaction = ({data}) => {
  const {accountId, currentNetwork, lang} = useSelector(state => state.wallet);

  const sentBtn = lang === "en" ? engJs.sent : spainJs.sent;
  const receiveBtn = lang === "en" ? engJs.receive : spainJs.receive;
  const fromTxt = lang === "en" ? engJs.from : spainJs.from;
  const toTxt = lang === "en" ? engJs.to : spainJs.to;
  const forTxt = lang === "en" ? engJs.for : spainJs.for;

  const isNftTxn = data?.nft !== undefined;
  const isIncoming = (!isNftTxn && data?.receiver_account_id === accountId) || "";
  const trxnAmount = (!isNftTxn && data?.actions_agg.deposit / 10 ** 24) || "";
  const isAccessKey = (!isNftTxn && data?.actions[0].action === "ADD_KEY") || "";
  const isMint = (isNftTxn && data?.cause === "MINT") || "";
  const isNFTIncoming = (isNftTxn && data?.affected_account_id === accountId) || "";
  return (
    <div>
      <div className='bit-btn  rounded-xl bg-white font-inter cursor-pointer text-sm'>
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

        <div className=' w-2/3'>
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

        <div className=' w-2/3 pl-5 '>
          {isNftTxn ? (
            <p className={`text-blue-800 font-bold`}>
              Token Id:
              {data?.token_id}
            </p>
          ) : (
            !isAccessKey && (
              <p
                className={`${isIncoming ? "text-green-500" : "text-red-500"} font-bold`}>
                {isIncoming ? "+" : "-"}
                {String(trxnAmount).length > 8
                  ? Number(trxnAmount?.toString()?.slice(0, 5))
                  : trxnAmount}{" "}
                NEAR
              </p>
            )
          )}
          <p>{getElapsedTime(Number(data?.block_timestamp))}</p>
        </div>
        <a
          href={
            currentNetwork.type === "mainnet"
              ? `https://nearblocks.io/txns/${data?.transaction_hash}`
              : `https://testnet.nearblocks.io/txns/${data?.transaction_hash}`
          }
          target='_blank'>
          <TbExternalLink fontSize={28} />
        </a>
      </div>
    </div>
  );
};

export default Transaction;
