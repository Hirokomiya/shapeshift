//12t9YDPgwueZ9NyMgw519p7AA8isjr6SMw btc
//0xd12cd8a37f074e7eafae618c986ff825666198bd eth
//rPspuKM5rCw5EkRDD9vGL816V15DwtSa3L?dt=36860 ripple
const timestamp = + new Date() + 1000*120;

const defaultData = {
    success: {
        deposit: '12t9YDPgwueZ9NyMgw519p7AA8isjr6SMw',
        depositAmount: .74,
        withdrawal: '0xd12cd8a37f074e7eafae618c986ff825666198bd',
        withdrawalAmount: 10.12,
        expiration: timestamp,
        orderId: '8786sada123-87912dhsah8787',
        pair: 'btc_eth',
        quotedRate: 13.5,
        minerFee: 0.0014,
        maxLimit: .775,
        returnAddress: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX'
    }
}

export default (state = {}, actions) => {
    switch(actions.type) {
        case 'SET_TX': 
            return actions.transaction;
        case 'CANCEL_TX':
            return {};
        default: 
            return state;
    }
}