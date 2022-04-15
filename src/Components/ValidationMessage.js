import React from 'react';

const validationMessage = (props) => {
    if (!props.valid) {
      return(
        <div className='error-msg'>{props.message}</div>
      )
    }
    return null;
  }

export default validationMessage;