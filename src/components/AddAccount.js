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
import nextContactDate from './util/nextContactDate';

export default class AddAccount extends Component {
  state = {
    accountname: '',
    website: '',
    industry: '',
    salesstage: '',
    description: '',
    accounttype: '',
    country: '',
    region: '',
    email: '',
    phoneNumber: '',
    annualRevenue: '',
    employees: '',
    twitterHandle: '',
    telegramId: '',
    slack: '',
    addressStreet: '',
    blockstackId: '',
    priority: 'A',
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
    getFile('accounts.json', options).then(file => {
      const accounts = JSON.parse(file || '[]');
      this.setState({
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

  handleNewAccountSubmit(event) {
    event.preventDefault();
    this.saveNewAccount(() => {
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

  saveNewAccount(cb) {
    const { accounts } = this.state;
    const contactDate = nextContactDate(this.state.priority);
    
    const newAccount = {
      id: Date.now(),
      created_at: Date.now(),
      accountname: this.state.accountname,
      website: this.state.website,
      industry: this.state.industry,
      salesstage: this.state.salesstage,
      accounttype: this.state.accounttype,
      slack: this.state.slack,
      description: this.state.description,
      employees: this.state.employees,
      country: this.state.country,
      telegramId: this.state.telegramId,
      addressStreet: this.state.addressStreet,
      region: this.state.region,
      annualRevenue: this.state.annualRevenue,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      twitterHandle: this.state.twitterHandle,
      blockstackId: this.state.blockstackId,
      priority: this.state.priority,
      contactDate,
    };

    accounts.unshift(newAccount);
    const options = { encrypt: true };
    
    putFile('accounts.json', JSON.stringify(accounts), options).then(() => {
      cb();
    });
    this.setState({
      accountname: '',
      website: '',
      industry: '',
      salesstage: '',
      description: '',
      employees: '',
      accounttype: '',
      addressStreet: '',
      slack: '',
      telegramId: '',
      country: '',
      region: '',
      email: '',
      phoneNumber: '',
      annualRevenue: '',
      twitterHandle: '',
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
          <h1 className="f1">Add Account</h1>
          <div className="w-70-l fl">
            <Form
              onSubmit={async e => {
                e.preventDefault();
                this.handleNewAccountSubmit(e);
              }}
            >
              <Error error={error} />
              <h3 className="">Account Information</h3>
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
                  Account Website
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
                      Select
                    </option>
                    <option value="Telecomunications">Telecomunications</option>
                    <option value="Education">Education</option>
                    <option value="Aerospace">Large Enterprise</option>
                    <option value="Government">Government/Military</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label>
                  Rating
                  <select onChange={this.handleChange} id="salesstage" name="salesstage">
                    <option value="" defaultChecked>
                      Select
                    </option>
                    <option value="Acquired">Acquired</option>
                    <option value="Active">Active</option>
                    <option value="Project Cancelled">Project Cancelled</option>
                    <option value="Shut Down">Shut Down</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label>
                  Account Type
                  <select onChange={this.handleChange} id="accounttype" name="accounttype">
                    <option value="" defaultChecked>
                      Select
                    </option>
                    <option value="Analyst">Analyst</option>
                    <option value="Competitor">Competitor</option>
                    <option value="Customer">Customer</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Integrator">Integrator</option>
                    <option value="Investor">Investor</option>
                    <option value="Partner">Partner</option>
                    <option value="Press">Press</option>
                    <option value="Prospects">Prospects</option>
                    <option value="Reseller">Reseller</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Vendor">Vendor</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="employees">
                  Employees
                  <input
                    type="text"
                    id="employees"
                    name="employees"
                    placeholder=""
                    value={this.state.employees}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="annualRevenue">
                  Annual Revenue
                  <input
                    type="text"
                    id="annualRevenue"
                    name="annualRevenue"
                    placeholder="$"
                    value={this.state.annualRevenue}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <h3 className="">Social</h3>
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
                    placeholder=""
                    value={this.state.twitterHandle}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="blockstackId">
                  Blockstack ID
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
                <label htmlFor="telegramId">
                  Telegram ID
                  <input
                    type="text"
                    id="telegramId"
                    name="telegramId"
                    placeholder=""
                    value={this.state.blockstackId}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="Slack">
                  Slack
                  <input
                    type="text"
                    id="slack"
                    name="slack"
                    placeholder=""
                    value={this.state.slack}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <h3 className="">Address Information</h3>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="addressStreet">
                  Address Street
                  <input
                    type="text"
                    id="addressStreet"
                    name="addressStreet"
                    placeholder=""
                    value={this.state.addressStreet}
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
              <h3 className="">Description Information</h3>
              <fieldset>
                <label htmlFor="description">
                  Description
                  <input
                    type="description"
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
