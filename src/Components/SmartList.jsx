import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SmartList extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            viewPerPage: 8,
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
                <table className="table table-bordered table-striped">
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
                        {sortedItems && Array.isArray(sortedItems) && sortedItems.map((slc, i) =>
                            <tr key={i}>
                                {Object.keys(slc).map((key, i) => (
                                    this.props.smartListHeaders.some(header => header.key === key) ? <td key={i}>{slc[key]}</td> : null
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