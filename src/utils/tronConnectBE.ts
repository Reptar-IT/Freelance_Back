const TronWeb = require("tronweb");

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
  headers: { "TRON-PRO-API-KEY": "YOUR_API_KEY" },
});

export async function authenticateUser(reqBody: any) {
  const { address, message, signature } = reqBody;
  return await tronWeb.trx.verifyMessage(
    message,
    signature,
    address
  );
}
