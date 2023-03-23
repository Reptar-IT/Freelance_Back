import { constants as HTTP_CODES } from "http2";

export const getTest = () => {
    const record: any = [];

    const stableCoin: any = {
        usdt: {
            symbol: "USDT",
            balance: 1000,
            action: 'BUY',
            alternates: [ "TUSD", "USDC", "USDP", "BUSD" ],
            deviation: 0.02,
        },
        dai: {
            symbol: "DAI",
            balance: 10000,
            action: 'BUY',
            alternates: [ "USDT", "BUSD" ],
            deviation: 0.02,
        },
        usdp: {
            symbol: "USDP",
            balance: 10,
            action: 'SELL',
            alternates: [ "USDT" ],
            deviation: 0.02,
        },
        busd: {
            symbol: "BUSD",
            balance: 150,
            action: 'SELL',
            alternates: [ "USDT", "DAI" ],
            deviation: 0.02,
        },
        usdc: {
            symbol: "USDC",
            balance: 10,
            action: 'SELL',
            alternates: [ "USDT" ],
            deviation: 0.02,
        },
        tusd: {
            symbol: "TUSD",
            balance: 1000,
            action: 'SELL',
            alternates: [ "USDT" ],
            deviation: 0.02,
        },
    };

    // use symbol, get balance from binance. Compare balances. trade the stablecoin with highest balance and least expensive pair that fits within the deviation.

    const { token, action, symbol, balance } = Object.keys(stableCoin).reduce((accumulator: any, token: string, i: number) => {

        return accumulator.balance >= stableCoin[token].balance ? accumulator : {
            token,
            action: stableCoin[token].action,
            symbol: stableCoin[token].symbol,
            balance: stableCoin[token].balance // get balance from binance API
        };
    }, {});

    const alternates: string[] = stableCoin[token].alternates.map((alternate: any) => `${alternate}${symbol}`);

    const leastExpensivePair = alternates.reduce((accumulator: any, ticker: any) => {
        const tickerValue = 0 // await binanceClientApi.price(ticker);

         return accumulator != 0 && accumulator >= ticker ? tickerValue : accumulator;
    })

    return { code: HTTP_CODES.HTTP_STATUS_OK, record: { symbol, balance, alternates} }
}