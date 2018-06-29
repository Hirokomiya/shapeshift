import React from 'react';
import { connect } from 'react-redux';

const CoinLimits = ({limits, depositSymbol = '', withdrawSymbol = '', lang}) => (
    <div className="limits">
        <div className='row'>
            <div className='col-1-of-3-sm limits__column'>
               <p className='text-primary'> {lang.depositLimit}:</p>
               <p className='text-secondary'> {`${limits.maxLimit} ${depositSymbol}`} </p>
            </div>
            <div className='col-1-of-3-sm limits__column'>
                <p className='text-primary'>{lang.minimum}:</p>
                <p className='text-secondary'> {`${limits.minimum} ${depositSymbol}`} </p>
            </div>
            <div className='col-1-of-3-sm limits__column'>
                <p className='text-primary'>{lang.fee}:</p>
                <p className='text-secondary'> {`${limits.minerFee} ${withdrawSymbol}`} </p>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    lang: state.language
});


export default connect(mapStateToProps)(CoinLimits);