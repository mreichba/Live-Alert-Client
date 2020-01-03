import React from "react";
import { Link } from "react-router-dom";
import './Landing.css'

export default class Landing extends React.Component {
  render() {
    return (
      <div>
        <div className="logo">Logo</div>

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

        <h2>Mission Statement:</h2>
        <p>
          The world is filled with so much good and our lives may hold many adventures. At the same time, these adventures
          can take a turn for the worse and expose us to dangerous situations in which we may fear for our lives. In these
          moments, you may not have time to make a phone call or relate a situation to pertinent individuals and thats where
          this discrete App comes in handy. If you are feeling threatened or scared for your life, you just have to press
          one button
          and your selected contacts are notified of an 'incident' and are given your GPS location, name, email, phone
          number, and a
          safeword. If contacted and no one answers or does answer but does not repeat the safeword, then
          contacts should relay that information to authorities and they will be on their way to your location.
        </p>
      </div >
    )
  }
}