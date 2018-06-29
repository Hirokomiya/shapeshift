import React from 'react';
import { connect } from 'react-redux';
import shapeshift from '../shapeshift/shapeshift';
import TransactionStatus from './TransactionStatus';
import Loading from './Loading';
import getCoinFromPair from '../utilities/getCoinFromPair';
import getDtTag from '../utilities/getDtTag';

class TransactionContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            statusError: '',
            dtTag: '',
            deposit: '',
            expired: false,
            transactionId: '',
            loaded: false,
            finished: false
        }
    }

    componentDidMount() {
        this.setState({
            status: this.props.lang.pending
        })
    }

    componentDidUpdate() { 
        if(this.props.transaction.success && !this.state.loaded) {
            //check if special incoming coin
            if(this.props.depositCoin.specialIncoming && this.props.depositCoin.symbol === 'XRP') {
                const dtTag = getDtTag(this.props.transaction.success.deposit);
                this.setState({
                    deposit: this.props.transaction.success.deposit.replace(/\?dt=\d+$/g, ''),
                    dtTag
                });
            }
            else {
                this.setState({
                    deposit: this.props.transaction.success.deposit
                });
            }

            //load
            this.setState({loaded: true}, () => {
                this.stopId = setInterval(() => {
                    if(this.state.status === 'expired') {
                        clearInterval(this.stopId);
                    } else {
                        shapeshift.GetStatusOfDepositToAddress(this.props.transaction.success.deposit, (data) => {
                            this.handleStatusChange(data);
                            if(this.state.status === 'complete') {
                                clearInterval(this.stopId);
                            }
                        });
                    }
                }, 5000);
            });
        } 
    }

    componentWillUnmount() {
        clearInterval(this.stopId);
    }

    handleExpiration = () => {
        this.setState({
            expired: true,
            status: this.props.lang.expired
        });
    }

    handleStatusChange = (data) => {
        switch(data.status) {
            case 'received':
                this.setState(() => ({
                    status: this.props.lang.received
                }));
                break ;
            case 'complete':
                this.setState(() => ({
                    status: 'complete',
                    finished: true,
                    transactionId: data.transaction
                }));
                break
            case 'failed':
                this.setState(() => ({
                    expired: true,
                    status: 'failed',
                    statusError: data.error
                }));
                break;
            default: 
                this.setState({
                    status: this.props.lang.pending
                });
                break;
        }
    }

    render() {
        return (
                this.props.transaction.success ? 
                <TransactionStatus 
                    orderId={this.props.transaction.success.orderId}
                    pair={this.props.transaction.success.pair}
                    withdrawal={this.props.transaction.success.withdrawal}
                    withdrawalAmount={this.props.transaction.success.withdrawalAmount}
                    deposit={this.state.deposit}
                    depositAmount={this.props.transaction.success.depositAmount}
                    expiration={this.props.transaction.success.expiration}
                    quotedRate={this.props.transaction.success.quotedRate}
                    maxLimit={this.props.transaction.success.maxLimit}
                    minerFee={this.props.transaction.success.minerFee}
                    returnAddress={this.props.transaction.success.returnAddress}
                    xrpDestTag={this.props.transaction.success.xrpDestTag}
                    outgoingDestTag={this.state.dtTag}
                    recentTx={this.state.recentTx}
                    status={this.state.status}
                    expired={this.state.expired}
                    handleExpiration={this.handleExpiration}
                    finished={this.state.finished}
                    transactionId={this.state.transactionId}
                /> : 
                <Loading />
        )
    }
}

const mapStateToProps = (state) => ({
    lang: state.language,
    transaction: state.transaction,
    depositCoin: state.transaction.success ? 
    getCoinFromPair(state.transaction.success.pair, state.coins) :
    {}
});

export default connect(mapStateToProps)(TransactionContainer);

