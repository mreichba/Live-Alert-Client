import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../Images/signal-tower-large.png'
import './Landing.css'

export default class Landing extends React.Component {
  render() {
    return (
      <div>
        <img id="Landing-Logo" src={Logo} alt="Live Alert Logo" className="logo" />

        <div className="buttons">
          <Link to='/auth/sign-up'>
            <button className="createAccount">
              Create Account
            </button>
          </Link>
          <Link to='/auth/login'>
            <button className="signIn">
              Sign In
            </button>
          </Link>
        </div>

        <h2 className="slogan">"Making your safety a priority!"</h2>
        <p className='mission'>
          The world is filled with so much good and our lives may hold many adventures. At the same time, these adventures
          can take a turn for the worse and expose us to dangerous situations in which we may fear for our lives. In these
          moments, you may not have time to make a phone call or relate a situation to pertinent individuals and thats where
          this discrete App comes in handy. If you are feeling threatened or scared for your life, you just have to press
          one button and your selected contacts are notified of an 'incident' and are given your GPS location, name, email,
          and a safeword. If contacted and no one answers or does answer but does not repeat the safeword, then
          contacts should relay the situation to authorities and they will be on their way to your location.
        </p>
        <p className='mission'>To get started, click 'Create Account' and fill out the necessary information. Once account is created, log in
          and add contacts by email to follow their alert status. Tap the alert button on the homepage when you feel you are in an emergency situation and
          Mark yourself safe in the 'My Alerts' tab once you are safe.</p>
      </div >
    )
  }
}