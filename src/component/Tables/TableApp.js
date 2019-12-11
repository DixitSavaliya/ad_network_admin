import React from 'react';
import { Table, CustomInput, Button } from 'reactstrap';
import './table.css';
import API from '../../service';
import Swal from 'sweetalert2';
import { EventEmitter } from '../../event';
import history from '../../history';
// import './table.css';
import { HashRouter, Link, Route } from "react-router-dom";

export default class TableApp extends React.Component {
    constructor(props) {
        console.log("props", props);
        super(props);
        this.state = {
            auth: JSON.parse(localStorage.getItem('ad_network_auth')),
            check: false,
            isData: false,
            searchData: '',
            count: '',
            currentPage: "1",
            items_per_page: "2",
            perpage: '',
            paginationdata: '',
            isFetch: false,
            data: '',
            allRecords: '',
            upperPageBound: "3",
            lowerPageBound: "0",
            pageBound: "3",
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            onClickPage: "1"
        }

        // this.checkAllHandler = this.checkAllHandler.bind(this);
        this.deleteAppData = this.deleteAppData.bind(this);
        this.editAppData = this.editAppData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);

        EventEmitter.subscribe('searchDataApp', (data) => {
            this.setState({
                searchData: data,
                isData: this.state.isData = true
            })
            console.log("datasearch====", this.state.searchData, this.state.isData);
        });
    }

    componentDidMount() {
        EventEmitter.subscribe('per_page_app_value', (value) => {
            //localStorage.setItem('role_per_page_changed', '' + value);
            this.setState({ items_per_page: value });
            this.getApplicationCount();
            setTimeout(() => {
                this.getApplicationPageData();
            }, 120)
        });

        this.getApplicationCount();
        setTimeout(() => {
            this.getApplicationPageData();
        }, 120)
    }

    getApplicationCount() {
        API.getApplicationCountData()
            .then((findresponse) => {
                if (findresponse) {
                    console.log("getApplicationCountData response===", findresponse);
                    this.setState({
                        count: this.state.count = findresponse.data.data
                    })
                    console.log("this.state.count", this.state.count)
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

    }


    getApplicationPageData() {
        const obj = {
            page_no: "1",
            items_per_page: this.state.items_per_page
        }
        API.getApplicationPageDataPg(obj)
            .then((findresponse) => {
                if (findresponse) {
                    console.log("getUserRoleDetailsPg response===", findresponse);
                    this.setState({
                        paginationdata: findresponse.data.data,
                        isFetch: true
                    })

                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    // checkAllHandler(event) {
    //     console.log("data", event.target.checked, event.target.id);
    //     if (this.state.paginationdata.length) {
    //         if (event.target.checked == true) {
    //             this.setState({
    //                 check: this.state.check = true
    //             })
    //             //   EventEmitter.dispatch('checked', this.state.check);
    //         } else if (event.target.checked == false) {
    //             this.setState({
    //                 check: this.state.check = false
    //             })
    //             //   EventEmitter.dispatch('check', this.state.check);
    //         }
    //     }
    // }

    editAppData(id) {
        window.location.href = "/#/EditApp/" + id;
    }

    deleteAppData(data) {
        console.log("data", data);
        const obj = {
            applicationID: data.id
        }
        var array = [];
        array.push(obj);
        console.log("array", array);
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                API.deleteAppData({ data: array })
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("deleteAppData response===", findresponse);
                            Swal.fire("App Deleted Successfully!", "", "success");
                            this.getApplicationPageData();
                        } else {
                            Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            }
        })
    }

    handleClick(event) {
        console.log("event current page number", '' + event.target.id);

        if (this.state.currentPage <= '' + event.target.id) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        } else {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
        const obj = {
            page_no: '' + event.target.id,
            items_per_page: this.state.items_per_page
        }
        API.getApplicationPageDataPg(obj)
            .then((findresponse) => {
                if (findresponse) {
                    console.log("getUserRoleDetailsPg response===", findresponse);
                    this.setState({
                        paginationdata: findresponse.data.data,
                        isFetch: true
                    })
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

    }

    appData(data) {
        const id = data.id;
        window.location.href = "/#/viewApp/" + id;
    }


    btnIncrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid });
    }

    btnDecrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid });
    }

    render() {
        var pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.count / this.state.items_per_page); i++) {
            pageNumbers.push(i);
        }
        var renderPageNumbers = pageNumbers.map(number => {
            if (number === 1 && this.state.currentPage === 1) {
                return (
                    <li
                        key={number}
                        id={number}
                        className={this.state.currentPage === number ? 'active' : 'page-item'}
                    >
                        <a className="page-link" onClick={this.handleClick}>{number}</a>
                    </li>
                );
            }
            else if ((number < this.state.upperPageBound + 1) && number > this.state.lowerPageBound) {
                return (
                    <li
                        key={number}
                        id={number}
                        className={this.state.currentPage === number ? 'active' : 'page-item'}
                    >
                        <a className="page-link" id={number} onClick={this.handleClick}>{number}</a>
                    </li>
                )
            }
        });

        let pageIncrementBtn = null;
        if (pageNumbers.length > this.state.upperPageBound) {
            pageIncrementBtn =
                <li
                    className='page-item'
                >
                    <a
                        className='page-link'
                        onClick={this.btnIncrementClick}
                    >
                        &hellip;
          </a>
                </li>
        }

        let pageDecrementBtn = null;
        if (this.state.lowerPageBound >= 1) {
            pageDecrementBtn =
                <li
                    className='page-item'
                >
                    <a
                        className='page-link'
                        onClick={this.btnDecrementClick}
                    >
                        &hellip;
          </a>
                </li>
        }

        return (

            <div>
                {
                    this.state.isData == false ? (
                        <div>
                            {
                                this.state.paginationdata ? (
                                    <div>
                                        <Table hover className="mb-0" bordered>
                                            <thead>
                                                <tr>
                                                    <th className="action">Action</th>
                                                    <th>Name</th>
                                                    <th>Discription</th>
                                                    <th>Package</th>
                                                    <th>status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.paginationdata.map((data, index) =>
                                                        <tr key={index}>
                                                            <td className="action">
                                                                <span className="padding">
                                                                    <i className="fa fa-pencil-square fa-lg" onClick={() => this.editAppData(data.id)}></i>
                                                                    <i className="fa fa-remove fa-lg" onClick={() => this.deleteAppData(data)}></i>
                                                                </span>
                                                            </td>
                                                            <td onClick={() => this.appData(data)}>{data.name}</td>
                                                            <td onClick={() => this.appData(data)}>{data.description}</td>
                                                            <td onClick={() => this.appData(data)}>{data.package}</td>
                                                            <td onClick={() => this.appData(data)}>
                                                                <div className="btn_size">
                                                                    {
                                                                        data.status == 1 ? (
                                                                            <span className="badge badge-success">{data.status == "1" ? "active" : "inactive"}</span>
                                                                        ) : (
                                                                                <span className="badge badge-danger">{data.status == "1" ? "active" : "inactive"}</span>
                                                                            )
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                        {
                                            this.state.paginationdata ? (
                                                <div>
                                                    <ul className="pagination" id="page-numbers">
                                                        {pageDecrementBtn}
                                                        {renderPageNumbers}
                                                        {pageIncrementBtn}
                                                    </ul>
                                                </div>
                                            ) : (
                                                    <Table hover className="mb-0" bordered>
                                                        <thead>
                                                            <tr>
                                                                <th className="action">Action</th>
                                                                <th>Name</th>
                                                                <th>Discription</th>
                                                                <th>Package</th>
                                                                <th>status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                        </tbody>
                                                    </Table>
                                                )
                                        }
                                        {/* <div>
                                            showing {this.state.onClickPage} to {this.state.items_per_page} of {this.state.count} entries
                                        </div> */}
                                    </div>
                                ) : (
                                        null
                                    )
                            }

                        </div>
                    ) : (
                            <div>
                                <Table hover className="mb-0" bordered>
                                    <thead>
                                        <tr>
                                            <th className="action">Action</th>
                                            <th>Name</th>
                                            <th>Discription</th>
                                            <th>Package</th>
                                            <th>status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.searchData.map((data, index) =>
                                                <tr key={index}>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-pencil-square fa-lg" onClick={() => this.editAppData(data.id)}></i>
                                                            <i className="fa fa-remove fa-lg" onClick={() => this.deleteAppData(data)}></i>
                                                        </span>
                                                    </td>
                                                    <td onClick={() => this.appData(data)}>{data.name}</td>
                                                    <td onClick={() => this.appData(data)}>{data.description}</td>
                                                    <td onClick={() => this.appData(data)}>{data.package}</td>
                                                    <td onClick={() => this.appData(data)}>
                                                        <div className="btn_size">
                                                            {
                                                                data.status == 1 ? (
                                                                    <span className="badge badge-success">{data.status == "1" ? "active" : "inactive"}</span>
                                                                ) : (
                                                                        <span className="badge badge-danger">{data.status == "1" ? "active" : "inactive"}</span>
                                                                    )
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        )
                }
            </div>
        );
    }
}
