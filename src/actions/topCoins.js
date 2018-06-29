import { getCoinData } from '../coincap/coinCap';

const topCoins = [
    'BTC',
    'ETH',
    'XRP',
    'BCH',
    'LTC',
    'XMR',
    'DASH',
    'ETC',
    'QTUM',
    'OMG'
];

export const setTopCoins = (coins) => ({
    type: 'SET_TOP_COINS',
    coins
});

export const startSetTopCoins = (cb) => {
    return (dispatch) => {
        getCoinData((data) => {
            if(data && data.filter) {
                const topCoins = data.filter((coin) => coin.shapeshift === true);
                dispatch(setTopCoins(topCoins));
                if(cb !== undefined) {
                    cb(topCoins);
                }
            }
        });
    }
};