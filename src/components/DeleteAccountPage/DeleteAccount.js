import React from 'react';

import AuthHelper from '../../services/auth-api-service';

export default class DeleteAccount extends React.Component {

  onDeleteSuccess = user => {
    const { history } = this.props;
    history.push('/')
  }

  deleteAccount = (event) => {
    event.preventDefault();
    const { email, password } = event.target
    alert('Your account is now being deleted!');
    AuthHelper.deleteAccount()
      .then(() => {
        email.value = '';
        password.value = '';
        this.onDeleteSuccess();
      })
  }

  render() {
    return (
      <div>
        <div className="logo">Logo</div>

        <h2>Account Deletion</h2>

        <form onSubmit={this.deleteAccount}>
          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required />

          <label for="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" required />

          <button type="submit" className="login button">Delete My Account</button>
          <button type="click" className="cancel button">Cancel</button>
        </form>
      </div>

    )
  }
}