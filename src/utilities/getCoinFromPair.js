export default (pair, coins, getFirst = true) => {
    const symbol = getFirst ? pair.substr(0,3).toUpperCase() : pair.substr(4).toUpperCase();
    return coins.filter((coin) => coin.symbol === symbol)[0];
}