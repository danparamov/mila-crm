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
import ContactBubble from './ContactBubble';
import NoOneLeft from '../assets/no-one-left.png';
import ifAttribute from './util/ifAttribute';
import ProfileDesktop from './ProfileDesktop';

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
    const { username } = this.state;
    const { opptasks } = this.state;
    const { today } = this.state;
    let AddMoreContactsBlock = null;
    let ContactBlock = null;
    const ContactToday = [];
    let NoContactTodayBlock = null;
    /*if (today[0].contactsLeft !== 0) {
      AddMoreContactsBlock = (
        <div className="w-100 w-75-ns fl tc bg-lightest-blue pa3 br1">
          Add <span className="b">{this.state.today[0].contactsLeft}</span> more
          people today to your contacts
        </div>
      );
    }*/
    if (ifAttribute(opptasks[0])) {
        ContactBlock = (
          <div className="w-100 w-200-ns fl ph4 tl">
            {opptasks.map(opptask => (
              <SingleOppTask opptask={opptask} key={opptask.id} />
            ))}
          </div>
        );
        /*contacts.map(contact => {
          if (
            contact.contactDate === moment().format('l') ||
            moment().isAfter(moment(contact.contactDate, 'MM/DD/YYYY'))
          ) {
            ContactToday.push(contact);
          }
        });*/
      } else {
        ContactBlock = null;
      }
    /*if (ContactToday.length == 0 || ContactToday == null) {
      NoContactTodayBlock = (
        <div className="w-100">
          <img src={NoOneLeft} className="center h4 db" alt="" />
          <p className="center center tc b f4">No pending</p>
        </div>
      );
    }*/
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
            Opportunity -- Subject -- Due Date -- Status -- Description -- Rank
            <br /> <br /> 
          </div>
          {ContactBlock}
        </div>
      </div>
    ) : null;
  }
}
