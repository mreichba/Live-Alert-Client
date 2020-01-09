import React from 'react';
import TokenServices from '../../services/token-services';
import AuthHelper from '../../services/auth-api-service';
import Logo from '../../Images/signal-tower-large.png'

export default class DeleteAccount extends React.Component {

  onCancel = () => {
    const { history } = this.props;
    history.push('/users/home')
  }

  onDeleteSuccess = user => {
    const { history } = this.props;
    history.push('/')
  }

  deleteAccount = (event) => {
    event.preventDefault();
    const { email, password } = event.target
    AuthHelper.deleteAccount(email, password)
      .then(() => {
        email.value = '';
        password.value = '';
        TokenServices.clearAuthToken();
        this.onDeleteSuccess();
        alert('Your account has successfully been deleted!');
      })
  }

  render() {
    return (
      <div>
        <img id="Landing-Logo" src={Logo} alt="Live Alert Logo" className="logo" />

        <h2>Account Deletion</h2>

        <form onSubmit={this.deleteAccount}>
          <label htmlFor="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required />

          <label htmlFor="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" required />

          <button type="submit" className="delete button">Delete My Account</button>
          <button type="click" className="cancel button" onClick={this.onCancel}>Cancel</button>
        </form>
      </div>

    )
  }
}