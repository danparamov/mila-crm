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
import SingleOppTask from './SingleOppTask';
import ifAttribute from './util/ifAttribute';

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
    opptasks: [],
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
    getFile('opptasks.json', options).then(file => {
      const opptasks = JSON.parse(file || '[]');
      this.setState({
        opptasks,
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
    const { opptasks } = this.state;
    let OppTaskBlock = null;

    if (ifAttribute(opptasks[0])) {
      OppTaskBlock = (
          <div className="w-100 w-200-ns fl ph4 tl">
            {opptasks.map(opptask => (
              <SingleOppTask opptask={opptask} key={opptask.id} />
            ))}
          </div>
        );
    } else {
      OppTaskBlock = null;
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
            <h1> Opportunity Tasks 
            <Link
              to="/add-opptask"
              className="f2 link dim ph3 pv2 mb2 dib white bg-green b--black"
            >
             +
            </Link> </h1>
            <br /> <br /> 
          </div>
          {OppTaskBlock}
        </div>
      </div>
    ) : null;
  }
}
