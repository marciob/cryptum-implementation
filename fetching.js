const CryptumSdk = require("cryptum-sdk");
require("dotenv").config({ path: ".env" });

const API_KEY = process.env.API_KEY;
const MNEMONIC = process.env.MNEMONIC;

const sdk = new CryptumSdk({
  environment: "testnet", // 'testnet'
  apiKey: API_KEY,
});

async function fetching(token_address) {
  const wallet = await sdk.wallet.generateWallet({
    protocol: "POLYGON",
    mnemonic: MNEMONIC,
    derivation: { account: 0, address: 0 },
  });

  const { hash } = await sdk.nft.getInfo({
    protocol: "POLYGON",
    tokenAddress: token_address,
  });

  console.log(hash);
}

fetching();

//fetching(0x8f8c3ccada16481aaa4edfe8fe2ee20ad26952be);
