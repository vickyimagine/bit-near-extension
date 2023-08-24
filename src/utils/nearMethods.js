import {KeyPair} from "near-api-js";
const nearAPI = require("near-api-js");
const sha256 = require("js-sha256");

export const transferNear = async (signer, receiver, networkType, amount, privateKey) => {
  const amount = nearAPI.utils.format.parseNearAmount(amount);
  const provider = new nearAPI.providers.JsonRpcProvider(
    `https://rpc.${networkType}.near.org`
  );

  const keyPair = KeyPair.fromString(privateKey);
  const pubKey = keyPair.getPublicKey();
  const accessKey = await provider.query(`access_key/${sender}/${pubKey.toString()}`, "");

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
