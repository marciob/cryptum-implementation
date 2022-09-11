const CryptumSdk = require("cryptum-sdk");
require("dotenv").config({ path: ".env" });

const API_KEY = process.env.API_KEY;
const MNEMONIC = process.env.MNEMONIC;

const sdk = new CryptumSdk({
  environment: "testnet", // 'testnet'
  apiKey: API_KEY,
});

async function create() {
  const wallet = await sdk.wallet.generateWallet({
    protocol: "POLYGON",
    mnemonic: MNEMONIC,
    derivation: { account: 0, address: 0 },
  });

  //it deploys a NFT with the indicated parameters and stores the transaction hasn in this variable
  const { hash } = await sdk.nft.create({
    protocol: "POLYGON",
    wallet,
    symbol: "NFTS",
    name: "NFT Name",
    type: "ERC721",
    uri: "some uri address",
  });

  //LACK OF IMPLEMENTATION:
  //it should add a kind of settimeout because it takes time to get the token address
  //so waiting it would prevent errors from calling it before getting the contract address
  //const contractAddress = await getContractAddress(hash);

  console.log(hash);

  //it returs the contractaddress
  return hash;
}

create();

//it returns the contractaddress
async function getContractAddress(hash) {
  const { contractAddress } = await sdk.transaction.getTransactionReceiptByHash(
    {
      protocol: "POLYGON",
      hash: hash,
    }
  );

  return contractAddress;
}

//documentation:
//https://doc.cryptum.io/main/for-developers/sdk-integration-guides/nfts/nfts-on-ethereum-celo-bsc-avalanche-and-polygon
