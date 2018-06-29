import React from 'react';
import { connect } from 'react-redux';
import CoinBox from './CoinBox';

class CoinSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coin: {},
            coinName: '',
        }
    }

    componentDidMount() {
        if(this.props.coins.length > 0) {
            this.setCoin();
        }
    }

    componentDidUpdate() {
        if((this.state.coin && this.state.coin.symbol !== this.props.coinName) || !this.state.coin) 
            this.setCoin();
    }

    setCoin = () => {
        this.setState(() => ({
            coin: this.props.coins.filter((value) => {
                if(value.symbol === this.props.coinName) {
                    return value;
                }
            })[0]
        })); 
    }

    handleBoxClick = () => {
        const isDeposit = this.props.direction === 'in';
        this.props.handleSelectedDirection(isDeposit);
    }

    render() {
        return (
                <div  
                >
                    <CoinBox
                        isSelected={this.props.isSelected}
                        direction={this.props.direction}
                        coin={this.state.coin}
                        handleBoxClick={this.handleBoxClick}
                        />
                </div>
        )
    }
};

const mapStateToProps = (state) => ({
    lang: state.language,
    coins: state.coins
})


export default connect(mapStateToProps)(CoinSelector);