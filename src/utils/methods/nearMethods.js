import {KeyPair} from "near-api-js";
const nearAPI = require("near-api-js");
const sha256 = require("js-sha256");
const BN = require("bn.js");

export const fetchBalance = async (accountId, networkType, privateKey) => {
  const connection = await nearConnection(accountId, networkType, privateKey);
  try {
    // gets account balance
    const account = await connection.account(accountId);
    const balance = ((await account.getAccountBalance()).available / 10 ** 24).toFixed(4);
    // console.log(balance);
    return balance;
  } catch (error) {
    console.log(`Error occured:${error}`);
    return 0;
  }
};

export const transferNear = async (
  signer,
  networkType,
  privateKey,
  receiver,
  nearAmount
) => {
  if (privateKey.length === 96) {
    privateKey = privateKey.slice(8);
  }
  const amount = nearAPI.utils.format.parseNearAmount(nearAmount);
  // const provider = new nearAPI.providers.JsonRpcProvider(
  //   `https://few-serene-dew.near-mainnet.quiknode.pro/8a6ce52775b1f360597c149ed986cb3ef4304ac7/`
  // );
  const provider = new nearAPI.providers.JsonRpcProvider(
    `https://rpc.${networkType}.near.org`
  );

  const keyPair = KeyPair.fromString(privateKey);
  const pubKey = keyPair.getPublicKey();
  const accessKey = await provider.query(`access_key/${signer}/${pubKey.toString()}`, "");

  const nonce = ++accessKey.nonce;
  const actions = [nearAPI.transactions.transfer(amount)];
  const recentBlockHash = nearAPI.utils.serialize.base_decode(accessKey.block_hash);

  try {
    const transaction = nearAPI.transactions.createTransaction(
      signer,
      pubKey,
      receiver,
      nonce,
      actions,
      recentBlockHash
    );
    const serializedTx = nearAPI.utils.serialize.serialize(
      nearAPI.transactions.SCHEMA,
      transaction
    );
    const serializedTxHash = new Uint8Array(sha256.sha256.array(serializedTx));
    const signature = keyPair.sign(serializedTxHash);
    const signedTransaction = new nearAPI.transactions.SignedTransaction({
      transaction,
      signature: new nearAPI.transactions.Signature({
        keyType: transaction.publicKey.keyType,
        data: signature.signature
      })
    });
    // encodes transaction to serialized Borsh (required for all transactions)
    const signedSerializedTx = signedTransaction.encode();
    // sends transaction to NEAR blockchain via JSON RPC call and records the result
    const result = await provider.sendJsonRpc("broadcast_tx_commit", [
      Buffer.from(signedSerializedTx).toString("base64")
    ]);
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const fetchAccountNFT = async (
  accountId,
  networkType,
  privateKey,
  contractId,
  tokenId
) => {
  //near connection
  const connection = await nearConnection(accountId, networkType, privateKey);
  const account = await connection.account(accountId);
  //Interacting with contract
  const contract = new nearAPI.Contract(
    account, // the account object that is connecting
    contractId,
    {
      // name of contract you're connecting to
      viewMethods: ["get_nft_token"], // view methods do not change state but usually return a value
      changeMethods: [] // change methods modify state
    }
  );

  const res = await contract.get_nft_token({
    token_id: tokenId // argument name and value - pass empty object if no args required
  });
  return res;
};

export const transferNFT = async (
  tokenId,
  ownerId,
  contractId,
  recipient,
  networkType,
  privateKey
) => {
  const connection = await nearConnection(ownerId, networkType, privateKey);
  const account = await connection.account(ownerId);
  //Interacting with contract
  const contract = new nearAPI.Contract(
    account, // the account object that is connecting
    contractId,
    {
      // name of contract you're connecting to
      viewMethods: [], // view methods do not change state but usually return a value
      changeMethods: ["nft_transfer"] // change methods modify state
    }
  );
  try {
    const res = await contract.nft_transfer(
      {
        receiver_id: recipient,
        token_id: tokenId
      },
      30_000_000_000_000, // attached GAS (optional)
      new BN("1")
    );

    return {status: true, data: res};
  } catch (error) {
    console.log(`Error occured while transferring NFT:${error}`);
    return {status: false, data: error};
  }
};

export const nearConnection = async (accountId, networkType, privateKey) => {
  // console.log("in nearConnection");
  // console.log(privateKey);
  const keyPair = nearAPI.utils.KeyPair.fromString(privateKey);

  // console.log(keyPair);
  const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  keyStore.setKey(networkType, accountId, keyPair);
  const config = {
    keyStore, // instance of InMemoryKeyStore
    networkId: networkType,
    nodeUrl: `https://rpc.${networkType}.near.org`,
    // nodeUrl: `https://few-serene-dew.near-mainnet.quiknode.pro/8a6ce52775b1f360597c149ed986cb3ef4304ac7/`,
    walletUrl: `https://wallet.${networkType}.near.org`,
    helperUrl: `https://helper.${networkType}.near.org`,
    explorerUrl: `https://explorer.${networkType}.near.org`
  };

  // inside an async function
  const nearConnection = await nearAPI.connect(config);
  // console.log(nearConnection);
  return nearConnection;
};
