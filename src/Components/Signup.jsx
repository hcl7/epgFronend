import React from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import { Redirect } from 'react-router-dom';
import axios from '../Config/axios-baseUrl';
import { signup } from '../store/authSlice';

class Signup extends React.Component {
    state = {
        email: '', emailValid: false,
        password: '', passValid: false,
        cfpassword: '', cfpassValid: false,
        formValid: false,
        errorMsg: {},
        error: '',
        posted: true,
        channels: [],
        selectedCompany: '',
        fname: '',
        lname: '',
        usr: ''
    }

    componentDidMount(){
        this.getChannels();
    }

    validateForm = () => {
        const { passValid, cfpassValid, emailValid } = this.state;
        this.setState({ formValid: passValid && cfpassValid && emailValid });
    }
    
    updatePass = (pass) => {
        this.setState({ password: pass }, this.validatePass);
    }
    
    validatePass = () => {
        const { password } = this.state;
        let passValid = true;
        let errorMsg = { ...this.state.errorMsg };
    
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)) {
            passValid = false;
            errorMsg.password = "Password should start with Capital Letter, should be 8 chars minimum, Must Contain Numbers, Chars!";
        }
        this.setState({ passValid, errorMsg }, this.validateForm);
    }
    
    updateCfPass = (cfpass) => {
        this.setState({ cfpassword: cfpass }, this.validateCfPass);
    }
    
    validateCfPass = () => {
        const { cfpassword } = this.state;
        let cfpassValid = true;
        let errorMsg = { ...this.state.errorMsg };

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(cfpassword)) {
            cfpassValid = false;
            errorMsg.cfpassword = "Password must have Capital Letter, 8 chars minimum, Numbers and Chars!";
        }
    
        if (this.state.password !== cfpassword) {
            cfpassValid = false;
            errorMsg.cfpassword = "Passwords not equal!";
        }
        this.setState({ cfpassValid, errorMsg }, this.validateForm);
    }
    
    updateEmail = (email) => {
        this.setState({ email }, this.validateEmail)
    }
    
    validateEmail = () => {
        const { email } = this.state;
        let emailValid = true;
        let errorMsg = { ...this.state.errorMsg };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailValid = false;
            errorMsg.email = "Invalid email format";
        }
        this.setState({ emailValid, errorMsg }, this.validateForm);
    }

    getChannels = () =>{
        var config = {
            method: 'post',
            url: '/channels/all',
            "Content-Type": "application/xml; charset=utf-8"
        };
        
        axios(config).then(res => {
            let channels = [];
            res.data.forEach((channel, i) => {
                channels.push({
                    id: i, 
                    title: channel.channel,
                });
            });
            this.setState({channels: channels});
        });
    }

    onChangedSelectedCompany = (e) =>{
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(this.state.channels[i]);
            }
        }
        console.log("Company Selected: ", value[0].title);
        this.setState({ selectedCompany: value[0].title });
    }

    onChangeHandle = (evt) =>{
        this.setState({[evt.target.name]: evt.target.value});
    }

    onSubmitHandler = () =>{
        this.props.signup({
            usr: this.state.usr,
            fname: this.state.fname,
            lname: this.state.lname,
            company: this.state.selectedCompany,
            email: this.state.email,
            passwd: this.state.password
        });
    }

    render(){
        return(
            <div className="row justify-content-center">
                <div className="col-sm-4 shadow rounded-5 my-4">
                    <form style={{marginBottom: '30px', marginTop: '20px'}}>
                        <Input
                            htmlFor="User"
                            placeholder="User Name"
                            elementType="input"
                            value={this.state.usr}
                            id={'usr'} name={'usr'}
                            changed={this.onChangeHandle}
                        />
                        <Input
                            htmlFor="First Name"
                            placeholder="First Name"
                            elementType="input"
                            value={this.state.fname}
                            id={'fname'} name={'fname'}
                            changed={this.onChangeHandle}
                        />
                        <Input
                            htmlFor="Last Name"
                            placeholder="Last Name"
                            elementType="input"
                            value={this.state.lname}
                            id={'lname'} name={'lname'}
                            changed={this.onChangeHandle}
                        />
                        <Input
                            htmlFor="email"
                            placeholder="Email"
                            valid={this.state.emailValid}
                            message={this.state.errorMsg.email}
                            elementType="input"
                            type="email" id="email" name="email"
                            value={this.state.email}
                            changed={(e) => this.updateEmail(e.target.value)}
                        />
                        <Input
                            htmlFor="Company"
                            placeholder="Company"
                            elementType="select"
                            id={'channel'}
                            optitle={'title'}
                            options={this.state.channels}
                            changed={this.onChangedSelectedCompany}
                        />
                        <Input
                            htmlFor="Password"
                            placeholder="Password"
                            valid={this.state.passValid}
                            message={this.state.errorMsg.password}
                            elementType="input"
                            type="password" id="password" name="password"
                            value={this.state.password}
                            changed={(e) => this.updatePass(e.target.value)}
                        />
                        <Input
                            htmlFor="Confirm Password"
                            placeholder="Confirm Password"
                            valid={this.state.cfpassValid}
                            message={this.state.errorMsg.cfpassword}
                            elementType="input"
                            type="password" id="cfpassword" name="cfpassword"
                            value={this.state.cfpassword}
                            changed={(e) => this.updateCfPass(e.target.value)}
                        />
                        <div className="form-controls">
                            <Input 
                                elementType={'button'}
                                class={'btn btn-primary'}
                                type="button"   
                                value={'Signup'}
                                disabled={!this.state.formValid}
                                clicked={this.onSubmitHandler}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    message: state.auth.message
});

const mapDispatchToProps = { signup };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);