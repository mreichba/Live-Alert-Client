import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../LoginPage/Login';
import Signup from '../SignupPage/signupPage';
import Landing from '../LandingPage/Landing';
import Home from '../HomePage/Home';
import DeleteAccount from '../DeleteAccountPage/DeleteAccount';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <header>
          <h1>Live Alert</h1>
        </header>
        <main>

        </main>
        <Route
          exact
          path='/'
          render={routeProps => {
            return <Landing {...routeProps} />;
          }}
        />
        <Route
          exact
          path='/home'
          render={routeProps => {
            return <Home {...routeProps} />;
          }}
        />
        <Route
          exact
          path='/auth/sign-up'
          render={routeProps => {
            return <Signup {...routeProps} />;
          }}
        />
        <Route
          exact
          path='/auth/login'
          render={routeProps => {
            return <Login {...routeProps} />;
          }}
        />
        <Route
          exact
          path='/delete-account'
          render={routeProps => {
            return <DeleteAccount {...routeProps} />;
          }}
        />
      </div>
    );
  }
}

export default App;