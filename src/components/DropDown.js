import React from 'react';

const DropDown = (props) => (
    <div className='dropdown'>
        <div 
          className={`dropdown__item ${props.defaultLanguage === 'jp' && 'dropdown__item--inactive'}`} 
          onClick={() => props.handleChange('en')}
        >
            <img className='dropdown__image' src='../images/uk.png' />
            <label className='dropdown__label'>en</label>
        </div>
        <div 
          className={`dropdown__item ${props.defaultLanguage === 'en' && 'dropdown__item--inactive'}`}
          onClick={() => props.handleChange('jp')}
        >
            <img className='dropdown__image' src='../images/japan.png' />
            <label className='dropdown__label'>日本</label>            
        </div>
    </div>
);

export default DropDown;