import React from 'react';
import { connect } from 'react-redux';
import CoinSubmitForm from './CoinSubmitForm';

const CoinSubmitContainer = (props) => (
    <section>
            <CoinSubmitForm
                handleStartTransaction={props.handleStartTransaction}
                withdrawSymbol={props.withdrawSymbol}
                returnSymbol={props.returnSymbol}
            />
    </section>
);

const mapStateToProps = (state) => ({
    limits: state.limits
}) 

export default connect(mapStateToProps)(CoinSubmitContainer);