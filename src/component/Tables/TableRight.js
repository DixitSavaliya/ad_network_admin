import React from 'react';
import { Table, CustomInput, Button } from 'reactstrap';
import './table.css';
import API from '../../service';
import Swal from 'sweetalert2';
import { EventEmitter } from '../../event';
// import './table.css';
import { HashRouter, Link, Route } from "react-router-dom";

export default class TableRight extends React.Component {
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
            items_per_page: "10",
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

        this.deleteUserRightData = this.deleteUserRightData.bind(this);
        this.editUserRightData = this.editUserRightData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);

        EventEmitter.subscribe('searchDataUser', (data) => {
            this.setState({
                searchData: data,
                isData: true
            })
            console.log("datasearch====", this.state.searchData, this.state.isData);
        });
    }

    componentDidMount() {

        EventEmitter.subscribe('userrightdataget', (data) => {
            this.getRightCountData();
            setTimeout(() => {
                this.getRightPageData();
            }, 120)
        });

        EventEmitter.subscribe('right_Update', (data) => {
            this.getRightCountData();
            setTimeout(() => {
                this.getRightPageData();
            }, 120)
        });

        EventEmitter.subscribe('per_page_changed_value', (value) => {
            this.setState({ items_per_page: value });
            this.getRightCountData();
            setTimeout(() => {
                this.getRightPageData();
            }, 120)
        });

        this.getRightCountData();
        setTimeout(() => {
            this.getRightPageData();
        }, 120)
    }

    getRightPageData() {
        const obj = {
            page_no: "1",
            items_per_page: this.state.items_per_page
        }
        API.getUserRightDetailsPg(obj)
            .then((findresponse) => {
                if (findresponse) {
                    console.log("getUserRightDetailsPg response===", findresponse);
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



    getRightCountData() {
        API.countUserRight()
            .then((findresponse) => {
                if (findresponse) {
                    console.log("countUserRight response===", findresponse);
                    this.setState({
                        count: findresponse.data.data
                    })
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

    }


    checkAllHandler(event) {
        console.log("data", event.target.checked, event.target.id);
        if (event.target.checked == true) {
            this.setState({
                check: this.state.check = true
            })
        } else if (event.target.checked == false) {
            this.setState({
                check: this.state.check = false
            })
        }
    }

    editUserRightData(data) {
        EventEmitter.dispatch('editRightData', data);
    }

    deleteUserRightData(data) {
        console.log("data", data.id);
        const obj = {
            userRightID: data.id
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
                API.deleteUserRight({ data: array })
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("deleteUserRoleDataById response===", findresponse);
                            Swal.fire("UserRole Deleted Successfully!", "", "success");
                            this.getRightPageData();
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
        // if (this.state.currentPage <= '' + event.target.id) {
        //     this.setState({
        //         currentPage: this.state.currentPage + 1
        //     })
        // } else {
        //     this.setState({
        //         currentPage: this.state.currentPage - 1
        //     })
        // }
        // const obj = {
        //     page_no: '' + event.target.id,
        //     items_per_page: this.state.items_per_page
        // }
        // API.getUserRightDetailsPg(obj)
        //     .then((findresponse) => {
        //         if (findresponse) {
        //             console.log("getUserRightDetailsPg response===", findresponse);
        //             this.setState({
        //                 paginationdata: findresponse.data.data,
        //                 isFetch: true
        //             })
        //         } else {
        //             Swal.fire("Something went wrong!", "", "warning");
        //         }
        //     }).catch((err) => {
        //         Swal.fire("Something went wrong!", "", "warning");
        //     });
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
                                                    <th className="center">
                                                        <CustomInput
                                                            type="checkbox"
                                                            id="exampleCustomCheckbox"
                                                            onClick={this.checkAllHandler}
                                                        />
                                                    </th>
                                                    <th className="action">Action</th>
                                                    <th>Name</th>
                                                    <th>DisplayName</th>
                                                    <th>GroupName</th>
                                                    <th>GroupDisplayName</th>
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
                                                                <span className="space">
                                                                    <i className="fa fa-pencil-square fa-lg" onClick={() => this.editUserRightData(data)}></i>
                                                                    <i className="fa fa-remove fa-lg" onClick={() => this.deleteUserRightData(data)}></i>
                                                                </span>
                                                            </td>
                                                            <td>{data.name}</td>
                                                            <td>{data.display_name}</td>
                                                            <td>{data.group_name}</td>
                                                            <td>{data.group_display_name}</td>
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
                                                                onClick={this.checkAllHandler}
                                                            />
                                                        </th>
                                                        <th className="action">Action</th>
                                                        <th>Name</th>
                                                        <th>DisplayName</th>
                                                        <th>GroupName</th>
                                                        <th>GroupDisplayName</th>
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
                                                                    <span className="space">
                                                                        <i className="fa fa-pencil-square fa-lg" onClick={() => this.editUserRightData(data)}></i>
                                                                        <i className="fa fa-remove fa-lg" onClick={() => this.deleteUserRightData(data)}></i>
                                                                    </span>
                                                                </td>
                                                                <td>{data.name}</td>
                                                                <td>{data.display_name}</td>
                                                                <td>{data.group_name}</td>
                                                                <td>{data.group_display_name}</td>
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
                                            <div>
                                                Sh
                                            </div>
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
                                            <th>DisplayName</th>
                                            <th>GroupName</th>
                                            <th>GroupDisplayName</th>
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
                                                        <span className="space">
                                                            <i className="fa fa-pencil-square fa-lg" onClick={() => this.editUserRightData(data)}></i>
                                                            <i className="fa fa-remove fa-lg" onClick={() => this.deleteUserRightData(data)}></i>
                                                        </span>
                                                    </td>
                                                    <td>{data.name}</td>
                                                    <td>{data.display_name}</td>
                                                    <td>{data.group_name}</td>
                                                    <td>{data.group_display_name}</td>
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
        );
    }
}
