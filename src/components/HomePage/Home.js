import React from 'react';
import './Home.css';
import AuthHelper from '../../services/auth-api-service';
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
    };
  }

  // componentDidMount() {
  //   AuthHelper.getMyAlerts()

  // }

  render() {
    return (
      <div>
        <nav className="navBar">
          <a role="navigation" className="burgerIcon" id="burger" onClick="burgerClick()"> &#9776; </a>
          <ul aria-live="polite" className="links" id="links" onClick="burgerClick()">
            <li><a href="#">Log Out</a></li>
            <li><a href="#">Information</a></li>
            <li><Link to='/delete-account'>Delete Account</Link></li>
          </ul>
        </nav>

        <div className="logo">Logo</div>

        <button className="alertButton">Live Alert!</button>

        <div className='alertsHome'>
          <h3>ALERTS WILL SHOW HERE!</h3>

        </div>
      </div>
    )
  }
}
