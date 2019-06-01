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

class EditOppTaskPage extends Component {
  state = {
    id: '',
    contactname: '',
    subject: '',
    duedate: '',
    rank: '',
    status: '',
    description: '',
    opptasks: [],
    contactDate: '',
    created_at: '',
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
    getFile('opptasks.json', options).then(file => {
      const opptasks = JSON.parse(file || '[]');
      const opptask = findObjectBy(opptasks, {
        id: this.props.location.search.substring(4),
      });
      if (!opptask) {
        this.props.history.push('/opptasks');
      }
      this.setState({
        opptasks,
        id: opptask[0].id,
        contactname: opptask[0].contactname,
        subject: opptask[0].subject,
        duedate: opptask[0].duedate,
        rank: opptask[0].rank,
        status: opptask[0].status,
        description: opptask[0].description,
        contactDate: opptask[0].contactDate,
        created_at: opptask[0].created_at,
        priority: opptask[0].priority,
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
  }

  deleteContact() {
    const toDelete = this.state.id;
    const newContactsList = this.state.opptasks.filter(
        opptask => opptask.id !== toDelete
    );
    const options = { encrypt: true };
    putFile('opptasks.json', JSON.stringify(newContactsList), options).then(
      () => {
        this.props.history.push('/opptasks');
      }
    );
  }

  handleEditContactSubmit(event) {
    event.preventDefault();
    this.saveEditedContact();
  }

  saveEditedContact() {
    let { opptasks } = this.state;
    const newContact = {
      id: this.state.id,
      contactname: this.state.contactname,
      subject: this.state.subject,
      duedate: this.state.duedate,
      rank: this.state.rank,
      status: this.state.status,
      description: this.state.description,
      priority: this.state.priority,
      contactDate: this.state.contactDate,
      created_at: this.state.created_at,
    };
    // delete the contact with the same ID as the edited one
    opptasks = opptasks.filter(opptask => opptask.id !== newContact.id);
    // add the edited contact to all contacts
    opptasks.unshift(newContact);
    const options = { encrypt: true };
    putFile('opptasks.json', JSON.stringify(opptasks), options).then(() => {});
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
    const { opptask } = this.state;
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { username } = this.state;
    const {oppsnames} = this.state;
    const loading = false;
    const error = false;
    if (this.state.saved) {
      //return <Redirect to={`/contact?id=${this.state.id}`} />;
      return <Redirect to={`/opptasks`} />;
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
          <h1>Edit Opportunity Task</h1>
          <div className="w-70-l fl">
            <Form
              onSubmit={async e => {
                e.preventDefault();
                this.handleEditContactSubmit(e);
              }}
            >
              <Error error={error} />
              <fieldset>
                <label htmlFor="contactname">
                  Opportunity Name
                  <select onChange={this.handleChange} id="contactname" name="contactname">
                  <option value="">
                    {this.state.contactname}
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
                  Contact Frequency
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
              <a
                className="pointer link dim ba bw1 ph2 pv2 mb2 dib no-underline ba b--white white mr2 bg-black"
                onClick={() => {
                  this.deleteContact();
                }}
              >
                Delete
              </a>
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

const EditoppTask = withRouter(EditOppTaskPage);

export default EditoppTask;
