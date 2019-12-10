import React, { Fragment } from 'react';
import API from '../../service';
import Swal from 'sweetalert2';
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

class ChangePassword extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
           old_password:'',
           old_passworderror:'',
           new_password:'',
           new_passworderror:'',
           user : JSON.parse(localStorage.getItem('ad_network_user'))
        }
       this.handleChangeEvent = this.handleChangeEvent.bind(this);
       this.ChangePassword = this.ChangePassword.bind(this);
    }

       /** onChange event  */
       handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    validate = () => {
        let new_passworderror = "";
        let old_passworderror = "";
    
        if (!this.state.old_password) {
            old_passworderror = "please enter oldpassword";
        }
    
    
        if (!this.state.new_password) {
            new_passworderror = "please enter newpassword";
        }
    
        if (new_passworderror || old_passworderror) {
          this.setState({ new_passworderror, old_passworderror });
          return false;
        }
        return true;
      };

      ChangePassword() {
        const isValid = this.validate();
        if (isValid) {
          console.log(this.state);
          this.setState({
            newPasswordError: '',
            oldPasswordError: '',
            newPassword: '',
            oldPassword: ''
          })
          if(this.state.old_password && this.state.new_password) {
              const obj = {
                  id: this.state.user.id,
                  username: this.state.user.username,
                  old_password:this.state.old_password,
                  new_password:this.state.new_password
              }
              API.changePassword(obj)
                  .then((findresponse) => {
                      if (findresponse) {
                          console.log("changePassword response===", findresponse);
                          Swal.fire(
                            'Updated',
                            'Your password updated successfully',
                            'success'
                          )
                      } else {
                          // Swal.fire("Something went wrong!", "", "warning");
                      }
                  }).catch((err) => {
                      // Swal.fire("Something went wrong!", "", "warning");
                  });
          }
        };
      }
    
    

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>ChangePassword</strong>
                                <small> Form</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="old_password">old_password</Label>
                                            <Input
                                                type="password"
                                                id="old_password"
                                                name="old_password"
                                                className="form-control"
                                                value={this.state.old_password}
                                                onChange={this.handleChangeEvent}
                                                placeholder="Enter your oldpassword"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.old_passworderror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="new_password">new_password</Label>
                                            <Input
                                                type="password"
                                                id="new_password"
                                                name="new_password"
                                                className="form-control"
                                                value={this.state.new_password}
                                                onChange={this.handleChangeEvent}
                                                placeholder="Enter your newpassword"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.new_passworderror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                               
                                <Button type="button" size="sm" color="primary" onClick={this.ChangePassword}>Update</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChangePassword;