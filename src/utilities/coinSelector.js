export default (coins, identifier = '') => {
    if(coins[0].cap === undefined) return undefined;
    var regex1 = new RegExp(identifier, "g");
    return coins.filter((coin) => {
        if(coin.name.toLowerCase().match(regex1) || coin.symbol.toLowerCase().match(regex1)) {
            return coin;
        }
    }).sort((coinA, coinB) => {
        return coinB.cap - coinA.cap;
    });
}