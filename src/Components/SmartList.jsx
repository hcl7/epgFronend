import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../Components/Input';

let epg = [];

class SmartList extends Component {
    constructor() {
        super();
        this.state = {
            id: {},
            image: {},
            data: [],
        }
    }

    render() {
        epg = this.props.smartListContents;
        return (
            <div className='container-fluid'>
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            {this.props.smartListHeaders && Array.isArray(this.props.smartListHeaders) && this.props.smartListHeaders.map(slh => (
                                <th className="th-sm" key={slh.key}>
                                    <div><i className="bi bi-chevron-compact-down"></i>
                                        {slh.label}
                                    </div>
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {epg && Array.isArray(epg) && epg.map((slc, index) =>
                            <tr key={index}>
                                {Object.keys(slc).map((key, i) => (
                                    this.props.smartListHeaders.some(header => header.key === key) ? 
                                    <td key={i}>
                                        <Input 
                                            isReadOnly={true}
                                            elementType="input"
                                            type="label" id="title" name="title"
                                            value={slc.sedNameEng}
                                        />
                                    </td> : null
                                ))}
                                <td>
                                    {this.props.action === 'navlink'? 
                                    <NavLink className="btn btn-outline-info" to={this.props.view + '/' + slc[this.props.where]}>{this.props.actionLabel}</NavLink>
                                    : this.props.action === 'button' ? 
                                    <button className="btn btn-outline-danger" onClick={(e) => this.props.clicked(slc[this.props.where])}>{this.props.actionLabel}</button>
                                    : null}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SmartList;