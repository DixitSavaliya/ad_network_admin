import React from 'react';
import { Table, CustomInput, Button } from 'reactstrap';
import './table.css';
import API from '../../service';
import Swal from 'sweetalert2';
import { EventEmitter } from '../../event';
// import './table.css';
import { HashRouter, Link, Route } from "react-router-dom";

export default class TableRole extends React.Component {
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
        }

        this.checkAllHandler = this.checkAllHandler.bind(this);

        this.deleteUserRoleData = this.deleteUserRoleData.bind(this);
        this.editUserRoleData = this.editUserRoleData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickObjEvent = this.handleClickObjEvent.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);

        EventEmitter.subscribe('searchData', (data) => {
            this.setState({
                searchData: data,
                isData: true
            })
            console.log("datasearch====", this.state.searchData, this.state.isData);
        });

        EventEmitter.subscribe('selectvalue', (value) => {
            console.log("value", '' + value);
            localStorage.setItem('value', '' + value);
            this.componentDidMount();
        });

        // EventEmitter.subscribe('userroledataget', (data) => {
        //   console.log("value", data);
        //   this.componentDidMount();
        // });

        // EventEmitter.subscribe('isDeleted', (value) => {
        //   console.log("value", value);
        //   API.deleteUserRoleAllData({ value: true })
        //     .then((findresponse) => {
        //       if (findresponse) {
        //         console.log("deleteUserRoleAllData response===", findresponse);
        //         this.setState({
        //           allRecords: findresponse.data.data
        //         })
        //         console.log("allRecords", this.state.allRecords);
        //       } else {
        //         Swal.fire("Something went wrong!", "", "warning");
        //       }
        //     }).catch((err) => {
        //       Swal.fire("Something went wrong!", "", "warning");
        //     });
        // });
    }

    componentDidMount() {
        const obj = {
            userRole_id: this.state.auth.user_role_id,
            user_type: this.state.auth.type
        }
        API.getUserRoleData(obj)
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        user: findresponse.data.data
                    })
                    console.log("user response===", this.state.user);
                } else {
                    // console.log("err", err);
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

        API.countUserRole()
            .then((findresponse) => {
                if (findresponse) {
                    console.log("getUserRoleDataCount response===", findresponse);
                    this.setState({
                        count: findresponse.data.data
                    })
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

        if (localStorage.getItem('value')) {
            const obj = {
                page_no: "1",
                items_per_page: localStorage.getItem('value')
            }
            API.getUserRoleDetailsPg(obj)
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
        } else {
            const obj = {
                page_no: "1",
                items_per_page: this.state.items_per_page
            }
            API.getUserRoleDetailsPg(obj)
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
    }

    checkAllHandler(event) {
        console.log("data", event.target.checked, event.target.id);
        if (event.target.checked == true) {
            this.setState({
                check: this.state.check = true
            })
            //   EventEmitter.dispatch('checked', this.state.check);
        } else if (event.target.checked == false) {
            this.setState({
                check: this.state.check = false
            })
            //   EventEmitter.dispatch('check', this.state.check);
        }
    }

    editUserRoleData(data) {
        EventEmitter.dispatch('editData', data);
    }

    deleteUserRoleData(data) {
        console.log("data", data);
        const obj = {
            userRoleID: data.id
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
                API.deleteUserRole({ data: array })
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("deleteUserRoleDataById response===", findresponse);
                            Swal.fire("UserRole Deleted Successfully!", "", "success");
                            this.componentDidMount();
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

        if (localStorage.getItem('value')) {
            const obj = {
                page_no: '' + event.target.id,
                items_per_page: localStorage.getItem('value')
            }
            API.getUserRoleDetailsPg(obj)
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
        } else {
            const obj = {
                page_no: '' + event.target.id,
                items_per_page: this.state.items_per_page
            }
            API.getUserRoleDetailsPg(obj)
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
    }

    handleClickObjEvent(event) {
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
        if (localStorage.getItem('value')) {
            const obj = {
                page_no: '' + event.target.id,
                items_per_page: localStorage.getItem('value')
            }
            API.getUserRoleDetailsPg(obj)
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
        } else {
            const obj = {
                page_no: '' + event.target.id,
                items_per_page: this.state.items_per_page
            }
            API.getUserRoleDetailsPg(obj)
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
    }

    //   handleChangeStatus(index) {
    //     console.log("id", index);
    //     // this.setState({
    //     //     check: !this.state.check
    //     // })
    //   }

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
        if (localStorage.getItem('value')) {
            var pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.state.count / localStorage.getItem('value')); i++) {
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
                            <a className="page-link" onClick={this.handleClickObjEvent}>{number}</a>
                        </li>
                    );
                }
                else if ((number < this.state.upperPageBound + 1) && number > this.state.lowerPageBound) {
                    return (
                        <li className={this.state.currentPage === number ? 'active' : 'page-item'} key={number} id={number}><a className="page-link" id={number} onClick={this.handleClickObjEvent}>{number}</a></li>
                    )
                }
            });
        } else {
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
        }

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
                                                    <th className="center">
                                                        <CustomInput
                                                            type="checkbox"
                                                            id="exampleCustomCheckbox"
                                                            onClick={this.checkAllHandler}
                                                        />
                                                    </th>
                                                    <th className="action">Action</th>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.paginationdata.map((data, index) =>
                                                        <tr key={index}>
                                                            <th scope="row" className="center">
                                                                {
                                                                    this.state.check == true ? (
                                                                        <span className="margin-t">
                                                                            <CustomInput
                                                                                type="checkbox"
                                                                                id={index}
                                                                                checked={this.state.check}
                                                                            />
                                                                        </span>
                                                                    ) : (
                                                                            <span className="margin-t">
                                                                                <CustomInput
                                                                                    type="checkbox"
                                                                                    id={index}
                                                                                //   onChange={this.handleChangeStatus.bind(this, index)}
                                                                                />
                                                                            </span>
                                                                        )
                                                                }
                                                            </th>
                                                            <td className="action">
                                                                <span className="padding">
                                                                    <i className="fa fa-pencil-square fa-lg" onClick={() => this.editUserRoleData(data)}></i>
                                                                    <i className="fa fa-remove fa-lg" onClick={() => this.deleteUserRoleData(data)}></i>
                                                                </span>
                                                            </td>
                                                            <td>{data.name}</td>
                                                            <td>
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
                                                    null
                                                )
                                        }
                                    </div>
                                ) : (
                                        <div>
                                            <Table hover className="mb-0" bordered>
                                                <thead>
                                                    <tr>
                                                        <th className="center">
                                                            <CustomInput
                                                                type="checkbox"
                                                                id="exampleCustomCheckbox"
                                                            // onClick={this.checkAllHandler}
                                                            />
                                                        </th>
                                                        <th className="action">Action</th>
                                                        <th>Name</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.props.data.map((data, index) =>
                                                            <tr key={index}>
                                                                <th scope="row" className="center">
                                                                    {
                                                                        this.state.check == true ? (
                                                                            <span className="margin-t">
                                                                                <CustomInput
                                                                                    type="checkbox"
                                                                                    id={index}
                                                                                    checked={this.state.check}
                                                                                />
                                                                            </span>
                                                                        ) : (
                                                                                <span className="margin-t">
                                                                                    <CustomInput
                                                                                        type="checkbox"
                                                                                        id={index}
                                                                                    //   onChange={this.handleChangeStatus.bind(this, index)}
                                                                                    />
                                                                                </span>
                                                                            )
                                                                    }
                                                                </th>
                                                                <td className="action">
                                                                    <span className="padding">
                                                                        <i className="fa fa-pencil-square fa-lg" onClick={() => this.editUserRoleData(data)}></i>
                                                                        <i className="fa fa-remove fa-lg" onClick={() => this.deleteUserRoleData(data)}></i>
                                                                    </span>
                                                                </td>
                                                                <td>{data.name}</td>
                                                                <td>
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
                                                        null
                                                    )
                                            }
                                        </div>
                                    )
                            }

                        </div>
                    ) : (
                            <div>
                                <Table hover className="mb-0" bordered>
                                    <thead>
                                        <tr>
                                            <th className="center">
                                                <CustomInput
                                                    type="checkbox"
                                                    id="exampleCustomCheckbox"
                                                    onClick={this.checkAllHandler}
                                                />
                                            </th>
                                            <th className="action">Action</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.searchData.map((data, index) =>
                                                <tr key={index}>
                                                    <th scope="row" className="center">
                                                        {
                                                            this.state.check == true ? (
                                                                <span className="margin-t">
                                                                    <CustomInput
                                                                        type="checkbox"
                                                                        id={index}
                                                                        checked={this.state.check}
                                                                    />
                                                                </span>
                                                            ) : (
                                                                    <span className="margin-t">
                                                                        <CustomInput
                                                                            type="checkbox"
                                                                            id={index}
                                                                        //   onChange={this.handleChangeStatus.bind(this, index)}
                                                                        />
                                                                    </span>
                                                                )
                                                        }
                                                    </th>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-pencil-square fa-lg" onClick={() => this.editUserRoleData(data)}></i>
                                                            <i className="fa fa-remove fa-lg" onClick={() => this.deleteUserRoleData(data)}></i>
                                                        </span>
                                                    </td>
                                                    <td>{data.name}</td>
                                                    <td>
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
