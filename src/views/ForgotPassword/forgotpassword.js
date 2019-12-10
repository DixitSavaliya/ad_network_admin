import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, CardHeader, CardTitle } from 'reactstrap';
import API from '../../service';
import Swal from 'sweetalert2';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameerror: ''
    }
    this.ForgotPassword = this.ForgotPassword.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  /** onChange event  */
  handleChangeEvent(event) {
    event.preventDefault();
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
}

/** validation of forgotpassword */
validate = () => {
    let usernameerror = "";

    if(!this.state.username) {
      usernameerror = "please enter username or email";
    }

    if (usernameerror) {
        this.setState({ usernameerror });
        return false;
    }
    return true;
};


  ForgotPassword() {
    const isValid = this.validate();
    if (isValid) {
        console.log(this.state);
        this.setState({
            username: '',
            usernameerror: ''
        })
        if (this.state.username) {
            const obj = {
              username: this.state.username
            }
            /** Forgot password */
            API.ForgotPassword(obj)
                .then((findresponse) => {
                    Swal.fire("Email sent Successfully!", "", "success");
                    // setTimeout(
                    //     window.location.href = "/#/login",
                    //     6000
                    // );
                }).catch({ status: 500, message: 'Internal Server Error' });
        }
    };
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card>
                  <CardHeader>
                      <strong>ForgotPassword</strong>
                      {/* <small> Form</small> */}
                  </CardHeader>
                  <CardBody style={{ padding:'30px 20px 20px 20px'}}>
                    <Form style={{minHeight: '55px'}}>
                      {/* <p className="text-muted">Enter your username</p> */}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="username"
                          className="form-control"
                          value={this.state.username}
                          onChange={this.handleChangeEvent}
                          placeholder="Username or Email"
                          autoComplete="username"
                        />
                      </InputGroup>
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.usernameerror}
                        </div>
                    </Form>
                    <Row>
                      <Col xs="12" sm="6" md="6" lg="6" xl="6"  style={{ paddingTop:'10px'}}>
                        <Button type="button" color="primary" className="px-4" onClick={this.ForgotPassword}>Send</Button>
                      </Col>
                      <Col xs="12" sm="6" md="6" lg="6" xl="6" className="text-right"  style={{ paddingTop:'10px'}}>
                        <Link to="/login"><Button type="button" color="primary" className="px-4">Back To Login</Button></Link>                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgotPassword;
