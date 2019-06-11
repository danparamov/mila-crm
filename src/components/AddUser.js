import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {
  isSignInPending,
  putFile,
  getFile,
  Person,
  loadUserData,
} from 'blockstack';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import ProfileDesktop from './ProfileDesktop';
import Nav from './Nav';
import Form from './styles/Form';
import Error from './ErrorMessage';
import nextContactDate from './util/nextContactDate';

export default class AddUser extends Component {
  state = {
    name: '',
    country: '',
    language: '',
    twitterHandle: '',
    users: [],
    person: {
      name() {
        return 'Anonymous';
      },
      avatarUrl() {
        return avatarFallbackImage;
      },
    },
    username: '',
  };

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
    });
    this.fetchData();
  }

  fetchData() {
    const options = { decrypt: true };
   // getFile('contacts.json', options).then(file => {
    getFile('users.json', options).then(file => {
      //const contacts = JSON.parse(file || '[]');
      const users = JSON.parse(file || '[]');
      this.setState({
        //contacts
        users,
      });
    });
    getFile('today.json', options).then(file => {
      let today = JSON.parse(file || '[]');
      if (today[0].date !== moment().format('L')) {
        today = [{ date: moment().format('L'), contactsLeft: 3 }];
        const otherOption = { encrypt: true };
        putFile('today.json', JSON.stringify(today), otherOption).then();
      }
      this.setState({
        today,
      });
    });
  }

  handleNewContactSubmit(event) {
    event.preventDefault();
    this.saveNewContact(() => {
      this.setState({ saved: true });
    });
    const today = [
      {
        date: this.state.today[0].date,
        contactsLeft: this.state.today[0].contactsLeft - 1,
      },
    ];
    const options = { encrypt: true };
    putFile('today.json', JSON.stringify(today), options).then();
  }

  saveNewContact(cb) {
    //const { contacts } = this.state;
    const { users } = this.state;
    const contactDate = nextContactDate(this.state.priority);
    //const newContact = {
    const newUser = {
      id: Date.now(),
      created_at: Date.now(),
      name: this.state.name,
      country: this.state.country,
      language: this.state.language,
      twitterHandle: this.state.twitterHandle,
      contactDate,
    };

    //contacts.unshift(newContact);
    users.unshift(newUser);
    const options = { encrypt: true };
    //putFile('contacts.json', JSON.stringify(contacts), options).then(() => {
     // cb();
    putFile('users.json', JSON.stringify(users), options).then(() => {
      cb();
    });
    this.setState({
      name: '',
      country: '',
      language: '',
      twitterHandle: '',
    });
  }

  selectCountry(val) {
    this.setState({ country: val, region: '' });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const loading = false;
    const error = false;
    const { username } = this.state;
    const { users } = this.state;
    if (this.state.saved) {
      return <Redirect to="/settings" />;
    }

    return !isSignInPending() ? (
      <div>
        <Nav
          profileImage={
            person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
          }
          logout={handleSignOut.bind(this)}
        />
        <div className="mw9 center ph3 cf">
          <h1 className="f2">Add User</h1>
          <div className="w-70-l fl">
            <Form
              onSubmit={async e => {
                e.preventDefault();
                this.handleNewContactSubmit(e);
              }}
            >
              <Error error={error} />
              <fieldset>
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="User Name.."
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </fieldset>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="twitterHandle">
                  Twitter 
                  <input
                    type="text"
                    id="twitterHandle"
                    name="twitterHandle"
                    placeholder=""
                    value={this.state.twitterHandle}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="country">
                  Country
                  <CountryDropdown
                    name="country"
                    id="country"
                    value={this.state.country}
                    onChange={val => this.selectCountry(val)}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label>
                 Language
                  <select onChange={this.handleChange} id="language" name="language">
                    <option value="" defaultChecked>
                      Language..
                    </option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </label>
              </fieldset>
              <button type="submit" className="bg-black">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>
    ) : null;
  }
}
