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

  componentDidMount() {
    this.getAlerts();
  }

  getAlerts = () => {
    AuthHelper.getMyAlerts()
      .then(res => res.json())
      .then(myAlerts => this.setState({ myAlerts }))
      .catch((error) => {
        this.setState({ error })
      })
  }

  onGoBack = () => {
    const { history } = this.props;
    history.push('/users/home')
  }

  markSafe = (id) => {
    AuthHelper.editAlert(false, id)
      .then(this.getAlerts)
  }

  render() {
    const myAlerts = this.state.myAlerts.map((myAlert, idx) => (
      <p key={idx}>
        <span className='bold'>  Alert Time: </span>{moment(myAlert.alert_time).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        <span className='bold'>  Longitude: </span>{myAlert.longitude}
        <span className='bold'>  Latitude: </span>{myAlert.latitude}
        <span className='bold'>  Emergency: </span>{myAlert.alert_active ? <span className='redAlert'>"Emergency"</span> : <span className='greenAlert'>"Safe"</span>}
        <button className='isSafe' onClick={() => this.markSafe(myAlert.id)} >Mark Safe</button>
      </p>
    ))
    return (
      <div>
        <img id="Landing-Logo" src={Logo} alt="Live Alert Logo" className="logo" />
        <h2>My Alerts</h2>
        <div className='myAlerts'>{myAlerts}</div>
        <button onClick={this.onGoBack}>Go Back</button>
      </div >
    )
  }
}
