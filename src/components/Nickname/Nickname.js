import React from 'react';
import { Link } from 'react-router-dom';
import TokenServices from '../../services/token-services';
import AuthHelper from '../../services/auth-api-service';

export default class Nickname extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      nick_name: '',
    };
  }
  //GET request to /users/home and sets state with user nick_name on mount
  componentDidMount() {
    if (TokenServices.hasAuthToken()) {
      AuthHelper.getMyNickname()
        .then(res => res.json())
        .then(res => this.setState({ nick_name: res.nick_name }))
    }
  }

  //shows signed in user as a link to home page
  render() {
    return (
      <div className='userNickname'>
        <Link to='/users/home' className='user'>
          <span className='nickname'>{this.state.nick_name}'s profile</span>
        </Link>
      </div>

    )

  }
}