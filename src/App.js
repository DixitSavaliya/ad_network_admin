import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import history from './history';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./component/Login'));
const Register = React.lazy(() => import('./component/Register'));
const ForgotPassword = React.lazy(() => import('./component/ForgotPassword/forgotpassword'));

class App extends Component {
   /** First Constructor Call */
   constructor(props) {
    super(props);
    this.state = {
      auth : JSON.parse(localStorage.getItem('ad_network_auth'))
    }

  }

  render() {
    return (
      <BrowserRouter history={history}>
          <React.Suspense fallback={loading()}>
            <Switch  history={history}>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/ForgotPassword" name="Register Page" render={props => <ForgotPassword {...props}/>} />
              {
                this.state.auth ? (
                  <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
                ) : (
                  <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                )
              }
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
