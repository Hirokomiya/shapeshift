import SSAPI from '../shapeshift/shapeshift';

export const setLimits = (limits) => ({
    type: 'SET_LIMITS',
    limits
});

export const startSetLimits = (coin1, coin2) => {
    return (dispatch) => {
        SSAPI.GetMarketInfo(coin1, coin2, (data) => {
            dispatch(setLimits(data));
        });
    }
}