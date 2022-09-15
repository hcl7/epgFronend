import React, { useState } from 'react';
import DatePicker from 'react-date-picker';

const Dpicker = (props) => {
    const [value, onChange] = useState(new Date());
    //props.parentCallback(value);
    return (
        <div>
            <DatePicker 
                onChange={onChange} 
                value={value}
                data={value}
                format={'yyyy-M-d'}
                closeCalendar={true}
            />
        </div>
    );
}

export default Dpicker;