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
import ProfileDesktop from './ProfileDesktop';
import Nav from './Nav';
import Form from './styles/Form';
import Error from './ErrorMessage';

class EditAccountPage extends Component {
  state = {
    id: '',
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
    contactDate: '',
    created_at: '',
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
        this.props.history.push('/accounts');
      }
      this.setState({
        accounts,
        //accountname: account[0].name,
        accountname: account[0].accountname,
        id: account[0].id,
        //lastname: account[0].lastname,
        website: account[0].website,
        industry: account[0].industry,
        salesstage: account[0].salesstage,
        description: account[0].description,
        country: account[0].country,
        region: account[0].region,
        email: account[0].email,
        phoneNumber: account[0].phoneNumber,
        twitterHandle: account[0].twitterHandle,
        //birthDate: account[0].birthDate,
        //sex: account[0].sex,
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
      //name: this.state.name,
      //lastName: this.state.lastName,
      accountname: this.state.accountname,
      website:this.state.website,
      industry: this.state.industry,
      salesstage: this.state.salesstage,
      description: this.state.description,
      country: this.state.country,
      region: this.state.region,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      twitterHandle: this.state.twitterHandle,
      //birthDate: this.state.birthDate,
      //sex: this.state.sex,
     
      blockstackId: this.state.blockstackId,
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
    const { username } = this.state;
    const loading = false;
    const error = false;
    if (this.state.saved) {
      //return <Redirect to={`/account?id=${this.state.id}`} />;
      return <Redirect to={`/accounts`} />;
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
          <h1>Edit Account</h1>
          <div className="w-70-l fl">
            <Form
              onSubmit={async e => {
                e.preventDefault();
                this.handleEditContactSubmit(e);
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
                  <select
                    type="text"
                    id="industry"
                    name="industry"
                    value={this.state.industry}
                    onChange={this.handleChange}
                  >
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
                  <select
                    type="text"
                    id="salesstage"
                    name="salesstage"
                    value={this.state.salesstage}
                    onChange={this.handleChange}
                  >
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
                  <option value="A">Every two weeks</option>
                  <option value="B">Every month</option>
                  <option value="C">Every three months</option>
                  <option value="D">Every year</option>
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

const EditAccount = withRouter(EditAccountPage);

export default EditAccount;
