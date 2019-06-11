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

class EditUserPage extends Component {
  state = {
    id: '',
    name: '',
    country: '',
    language:'',
    twitterHandle: '',
    contactDate: '',
    created_at: '',
    users: [],
   
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
    getFile('users.json', options).then(file => {
      const users = JSON.parse(file || '[]');
      const user = findObjectBy(users, {
        id: this.props.location.search.substring(4),
      });
      if (!user) {
        this.props.history.push('/');
      }
      this.setState({
        users,
        id: user[0].id,
        name: user[0].name,
        country: user[0].country,
        language: user[0].language,
        twitterHandle: user[0].twitterHandle,  
        contactDate: user[0].contactDate,
        created_at: user[0].created_at,
      });
    });
  }

  handleEditContactSubmit(event) {
    event.preventDefault();
    this.saveEditedContact();
  }

  saveEditedContact() {
    let { users } = this.state;
    const newContact = {
      id: this.state.id,
      name: this.state.name,
      country: this.state.country,
      language: this.state.language,
      twitterHandle: this.state.twitterHandle,
      contactDate: this.state.contactDate,
      created_at: this.state.created_at,
    };
    // delete the contact with the same ID as the edited one
    users = users.filter(user => user.id !== newContact.id);
    // add the edited contact to all contacts
    users.unshift(newContact);
    const options = { encrypt: true };
    putFile('users.json', JSON.stringify(users), options).then(() => {});
    this.setState({
      saved: true,
    });
  }

  selectCountry(val) {
    this.setState({ country: val, region: '' });
  }


  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    const { user } = this.state;
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { username } = this.state;
    const loading = false;
    const error = false;
    if (this.state.saved) {
      //return <Redirect to={`/contact?id=${this.state.id}`} />;
      return <Redirect to={`/settings`} />;
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
          <h1>Edit User</h1>
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
                <label>
                  Language
                  <select
                    type="text"
                    id="language"
                    name="language"
                    value={this.state.language}
                    onChange={this.handleChange}
                  >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
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

const EditUser = withRouter(EditUserPage);

export default EditUser;
