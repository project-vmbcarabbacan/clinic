
const crypto = require("crypto");

const passphrase = "vc-appointment"

try {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
      cipher: "des-ede3-cbc",
      passphrase,
    },
  });

  console.log(`Successfully created your public private key pair. Please copy the below values into your /.env file
************* COPY PASSPHRASE & PRIVATE KEY BELOW TO .env FILE *************
PASSPHRASE="${passphrase}"

PRIVATE_KEY="${keyPair.privateKey}"
************* COPY PASSPHRASE & PRIVATE KEY ABOVE TO .env FILE *************

************* COPY PUBLIC KEY BELOW *************
${keyPair.publicKey}
************* COPY PUBLIC KEY ABOVE *************
`);
} catch (err) {
  console.error("Error while creating public private key pair:", err);
}
