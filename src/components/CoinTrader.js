import React from 'react';
import { connect } from 'react-redux';
import CoinSelector from './CoinSelector';
import CoinSubmitContainer from './CoinSubmitContainer';

const CoinTrader = (props) => (
    <div className='trader-box'>
        <div className='trader-box__content trader-box__content--active'>
            <h1 className='trader-box__title'>{props.lang.title}</h1>
            <div className='row'>
                <div className='col-1-of-2'>
                <CoinSelector
                    label={props.lang.returnAddress}
                    direction='in'
                    isSelected={props.isDepositSelected}
                    coinName={props.returnCoin}
                    handleSelectedDirection={props.handleSelectedDirection}
                />
                </div>
                <div className='col-1-of-2'>
                <CoinSelector
                    label={props.lang.withdrawAddress}
                    direction='out'
                    isSelected={!props.isDepositSelected}
                    coinName={props.withdrawCoin}
                    handleSelectedDirection={props.handleSelectedDirection}
                />
                </div>
            </div>
        </div> 
        <div className='row'>
            <CoinSubmitContainer 
                handleStartTransaction={props.handleStartTransaction}
                withdrawSymbol={props.withdrawCoin}
                returnSymbol={props.returnCoin}/>
        </div>
    </div>
);
    

const mapStateToProps = (state) => ({
    lang: state.language
})

export default connect(mapStateToProps)(CoinTrader);