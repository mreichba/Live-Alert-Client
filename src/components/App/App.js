import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from '../../services/PrivateRoute';
import PublicRoute from '../../services/PublicRoute';
import Login from '../LoginPage/Login';
import Signup from '../SignupPage/signupPage';
import Landing from '../LandingPage/Landing';
import Home from '../HomePage/Home';
import DeleteAccount from '../DeleteAccountPage/DeleteAccount';
import Contacts from '../ContactsPage/Contacts';
import MyAlerts from '../MyAlertsPage/MyAlerts';
import Nav from '../Nav/Nav';
import NotFoundPage from '../NotFoundPage/NotFound';
import Context from '../Context/Context';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: null
    };
  }

  emptyAuth = () => {
    this.setState({ authToken: null })
  }

  setAuth = (token) => {
    this.setState({ authToken: token })
  }

  render() {
    const value = {
      authToken: this.state.authToken,
      emptyAuth: this.emptyAuth,
      setAuth: this.setAuth,
    };

    return (
      <Context.Provider value={value}>
        <div className='App'>
          <Nav />

          <header>
            <h1>Live Alert</h1>
          </header>

          <main>
            <Switch>
              <PublicRoute
                exact
                path='/'
                component={Landing}
              />
              <PublicRoute
                exact
                path='/auth/sign-up'
                component={Signup}
              />
              <PublicRoute
                exact
                path='/auth/login'
                component={Login}
              />
              <PrivateRoute
                exact
                path='/users/home'
                component={Home}
              />
              <PrivateRoute
                exact
                path='/alerts'
                component={MyAlerts}
              />
              <PrivateRoute
                exact
                path='/contacts'
                component={Contacts}
              />
              <PrivateRoute
                exact
                path='/delete-account'
                component={DeleteAccount}
              />
              <Route
                component={NotFoundPage}
              />
            </Switch>
          </main>
        </div>
      </Context.Provider>
    );
  }
}

export default App;