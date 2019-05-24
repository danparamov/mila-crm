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
import ProfileDesktop from './ProfileDesktop';

class EditOppPage extends Component {
  state = {
    id: '',
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
    priority: '',
    created_at: '',
    //contacts: [],
    opps: [],
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
    getFile('opps.json', options).then(file => {
      const opps = JSON.parse(file || '[]');
      const opp = findObjectBy(opps, {
        id: this.props.location.search.substring(4),
      });
      if (!opp) {
        this.props.history.push('/opportunities');
      }
      this.setState({
        opps,
        id: opp[0].id,
        oppname: opp[0].oppname,
        accountname: opp[0].accountname,
        nextstep: opp[0].nextstep,
        type: opp[0].type,
        leadsource: opp[0].leadsource,
        amount: opp[0].amount,
        closingdate: opp[0].closingdate,
        salesstage: opp[0].salesstage,
        blockstackId: opp[0].blockstackId,
        probability: opp[0].probability,
        description: opp[0].description,
        created_at: opp[0].created_at,
        priority: opp[0].priority,
      });
    });
  }

  handleEditContactSubmit(event) {
    event.preventDefault();
    this.saveEditedContact();
  }

  saveEditedContact() {
    let { opps } = this.state;
    const newContact = {
      id: this.state.id,
      oppname: this.state.oppname,
      accountname: this.state.accountname,
      nextstep: this.state.nextstep,
      type: this.state.type,
      leadsource: this.state.leadsource,
      amount: this.state.amount,
      closingdate: this.state.closingdate,
      salesstage: this.state.salesstage,
      blockstackId: this.state.blockstackId,
      probability: this.state.probability,
      description: this.state.description,
      priority: this.state.priority,
      created_at: this.state.created_at,
    };
    // delete the contact with the same ID as the edited one
    opps = opps.filter(opp => opp.id !== newContact.id);
    // add the edited contact to all contacts
    opps.unshift(newContact);
    const options = { encrypt: true };
    putFile('opps.json', JSON.stringify(opps), options).then(() => {});
    this.setState({
      saved: true,
    });
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    const { opp } = this.state;
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { username } = this.state;
    const loading = false;
    const error = false;
    if (this.state.saved) {
      //return <Redirect to={`/opp?id=${this.state.id}`} />;
      return <Redirect to={`/opportunities`} />;
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
          <h1>Edit Opportunity</h1>
          <div className="w-70-l fl">
            <Form
              onSubmit={async e => {
                e.preventDefault();
                this.handleEditContactSubmit(e);
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
                  <input
                    type="text"
                    id="accountname"
                    name="accountname"
                    placeholder="Account Name.."
                    value={this.state.accountname}
                    onChange={this.handleChange}
                  />
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
                  <select
                    type="text"
                    id="type"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                  >
                    <option value="Existing Business">Existing Business</option>
                    <option value="New Business">New Business</option>
                    <option value="None">-None-</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label>
                  Lead Source
                  <select
                    type="text"
                    id="leadsource"
                    name="leadsource"
                    value={this.state.leadsource}
                    onChange={this.handleChange}
                  >
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
                <select
                    type="text"
                    id="salesstage"
                    name="salesstage"
                    value={this.state.salesstage}
                    onChange={this.handleChange}
                  >
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

const EditOpp = withRouter(EditOppPage);

export default EditOpp;
