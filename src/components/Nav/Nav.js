import React from 'react';
import { Link } from 'react-router-dom';
import TokenServices from '../../services/token-services';
import Context from '../Context/Context';
import Nickname from '../Nickname/Nickname';
import './Nav.css'



export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      nick_name: '',
    };
  }

  static contextType = Context;

  //activates mobile menu
  burgerClick = () => {
  const links = document.getElementById('links');
    if (links) {
      links.classList.toggle('null');
    }
  };

  //removes token from local storage and clears state and context
  signOut = () => {
    TokenServices.clearAuthToken();
    this.context.emptyAuth();
    this.setState({ nick_name: '' });
  }
  //nav links when auth token is provided
  renderHomeLinks() {
    return (
      <div className='navContents'>
        <Nickname />
        <div 
          role="navigation" 
          className="burgerIcon" 
          id="burger" 
          onClick={this.burgerClick}
        > 
          &#9776; 
        </div>
        <ul 
          aria-live="polite" 
          className="links null" 
          id="links" 
          onClick={this.burgerClick}
        >
          <li><Link to='/contacts'>Contacts</Link></li>
          <li><Link to='/alerts'>My Alerts</Link></li>
          <li><Link to='/delete-account'>Settings</Link></li>
          <li><Link onClick={this.signOut} to='/auth/login' >Log Out</Link></li>
        </ul>
      </div>
    );
  }

  //nav links when no auth token
  renderLoginLinks() {
    return (
      <div className='navContents'>
        <ul aria-live="polite" className="loginLinks" id="loginLinks">
          <li><Link to='/auth/sign-up'>Register</Link></li>
          <li><Link to='/auth/login'>Login</Link></li>
        </ul>
      </div>
    )
  }
  //returns nav bar based on auth token
  render() {
    const isAuthenticated = TokenServices.hasAuthToken();
    return (
      <nav className="navBar">
        {isAuthenticated
          ? this.renderHomeLinks()
          : this.renderLoginLinks()}
      </nav>
    )
  }
}