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

export default class AddOppTask extends Component {
  state = {
    contactname: '',
    subject: '',
    duedate: '',
    rank: '',
    status: '',
    description: '',
    opptasks: [],
    priority: 'A',
    opps: [],
    oppsnames: [],
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
    getFile('opptasks.json', options).then(file => {
      const opptasks = JSON.parse(file || '[]');
      this.setState({
        opptasks,
      });
    });
    getFile('opps.json', options).then(file => {
      const opps = JSON.parse(file || '[]');
      const oppsnames = opps.map((opp) => opp.oppname);
      this.setState({
        opps,
        oppsnames,
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
    const { opptasks } = this.state;
    const contactDate = nextContactDate(this.state.priority);
    const newContact = {
      id: Date.now(),
      created_at: Date.now(),
      contactname: this.state.contactname,
      subject: this.state.subject,
      duedate: this.state.duedate,
      rank: this.state.rank,
      status: this.state.status,
      description: this.state.description,
      contactDate,
    };

    opptasks.unshift(newContact);
    const options = { encrypt: true };
    putFile('opptasks.json', JSON.stringify(opptasks), options).then(() => {
      cb();
    });
    this.setState({
      contactname: '',
      subject: '',
      duedate: '',
      rank: '',
      status: '',
      description: '',
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
    const {oppsnames} = this.state;
    const loading = false;
    const error = false;
    if (this.state.saved) {
      return <Redirect to="/opptasks" />;
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
          <h1 className="f1">Add Opportunity Task</h1>
          <div className="w-70-l fl">
            <Form
              onSubmit={async e => {
                e.preventDefault();
                this.handleNewContactSubmit(e);
              }}
            >
              <Error error={error} />
              <fieldset>
                <label htmlFor="contactname">
                  Opportunity Name
                  <select onChange={this.handleChange} id="contactname" name="contactname" required>
                  <option value="" defaultChecked>
                    Select Opportunity..
                  </option>
                   {
                    oppsnames.map(function(X) {
                    return <option>{X}</option>;
                    })
                   }  
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="subject">
                  Subject
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject.."
                    value={this.state.subject}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="duedate">
                  Due Date
                  <input
                    type="date"
                    id="duedate"
                    name="duedate"
                    placeholder="Click to select Due Date.."
                    value={this.state.duedate}
                    onChange={this.handleChange}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="rank">
                  Priority
                  <select
                    type="text"
                    id="rank"
                    name="rank"
                    value={this.state.rank}
                    onChange={this.handleChange}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="status"> 
                  Status
                  <select
                    type="text"
                    id="status"
                    name="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                  >
                    <option value="Deferred">Deferred</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Completed">Completed</option>
                    <option value="Waiting">Waiting</option>
                  </select>
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
