import React from 'react';
import TokenServices from '../../services/token-services';
import AuthHelper from '../../services/auth-api-service';
import Logo from '../../Images/signal-tower-large.png';
import Context from '../Context/Context';


export default class DeleteAccount extends React.Component {

  static contextType = Context;

  onCancel = () => {
    const { history } = this.props;
    history.push('/home')
  }

  onDeleteSuccess = user => {
    const { history } = this.props;
    history.push('/')
  }
  //deletes user account
  deleteAccount = (event) => {
    event.preventDefault();
    const { email, password } = event.target
    //DELETE request to /users router, clears auth, and resets state
    AuthHelper.deleteAccount(email, password)
      .then(() => {
        email.value = '';
        password.value = '';
        TokenServices.clearAuthToken();
        this.context.setAuth(null);
        this.onDeleteSuccess();
      })
  }
  //returns a form to enter email/password to delete account
  render() {
    return (
      <div>
        <img id="Landing-Logo" src={Logo} alt="Live Alert Logo" className="logo" />

        <h2>Account Deletion</h2>

        <form onSubmit={this.deleteAccount}>
          <label htmlFor="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" id="email" name="email" required />

          <label htmlFor="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" id="password" name="password" required />

          <button type="submit" className="delete button">Delete My Account</button>
          <button type="click" className="cancel button" onClick={this.onCancel}>Cancel</button>
        </form>
      </div>

    )
  }
}