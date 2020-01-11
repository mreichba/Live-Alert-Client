import React from 'react';
import AuthHelper from '../../services/auth-api-service';
import './Contacts.css'
import Logo from '../../Images/signal-tower-large.png'

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      contacts: [],
    };
  }
  //gets contacts on mount
  componentDidMount() {
    this.getContacts();
  }
  //gets contacts and sets the state with them
  getContacts = () => {
    AuthHelper.getMyContacts()
      .then(res => res.json())
      .then(contacts => this.setState({ contacts }))
      .catch((error) => {
        this.setState({ error })
      })
  }

  onCancel = () => {
    const { history } = this.props;
    history.push('/users/home')
  }
  //adds contact with email
  addContact = (event) => {
    event.preventDefault();
    const { email } = event.target;
    this.setState({ error: null })
    //sends post request to contacts
    AuthHelper.addContact(email.value)
      .then(res => res.json())
      .then((res) => {
        if (res.error) {
          this.setState({ error: res.error.message })
        } else {
          email.value = '';
        }
      })
      .then(() => {
        this.getContacts();
      })
  }
  //renders contacts nick_name and email and returns them on the contacts page
  render() {
    const contacts = this.state.contacts.map((contact, idx) => (
      <li className='contact' key={idx}>
        <span className='bold'>  User: </span>{contact.nick_name}
        <span className='bold'>  Email: </span>{contact.email}
      </li>
    ))
    return (
      <div>
        <img id="Landing-Logo" src={Logo} alt="Live Alert Logo" className="logo" />
        <div>
          <h2>Contacts</h2>
          <ul className='contacts'>{contacts}</ul>
        </div>
        <h2>Add Contact</h2>
        <form onSubmit={this.addContact}>
          <label htmlFor="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" id="email" name="email" required />

          <div className='error'>{this.state.error || ''}</div>
          <button type="submit" className="login button">Add Contact</button>
          <button type="click" className="cancel button" onClick={this.onCancel}>Cancel</button>
        </form>
      </div>

    )
  }
}