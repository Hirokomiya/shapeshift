import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class CountDownTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 9,
            seconds: 59,
            interval: 1000,
            expired: false
        }
    }

    componentDidMount() {
        const currentTime = + new Date();
        const diffTime = this.props.timestamp - currentTime;
        let duration = moment.duration(diffTime, 'milliseconds');

        this.setState({
            minutes: duration.minutes(),
            seconds: duration.seconds(),
            expired: this.props.expired
        });

        this.stopId = setInterval(() => {
            duration = moment.duration(duration - 1000, 'millisecond');
            this.setState(() => ({
                minutes: duration.minutes(),
                seconds: duration.seconds()
            }), () => {
                if(this.state.minutes === 0 && this.state.seconds === 0) {
                    clearInterval(this.stopId);
                    this.setState({expired: true}, this.props.handleExpiration);
                }
                else if(this.props.finished) {
                    clearInterval(this.stopId);
                }
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.stopId);
    }

    render() {
        return (
            <div className={`timer ${this.state.minutes < 1 && 'timer--warning'}`}>
                <label className='timer__label'>{this.props.lang.remainingTime}</label>
                <span className='timer__counter'>
                {
                    !this.state.expired ? `${this.state.minutes >= 10 ? this.state.minutes : '0' + this.state.minutes} :
                    ${this.state.seconds >= 10 ? this.state.seconds : '0' + this.state.seconds}` :
                    this.props.lang.expired
                }
                </span>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    lang: state.language
});
 
export default connect(mapStateToProps)(CountDownTimer);