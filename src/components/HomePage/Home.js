import React from 'react';
import './Home.css';
import AuthHelper from '../../services/auth-api-service';
import Logo from '../../Images/signal-tower-large.png'
const moment = require('moment');

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      alerts: [],
      buttonState: ''
    };
  }
  // gets user's contact alerts when component mounts
  componentDidMount() {
    this.getUserAlerts();
  }

  // sends GET request to /alerts router and sets state with the user's contact alerts
  getUserAlerts = () => {
    AuthHelper.getMyContactAlerts()
      .then(res => res.json())
      .then(alerts => this.setState({ alerts }))
      .catch((error) => this.setState({ error }));
  };

  // checks for geolocation availability(Latitude/Longitude) and triggers visual button animation
  sendAlert = () => {
    if (navigator.geolocation) {
      this.setState({ buttonState: 'greenTransition' }); // Add green effect
      setTimeout(() => {
        this.setState({ buttonState: '' }); // Revert back to red
      }, 2000); // hold green for 2 seconds
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // sends alert info (time, location) in POST request to /alerts and refreshes alert list
  showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const alert_active = true;
    const alert_time = moment().format();

    AuthHelper.addAlert(alert_time, longitude, latitude, alert_active)
      .then(() => this.getUserAlerts())
      .catch((error) => this.setState({ error }));
  }

  //renders contact alerts and returns them
  render() {
    const { alerts, buttonState, error } = this.state;

    const alertElements = alerts.map((alert, idx) => (
      <p key={idx}>
        <span className='bold'>  User: </span>{alert.nick_name} <br/>
        <span className='bold'>  Alert Time: </span>{moment(alert.alert_time).format("dddd, MMMM Do YYYY, h:mm:ss a")} <br/>
        <span className='bold'>  Longitude: </span>{alert.longitude} <br/>
        <span className='bold'>  Latitude: </span>{alert.latitude} <br/>
        <span className='bold'>  Safeword: </span>{alert.safeword} <br/>
        <span className='bold'>  Emergency: </span>
        {
          alert.alert_active 
            ? <span className='redAlert'>"Emergency"</span> 
            : <span className='greenAlert'>"Safe"</span>
        }
      </p>
    ));

    return (
      <div>
        <img id="Landing-Logo" src={Logo} alt="Live Alert Logo" className="logo" />

        <button 
          className={`alertButton ${buttonState}`} 
          onClick={this.sendAlert}>
            Send Alert!
          </button>

        <div className='alertsHome'>
          <h2>Alerts From Friends</h2>
          {error && <div className="error">Error: {error.message || error.toString()}</div>}
          <div className='userAlerts'>{alertElements}</div>
        </div>
      </div >
    )
  }
}
