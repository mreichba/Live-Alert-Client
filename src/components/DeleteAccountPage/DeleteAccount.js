import React from 'react';
import TokenServices from '../../services/token-services';
import AuthHelper from '../../services/auth-api-service';
import Logo from '../../Images/signal-tower-large.png';
import Context from '../Context/Context';
import './DeleteAccount.css'


export default class DeleteAccount extends React.Component {
  static contextType = Context;

  // navigates back to the user's home page
  onCancel = () => {
    const { history } = this.props;
    history.push('/users/home')
  }

  // navigates to the landing page after account deletion
  onDeleteSuccess = () => {
    const { history } = this.props;
    history.push('/')
  }

  // sends DELETE request to /users, clears context and auth, and redirects
  deleteAccount = (event) => {
    event.preventDefault();
    const { email, password } = event.target

    AuthHelper.deleteAccount(email, password)
      .then(() => {
        email.value = '';
        password.value = '';
        TokenServices.clearAuthToken();
        this.context.setAuth(null);
        this.onDeleteSuccess();
      })
  }

  // renders delete account form
  render() {
    return (
      <div>
        <img id="Landing-Logo" src={Logo} alt="Live Alert Logo" className="logo" />

        <h2>Account Settings</h2>

        <div className="accountDelete">
          <h3>Delete My Account</h3>

          <form onSubmit={this.deleteAccount}>
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" id="email" name="email" required />

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" id="password" name="password" required />

            <button type="submit" className="delete button">Delete My Account</button>
            <button type="button" className="cancel button" onClick={this.onCancel}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}