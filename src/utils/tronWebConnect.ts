const TronWeb = require("tronweb");

const tronWeb = new TronWeb({
  fullHost: process.env.TRON_GRID_TEST_NET_FULL_NODE,
  headers: { "TRON-PRO-API-KEY": process.env.TRON_GRID_API_KEY },
});

export async function authenticateUser(reqBody: any) {
  const { message, signature, address } = reqBody;

  return await tronWeb.trx.verifyMessageV2(message, signature, address);
}
