import React from 'react';
import { connect } from 'react-redux';
import CoinBox from './CoinBox';
import coinSelector from '../utilities/coinSelector';
import Loading from './Loading';

const CoinList = (props) => (
    <div className='coin-list'>
        {
            props.coins ? props.coins.map((coin) => {
                if(coin.status === 'available') {
                    return <div key={coin.symbol} 
                            onClick={() => props.handleSelectCoin(coin)}
                            className='coin-list__box'>
                                <CoinBox 
                                coin={coin}
                                />
                        </div>
                }
            }) : <Loading />
        }
    </div>
);

const mapStateToProps = (state, props) => ({
    coins: coinSelector(state.coins, props.identifier)
});

export default connect(mapStateToProps)(CoinList);