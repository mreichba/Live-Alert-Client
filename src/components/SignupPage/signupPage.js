import React, { Component } from 'react';
import './signupPage.css';
import AuthHelper from '../../services/auth-api-service';
import { Link } from 'react-router-dom'

export default class Signup extends Component {
  state = { error: null }

  // redirect user to login page after successful registration
  onRegistrationSuccess = user => {
    const { history } = this.props;
    history.push('/auth/login')
  }

  //sends POST request of new user info to /auth/sign-up
  newAccountSubmit = ev => {
    ev.preventDefault();

    const { 
      nick_name,
      email,
      password,
      passwordRepeat,
      safeword,
      safewordRepeat 
    } = ev.target

    // check password and safeword match before sending request
    if (password.value !== passwordRepeat.value) {
      return this.setState({ error: "Passwords do not match." });
    }
    if (safeword.value !== safewordRepeat.value) {
      return this.setState({ error: "Safewords do not match." });
    }

    this.setState({ error: null });

    AuthHelper.createAccount({
      nick_name: nick_name.value,
      email: email.value.toLowerCase(),
      password: password.value,
      safeword: safeword.value
    })
      .then(() => {
        //clears inputs
        nick_name.value = '';
        email.value = '';
        password.value = '';
        passwordRepeat.value = '';
        safeword.value = '';
        safewordRepeat.value = '';

        this.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error })
      });
  };

  render() {
    return (
      <div>
        <h2>Create Account</h2>

        <form className="sign-up" onSubmit={this.newAccountSubmit}>
          <div className="container">
            <p>Please fill in this form to create an account.</p>
            <hr />

            <label htmlFor="nick_name"><b>Name</b></label>
            <input type="text" placeholder="Enter Name" id="nick_name" name="nick_name" required />

            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" id="email" name="email" required />

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" id="password" name="password" required />

            <label htmlFor="passwordRepeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" id="passwordRepeat" name="passwordRepeat" required />

            <label htmlFor="safeword"><b>Safeword</b></label>
            <input type="text" placeholder="Enter Safeword" id="safeword" name="safeword" required />

            <label htmlFor="safewordRepeat"><b>Repeat Safeword</b></label>
            <input type="text" placeholder="Repeat Safeword" id="safewordRepeat" name="safewordRepeat" required />
            
            {this.state.error && <div className='error'>{this.state.error}</div>}
            <hr />

            <p>By creating an account you agree to our <Link to='/terms'>Terms & Privacy</Link>.</p>

            <div className="buttons">
              <button type="submit" className="register button">Register</button>
              <Link to='/'>
                <button type="button" className="cancel">Cancel</button>
              </Link>
            </div>
          </div>

          <div className="container signin">
            <p>Already have an account? <Link to='/auth/login'>Sign in</Link></p>
          </div>
        </form>
      </div>
    )
  }
}