const bs58 = require("bs58");

export const getAccountId = publicKey => {
  const bytes = bs58.decode(publicKey);
  return Buffer.from(bytes).toString("hex");
};
