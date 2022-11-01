import React from 'react';
import Input from './Input';
import swal from 'sweetalert';
import axios from '../Config/axios-baseUrl';

class AcountVerification extends React.Component {
    constructor() {
        super();
        this.state = {
            accCode: '',
            accValid: false
        };
    }

    codeValidate = (acc) => {
        return /^[0-9]{8}$/.test(acc);
    }

    componentDidMount() {}

    onChangeHandle = (evt) =>{
        this.setState({[evt.target.name]: evt.target.value});
        this.setState({ accValid: this.codeValidate(evt.target.value)});
    }

    onSubmit = () =>{
        swal({
            title: "Are you sure?",
            text: "Verify Code will be Send for Verification!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((verify) => {
            if (verify) {
                var data = new FormData();
                data.append('code', this.state.accCode);
                var config = {
                    method: 'post',
                    url: '/auth/userstatusupdate',
                    "Content-Type": "application/xml; charset=utf-8",
                    data: data
                };
                axios(config)
                .then(res =>{
                    console.log("success:", res.data);
                    swal(res.data, {
                        icon: "success"
                    });
                })
                .catch(function (error){
                    swal(error, {
                        icon: "warning"
                    });
                });
            }
            else {
                swal("Action Cancelled!", {
                    icon: "info"
                });
            }
        });
    }

    render() {
        return(
            <div className="row justify-content-center">
                <div className="col-sm-2">
                    <div className="row">
                        <Input
                            htmlFor="Last Name"
                            elementType="buttontext"
                            classes="btn btn-primary"
                            type="button"
                            labeled={'Verify'}
                            message={this.state.accValid ? '✔' : '8 Chars Code Please!...'}
                            id="accCode" name="accCode"
                            value={this.state.accCode}
                            disabled={!this.state.accValid || !this.state.accValid}
                            changed={this.onChangeHandle}
                            clicked={this.onSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AcountVerification;