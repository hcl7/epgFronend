import React from 'react';
import Input from './Input';

class AcountVerification extends React.Component {
    constructor() {
        super();
        this.state = {
            time: {}, 
            seconds: 120,
            accCode: 0,
            accValid: false
        };
        this.timer = 0;
    }

    codeValidate = (acc) => {
        return /^[0-9]{8}$/.test(acc);
    }

    secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
            };
        return obj;
    }

    componentDidMount() {
        //this.startTimer();
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    startTimer = () => {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });
        if (seconds === 0) { 
            clearInterval(this.timer);
        }
    }

    onChangeHandle = (evt) =>{
        this.setState({[evt.target.name]: evt.target.value});
        this.setState({ accValid: this.codeValidate(evt.target.value)});
    }

    onSubmit = () =>{
        console.log("pressed!");
    }

    render() {
        return(
            <div className="row justify-content-center">
                <div className="col-sm-2">
                    <div className="row">
                        <Input
                            htmlFor="Last Name"
                            elementType="textbutton"
                            type="button"
                            labeled={'Verify'}
                            message={this.state.accValid ? '' : '8 Chars Code Please!...'}
                            id="accCode" name="accCode"
                            value={this.state.accCode}
                            disabled={!this.state.accValid || !this.state.accValid}
                            changed={this.onChangeHandle}
                            clicked={this.onSubmit}
                        />
                    </div>
                    <div className="row">
                        CountDown: {this.state.time.m}:{this.state.time.s}
                    </div>
                </div>
            </div>
        );
    }
}

export default AcountVerification;