import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../Components/Input';

class SmartList extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            viewPerPage: 40,
            pageSize: 10,
            sortKey: '',
            op: '>'
        }
        this.handleClick = this.handleClick.bind(this);
        this.onSortedItems = this.onSortedItems.bind(this);
    }

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }

    onNext = () => {
        if(this.state.currentPage > Math.floor(this.props.smartListContents.length) / this.state.viewPerPage){
            this.setState({currentPage: this.state.currentPage});
        }
        else {
            this.setState({currentPage: this.state.currentPage + 1});
        }
    };
    
    onPrevious = () => {
        if(this.state.currentPage < 2){
            this.setState({currentPage: 1});
        }
        else {
            this.setState({currentPage: this.state.currentPage - 1});
        }
    };
    onBegin = () => {
        this.setState({currentPage: 1});
    }

    onEnd = () => {
        this.setState({currentPage: Math.floor(this.props.smartListContents.length) / this.state.viewPerPage});
    }

    onSortedItems(key){
        this.setState({sortKey: key, op: this.state.op === '>' ? '<' : '>'});
    }

    onChangeHandle = (evt) =>{
        const value = evt.target.value;
        this.setState({[evt.target.name]: value});
        console.log(value);
    }

    render() {
        const { currentPage, viewPerPage, pageSize } = this.state;
        const data = this.props.smartListContents;

        const indexOfLastData = currentPage * viewPerPage;
        const indexOfFirstData = indexOfLastData - viewPerPage;
        const currentData = data ? data.slice(indexOfFirstData, indexOfLastData) : [];

        let sortedItems = [];
        var operators = {
            '>': function(a, b) { return a > b },
            '<': function(a, b) { return a < b },
        };
        sortedItems = currentData.sort((a, b) => (operators[this.state.op](a[this.state.sortKey], b[this.state.sortKey]) ? 1 : -1));

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / viewPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li className="page-item"
                    key={number}
                    id={number}
                >
                    <a href="/#"
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                        className="page-link">{number}
                    </a>
                </li>
            );
        });
        return (
            <div className='container'>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            {this.props.smartListHeaders && Array.isArray(this.props.smartListHeaders) && this.props.smartListHeaders.map(slh => (
                                <th className="th-sm" key={slh.key}>
                                    <div onClick={(e) => this.onSortedItems(slh.key)} style={{cursor: "pointer"}}><i className="bi bi-chevron-compact-down"></i>
                                        {slh.label}
                                    </div>
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedItems && Array.isArray(sortedItems) && sortedItems.map((slc, index) =>
                            <tr key={index}>
                                {Object.keys(slc.short_event_descriptor[1]).map((key, i) => (
                                    this.props.smartListHeaders.some(header => header.key === key) ? 
                                    <td key={i}>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Id'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.evn.id}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Start Time'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.evn.start_time}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Duration'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.evn.duration}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Nibble one'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.content_descriptor.nibble1}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Nibble two'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.content_descriptor.nibble2}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Country code'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.parental_rating_descriptor.country_code}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Parental'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.parental_rating_descriptor.value}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Alb'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.short_event_descriptor[0].lang}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Short'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.short_event_descriptor[0][key]}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Eng'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.short_event_descriptor[1].lang}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Short'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.short_event_descriptor[1][key]}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Alb'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.extended_event_descriptor[0].lang}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Extended'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.extended_event_descriptor[0].text}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        className={'btn btn-success'}
                                                        labeled={'Eng'}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                        value={slc.extended_event_descriptor[1].lang}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textbutton'}
                                                        className={'btn btn-success'}
                                                        labeled={'Extended'}
                                                        type="button"
                                                        id={'extened' + index}
                                                        name={'extened' + index}
                                                        clicked={(e, d) => this.props.clicked(slc.short_event_descriptor[1][this.props.where], index)}
                                                        value={slc.extended_event_descriptor[1].text || this.props.content[index]}
                                                        changed={(e) => this.props.changed(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td> : null
                                ))}
                                <td>
                                    {this.props.action === 'navlink'? 
                                    <NavLink className="btn btn-outline-info" to={this.props.view + '/' + slc.short_event_descriptor[1][this.props.where]}>{this.props.actionLabel}</NavLink>
                                    : this.props.action === 'button' ? 
                                    <button className="btn btn-outline-danger" onClick={(e) => this.props.clicked(slc[this.props.where])}>{this.props.actionLabel}</button>
                                    : null}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    {pageNumbers.length > viewPerPage ? 
                        <ul className="pagination">
                            <li className="page-item" onClick={this.onBegin}><a className="page-link" href="/#">{"|<"}</a></li>
                            <li className="page-item" onClick={this.onPrevious}><a className="page-link" href="/#">Previous</a></li>
                                {renderPageNumbers.slice((currentPage - 1), (currentPage + pageSize))}
                            <li className="page-item" onClick={this.onNext}><a className="page-link" href="/#">Next</a></li>
                            <li className="page-item" onClick={this.onEnd}><a className="page-link" href="/#">{">|"}</a></li>
                        </ul>: null
                    }   
                </nav>
            </div>
        );
    }
}

export default SmartList;