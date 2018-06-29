import React from 'react';
import { connect } from 'react-redux';
import CoinList from '../components/CoinList';
import InputAddress from './InputAddress';

class ModalContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: ''
        }
    }

    handleIdentifierChange = (e) => {
        const identifier = e.target.value;
        this.setState(() => ({identifier}));
    }

    render() {
        return (
            <div>
                <InputAddress 
                  className={'input__text'}
                  value={this.state.identifier}
                  onValueChangeHandler={this.handleIdentifierChange}
                  label={this.props.lang.search}
                  focused={true}
                />
                <CoinList 
                 identifier={this.state.identifier}
                 handleSelectCoin={this.props.handleSelectCoin}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) =>  ({
    lang: state.language
});

export default connect(mapStateToProps)(ModalContent);