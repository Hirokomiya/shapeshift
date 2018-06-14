import React from 'react';
import {connect} from 'react-redux';
import { startSetLimits } from '../actions/limits';
import CoinTrader from '../components/CoinTrader';
import { startSetTopCoins } from '../actions/topCoins';
import { setLanguage } from '../actions/language';
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
            startTransaction: true
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
        if(prevState.returnCoin !== this.state.returnCoin || prevState.withdrawCoin !== this.state.withdrawCoin) {
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
                    returnCoin: symbol
                });
            } else {
                this.setState((prevState) => ({
                    withdrawCoin: prevState.returnCoin
                }), () => this.setState({returnCoin: symbol}));
            }
        } 
        else {
            if(this.state.returnCoin !== symbol) {
                this.setState({
                    withdrawCoin: symbol
                });
            } else {
                this.setState((prevState) => {
                    return ({
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
        this.setState({isDepositSelected});
    }

    handleStartTransaction = (response) => {
        console.log('response received', response);
        this.setState({startTransaction: true});
    }

    render() {
        return (
            <div className='container'>
              <Header 
                rate={this.props.limits.rate}
                returnCoin={this.state.returnCoin}
                withdrawCoin={this.state.withdrawCoin}
                isDepositSelected={this.state.isDepositSelected}
                startTransaction={this.state.startTransaction}
              />
              <div className='row'>
                    <div className='col-1-of-2'>
                        {
                        !this.state.startTransaction && <CoinLimits 
                        depositSymbol={this.state.returnCoin}
                        withdrawSymbol={this.state.withdrawCoin}
                        limits={this.props.limits}
                        />
                        }
                        {
                        !this.state.startTransaction && <CoinTrader 
                            returnCoin={this.state.returnCoin}
                            withdrawCoin={this.state.withdrawCoin}
                            handleSelectedDirection={this.handleSelectedDirection}
                            isDepositSelected={this.state.isDepositSelected}
                            handleStartTransaction={this.handleStartTransaction}
                        />
                        }
                        {
                        this.state.startTransaction && <TransactionContainer />
                        }
                    </div>
                    <div className='col-1-of-2'>
                        <ModalContent
                            handleSelectCoin={this.handleSelectCoin}
                         />
                    </div>
              </div>
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
    startSetLimits: (coin1, coin2) => dispatch(startSetLimits(coin1, coin2))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);