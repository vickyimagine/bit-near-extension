const bs58 = require("bs58");
const nacl = require("tweetnacl");

export const genFromSecret = () => {
  // Private key in base58 format
  const privateKeyBase58 =
    "2tQzCqmshhQu7oEchX3Vnh7dS5E5PhCaUUAY1ZdHwHSPtQavToGVrVUHE9dvXFcM4TN5VYdi4SoCGnZHbyUvZn4f";

  // Decode base58 private key to bytes
  const privateKeyBytes = bs58.decode(privateKeyBase58);

  // Generate key pair from private key
  const keyPair = nacl.sign.keyPair.fromSecretKey(privateKeyBytes);

  // Get the public key
  const publicKey = keyPair.publicKey;

  // Encode the public key in base58
  const publicKeyBase58 = bs58.encode(publicKey);

  // Format the public key
  const formattedPublicKey = `ed25519:${publicKeyBase58}`;

  console.log("Generated Public Key:", formattedPublicKey);
};

export const getAccountId = publicKey => {
  const bytes = bs58.decode(publicKey);
  return Buffer.from(bytes).toString("hex");
};
