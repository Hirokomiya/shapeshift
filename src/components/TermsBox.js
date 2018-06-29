import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const TermsBox = (props) => (
    <div className='checkbox'>
        <input 
         required
         id='terms' 
         type='checkbox' 
         onChange={props.onChange}
         className='checkbox__check' 
         checked={props.checked} />
        <label htmlFor='terms' className='checkbox__label'>
        {props.lang.terms1} <Link to={'/files/terms.pdf'} target='_blank'>{props.lang.terms}</Link> {props.lang.terms2}
        </label>
    </div>
);

const mapStateToProps = (state) => ({
    lang: state.language
})

export default connect(mapStateToProps)(TermsBox);