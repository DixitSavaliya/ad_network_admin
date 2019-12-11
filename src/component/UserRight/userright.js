import React, { Fragment } from 'react';
import { EventEmitter } from '../../event';
import API from '../../service';

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardHeader,
    CustomInput,
    CardTitle,

} from 'reactstrap';
// import './userrole.css';
import Swal from 'sweetalert2';
import TableRight from '../Tables/TableRight';

class UserRight extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            userright: '',
            userrighterror: '',
            displayname: '',
            displaynameerror: '',
            group_name: '',
            group_nameerror: '',
            group_display_name: '',
            group_display_nameerrror: '',
            user: [],
            updateRightBtn: false,
            rightId: '',
            searchData: ''
        }
        this.handleChangeRight = this.handleChangeRight.bind(this);
        this.userRightData = this.userRightData.bind(this);
        this.UpdateUserRightData = this.UpdateUserRightData.bind(this);
        this.searchUserRightDataKeyUp = this.searchUserRightDataKeyUp.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);

        EventEmitter.subscribe('editRightData', (data) => {
            console.log("data", data);
            this.setState({
                updateRightBtn: this.state.updateRightBtn = true,
                rightId: this.state.rightId = data.id,
                userright: this.state.userright = data.name,
                displayname: this.state.displayname = data.display_name,
                group_name: this.state.group_name = data.group_name,
                group_display_name: this.state.group_display_name = data.group_display_name
            })
        });
    }

    handleChangeRight(event) {
        this.setState({
            userrighterror: this.state.userrighterror = '',
            displaynameerror:  this.state.displaynameerror = '',
            group_nameerror:  this.state.group_nameerror = '',
            group_display_nameerrror:  this.state.group_display_nameerrror = ''
        })
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    /** validation of login form */
    validate = () => {
        let userrighterror = "";
        let displaynameerror = "";
        let group_display_nameerrror = "";
        let group_nameerror = "";

        if (!this.state.userright) {
            userrighterror = "please enter userright name";
        } else if (!this.state.userright.toLowerCase()) {
            userrighterror = "please enter userright name in lowercase"
        }

        if (!this.state.displayname) {
            displaynameerror = "please enter displayname";
        }

        if (!this.state.group_display_name) {
            group_display_nameerrror = "please enter group_display_name";
        }

        if (!this.state.group_name) {
            group_nameerror = "please enter group_name";
        }

        if (userrighterror || displaynameerror || group_display_nameerrror || group_nameerror) {
            this.setState({ userrighterror, displaynameerror, group_display_nameerrror, group_nameerror });
            return false;
        }
        return true;
    };


    handleChangeEvent(e) {
        EventEmitter.dispatch('per_page_changed_value', e.target.value);
    }


    userRightData() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                userright: '',
                userrighterror: '',
                displayname: '',
                displaynameerror: '',
                group_name: '',
                group_nameerror: '',
                group_display_name: '',
                group_display_nameerrror: ''
            })

            if (this.state.userright && this.state.displayname && this.state.group_name && this.state.group_display_name) {
                const obj = {
                    name: this.state.userright.toLowerCase(),
                    display_name: this.state.displayname,
                    group_name: this.state.group_name,
                    group_display_name: this.state.group_display_name
                }
                API.addUserRight(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            EventEmitter.dispatch('userrightdataget',2);
                            Swal.fire("UserRight Added Successfully!", "", "success");
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

    UpdateUserRightData() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                userright: '',
                userrighterror: '',
                displayname: '',
                displaynameerror: '',
                group_name: '',
                group_nameerror: '',
                group_display_name: '',
                group_display_nameerrror: ''
            })
            if (this.state.userright && this.state.displayname && this.state.group_name && this.state.group_display_name) {
                const obj = {
                    name: this.state.userright.toLowerCase(),
                    display_name: this.state.displayname,
                    group_name: this.state.group_name,
                    group_display_name: this.state.group_display_name,
                    id: this.state.rightId
                }
                API.editUserRight(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            EventEmitter.dispatch('right_Update', 1);
                            Swal.fire("UserRight Updated Successfully!", "", "success");
                            this.setState({
                                updateRightBtn: this.state.updateRightBtn = false
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

    searchUserRightDataKeyUp(e) {
        API.searchUserRight({ search_string: e.target.value })
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        searchData: findresponse.data.data
                    })
                    EventEmitter.dispatch('searchDataUser', this.state.searchData);
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
                    <Col xs="12" sm="12" md="12" lg="4" xl="4">
                        <Card>
                            <CardHeader>
                                <strong>UserRight</strong>
                                <small> Form</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="userright">UserRight:</Label>
                                            <Input
                                                type="text"
                                                name="userright"
                                                className="form-control"
                                                value={this.state.userright}
                                                onChange={this.handleChangeRight}
                                                id="userright"
                                                placeholder="Enter userright"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.userrighterror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="displayname">DisplayName:</Label>
                                            <Input
                                                type="text"
                                                name="displayname"
                                                className="form-control"
                                                value={this.state.displayname}
                                                onChange={this.handleChangeRight}
                                                id="displayname"
                                                placeholder="Enter displayname"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.displaynameerror}
                                            </div>
                                        </FormGroup>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="group_name">GroupName:</Label>
                                            <Input
                                                type="text"
                                                name="group_name"
                                                className="form-control"
                                                value={this.state.group_name}
                                                onChange={this.handleChangeRight}
                                                id="group_name"
                                                placeholder="Enter group_name"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.group_nameerror}
                                            </div>
                                        </FormGroup>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="group_display_name">GroupDisplayName:</Label>
                                            <Input
                                                type="text"
                                                name="group_display_name"
                                                className="form-control"
                                                value={this.state.group_display_name}
                                                onChange={this.handleChangeRight}
                                                id="group_display_name"
                                                placeholder="Enter group_display_name"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.group_display_nameerrror}
                                            </div>
                                        </FormGroup>

                                    </Col>
                                </Row>
                                {
                                    this.state.updateRightBtn == false ? (
                                        <Button type="button" size="sm" color="primary" onClick={this.userRightData} style={{ marginTop: '15px' }}>Save</Button>
                                    ) : (
                                            <Button type="button" size="sm" color="primary" onClick={this.UpdateUserRightData} style={{ marginTop: '15px' }}>Update</Button>
                                        )
                                }
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="8" xl="8">
                        <Card>
                            <CardHeader>
                                <strong>UserRight</strong>
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
                                                    onKeyUp={this.searchUserRightDataKeyUp}
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
                                                     <option value="10">10</option>
                                                    <option value="15">15</option>
                                                </CustomInput>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <TableRight data={this.state.user} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserRight;