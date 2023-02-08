const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/swapTokenPrice", async (req, res) => {

  const {query} = req
  const responseOne = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressOne,
    chain: query.chain
  })

  const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressTwo,
    chain: query.chain
  })

  console.log(responseOne.raw)
  console.log(responseTwo.raw)

  const usdPrices = {
    tokenOne: responseOne.raw.usdPrice,
    tokenTwo: responseTwo.raw.usdPrice,
    ratio: responseOne.raw.usdPrice/responseTwo.raw.usdPrice,
    chain: query.chain
  }

  return res.status(200).json(usdPrices);
});

app.get("/requestTokenBalance", async (req, res) => {
  
  const {query} = req
  const tokenListResponse = await Moralis.EvmApi.token.getWalletTokenBalances({
    address: query.address,
    chain: query.chain,
    tokenAddresses: [query.tokenAddresses]
  })

  return res.status(200).json(tokenListResponse)

})

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
