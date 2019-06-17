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
import 'react-toastify/dist/ReactToastify.min.css';
import findObjectBy from './util/findObjectBy';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import Nav from './Nav';
import Form from './styles/Form';
import Error from './ErrorMessage';

class EditContactPage extends Component {
  state = {
    id: '',
    name: '',
    lastName: '',
    accountname: '',
    twitterHandle: '',
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
    sex: '',
    blockstackId: '',
    description: '',
    priority: 'A',
    contactDate: '',
    created_at: '',
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
    getFile('contacts.json', options).then(file => {
      const contacts = JSON.parse(file || '[]');
      const contact = findObjectBy(contacts, {
        id: this.props.location.search.substring(4),
      });
      if (!contact) {
        this.props.history.push('/');
      }
      this.setState({
        contacts,
        id: contact[0].id,
        name: contact[0].name,
        accountname: contact[0].accountname,
        title: contact[0].title,
        medium: contact[0].medium,
        twitterHandle: contact[0].twitterHandle,
        email: contact[0].email,
        bestcomm: contact[0].bestcomm,
        reachout: contact[0].reachout,
        telegramId: contact[0].telegramId,
        phoneNumber: contact[0].phoneNumber,
        birthDate: contact[0].birthDate,
        country: contact[0].country,
        region: contact[0].region,
        streetAddress: contact[0].streetAddress,
        leadsource: contact[0].leadsource,
        description: contact[0].description,
        blockstackId: contact[0].blockstackId,
        contactDate: contact[0].contactDate,
        created_at: contact[0].created_at,
        priority: contact[0].priority,
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
  }

  handleEditContactSubmit(event) {
    event.preventDefault();
    this.saveEditedContact();
  }

  saveEditedContact() {
    let { contacts } = this.state;
    const newContact = {
      id: this.state.id,
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
      contactDate: this.state.contactDate,
      created_at: this.state.created_at,
    };
    // delete the contact with the same ID as the edited one
    contacts = contacts.filter(contact => contact.id !== newContact.id);
    // add the edited contact to all contacts
    contacts.unshift(newContact);
    const options = { encrypt: true };
    putFile('contacts.json', JSON.stringify(contacts), options).then(() => {});
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
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const {accountsnames} = this.state;
    const loading = false;
    const error = false;
    
    if (this.state.saved) {
      //return <Redirect to={`/contact?id=${this.state.id}`} />;
      return <Redirect to={`/contacts`} />;
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
          <h1>Edit Contact</h1>
          <div className="w-70-l fl">
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
                <label htmlFor="accountname">
                  Account Name
                  <select onChange={this.handleChange} id="accountname" name="accountname">
                  <option value="">
                    {this.state.accountname}
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
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="twitterHandle">
                  Twitter 
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
              <h3 className="">Description Information</h3>
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

const EditContact = withRouter(EditContactPage);

export default EditContact;
