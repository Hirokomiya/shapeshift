export default (symbol, coins) => {
    return coins.filter((coin) => {
        return coin.symbol === symbol;
    })[0];
}