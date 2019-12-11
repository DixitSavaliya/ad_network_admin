import React, { Fragment } from 'react';
import API from '../../service';
// import TableRole from '../Tables/TableRole';
import { CustomInput } from 'reactstrap';
import { EventEmitter } from '../../event';

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardHeader,
    CardTitle,

} from 'reactstrap';
// import './userrole.css';
import Swal from 'sweetalert2';
import TableRole from '../Tables/TableRole';

class UserRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: JSON.parse(localStorage.getItem('ad_network_auth')),
            checked: false,
            statuscheck1: true,
            statuscheck2: false,
            userrole: '',
            userroleerror: '',
            status: 1,
            statuserror: '',
            isDeleted: false,
            modal: false,
            emit: false,
            user: [],
            roleId: '',
            searchData: '',
            delete: false,
            updateRoleBtn: false
        }
        // this.checkAllHandler = this.checkAllHandler.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.userRoleData = this.userRoleData.bind(this);
        // this.toggle = this.toggle.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.UpdateUserRoleData = this.UpdateUserRoleData.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        // this.editUserRoleData = this.editUserRoleData.bind(this);
        this.searchUserRoleDataKeyUp = this.searchUserRoleDataKeyUp.bind(this);
        // this.deleteAllUserRoleData = this.deleteAllUserRoleData.bind(this);
        // this.data = localStorage.getItem('isFetch');
        this.handleChangeStatusName = this.handleChangeStatusName.bind(this);

        // EventEmitter.subscribe('userroledata', (data) => {
        //     console.log("userroledata=", data.data.data);
        //     this.setState({
        //         checked: this.state.checked = true
        //     })
        //     if (data.data.data.status == "active") {
        //         this.setState({
        //             userrole: data.data.data.name,
        //             statuscheck1: this.state.statuscheck1 = true,
        //             status: this.state.status = "active"
        //         })
        //     } else if (data.data.data.status == "inactive") {
        //         this.setState({
        //             userrole: data.data.data.name,
        //             statuscheck2: this.state.statuscheck2 = true,
        //             status: this.state.status = "inactive"
        //         })
        //     }
        // });

        EventEmitter.subscribe('editData', (data) => {
            console.log("data", data);
            this.setState({
                updateRoleBtn: this.state.updateRoleBtn = true,
                roleId: this.state.roleId = data.id
            })
            if (data.status == 1) {
                this.setState({
                    userrole: this.state.userrole = data.name,
                    status: this.state.status = 1,
                    statuscheck1: this.state.statuscheck1 = true
                })
            } else {
                this.setState({
                    userrole: this.state.userrole = data.name,
                    status: this.state.status = 2,
                    statuscheck2: this.state.statuscheck2 = true
                })
            }
        });

        // EventEmitter.subscribe('checked', (value) => {
        //     this.setState({
        //         delete: this.state.delete = true
        //     })
        // });

        // EventEmitter.subscribe('check', (value) => {
        //     this.setState({
        //         delete: this.state.delete = false
        //     })
        // });
    }

    handleChangeEvent(e) {
        EventEmitter.dispatch('per_page_changed', e.target.value);
    }


    // deleteAllUserRoleData() {
    //     this.setState({
    //         user: this.state.user.length = 0,
    //         isDeleted: this.state.isDeleted = true
    //     });
    //     EventEmitter.dispatch('isDeleted', this.state.isDeleted);
    //     Swal.fire("AllUserRoleData Deleted Successfully!", "", "success");
    //     window.location.href = "/userrole";
    // }

    /** validation of login form */
    validate = () => {
        let userroleerror = "";
        let statuserror = "";

        if (!this.state.userrole) {
            userroleerror = "please enter userrole";
        }

        if (!this.state.status) {
            statuserror = "please enter status";
        }

        if (userroleerror || statuserror) {
            this.setState({ userroleerror, statuserror });
            return false;
        }
        return true;
    };

    // toggle() {
    //     this.setState({
    //         modal: !this.state.modal
    //     });
    // }

    // checkAllHandler(event) {
    //     if (event.target.checked == true) {
    //         this.setState({
    //             checked: true
    //         })
    //     } else {
    //         this.setState({
    //             checked: false
    //         })
    //     }
    // }

    // handleChange(event) {
    //     if (event.target.checked == true) {
    //         this.setState({
    //             checked: true
    //         })
    //     } else {
    //         this.setState({
    //             checked: false
    //         })
    //     }
    // }

    handleChangeRole(event) {
        this.setState({
            userroleerror: this.state.userroleerror = '',
            statuserror: this.state.statuserror = ''
        })
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleChangeStatus(event) {
        this.setState({
            status: this.state.status
        })
        console.log("event", event);
        this.setState({
            statuscheck1: this.state.statuscheck1 = event.target.checked,
            status: this.state.status = event.target.value,
            statuscheck2: this.state.statuscheck2 = false
        })
        console.log("status", this.state.status);
    }

    handleChangeStatusName(event) {
        console.log("event", event.target.value);
        this.setState({
            statuscheck2: this.state.statuscheck2 = event.target.checked,
            status: this.state.status = event.target.value,
            statuscheck1: this.state.statuscheck1 = false
        })
        console.log("status", this.state.status);
    }

    userRoleData() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                userrole: '',
                userroleerror: '',
                status: '',
                statuserror: ''
            })
            if (this.state.userrole && this.state.status) {
                const obj = {
                    name: this.state.userrole,
                    status: this.state.status
                }
                console.log("obj", obj);
                API.addUserRole(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            EventEmitter.dispatch('role_added', 1);
                            Swal.fire("UserRole Added Successfully!", "", "success");

                        } else {
                            Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("PLease Enter Field First!", "", "warning");
            }
        };

    }

    UpdateUserRoleData() {
        console.log("usersatus", this.state.status, this.state.userrole);
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                userrole: '',
                userroleerror: '',
                status: '',
                statuserror: ''
            })
            console.log("usersatus", this.state.status, this.state.userrole);
            if (this.state.userrole && this.state.status) {
                this.setState({
                    checked: false
                })
                const obj = {
                    name: this.state.userrole,
                    status: this.state.status,
                    id: this.state.roleId
                }
                API.editUserRole(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            EventEmitter.dispatch('role_updated', 1);
                            Swal.fire("UserRole Updated Successfully!", "", "success");
                            this.setState({
                                updateRoleBtn: this.state.updateRoleBtn = false
                            })
                        } else {
                            // console.log("err", err);
                            Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("Please enter filed first!", "", "warning");
            }
        };
    }

    searchUserRoleDataKeyUp(e) {
        API.searchUserRole({ search_string: e.target.value })
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        searchData: findresponse.data.data
                    })
                    EventEmitter.dispatch('searchData', this.state.searchData);
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12" md="12" lg="6" xl="6">
                        <Card>
                            <CardHeader>
                                <strong>UserRole</strong>
                                <small> Form</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="userrole">UserRole:</Label>
                                            <Input
                                                type="text"
                                                name="userrole"
                                                className="form-control"
                                                value={this.state.userrole}
                                                onChange={this.handleChangeRole}
                                                id="userrole"
                                                placeholder="Enter userrole"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.userroleerror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <Label htmlFor="userrole">Status:</Label>
                                        <br />
                                        <FormGroup check inline>
                                            <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="inline-radio1"
                                                value="1"
                                                checked={this.state.statuscheck1}
                                                name="status"
                                                onChange={this.handleChangeStatus}
                                            />
                                            <Label
                                                className="form-check-label"
                                                check htmlFor="inline-radio1"
                                            >
                                                Active
                                             </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="inline-radio2"
                                                value="0"
                                                checked={this.state.statuscheck2}
                                                name="status"
                                                onChange={this.handleChangeStatusName}
                                            />
                                            <Label
                                                className="form-check-label"
                                                check htmlFor="inline-radio1"
                                            >
                                                InActive
                                             </Label>
                                        </FormGroup>
                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {this.state.statuserror}
                                        </div>

                                    </Col>
                                </Row>
                                {
                                    this.state.updateRoleBtn == false ? (
                                        <Button type="button" size="sm" color="primary" onClick={this.userRoleData} style={{ marginTop: '15px' }}>Save</Button>
                                    ) : (
                                            <Button type="button" size="sm" color="primary" onClick={this.UpdateUserRoleData} style={{ marginTop: '15px' }}>Update</Button>
                                        )
                                }
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="6" xl="6">
                        <Card>
                            <CardHeader>
                                <strong>UserRole</strong>
                            </CardHeader>
                            <CardBody>
                                <div>
                                    <Row>
                                        <Col xs="2">
                                            <div className="right">
                                                <Button
                                                    className="btn-reddit btn-brand mr-1 mb-1"

                                                    onClick={this.deleteAllUserRoleData}
                                                    disabled={!this.state.delete}
                                                >
                                                    Delete
                                                                </Button>
                                            </div>
                                        </Col>
                                        <Col xs="4">
                                            <div>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Search"
                                                    aria-label="Search"
                                                    onKeyUp={this.searchUserRoleDataKeyUp}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs="6">
                                            <div className="left">
                                                <span>Records per page</span>
                                                <CustomInput
                                                    type="select"
                                                    id="exampleCustomSelect"
                                                    name="customSelect"
                                                    onChange={this.handleChangeEvent}
                                                >
                                                    <option value="2">2</option>
                                                    <option value="5">5</option>
                                                </CustomInput>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <TableRole data={this.state.user} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default UserRole;