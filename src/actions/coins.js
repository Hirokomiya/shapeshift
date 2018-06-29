import SSAPI from '../shapeshift/shapeshift';

export const setCoins = (coins) => ({
    type: 'SET_COINS',
    coins
});

export const addMarketCap = (symbol, cap) => ({
    type: 'ADD_MARKET_CAP',
    symbol,
    cap
});

export const startSetCoins = (cb) => {
    return (dispatch) => {
        SSAPI.GetCoins((coins) => {
           let i = 0;
           const data = [];
           for(let key in coins) {
               if(coins.hasOwnProperty(key) && coins[key].status === 'available') {
                data[i] = coins[key];
                i++;
               }
           }
           dispatch(setCoins(data));
           if(cb !== undefined) {
            cb(data);
           }
        });
    }
}
