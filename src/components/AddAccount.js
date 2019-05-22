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

export default class AddAccount extends Component {
  state = {
    //name: '',
    //lastName: '',
    accountname: '',
    website: '',
    industry: '',
    salesstage: '',
    description: '',
    country: '',
    region: '',
    email: '',
    phoneNumber: '',
    twitterHandle: '',
    //birthDate: '',
    //sex: '',
    blockstackId: '',
    priority: 'A',
    //contacts: [],
    accounts: [],
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
    getFile('accounts.json', options).then(file => {
      //const contacts = JSON.parse(file || '[]');
      const accounts = JSON.parse(file || '[]');
      this.setState({
        //contacts
        accounts,
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
    const { accounts } = this.state;
    const contactDate = nextContactDate(this.state.priority);
    //const newContact = {
    const newAccount = {
      id: Date.now(),
      created_at: Date.now(),
      //name: this.state.name,
      //lastName: this.state.lastName,
      accountname: this.state.accountname,
      website: this.state.website,
      industry: this.state.industry,
      salesstage: this.state.salesstage,
      description: this.state.description,
      country: this.state.country,
      region: this.state.region,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      twitterHandle: this.state.twitterHandle,
      //sex: this.state.sex,
      blockstackId: this.state.blockstackId,
      //birthDate: this.state.birthDate,
      priority: this.state.priority,
      contactDate,
    };

    //contacts.unshift(newContact);
    accounts.unshift(newAccount);
    const options = { encrypt: true };
    //putFile('contacts.json', JSON.stringify(contacts), options).then(() => {
     // cb();
    putFile('accounts.json', JSON.stringify(accounts), options).then(() => {
      cb();
    });
    this.setState({
      accountname: '',
      website: '',
      industry: '',
      salesstage: '',
      //name: '',
      //lastName: '',
      description: '',
      country: '',
      region: '',
      email: '',
      phoneNumber: '',
      twitterHandle: '',
      //birthDate: '',
      //sex: '',
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
    const loading = false;
    const error = false;
    const { username } = this.state;
    //const { contacts } = this.state;
    const { accounts } = this.state;
    if (this.state.saved) {
      return <Redirect to="/accounts" />;
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
          <ProfileDesktop
            logout={handleSignOut.bind(this)}
            profileImage={
              person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
            }
            name={person.name() ? person.name() : 'Nameless Person'}
            username={username}
          />
          <h1 className="f2">Add Account</h1>
          <div className="w-70-l fl">
            <Form
              onSubmit={async e => {
                e.preventDefault();
                this.handleNewContactSubmit(e);
              }}
            >
              <Error error={error} />
              <fieldset>
                <label htmlFor="accountname">
                  Account Name
                  <input
                    type="text"
                    id="accountname"
                    name="accountname"
                    placeholder="Account Name.."
                    value={this.state.accountname}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="website">
                  Website
                  <input
                    type="text"
                    id="website"
                    name="website"
                    placeholder="Website.."
                    value={this.state.website}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label>
                  Industry
                  <select onChange={this.handleChange} id="industry" name="industry">
                    <option value="" defaultChecked>
                      Select Industry..
                    </option>
                    <option value="Telecomunications">Telecomunications</option>
                    <option value="Education">Education</option>
                    <option value="Aerospace">Aerospace</option>
                    <option value="Government">Government</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label>
                  Sales Stage
                  <select onChange={this.handleChange} id="salesstage" name="salesstage">
                    <option value="" defaultChecked>
                      Select Stage..
                    </option>
                    <option value="Acquired">Acquired</option>
                    <option value="Active">Active</option>
                    <option value="Project Cancelled">Project Cancelled</option>
                    <option value="Shut Down">Shut Down</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="description">
                  Description
                  <input
                    type="description"
                    id="description"
                    name="description"
                    placeholder="Description.."
                    value={this.state.description}
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
              <fieldset>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email.."
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
                    placeholder="Phone Number.."
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="twitterHandle">
                  Twitter Handle
                  <input
                    type="text"
                    id="twitterHandle"
                    name="twitterHandle"
                    placeholder="Twitter handle.. (eg. danparamov)"
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
                    placeholder="Blockstack ID.."
                    value={this.state.blockstackId}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="priority">
                  Contact Frequency
                  <select
                    type="text"
                    id="priority"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.handleChange}
                  >
                  <option value="Every two weeks">Every two weeks</option>
                  <option value="Every month">Every month</option>
                  <option value="Every three months">Every three months</option>
                  <option value="Every year">Every year</option>
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
