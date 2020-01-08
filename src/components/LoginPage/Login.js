import React from 'react';
import { Link } from 'react-router-dom';
import '../LoginPage/Login.css'
import AuthHelper from '../../services/auth-api-service';
import TokenServices from '../../services/token-services'
import Context from '../Context/Context';


export default class Login extends React.Component {
  static contextType = Context;
  static defaultProps = {
    location: {},
    history: {
      push: () => { }
    }
  };

  state = { error: null };

  onLoginSuccess = () => {
    console.log('login successful!');
    const { location, history } = this.props;
    console.log(this.props);
    const destination = (location.state || {}).from || '/home';
    history.push(destination);
    console.log(destination);
  };

  loginSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { email, password } = e.target;
    AuthHelper.login({
      email: email.value,
      password: password.value
    })
      .then(res => {
        email.value = '';
        password.value = '';
        TokenServices.saveAuthToken(res.authToken);
        this.context.setAuth(res.authToken);
        this.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };
  render() {

    return (
      <div className='Login'>
        <header>
          <h2 className="appName">Sign-In</h2>
        </header>
        <form className='Login-Form' onSubmit={this.loginSubmit}>
          <label htmlFor="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required />

          <label htmlFor="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" required />

          <button type="submit" className="login button">Login</button>
        </form>

        <footer>
          <Link to='/forgot-password'>Forgot Username/Password</Link><br />
          <Link to='/auth/sign-up'>Create An Account</Link>
        </footer>
      </div>
    )
  }
}