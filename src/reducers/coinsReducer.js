export default (state = [], actions) => {
    switch(actions.type) {
        case 'SET_COINS':
            const coins = [];
            for(let key in actions.coins) {
                if(actions.coins.hasOwnProperty(key)) {
                    coins.push(actions.coins[key]);
                }
            }
            return [...coins];
        case 'ADD_MARKET_CAP':
            return state.map((coin) => {
                if(coin.symbol === actions.symbol) {
                    coin.cap = actions.cap;
                }
                return coin;
            });
        default:
            return state;
    }
}