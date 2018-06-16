import React from 'react';
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
        console.log('error expired', this.props.expired);

        this.setState({
            minutes: duration.minutes(),
            seconds: duration.seconds(),
            expired: this.props.expired
        });

        const stopId = setInterval(() => {
            duration = moment.duration(duration - 1000, 'millisecond');
            this.setState(() => ({
                minutes: duration.minutes(),
                seconds: duration.seconds()
            }), () => {
                if(this.state.minutes === 0 && this.state.seconds === 0) {
                    clearInterval(stopId);
                    this.setState({expired: true});
                }
            });
        }, 1000);
    }

    render() {
        return (
            <div className={`timer ${this.state.minutes < 1 && 'timer--warning'}`}>
                <label className='timer__label'>remaining time</label>
                <span className='timer__counter'>
                {
                    !this.state.expired ? `${this.state.minutes >= 10 ? this.state.minutes : '0' + this.state.minutes} :
                    ${this.state.seconds >= 10 ? this.state.seconds : '0' + this.state.seconds}` :
                    'expired'
                }
                </span>
            </div>
        );
    }
}

export default CountDownTimer;