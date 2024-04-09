import React from "react";
import {BsSendFill, BsArrow90DegDown} from "react-icons/bs";
import {IoMdKey} from "react-icons/io";
import {TbExternalLink} from "react-icons/tb";
import {RiNftLine} from "react-icons/ri";
import {MdOutlineImage} from "react-icons/md";
import {useSelector} from "react-redux";

import {getElapsedTime} from "../../../../utils/methods/unixToElapsed";

const Transaction = ({data}) => {
  const {accountId, currentNetwork} = useSelector(state => state.wallet);

  const isNftTxn = data?.nft !== undefined;
  const isIncoming = (!isNftTxn && data?.receiver_account_id === accountId) || "";
  const trxnAmount = (!isNftTxn && data?.actions_agg.deposit / 10 ** 24) || "";
  const isAccessKey = (!isNftTxn && data?.actions[0].action === "ADD_KEY") || "";
  const isMint = (isNftTxn && data?.cause === "MINT") || "";
  const isNFTIncoming =
    (isNftTxn && data?.token_new_owner_account_id === accountId) || "";

  console.log(data);
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
            <p className='font-bold'>{isIncoming ? "Receive" : "Sent"} NEAR</p>
          )}

          {isNftTxn ? (
            isMint ? (
              <p className=''>{`from ${data?.nft.contract.slice(
                0,
                4
              )}...${data?.nft.contract?.slice(-7)}`}</p>
            ) : isNFTIncoming ? (
              <p className=''>{`from ${data?.token_old_owner_account_id?.slice(
                0,
                4
              )}...${data?.token_old_owner_account_id?.slice(-7)}`}</p>
            ) : (
              <p className=''>{`to ${data?.token_new_owner_account_id?.slice(
                0,
                4
              )}...${data?.token_new_owner_account_id?.slice(-7)}`}</p>
            )
          ) : isAccessKey ? (
            <p className=''>{`for ${data?.predecessor_account_id?.slice(
              0,
              4
            )}...${data?.predecessor_account_id?.slice(-7)}`}</p>
          ) : (
            <p className=''>
              {isIncoming
                ? `from ${data?.predecessor_account_id?.slice(
                    0,
                    4
                  )}...${data?.predecessor_account_id?.slice(-7)}`
                : `to ${data?.receiver_account_id?.slice(
                    0,
                    4
                  )}...${data?.predecessor_account_id?.slice(-7)}`}
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
                {String(trxnAmount).length > 10 ? Math.ceil(trxnAmount) : trxnAmount} NEAR
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
