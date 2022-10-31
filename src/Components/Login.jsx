import React from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import { login, checkAuthState } from '../store/authSlice';

class Login extends React.Component {
  
    state = {
        email: '', emailValid: false,
        password: '', passValid: false,
        formValid: false,
        errorMsg: {},
        redirect: '/login',
        isSignup: true
    }

    componentDidMount(){
        this.props.checkAuthState();
    }

    validateForm = () => {
        const { passValid, emailValid } = this.state;
        this.setState({ formValid: passValid && emailValid });
    }

    updatePass = (pass) => {
        this.setState({ password: pass }, this.validatePass);
    }

    validatePass = () => {
        const { password } = this.state;
        let passValid = true;
        let errorMsg = { ...this.state.errorMsg };

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,32}$/.test(password)) {
          passValid = false;
          errorMsg.password = "Password must have Capital Letter, 8 chars minimum, Numbers and Chars!";
        }

        this.setState({ passValid, errorMsg }, this.validateForm);
    }

    updateEmail = (email) => {
        this.setState({ email }, this.validateEmail);
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

    onSubmitHandler = () => {
        this.props.login({email: this.state.email, passwd: this.state.password});
        console.log('[login] isAuthenticated: ', this.props.isAuthenticated);
        console.log('[login] redirect: ', this.props.authRedirectPath);
        console.log('[login] message: ', this.props.message);
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-4 shadow rounded-5 my-4">
                    <form style={{marginBottom: '30px', marginTop: '20px'}}>
                        <Input
                            htmlFor="email"
                            label="Email"
                            placeholder="Enter Email"
                            valid={this.state.emailValid}
                            message={this.state.errorMsg.email}
                            elementType="input"
                            type="email" id="email" name="email"
                            value={this.state.email}
                            changed={(e) => this.updateEmail(e.target.value)}
                        />
                        <Input
                            htmlFor="Password"
                            label="Password"
                            placeholder="Enter Password"
                            valid={this.state.passValid}
                            message={this.state.errorMsg.password}
                            elementType="input"
                            type="password" id="password" name="password"
                            value={this.state.password}
                            changed={(e) => this.updatePass(e.target.value)}
                        />
                        <div className="form-controls">
                            <Input 
                                elementType={'button'}
                                class={'btn btn-primary'}
                                type="button"
                                value={'Login'}
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
    isAuthenticated: state.auth.isAuthenticated,
    authRedirectPath: state.auth.authRedirectPath,
    message: state.auth.message
});

const mapDispatchToProps = { login, checkAuthState };

export default connect(mapStateToProps, mapDispatchToProps)(Login);