import React from 'react';
import { connect } from 'react-redux';

const ExchangeStatusBox = (props) => (
    <div className='exchange'>
        <div className='col-1-of-3'>
            <div className='exchange__icon'>
                <i className={`fas fa-download ${
                    props.status === props.lang.pending  ? 
                    'exchange__pending' : props.status === 'failed' || props.status === props.lang.expired ? 
                    'exchange__expired' : 'exchange__confirmed'
                    }`
                }>
                </i>
                <label className='exchange__label'>{props.lang.awaiting}</label>
            </div>
        </div>
        <div className='col-1-of-3'>
            <div className='exchange__icon'>
                <i className={`fas fa-exchange-alt ${
                    props.status === props.lang.pending ? 
                    '' : props.status === props.lang.received ? 
                    'exchange__pending' : props.status === 'complete' ? 
                    'exchange__confirmed' : 'exchange__expired'
                    }`
                }>
                </i>
                <label className='exchange__label'>{props.lang.exchange}</label>
            </div>
        </div>
        <div className='col-1-of-3'>
            <div className='exchange__icon'>
                <i className={`fas fa-check ${
                    props.status === props.lang.pending || props.status === props.lang.received ? 
                    '' : props.status === 'complete' ? 'exchange__confirmed' :
                    'exchange__expired'
                    }`
                }>
                </i>
                <label className='exchange__label'>{props.lang.received}</label>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    lang: state.language
});
 
export default connect(mapStateToProps)(ExchangeStatusBox);