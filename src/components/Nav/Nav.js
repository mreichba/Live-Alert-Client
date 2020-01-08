import React from 'react';
import { Link } from 'react-router-dom';
import TokenServices from '../../services/token-services';
import Context from '../Context/Context';


export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  static contextType = Context;

  burgerClick = () => {
    console.log('you clicked me!')
    let links = document.getElementById('links');
    if (links.className === 'links') {
      links.className += ' null';
    } else {
      links.className = 'links';
    }
  }

  onLogOutSuccess = () => {
    const { history } = this.props;
    history.push('/auth/login')
  }

  signOut = (event) => {
    TokenServices.clearAuthToken();
    this.context.emptyAuth();
  }

  renderHomeLinks() {
    return (
      <div>
        <div role="navigation" className="burgerIcon" id="burger" onClick={this.burgerClick}> &#9776; </div>
        <ul aria-live="polite" className="links" id="links" onClick={this.burgerClick}>
          <li><Link onClick={this.signOut} to='/auth/login' >Log Out</Link></li>
          {/* <li><Link to='/Info' >Information</Link></li> */}
          <li><Link to='/delete-account'>Delete Account</Link></li>
          <li><Link to='/contacts'>Contacts</Link></li>
          <li><Link to='/alerts'>My Alerts</Link></li>
        </ul>
      </div>
    )
  }

  renderLoginLinks() {
    return (
      <div>
        <ul aria-live="polite" className="links" id="links" onClick={this.burgerClick}></ul>
        <li>
          <Link
            to='/auth/sign-up'>
            Register
          </Link>
        </li>
        {' '}
        <li>
          <Link
            to='/auth/login'>
            Login
          </Link>
        </li>
      </div>
    )
  }
  render() {
    return (
      <div>
        <nav className="navBar">
          {TokenServices.hasAuthToken()
            ? this.renderHomeLinks()
            : this.renderLoginLinks()}
        </nav>
      </div>
    )
  }
}