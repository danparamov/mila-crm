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
import ProfileDesktop from './ProfileDesktop';
import SingleAccount1 from './SingleAccount1';

export default class AddOpp extends Component {
  state = {
    oppname: '',
    accountname: '',
    nextstep: '',
    type: '',
    leadsource: '',
    amount: '',
    closingdate: '',
    salesstage: '',
    probability: '',
    description: '',
    blockstackId: '',
    opps: [],
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
    getFile('opps.json', options).then(file => {
      const opps = JSON.parse(file || '[]');
      this.setState({
        opps,
      });
    });
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
    const { opps } = this.state;
    const contactDate = nextContactDate(this.state.priority);
    const newOpp = {
      id: Date.now(),
      created_at: Date.now(),
      oppname: this.state.oppname,
      accountname: this.state.accountname,
      nextstep: this.state.nextstep,
      type: this.state.type,
      leadsource: this.state.leadsource,
      amount: this.state.amount,
      closingdate: this.state.closingdate,
      salesstage: this.state.salesstage,
      probability: this.state.probability,
      description: this.state.description,
      blockstackId: this.state.blockstackId,
      contactDate,
    };

    opps.unshift(newOpp);
    const options = { encrypt: true };
    putFile('opps.json', JSON.stringify(opps), options).then(() => {
      cb();
    });
    this.setState({
      oppname: '',
      accountname: '',
      nextstep: '',
      type: '',
      leadsource: '',
      amount: '',
      closingdate: '',
      salesstage: '',
      probability: '',
      description: '',
      blockstackId: '',
    });
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
    const { accounts } = this.state;
    let ContactBlock = null;
    if (this.state.saved) {
      return <Redirect to="/opportunities" />;
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
          <h1 className="f1">Add Opportunity</h1>
          <div className="w-70-l fl">
            <Form
              onSubmit={async e => {
                e.preventDefault();
                this.handleNewContactSubmit(e);
              }}
            >
              <Error error={error} />
              <fieldset>
                <label htmlFor="oppname">
                  Opportunity Name
                  <input
                    type="text"
                    id="oppname"
                    name="oppname"
                    placeholder="Opportunity Name.."
                    value={this.state.oppname}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="accountname">
                  Account Name
                  <select onChange={this.handleChange} id="accountname" name="accountname">
                    <option value="" defaultChecked>
                      Select Account..
                    </option>
                    <option value="None">None</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="nextstep">
                  Next Step
                  <input
                    type="text"
                    id="nextstep"
                    name="nextstep"
                    placeholder="Next Step.."
                    value={this.state.nextstep}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label>
                  Type
                  <select onChange={this.handleChange} id="type" name="type">
                    <option value="" defaultChecked>
                      Select Type..
                    </option>
                    <option value="Existing Business">Existing Business</option>
                    <option value="New Business">New Business</option>
                    <option value="None">-None-</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label>
                  Lead Source
                  <select onChange={this.handleChange} id="leadsource" name="leadsource">
                    <option value="" defaultChecked>
                      Lead Source..
                    </option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Employee Referral">Employee Referral</option>
                    <option value="Online Store">Online Store</option>
                    <option value="Partner">Partner</option>
                    <option value="Public Relations">Public Relations</option>
                    <option value="Trade Show">Trade Show</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="amount">
                  Amount
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    placeholder="$10,000.."
                    value={this.state.amount}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="closingdate">
                  Closing Date
                  <input
                    type="date"
                    id="closingdate"
                    name="closingdate"
                    placeholder="MM/DD/YYY"
                    value={this.state.closingdate}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
              <label>
                Sales Stage
                <select onChange={this.handleChange} id="salesstage" name="salesstage">
                  <option value="" defaultChecked>
                    Sales Stage..
                  </option>
                  <option value="Qualified">Qualified</option>
                  <option value="Needs Analysis">Needs Analysis</option>
                  <option value="Value Proposition">alue Proposition</option>
                  <option value="Identify Decision Makers">Identify Decision Makers</option>
                  <option value="Proposal/Price Quote">Proposal/Price Quote</option>
                  <option value="Negotiation Review">Negotiation Review</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                  <option value="Closed Lost to Competition">Closed Lost to Competition</option>
                </select>
              </label>
              </fieldset>
              <fieldset>
                <label htmlFor="probability">
                  Probability
                  <input
                    type="text"
                    id="probability"
                    name="probability"
                    placeholder="Probability.."
                    value={this.state.probability}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="description">
                  Description
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Description.."
                    value={this.state.description}
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
