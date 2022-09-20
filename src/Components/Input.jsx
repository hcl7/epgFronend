import React from 'react';
import ValidationMessage from './ValidationMessage';
import { NavLink } from 'react-router-dom';

const textInput = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className="form-control form-control-sm"
                placeholder={props.placeholder}
                name={props.name}
                type={props.type}
                value={props.value}
                readOnly={props.isReadOnly}
                onChange={props.changed}
                style={props.bold}
            />;
        break;
        case ('textarea'):
            inputElement = <textarea
                className="form-control form-control-sm"
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.changed}
            />;
        break;
        case ('select'):
            inputElement = (
                <select
                    className="form-control form-control-sm"
                    value={props.value}
                    onChange={props.changed} 
                    multiple={props.multiple}>
                    {props.options.map((option, key) => (
                        <option 
                            key={key} 
                            selected={props.selected ? props.selected.includes(option.id) ? true: false : null} 
                            value={option.id}>{option[props.optitle]}</option>
                    ))}
                </select>
            );
        break;
        case ('button'):
            inputElement = (
                <button 
                    className={props.class} 
                    type={props.type} 
                    disabled={props.disabled}
                    id={props.id}
                    onClick={props.clicked}>
                    {props.icon === 'upload' ?
                        <svg xmlns="http://www.w3.org/2000/svg" style={props.styled} fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                        </svg>:
                        props.icon === 'download' ?
                        <svg xmlns="http://www.w3.org/2000/svg" style={props.styled} fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>:
                        props.icon === 'add' ?
                        <svg xmlns="http://www.w3.org/2000/svg" style={props.styled} fill="currentColor" className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                        <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                        </svg>:
                        props.icon === "xml" ? <svg xmlns="http://www.w3.org/2000/svg" style={props.styled} fill="currentColor" className="bi bi-filetype-xml" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.527 11.85h-.893l-.823 1.439h-.036L.943 11.85H.012l1.227 1.983L0 15.85h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992 1.274-2.007Zm.954 3.999v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596h-.025L4.58 11.85h-.806v3.999h.706Zm4.71-.674h1.696v.674H8.4V11.85h.791v3.325Z"/>
                        </svg>:
                        props.value
                    }
                </button>
            );
        break;
        case ('checkbox'):
            inputElement = (
                <label className='form-check-label'>
                    <input
                        className='form-check form-check-inline'
                        type="checkbox"
                        value={props.value}
                        name={props.name}
                        checked={props.checked}
                        onChange={props.changed} 
                        disabled={props.disable}
                    />
                    {props.labeled}
                </label>
            );
        break;
        case ('iLink'):
            inputElement = (
                <NavLink className="btn btn-default shadow-none" style={{display: "inline"}} to={props.view + '/' + props.where}>
                    {props.icon === "doc" ? 
                    <svg width="40" height="40" fill="currentColor" className="bi bi-file-earmark-font" viewBox="0 0 16 16">
                    <path d="M10.943 6H5.057L5 8h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v5.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V6.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z"/>
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                    </svg>: 
                    props.icon === "merge" ? <svg  width="40" height="40" fill="currentColor" className="bi bi-stickies" viewBox="0 0 16 16">
                    <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z"/>
                    <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z"/>
                    </svg>: 
                    props.icon === "add" ? <svg xmlns="http://www.w3.org/2000/svg" style={props.styled} fill="currentColor" className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                    </svg>:
                    props.icon === "xml" ? <svg xmlns="http://www.w3.org/2000/svg" style={props.styled} fill="currentColor" className="bi bi-filetype-xml" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.527 11.85h-.893l-.823 1.439h-.036L.943 11.85H.012l1.227 1.983L0 15.85h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992 1.274-2.007Zm.954 3.999v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596h-.025L4.58 11.85h-.806v3.999h.706Zm4.71-.674h1.696v.674H8.4V11.85h.791v3.325Z"/>
                    </svg>: 
                    null}
                </NavLink>
            );
        break;
        case ('textbutton'):
            inputElement = (
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <button
                            style={props.bstyled}
                            onClick={props.clicked} 
                            className="btn btn-outline-secondary"
                            id={props.id}
                            type={props.type}
                            disabled={props.disabled}
                            >{props.labeled}
                        </button>
                    </div>
                    <input
                        style={props.styled}
                        type="text" 
                        name={props.name} 
                        className="form-control" 
                        onChange={props.changed} 
                        defaultValue={props.value} 
                    />
                </div>
            );
        break;
        case ('textlabel'):
            inputElement = (
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">{props.labeled}</span>
                    </div>
                    <input 
                        type="text" 
                        name={props.name} 
                        className="form-control" 
                        onChange={props.changed} 
                        defaultValue={props.value} 
                    />
                </div>
            );
        break;
        default:
            inputElement = <input
                className="form-control form-control-sm"
                value={props.value}
                name={props.name}
                onChange={props.changed}
            />;
    }
    return (
        <div className="form-group">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            <ValidationMessage
                valid={props.valid}
                message={props.message ? props.message : null}
            />
            {inputElement}
        </div>
    );
}

export default textInput;
