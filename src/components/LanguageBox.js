import React from 'react';
import {connect} from 'react-redux';
import DropDown from './DropDown';
import {setLanguage} from '../actions/language';

class LanguageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultLanguage: localStorage.getItem('lang') || 'jp'
        }
    }

    componentDidMount() {
        this.props.setLanguage(this.state.defaultLanguage);
    }

    handleLanguageChange = (option) => {
        if(option === 'en' || option === 'jp') {
            this.setState(() => ({defaultLanguage: option}), () => {
                this.props.setLanguage(option);
                localStorage.setItem('lang', option);
            })
        }
    }

    render() {
        return (
                <DropDown
                  handleChange={this.handleLanguageChange}
                  defaultLanguage={this.state.defaultLanguage}
                 />
        )
    }
} 

const mapDispatchToProps = (dispatch) => ({
    setLanguage: (option) => dispatch(setLanguage(option))
});

export default connect(undefined, mapDispatchToProps)(LanguageBox);