import React from 'react';

const BackArrow = (props) => (
    <span className='icon' onClick={props.handleAbortTransaction}>
        <i className='fas fa-angle-left icon__arr-back'></i>
    </span>
);

export default BackArrow;