import React from 'react';

const InputAddress = (props) => {
    return (
        <div className='input'>
            <input 
                type={props.type}
                className={props.className}
                placeholder={props.label}
                value={props.value}
                onChange={props.onValueChangeHandler}
                autoFocus={props.focused}
                required={!!props.required}
                />
            <label className='input__label'>{props.label}</label>
        </div>
    );
};

export default InputAddress;