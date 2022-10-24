import React, { useState} from 'react';
import Input from './Input';

const AcountVerification = (props) => {
    const [accCode, setCode] = useState('');
    return (
        <div className="row justify-content-center">
            <div className="col-sm-4 shadow rounded-5 my-4">
                <Input
                    htmlFor="Last Name"
                    elementType="input"
                    value={accCode}
                    changed={(e) => {
                        const newCode = e.target.value;
                        setCode(newCode);
                        console.log(newCode)
                    }}
                />
            </div>
        </div>
    );
}

export default AcountVerification;