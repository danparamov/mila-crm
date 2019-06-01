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
import Nav from './Nav';
import Form from './styles/Form';
import Error from './ErrorMessage';
import ProfileDesktop from './ProfileDesktop';
import nextContactDate from './util/nextContactDate';

export default class AddContact extends Component {
  state = {
    name: '',
    twitterHandle: '',
    accountname: '',
    title: '',
    email: '',
    phoneNumber: '',
    bestcomm: '',
    birthDate: '',
    country: '',
    telegramId:'',
    streetAddress: '',
    mediumId:'',
    reachout:'',
    region: '',
    contacts: [],
    leadsource: '',
    blockstackId: '',
    description: '',
    priority: 'A',
    accounts: [],
    accountsnames: [],
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
      person: new Person(loadUserData().profile)  ,
    });
    this.fetchData();
  }

  fetchData() {
    const options = { decrypt: true };
    getFile('contacts.json', options).then(file => {
      const contacts = JSON.parse(file || '[]');
      this.setState({
        contacts,
      });
    });
    getFile('accounts.json', options).then(file => {
      const accounts = JSON.parse(file || '[]');
      const accountsnames = accounts.map((account) => account.accountname);
      this.setState({
        accounts,
        accountsnames,
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
    const { contacts } = this.state;
    const contactDate = nextContactDate(this.state.priority);
    const newContact = {
      id: Date.now(),
      created_at: Date.now(),
      name: this.state.name,
      accountname: this.state.accountname,
      title: this.state.title,
      medium: this.state.medium,
      twitterHandle: this.state.twitterHandle,
      email: this.state.email,
      bestcomm: this.state.bestcomm,
      reachout: this.state.reachout,
      telegramId: this.state.telegramId,
      phoneNumber: this.state.phoneNumber,
      country: this.state.country,
      region: this.state.region,
      streetAddress: this.state.streetAddress,
      leadsource: this.state.leadsource,
      description: this.state.description,
      blockstackId: this.state.blockstackId,
      birthDate: this.state.birthDate,
      priority: this.state.priority,
      contactDate,
    };

    contacts.unshift(newContact);
    const options = { encrypt: true };
    putFile('contacts.json', JSON.stringify(contacts), options).then(() => {
      cb();
    });
    this.setState({
      country: '',
      region: '',
      firstname: '',
      lastName: '',
      accountname: '',
      title: '',
      bestcomm: '',
      mediumId: '',
      reachout: '',
      twitterHandle: '',
      telegramId: '',
      streetAddress: '',
      email: '',
      phoneNumber: '',
      description: '',
      birthDate: '',
      leadsource: '',
      blockstackId: '',
      priority: '',
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
    const { username } = this.state;
    const loading = false;
    const error = false;
    const {accountsnames} = this.state;

    if (this.state.saved) {
      return <Redirect to="/contacts" />;
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
          <h1 className="f1">Add Contact</h1>
          <div className="w-70-l fl">
            <Form
              onSubmit={async e => {
                e.preventDefault();
                this.handleNewContactSubmit(e);
              }}
            >
              <Error error={error} />
              <h3 className="">Contact Information</h3>
              <fieldset>
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=""
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="accountname">
                  Account Name
                  <select onChange={this.handleChange} id="accountname" name="accountname" required>
                  <option value="" defaultChecked>
                      Select Account..
                  </option>
                   {
                    accountsnames.map(function(X) {
                    return <option>{X}</option>;
                    })
                   }  
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder=""
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label>
                  Lead Source
                  <select onChange={this.handleChange} id="leadsource" name="leadsource">
                    <option value="" defaultChecked>
                      Select
                    </option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Employee Referral">Employee Referral</option>
                    <option value="External Referral">External Referral</option>
                    <option value="Partner">Cold Call</option>
                    <option value="Public Relations">Public Relations</option>
                    <option value="Trade Show">Trade Show</option>
                    <option value="Internal Seminar">Internal Seminar</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=""
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="phoneNumber">
                  Phone Number
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder=""
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label>
                  Best Way for Communication
                  <select onChange={this.handleChange} id="bestcomm" name="bestcomm">
                    <option value="" defaultChecked>
                      Select
                    </option>
                    <option value="WhastApp">WhatsApp</option>
                    <option value="WeChat">WeChat</option>
                    <option value="Skype">Skype</option>
                    <option value="Call">Call</option>
                    <option value="Email">Email</option>
                    <option value="Text">Text</option>
                    <option value="Telegram">Telegram</option>
                    <option value="Twitter">Twitter</option>
                  </select>
                </label>
              </fieldset>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="birthDate">
                  Date of Birth
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    placeholder="Click to select Birthday.."
                    value={this.state.birthDate}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="reachout">
                  Reach Out Again By
                  <input
                    type="date"
                    id="reachout"
                    name="reachout"
                    placeholder=""
                    value={this.state.reachout}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <h3 className="">Social</h3>
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
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="blockstackId">
                  Blockstack Id
                  <input
                    type="text"
                    id="blockstackId"
                    name="blockstackId"
                    placeholder=""
                    value={this.state.blockstackId}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="telegram">
                  Telegram ID
                  <input
                    type="text"
                    id="telegramId"
                    name="telegramId"
                    placeholder=""
                    value={this.state.telegramId}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="mediumId">
                  Medium ID
                  <input
                    type="text"
                    id="mediumId"
                    name="mediumId"
                    placeholder=""
                    value={this.state.mediumId}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <h3 className="">Address Information</h3>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="streetAddress">
                  Street Address
                  <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    placeholder=""
                    value={this.state.streetAddress}
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
                <label htmlFor="region">
                  Region
                  <RegionDropdown
                    name="region"
                    id="region"
                    country={this.state.country}
                    value={this.state.region}
                    onChange={val => this.selectRegion(val)}
                  />
                </label>
              </fieldset>
              <h3 className="">Description</h3>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="description">
                  Description
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder=""
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
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
