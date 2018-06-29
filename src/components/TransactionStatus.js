import React from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import CountDownTimer from './CountDownTimer';
import getCoinFromPair from '../utilities/getCoinFromPair';
import ExchangeStatusBox from './ExchangeStatusBox';

const TransactionStatus = (props) => (
    <div>
        <div className='row'>
            <div className='col-1-of-2-lg'>
                <div className='col-1-of-3-sm'> 
                    <figure className='qr'>
                        <QRCode 
                            className='qr__code'
                            renderAs={'svg'}
                            size={400}
                            value={props.deposit} />
                        <figcaption className='qr__label'>{props.lang.depositAddress}</figcaption>
                    </figure>
                </div>
                <div className='col-2-of-3-sm'>
                    <div className='tx'>
                        <div>
                            <CountDownTimer
                                expired={props.expired}
                                timestamp={props.expiration}
                                handleExpiration={props.handleExpiration}
                                finished={props.finished}
                            />
                        </div>
                        <p className='tx__txt'>
                            send <span className='tx__price'>{props.depositAmount}</span> {props.depositCoin.symbol} to:
                        </p>
                        <p className='tx__txt'>
                            <img className='tx__icon' src={props.depositCoin.imageSmall} />
                            <span className='tx__address'>
                                {props.deposit}
                            </span>
                        </p>
                        {
                            props.depositCoin.specialIncoming && <p className='tx__txt'>
                               destination tag: <span className='tx__address'>{props.outgoingDestTag}</span>
                            </p>
                        }
                        <p className='tx__txt'>
                            {props.lang.fixedRate}: 
                            <span className='tx__price'> 1</span> {props.depositCoin.symbol} = 
                            <span className='tx__price'> {props.quotedRate}</span> {props.receiveCoin.symbol}
                        </p>
                    </div>
                </div>
            </div>
            <div className='col-1-of-2-lg'>
                <div className='tx'>
                    <h3 className='tx__title'>{props.lang.txDetails}</h3>
                    <p className='tx__txt'>
                        Order ID = <span className='tx__address'>{props.orderId}</span> 
                    </p>
                    <p className='tx__txt'>
                        {props.lang.receiveAddress}:
                        <span className='tx__address'> {props.withdrawal}</span>
                        <img src={props.receiveCoin.imageSmall} className='tx__icon' />
                    </p>
                    <p className='tx__txt'>
                        {props.lang.refundAddress}:
                        <span className='tx__address'> {props.returnAddress}</span>
                        <img src={props.depositCoin.imageSmall} className='tx__icon' />
                    </p>
                    {
                        props.xrpDestTag && <p className='tx__txt'>
                            destination tag: 
                            <span className='tx__address'>{ props.xrpDestTag}</span>
                        </p>
                    }
                    <p className='tx__txt'> 
                        {props.lang.youWillReceive}: <span className='tx__price'>{props.withdrawalAmount}</span> {props.receiveCoin.symbol}
                    </p>
                    <p className='tx__txt'>
                        {props.lang.fee}: <span className='tx__price'>{props.minerFee}</span> {props.receiveCoin.symbol}
                    </p>
                </div>
            </div>
        </div>
        <hr />

        <div className='row'>
            <div className='col-1-of-2-lg'>
                <ExchangeStatusBox
                    status={props.status}
                    expired={props.expired}
                />
            </div>
            <div className='col-1-of-2-lg'>
                <div className='tx'>
                    <h4 className='tx__title'>{props.lang.txStatus}</h4>
                    <p className='tx__txt'>
                        {props.lang.status}: <span className='tx__status tx__status--pending'>{
                            props.status
                        }</span>
                    </p>
                    {
                    props.statusError && <p className='tx__txt'>
                    reason: <span className='tx__status tx__status--error'>{props.statusError}</span>
                    </p>
                    }
                    {
                    props.status === 'complete' &&
                    <div className='tx'>
                        <p className='tx__txt'>{props.lang.txSuccess}</p>
                        <p className='tx__txt'>{props.lang.txId} {props.transactionId}</p>
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state, props) => ({
    depositCoin: getCoinFromPair(props.pair, state.coins, true),
    receiveCoin: getCoinFromPair(props.pair, state.coins, false),
    lang: state.language
})

export default connect(mapStateToProps)(TransactionStatus);