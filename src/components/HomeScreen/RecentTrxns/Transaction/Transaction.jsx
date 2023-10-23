import React from "react";
import {BsSendFill, BsArrow90DegDown} from "react-icons/bs";
import {IoMdKey} from "react-icons/io";
import {TbExternalLink} from "react-icons/tb";
import {useSelector} from "react-redux";

import {getElapsedTime} from "../../../../utils/methods/unixToElapsed";

const Transaction = ({data}) => {
  const {accountId, currentNetwork} = useSelector(state => state.wallet);
  const isIncoming = data?.receiver_account_id === accountId;
  const trxnAmount = data?.actions_agg.deposit / 10 ** 24;
  const isAccessKey = data?.actions[0].action === "ADD_KEY";

  return (
    <div>
      <div className='bit-btn cursor-pointer text-base'>
        <div className='w-fit '>
          {isAccessKey ? (
            <IoMdKey fontSize={21} />
          ) : isIncoming ? (
            <BsArrow90DegDown fontSize={21} />
          ) : (
            <BsSendFill fontSize={21} />
          )}
        </div>

        <div className=' w-2/3 '>
          {isAccessKey ? (
            <p>Access Key Added</p>
          ) : (
            <p>{isIncoming ? "Receive" : "Sent"} NEAR</p>
          )}

          {isAccessKey ? (
            <p className='font-bold'>{`for ${data.predecessor_account_id.slice(
              0,
              4
            )}...${data.predecessor_account_id.slice(-7)}`}</p>
          ) : (
            <p className='font-bold'>
              {isIncoming
                ? `from ${data.predecessor_account_id.slice(
                    0,
                    4
                  )}...${data.predecessor_account_id.slice(-7)}`
                : `to ${data.receiver_account_id.slice(
                    0,
                    4
                  )}...${data.predecessor_account_id.slice(-7)}`}
            </p>
          )}
        </div>

        <div className=' w-2/3 '>
          {!isAccessKey && (
            <p className={`${isIncoming ? "text-green-500" : "text-red-500"} font-bold`}>
              {isIncoming ? "+" : "-"}
              {String(trxnAmount).length > 10 ? Math.ceil(trxnAmount) : trxnAmount} NEAR
            </p>
          )}
          <p>{getElapsedTime(Number(data.block_timestamp))}</p>
        </div>
        <a
          href={
            currentNetwork.type === "mainnet"
              ? `https://nearblocks.io/txns/${data?.transaction_hash}`
              : `https://testnet.nearblocks.io/txns/${data?.transaction_hash}`
          }
          target='_blank'>
          <TbExternalLink fontSize={21} />
        </a>
      </div>
    </div>
  );
};

export default Transaction;
