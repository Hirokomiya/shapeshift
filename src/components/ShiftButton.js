import React from 'react';

const ShiftButton = (props) => (
    <div className="input-group">
            <button 
              disabled={props.disabled}
              onClick={props.onClickHandler}
              className="btn btn--primary margin-top--small" 
              type={props.type || "button"}>
              {props.loading ? <i className='fas fa-spinner fa-pulse'></i> :props.label}
            </button>
    </div>
);

export default ShiftButton;