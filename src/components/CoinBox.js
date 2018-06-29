import React from 'react';
import { connect } from 'react-redux';
import TopCoinBox from './TopCoinBox';

const CoinBox = ({coin = { image: "", name: "", symbol: "", cap: 0}, 
                 topCoins = [],
                 direction, 
                 lang,
                 handleBoxClick, 
                 isSelected}) => {
    
    return (
        <figure 
          onClick={handleBoxClick}
          className={`coin-box ${!direction && 'coin-box--small'} ${isSelected && 'coin-box--active'}`}>
            {direction && <p className='coin-box__label'> {direction === 'in' ? lang.deposit : lang.receive } </p>}
            <img 
                src={`${coin.image}`} 
                className={direction ? 'coin-box__image' : 'coin-box__image--small'} />
            {
                direction ? 
                <figcaption className='coin-box__label'>{coin.name }</figcaption> 
                : topCoins.length > 0 && topCoins.map((topCoin) => {
                    if(topCoin.short === coin.symbol) {
                        return <TopCoinBox
                                    key={topCoin.short}
                                    symbol={topCoin.short}
                                    price={topCoin.price}
                                    percent={topCoin.perc}
                                    cap={coin.cap}
                                />
                    }
                })
            }
        </figure>
    )
}

const mapStateToProps = (state) => ({
    coins: state.coins,
    topCoins: state.topCoins,
    lang: state.language
});

export default connect(mapStateToProps)(CoinBox);