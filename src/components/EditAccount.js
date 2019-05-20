import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {
  isSignInPending,
  putFile,
  getFile,
  loadUserData,
  Person,
} from 'blockstack';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import findObjectBy from './util/findObjectBy';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import Nav from './Nav';
import Form from './styles/Form';
import Error from './ErrorMessage';

class EditAccountPage extends Component {
  state = {
    id: '',
    name: '',
    lastName: '',
    twitterHandle: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    country: '',
    region: '',
    contacts: [],
    sex: '',
    blockstackId: '',
    contactDate: '',
    created_at: '',
    person: {
      name() {
        return 'Anonymous';
      },
      avatarUrl() {
        return avatarFallbackImage;
      },
    },
    username: '',
    saved: false,
  };

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
      username: loadUserData().username,
    });
    this.fetchData();
  }

  fetchData() {
    const options = { decrypt: true };
    getFile('accounts.json', options).then(file => {
      const accounts = JSON.parse(file || '[]');
      const account = findObjectBy(accounts, {
        id: this.props.location.search.substring(4),
      });
      if (!account) {
        this.props.history.push('/');
      }
      this.setState({
        accounts,
        name: account[0].name,
        id: account[0].id,
        lastName: account[0].lastName,
        twitterHandle: account[0].twitterHandle,
        email: account[0].email,
        phoneNumber: account[0].phoneNumber,
        birthDate: account[0].birthDate,
        country: account[0].country,
        region: account[0].region,
        sex: account[0].sex,
        blockstackId: account[0].blockstackId,
        contactDate: account[0].contactDate,
        created_at: account[0].created_at,
        priority: account[0].priority,
      });
    });
  }

  handleEditContactSubmit(event) {
    event.preventDefault();
    this.saveEditedContact();
  }

  saveEditedContact() {
    let { accounts } = this.state;
    const newContact = {
      id: this.state.id,
      name: this.state.name,
      lastName: this.state.lastName,
      twitterHandle: this.state.twitterHandle,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      country: this.state.country,
      region: this.state.region,
      sex: this.state.sex,
      blockstackId: this.state.blockstackId,
      birthDate: this.state.birthDate,
      priority: this.state.priority,
      contactDate: this.state.contactDate,
      created_at: this.state.created_at,
    };
    // delete the contact with the same ID as the edited one
    //contacts = contacts.filter(contact => contact.id !== newContact.id);
    accounts = accounts.filter(account => account.id !== newContact.id);
    // add the edited contact to all contacts
    accounts.unshift(newContact);
    const options = { encrypt: true };
    putFile('accounts.json', JSON.stringify(accounts), options).then(() => {});
    this.setState({
      saved: true,
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
    const { account } = this.state;
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const loading = false;
    const error = false;
    if (this.state.saved) {
      //return <Redirect to={`/account?id=${this.state.id}`} />;
      return <Redirect to={`/accounts1`} />;
    }
    return !isSignInPending() ? (
      <div>
        <Nav
          profileImage={
            person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
          }
          logout={handleSignOut.bind(this)}
        />
        <h1>Edit Contact</h1>
        <Form
          onSubmit={async e => {
            e.preventDefault();
            this.handleEditContactSubmit(e);
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
                placeholder="Name.."
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="lastName">
              Last Name
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name.."
                value={this.state.lastName}
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
                <option value="A">A - Every two weeks</option>
                <option value="B">B - Every month</option>
                <option value="C">C - Every three months</option>
                <option value="D">D - Every year</option>
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
          <fieldset>
            <label>
              Gender
              <select
                onChange={this.handleChange}
                id="sex"
                name="sex"
                value={this.state.sex}
              >
                <option value="" defaultChecked>
                  Select Gender..
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </fieldset>
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="twitterHandle">
              Twitter Handle
              <input
                type="text"
                id="twitterHandle"
                name="twitterHandle"
                placeholder="Twitter handle.. (eg. 0xferruccio)"
                value={this.state.twitterHandle}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="birthDate">
              Birth Date
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
          <button type="submit" className="bg-black">
            Submit
          </button>
        </Form>
      </div>
    ) : null;
  }
}

const EditAccount = withRouter(EditAccountPage);

export default EditAccount;
