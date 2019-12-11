import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import history from '../../history';
import API from '../../service';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameerror: '',
      password: '',
      passworderror: '',
      user_group: '',
      user: ''
    }
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.Login = this.Login.bind(this);

  }

  /** onChange event  */
  handleChangeEvent(event) {
    event.preventDefault();
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /** validation of login form */
  validate = () => {
    let passworderror = "";
    let usernameerror = "";


    if (!this.state.username) {
      usernameerror = "please enter username";
    }

    if (!this.state.password) {
      passworderror = "please enter password";
    }

    if (usernameerror || passworderror) {
      this.setState({ usernameerror, passworderror });
      return false;
    }
    return true;
  };

  Login() {
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      this.setState({
        password: '',
        passworderror: '',
        username: '',
        usernameerror: ''
      })
    };
    if (this.state.username && this.state.password) {
      const obj = {
        username: this.state.username,
        password: this.state.password,
        user_group: 'admin'
      }
      /** UserLogin */
      API.login(obj)
        .then((findresponse) => {
          if (findresponse) {
            this.setState({
              user: findresponse.data.data
            })
            console.log("login response===", this.state.user);
            localStorage.setItem('ad_network_auth', JSON.stringify(this.state.user))
            let auth = JSON.parse(localStorage.getItem('ad_network_auth'));
            console.log("auth", auth);
            setTimeout(
              window.location.href = "/",
              6000
            );
            // window.location.href = "/#/dashboard";
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
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
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
                          placeholder="Username"
                          autoComplete="username"
                        />
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.usernameerror}
                        </div>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          className="form-control"
                          value={this.state.password}
                          onChange={this.handleChangeEvent}
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.passworderror}
                        </div>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="button" color="primary" className="px-4" onClick={this.Login}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to="/ForgotPassword"> <Button color="link" className="px-0">Forgot password?</Button></Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
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

export default Login;
