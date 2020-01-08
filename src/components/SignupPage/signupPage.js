import React, { Component } from 'react';
import './signupPage.css';
import AuthHelper from '../../services/auth-api-service';
import { Link } from 'react-router-dom'

export default class Signup extends Component {

  state = { error: null }

  onRegistrationSuccess = user => {
    const { history } = this.props;
    history.push('/auth/login')
  }

  newAccountSubmit = ev => {
    ev.preventDefault()
    const { nick_name, email, password, passwordRepeat, safeword, safewordRepeat
    } = ev.target

    console.log('Sign-up form submitted')
    console.log({ nick_name, email, password, safeword })

    this.setState({ error: null });
    AuthHelper.createAccount({
      nick_name: nick_name.value,
      email: email.value,
      password: password.value,
      safeword: safeword.value
    })
      .then(user => {
        nick_name.value = '';
        email.value = '';
        password.value = '';
        passwordRepeat.value = '';
        safewordRepeat.value = '';
        safeword.value = '';
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

        <form className="sign-up"
          onSubmit={this.newAccountSubmit}>
          <div className="container">

            <p>Please fill in this form to create an account.</p>
            <hr />

            <label htmlFor="nick_name"><b>Name</b></label>
            <input type="text" placeholder="Enter Name" name="nick_name" required />

            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required />

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required />

            <label htmlFor="passwordRepeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="passwordRepeat" required />

            <label htmlFor="safeword"><b>Safeword</b></label>
            <input type="text" placeholder="Enter Safeword" name="safeword" required />

            <label htmlFor="safewordRepeat"><b>Repeat Safeword</b></label>
            <input type="text" placeholder="Repeat Safeword" name="safewordRepeat" required />
            <hr />

            <p>By creating an account you agree to our <Link to='/terms'>Terms & Privacy</Link>.</p>
            <div className="buttons">
              <button type="submit" className="register button">Register</button>
              <Link to='/'>
                <button type="click" className="cancel">Cancel</button>
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