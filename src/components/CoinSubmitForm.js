import React from 'react';
import { connect} from 'react-redux';
import SSAPI from '../shapeshift/shapeshift';
import ShiftButton from './ShiftButton';
import InputAddress from './InputAddress';
import {validateInput, validateAmount} from '../validations/shapeshiftValidations';
import {startSetTransaction} from '../actions/transaction';
import TermsBox from './TermsBox';
import getCoin from '../utilities/getCoin';

class CoinsSubmitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            returnAddress: '',
            withdrawAddress: '',
            amount: '',
            destTag: '',
            validating: false,
            returnIsValid: true,
            withdrawIsValid: true,
            amountIsValid: true,
            agreed: false,
            error: false
        }
    }

    handleReturnChange = (e) => {
        const returnAddress = e.target.value;
        this.setState({
            error: false,
            returnIsValid: true,
            returnAddress
        });
    }

    handleWithdrawChange = (e) => {
        const withdrawAddress = e.target.value;
        this.setState({
            error: false,
            withdrawIsValid: true,
            withdrawAddress
        });
    }

    handleAmountChange = (e) => {
        const amount = e.target.value;
        this.setState({
            error: false,
            amountIsValid: true,
            amount
        });
    }

    handleDestTagChange = (e) => {
        const destTag = e.target.value;
        if(destTag) {
            this.setState({
                destTag
            });
        }
    }

    handleTermsAgreement = (e) => {
        const agreed = e.target.checked;
        this.setState({
            error: false,
            agreed
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        //start validation
        //check if empty inputs
        if(validateInput(this.state.returnAddress, this.state.withdrawAddress) && this.state.agreed) {
            //check if amount is within limits
            if(validateAmount(this.state.amount, this.props.limits.maxLimit, this.props.limits.minimum)) {
                //check if correct address are provided
                this.setState(() => ({
                    validating: true
                }), () => {
                    //check if return address is valid
                    SSAPI.ValidateAdddress(this.state.returnAddress, this.props.returnSymbol, (response) => {
                        this.setState(() => ({
                            returnIsValid: response.isvalid
                        }), () => {
                            //check if withdraw address is valid and end validation
                            SSAPI.ValidateAdddress(this.state.withdrawAddress, this.props.withdrawSymbol, (response) => {
                                this.setState({
                                    withdrawIsValid: response.isvalid,
                                    validating: false
                                }, () => {
                                    //callback after validations finished and states are set
                                    if(this.state.returnIsValid && this.state.withdrawIsValid) {
                                        this.props.handleStartTransaction();
                                        this.props.startSetTransaction(
                                            this.state.amount,
                                            this.state.withdrawAddress,
                                            this.state.returnAddress,
                                            this.props.returnSymbol,
                                            this.props.withdrawSymbol,
                                            this.state.destTag
                                        );
                                    } else {
                                        console.log('validation failed!');
                                    }
                                });
                            });
                        })
                    });
                });
            } else {
                this.setState({amountIsValid: false})
            }
        } else {
            this.setState({error: true});
        }
    }

    render() {
        return (
            <form className='form' onSubmit={this.handleFormSubmit}>
                <div className="form__group">
                    <div className="row">
                        <div className='col-1-of-2-sm'>
                            <InputAddress 
                                className={`input__text ${!this.state.returnIsValid && 'input__error'}`}
                                type='text'
                                label={this.props.lang.returnAddress}
                                value={this.state.returnAddress}
                                isvalid={this.state.returnIsValid}
                                onValueChangeHandler={this.handleReturnChange}
                                required={true}
                                />
                            <InputAddress 
                                className={`input__text ${!this.state.amountIsValid && 'input__error'}`}
                                type='text'
                                label={this.props.lang.amount}
                                value={this.state.value}
                                isvalid={this.state.amountIsValid}
                                onValueChangeHandler={this.handleAmountChange}
                                required={true}
                            />
                        </div>
                        <div className='col-1-of-2-sm'>
                            <InputAddress 
                                className={`input__text ${!this.state.withdrawIsValid && 'input__error'}`}
                                type='text'
                                label={this.props.lang.withdrawAddress}
                                value={this.state.withdrawAddress}
                                isvalid={this.state.withdrawIsValid}
                                onValueChangeHandler={this.handleWithdrawChange}
                                required={true}
                            />
                            {(this.props.receiveCoin && 
                                this.props.receiveCoin.specialOutgoing && 
                                this.props.receiveCoin.symbol === 'XRP') && 
                                <InputAddress
                                    className={`input__text ${!this.state.withdrawIsValid && 'input__error'}`}
                                    label={this.props.receiveCoin.fieldName}
                                    value={this.state.destTag}
                                    isvalid={this.state.withdrawIsValid}
                                    onValueChangeHandler={this.handleDestTagChange}
                                    required={true}
                                />
                            }
                        </div>
                    </div>
                    <div className='row'>
                        <TermsBox 
                          checked={this.state.agreed}
                          onChange={this.handleTermsAgreement}
                        />
                        <ShiftButton 
                        disabled={this.state.validating}
                        loading={this.state.validating}
                        label={this.props.lang.shiftButton}
                        type='submit'
                        />
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state, props) => ({
    lang: state.language,
    limits: state.limits,
    receiveCoin: getCoin(props.withdrawSymbol, state.coins)
});

const mapDispatchToProps = (dispatch) => ({
    startSetTransaction: (amount, withdrawalAddress, returnAddress, coin1, coin2, destTag) => {
       return dispatch(startSetTransaction(amount, withdrawalAddress, returnAddress, coin1, coin2, destTag));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CoinsSubmitForm);