import React from 'react';
import { roundPrice, roundCap } from '../utilities/roundNumbers';

const TopCoinBox = (props) => (
    <ul className='coin-info'>
        <li><label className='coin-info__title'>{props.symbol}</label></li>
        <li><label className='coin-info__item'>market cap: ${roundCap(props.cap)}M </label></li>
        <li><label className='coin-info__item'>Price: ${roundPrice(props.price)} </label></li>
        <li>
            <label className={`coin-info__item ${props.percent > 0 ? 'coin-info__item--positive' : 'coin-info__item--negative'}`}>
              {props.percent}%
            </label>
        </li>
    </ul>
);

export default TopCoinBox;