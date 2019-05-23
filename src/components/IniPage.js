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
import SingleContact from './SingleContact';
import SingleAccount from './SingleAccount';
import SingleOpp from './SingleOpp';
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
    contacts: [],
    accounts: [],
    opps: [],
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
    getFile('contacts.json', options).then(file => {
      const contacts = JSON.parse(file || '[]');
      this.setState({
        contacts,
      });
    });
    getFile('accounts.json', options).then(file => {
        const accounts = JSON.parse(file || '[]');
        this.setState({
          accounts,
        });
    });
    getFile('opps.json', options).then(file => {
        const opps = JSON.parse(file || '[]');
        this.setState({
          opps,
        });
    });
    
    /*getFile('today.json', options).then(file => {
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
    });*/
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { username } = this.state;
    const { contacts } = this.state;
    const { accounts } = this.state;
    const { opps } = this.state;
    const { today } = this.state;
    let AddMoreContactsBlock = null;
    let ContactBlock = null;
    let AccountBlock = null;
    let OppBlock = null;
    const ContactToday = [];
    let NoContactTodayBlock = null;
    // Contacts
    /*if (today[0].contactsLeft !== 0) {
      AddMoreContactsBlock = (
        <div className="w-100 w-75-ns fl tc bg-lightest-blue pa3 br1">
          Add <span className="b">{this.state.today[0].contactsLeft}</span> more
          people today to your contacts
        </div>
      );
    }*/
    if (ifAttribute(contacts[0])) {
      ContactBlock = (
        <div className="w-100 w-75-ns fl ph4 tl">
          {contacts.map(contact => (
            <SingleContact contact={contact} key={contact.id} />
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

    // Accounts
    if (ifAttribute(accounts[0])) {
        AccountBlock = (
          <div className="w-100 w-75-ns fl ph4 tl">
            {accounts.map(account => (
              <SingleAccount account={account} key={account.id} />
            ))}
          </div>
        );
        //contacts.map(contact => {
        /*accounts.map(account => {
          if (
            //contact.contactDate === moment().format('l') ||
            account.contactDate === moment().format('l') ||
            //moment().isAfter(moment(contact.contactDate, 'MM/DD/YYYY'))
            moment().isAfter(moment(account.contactDate, 'MM/DD/YYYY'))
          ) {
            //ContactToday.push(contact);
            ContactToday.push(account);
          }
        });*/
    } else {
        AccountBlock = null;
    }
    /*if (ContactToday.length == 0 || ContactToday == null) {
        NoContactTodayBlock = (
          <div className="w-100">
            <img src={NoOneLeft} className="center h4 db" alt="" />
            <p className="center center tc b f4">No pending checkins for today</p>
          </div>
        );
    }*/

    // Opportunities
    if (ifAttribute(opps[0])) {
      OppBlock = (
        <div className="w-100 w-75-ns fl ph4 tl">
          {opps.map(opp => (
            <SingleOpp opp={opp} key={opp.id} />
          ))}
        </div>
      );
      //contacts.map(contact => {
      /*opps.map(opp => {
        if (
          //contact.contactDate === moment().format('l') ||
          opp.contactDate === moment().format('l') ||
          //moment().isAfter(moment(contact.contactDate, 'MM/DD/YYYY'))
          moment().isAfter(moment(opp.contactDate, 'MM/DD/YYYY'))
        ) {
          //ContactToday.push(contact);
          ContactToday.push(opp);
        }
      });*/
    } else {
        OppBlock = null;
    }
    /*if (ContactToday.length == 0 || ContactToday == null) {
      NoContactTodayBlock = (
        <div className="w-100">
          <img src={NoOneLeft} className="center h4 db" alt="" />
          <p className="center center tc b f4">No pending checkins for today</p>
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
          <ProfileDesktop
            logout={handleSignOut.bind(this)}
            profileImage={
              person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
            }
            name={person.name() ? person.name() : 'Nameless Person'}
            username={username}
          />
          <div className="w-100 w-75-ns fl ph4 tl">
            <h1>Your Contacts</h1>
          </div>
          {ContactBlock}       
          <div className="w-100 w-75-ns fl ph4 tl">
            <h1>Your Accounts</h1>
          </div>
          {AccountBlock}
          <div className="w-100 w-75-ns fl ph4 tl">
            <h1>Your Opportunities</h1>
          </div>
          {OppBlock}
        </div>
      </div>
    ) : null;
  }
}
