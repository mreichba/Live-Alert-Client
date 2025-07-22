import React from 'react';
import './MyAlerts.css';
import AuthHelper from '../../services/auth-api-service';
import Logo from '../../Images/signal-tower-large.png'
const moment = require('moment');

export default class MyAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      myAlerts: [],
    };
  }

  // gets current users alerts on mount
  componentDidMount() {
    this.getAlerts();
  }

  // gets current users alerts and sets state with them
  getAlerts = () => {
    AuthHelper.getMyAlerts()
      .then(res => res.json())
      .then(myAlerts => this.setState({ myAlerts }))
      .catch((error) => this.setState({ error }))
  }

  // navigates back to user home
  onGoBack = () => {
    const { history } = this.props;
    history.push('/users/home')
  }

  // PATCH request to /alerts/:alert_id that marks current user as 'safe'
  markSafe = (id) => {
    AuthHelper.editAlert(false, id)
      .then(this.getAlerts);
  }

  // renders all alerts belonging to the current user
  render() {
    const { myAlerts, error } = this.state;

    const alertElements = myAlerts.map((myAlert, idx) => (
      <p key={idx}>
        <span className='bold'>  Alert Time: </span>{moment(myAlert.alert_time).format("dddd, MMMM Do YYYY, h:mm:ss a")}<br />
        <span className='bold'>  Longitude: </span>{myAlert.longitude}<br />
        <span className='bold'>  Latitude: </span>{myAlert.latitude}<br />
        <span className='bold'>  Emergency: </span>{
          myAlert.alert_active 
            ? <span className='redAlert'>"Emergency"</span> 
            : <span className='greenAlert'>"Safe"</span>
        }
        <br />
        <button className='isSafe' onClick={() => this.markSafe(myAlert.id)} >
          Mark Safe
        </button>
      </p>
    ));

    return (
      <div>
        <img id="Landing-Logo" src={Logo} alt="Live Alert Logo" className="logo" />
        <h2>My Alerts</h2>

        {error && <div className="error">Error: {error.message || error.toString()}</div>}

        <div className='myAlerts'>{alertElements}</div>

        <button onClick={this.onGoBack}>Go Back</button>
      </div >
    )
  }
}
