import {nearConnection} from "./nearMethods";

export const walletObject = async (accountId, networkType, secretKey) => {
  const connection = await nearConnection(accountId, networkType, secretKey);
  const wallet = await connection.account(accountId);
  return wallet;
};
