import React from 'react';
import { Link } from 'react-router-dom';
import TokenServices from '../../services/token-services';
import Context from '../Context/Context';
import AuthHelper from '../../services/auth-api-service';
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

  componentDidMount() {
    if (TokenServices.hasAuthToken()) {
      AuthHelper.getMyNickname()
        .then(res => res.json())
        .then(res => this.setState({ nick_name: res.nick_name }))
    }
  }

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
    this.setState({ nick_name: '' });
  }

  renderHomeLinks() {
    return (
      <nav className='navContents'>
        <div className='userNickname'>
          <Link to='/users/home' className='user'>
            <span className='nickname'>{this.state.nick_name}'s profile</span>
          </Link>
        </div>
        <div role="navigation" className="burgerIcon" id="burger" onClick={this.burgerClick}> &#9776; </div>
        <ul aria-live="polite" className="links" id="links" onClick={this.burgerClick}>
          <li><Link onClick={this.signOut} to='/auth/login' >Log Out</Link></li>
          {/* <li><Link to='/Info' >Information</Link></li> */}
          <li><Link to='/delete-account'>Delete Account</Link></li>
          <li><Link to='/contacts'>Contacts</Link></li>
          <li><Link to='/alerts'>My Alerts</Link></li>
        </ul>
      </nav>
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