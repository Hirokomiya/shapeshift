import React from 'react';
import {connect} from 'react-redux';
import { startSetLimits } from '../actions/limits';
import CoinTrader from '../components/CoinTrader';
import { startSetTopCoins } from '../actions/topCoins';
import { setLanguage } from '../actions/language';
import { cancelTransaction } from '../actions/transaction';
import Header from '../components/Header';
import ModalContent from '../components/ModalContent';
import CoinLimits from '../components/CoinLimits';
import TransactionContainer from '../components/TransactionContainer';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            returnCoin: '',
            withdrawCoin: '',
            isDepositSelected: true,
            isSelected: false,
            startTransaction: false
        }
    }

    componentDidMount() {
        //update info from coincap every 10 seconds
        setInterval(() => {
          this.props.startSetTopCoins();
        }, 10000);
        //get selected coins and their limits info
        this.setState(() => ({
            returnCoin: localStorage.getItem('return') || 'BTC',
            withdrawCoin: localStorage.getItem('withdraw') || 'ETH'
        }), () => {
            this.props.startSetLimits(this.state.returnCoin, this.state.withdrawCoin);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.returnCoin !== this.state.returnCoin || 
            prevState.withdrawCoin !== this.state.withdrawCoin || 
            prevState.startTransaction !== this.state.startTransaction) 
        {
            localStorage.setItem('return', this.state.returnCoin);
            localStorage.setItem('withdraw', this.state.withdrawCoin);
            this.props.startSetLimits(this.state.returnCoin, this.state.withdrawCoin);
        }
    }

    handleSelectCoin = (coin) => {
        this.handleCoinSelection(coin.symbol);
    }

    handleCoinSelection = (symbol) => {
        if(this.state.isDepositSelected) {
            if(this.state.withdrawCoin !== symbol) {
                this.setState({
                    returnCoin: symbol,
                    isSelected: false
                });
            } else {
                this.setState((prevState) => ({
                    isSelected: false,
                    withdrawCoin: prevState.returnCoin
                }), () => this.setState({returnCoin: symbol}));
            }
        } 
        else {
            if(this.state.returnCoin !== symbol) {
                this.setState({
                    isSelected: false,
                    withdrawCoin: symbol
                });
            } else {
                this.setState((prevState) => {
                    return ({
                        isSelected: false,
                        returnCoin: prevState.withdrawCoin
                })}, () => {
                    this.setState({withdrawCoin: symbol});
                });
            }
        }
    }

    handleSwitchClick = () => {
        this.setState((prev) => ({
            returnCoin: prev.withdrawCoin,
            withdrawCoin: prev.returnCoin
        }));
    }

    handleSelectedDirection = (isDepositSelected) => {
        this.setState({
            isSelected: true,
            isDepositSelected
        });
    }

    handleStartTransaction = () => {
        this.setState({startTransaction: true});
    }

    handleAbortTransaction = () => {
        this.setState({
            startTransaction: false
        }, () => {
            this.props.cancelTransaction();
        });
    }

    render() {
        return (
            <div className='container'>
              <Header 
                rate={this.props.limits.rate}
                returnCoin={this.state.returnCoin}
                withdrawCoin={this.state.withdrawCoin}
                isDepositSelected={this.state.isDepositSelected}
                isTxPage={this.state.startTransaction}
                handleAbortTransaction={this.handleAbortTransaction}
              />
              <main className='row'>
                       {
                        !this.state.startTransaction && 
                       <section>
                        <div className={`col-1-of-2-md ${this.state.isSelected && 'col-1-of-2-md--hide'}`}>
                            <section className='container__selector'>
                                <CoinLimits 
                                    depositSymbol={this.state.returnCoin}
                                    withdrawSymbol={this.state.withdrawCoin}
                                    limits={this.props.limits}
                                />
                                <CoinTrader 
                                    returnCoin={this.state.returnCoin}
                                    withdrawCoin={this.state.withdrawCoin}
                                    handleSelectedDirection={this.handleSelectedDirection}
                                    isDepositSelected={this.state.isDepositSelected}
                                    handleStartTransaction={this.handleStartTransaction}
                                />
                            </section>
                        </div> 
                        <div className={`col-1-of-2--burger ${this.state.isSelected && 'col-1-of-2--burger-active'}`}>
                            <section className='container__list'>
                                <ModalContent
                                    handleSelectCoin={this.handleSelectCoin}
                                />
                            </section>
                        </div>
                    </section>
                    }
                    {
                        this.state.startTransaction && 
                        <section className='container__selector'>
                            <TransactionContainer />
                        </section>
                    }
                </main>
            </div>
        );
    }
} 

const mapStateToProps = (state) => ({
    coins: state.coins,
    limits: state.limits
});

const mapDispatchToProps = (dispatch) => ({
    startSetTopCoins: () => dispatch(startSetTopCoins()),
    setLanguage: (option) => dispatch(setLanguage(option)),
    startSetLimits: (coin1, coin2) => dispatch(startSetLimits(coin1, coin2)),
    cancelTransaction: () => dispatch(cancelTransaction())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);