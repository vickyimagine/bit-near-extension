const bs58 = require("bs58");
const nacl = require("tweetnacl");

export const genFromSecret = privateKey => {
  if (privateKey.length === 96) {
    privateKey.slice(8);
  }
  // Private key in base58 format
  const privateKeyBase58 = privateKey;

  // Decode base58 private key to bytes
  const privateKeyBytes = bs58.decode(privateKeyBase58);

  // Generate key pair from private key
  const keyPair = nacl.sign.keyPair.fromSecretKey(privateKeyBytes);

  // Get the public key
  const publicKey = keyPair.publicKey;

  // Encode the public key in base58
  const pubKeyBase = bs58.encode(publicKey);

  const accId = getAccountId(pubKeyBase);
  const privKey = `ed25519:${privateKey}`;
  const pubKey = `ed25519:${pubKeyBase}`;

  return {accId, pubKey, privKey};
};

export const getAccountId = publicKey => {
  const bytes = bs58.decode(publicKey);
  return Buffer.from(bytes).toString("hex");
};
