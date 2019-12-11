import React, { Fragment } from 'react';
import API from '../../service';
import { EventEmitter } from '../../event';
import {config} from '../../config';
import './profile.css';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import { tsMethodSignature } from '@babel/types';

class Profile extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            auth: JSON.parse(localStorage.getItem('ad_network_auth')),
            first_name: '',
            first_nameerror: '',
            last_name: '',
            last_nameerror: '',
            email_id: '',
            email_iderror: '',
            mobile_no: '',
            mobile_noerror: '',
            selectedFile: null
        }
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.UpdateProfile = this.UpdateProfile.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);

    }


    componentDidMount() {
        const obj = {
            id: this.state.auth.id,
            group: this.state.auth.user_group

        }
        API.getUserDetail(obj)
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        user: findresponse.data.data
                    })
                    console.log("getUserDetail response===", this.state.user);
                    this.setState({
                        first_name: this.state.user.first_name,
                        last_name: this.state.user.last_name,
                        email_id: this.state.user.email_id,
                        mobile_no: this.state.user.mobile_no,
                        selectedFile:this.state.user.avatar
                    })
                    EventEmitter.dispatch('picture', this.state.user.avatar);
                    localStorage.setItem('ad_network_user', JSON.stringify(this.state.user))
                } else {
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                // Swal.fire("Something went wrong!", "", "warning");
            });
    }

    /** onChange event  */
    handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    onChangeHandler(event) {
        this.setState({
            selectedFile: this.state.selectedFile = event.target.files[0].name,
            loaded: 0,
        })
        console.log("file", this.state.selectedFile);
        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        data.append('user_id',this.state.auth.id)
        API.uploadImage(data)
            .then((findresponse) => {
                console.log("uploadImage response===", findresponse);
                if (findresponse) {
                    this.setState({
                        selectedFile: this.state.selectedFile = findresponse.data.data
                    })
                    console.log("selectfile", this.state.selectedFile);
                } else {
                    console.log("error");
                }
            }).catch((err) => {
                console.log("err", err);
            });
    }

    /** validation of login form */
    validate = () => {
        let first_nameerror = "";
        let last_nameerror = "";
        let email_iderror = "";
        let mobile_noerror = "";


        if (!this.state.first_name) {
            first_nameerror = "please enter first_name";
        }

        if (!this.state.last_name) {
            last_nameerror = "please enter last_name";
        }

        if (!this.state.email_id) {
            email_iderror = "please enter email_id";
        }

        if (!this.state.mobile_no) {
            mobile_noerror = "please enter mobile_no";
        }

        if (first_nameerror || last_nameerror || email_iderror || mobile_noerror) {
            this.setState({ first_nameerror, last_nameerror, email_iderror, mobile_noerror });
            return false;
        }
        return true;
    };

    UpdateProfile() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                first_name: '',
                first_nameerror: '',
                last_name: '',
                last_nameerror: '',
                email_id: '',
                email_iderror: '',
                mobile_no: '',
                mobile_noerror: ''
            })
            const obj = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email_id: this.state.email_id,
                mobile_no: this.state.mobile_no,
                id: this.state.auth.id,
                username: this.state.auth.username,
                create_by: this.state.auth.id,

            }
            console.log("obj", obj);
            API.updateUserDetail(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("updateUserDetail response===", findresponse);
                        this.componentDidMount();
                    } else {
                        // Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    // Swal.fire("Something went wrong!", "", "warning");
                });
        }
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>My Profile</strong>
                                <small> Form</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup className="img-upload">
                                            {
                                                this.state.selectedFile ? (
                                                    <div>
                                                        <img className="pic" src={config.baseApiUrl + this.state.selectedFile} />
                                                    </div>
                                                ) : (null)
                                            }
                                            <p>Select File:</p>
                                            <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg"  ></i></Label>
                                            <Input
                                                id="file-input"
                                                type="file"
                                                className="form-control"
                                                name="file"
                                                onChange={this.onChangeHandler}
                                            />

                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.selectedFileerror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="first_name">First_Name</Label>
                                            <Input
                                                type="text"
                                                id="first_name"
                                                name="first_name"
                                                className="form-control"
                                                value={this.state.first_name}
                                                onChange={this.handleChangeEvent}
                                                placeholder="Enter your firstname"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.first_nameerror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="last_name">Last_Name</Label>
                                            <Input
                                                type="text"
                                                id="last_name"
                                                name="last_name"
                                                className="form-control"
                                                value={this.state.last_name}
                                                onChange={this.handleChangeEvent}
                                                placeholder="Enter your lastname"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.last_nameerror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="email">E-Mail</Label>
                                            <Input
                                                type="email"
                                                id="email"
                                                name="email_id"
                                                className="form-control"
                                                value={this.state.email_id}
                                                onChange={this.handleChangeEvent}
                                                placeholder="Enter your email"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.email_iderror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="mobile_no">Mobile_Number</Label>
                                            <Input
                                                type="text"
                                                id="mobile_no"
                                                name="mobile_no"
                                                className="form-control"
                                                value={this.state.mobile_no}
                                                onChange={this.handleChangeEvent}
                                                placeholder="Enter your mobilenumber"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.mobile_noerror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button type="button" size="sm" color="primary" onClick={this.UpdateProfile}>Update</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Profile;