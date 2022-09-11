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

//deployed examples:
//deployed-txn-address:0xd4ca99365063e59307b02d0a47a18d86a731a9706c9c2d9258b4da07458b7583
//contract-address:0xe73f8e7f031cbf001f1fe62c9a3e9c230d490154
//deployer-address:0x6d956f9200722ab8e31ef9663fa61e6b3ed527dc
