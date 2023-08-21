const KeyPair = require("near-api-js").KeyPair;
const bs58 = require("bs58");

export const genKeys = () => {
  const keyPair = KeyPair.fromRandom("ed25519");
  let publicKey = keyPair.publicKey.toString().slice(8);
  const accountId = getAccountId(publicKey);
  return [keyPair, accountId];
};

function getAccountId(publicKey) {
  const bytes = bs58.decode(publicKey);
  return Buffer.from(bytes).toString("hex");
}
