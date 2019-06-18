import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
} from 'blockstack';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Nav from './Nav';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import SingleContactTask from './SingleContactTask';
import ifAttribute from './util/ifAttribute';
import AddContactIcon from '@material-ui/icons/personadd';

export default class Profile extends Component {
  state = {
    person: {
      name() {
        return 'Anonymous';
      },
      avatarUrl() {
        return avatarFallbackImage;
      },
    },
    username: '',
    contacttasks: [],
    today: [{ contactsLeft: 0, date: '' }],
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
    getFile('contacttasks.json', options).then(file => {
      const contacttasks = JSON.parse(file || '[]');
      this.setState({
        contacttasks,
      });
    });
    getFile('today.json', options).then(file => {
      let today = JSON.parse(file || '[]');
      if (today.length === 0) {
        today = [{ date: moment().format('L'), contactsLeft: 3 }];
        const otherOption = { encrypt: true };
        putFile('today.json', JSON.stringify(today), otherOption).then();
      }
      if (today[0].date !== moment().format('L')) {
        const otherOption = { encrypt: true };
        today = [{ date: moment().format('L'), contactsLeft: 3 }];
        putFile('today.json', JSON.stringify(today), otherOption).then();
      }
      this.setState({
        today,
      });
    });
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { contacttasks } = this.state;
    let ContactTaskBlock = null;

    if (ifAttribute(contacttasks[0])) {
      ContactTaskBlock = (
          <div className="w-100 w-200-ns fl ph4 tl">
            {contacttasks.map(contacttask => (
              <SingleContactTask contacttask={contacttask} key={contacttask.id} />
            ))}
          </div>
        );
    } else {
      ContactTaskBlock = null;
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
          <div className="w-100 w-75-ns fl ph4 tl">
            <h1> Contact Tasks
            <Link
              to="/add-contacttask"
              className="f2 link dim ph3 pv2 mb2 dib white bg-green b--black"
            >
            <AddContactIcon />
            </Link> </h1>
            <br /> <br />
          </div>
          {ContactTaskBlock}
        </div>
      </div>
    ) : null;
  }
}
