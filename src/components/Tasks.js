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
import SingleContactTasks from './SingleContactTasks';
import SingleAccountTasks from './SingleAccountTasks';
import SingleOppTasks from './SingleOppTasks';
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
    contacttasks: [],
    accounttasks: [],
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
    getFile('contacttasks.json', options).then(file => {
      const contacttasks = JSON.parse(file || '[]');
      this.setState({
        contacttasks,
      });
    });
    getFile('accounttasks.json', options).then(file => {
        const accounttasks = JSON.parse(file || '[]');
        this.setState({
          accounttasks,
        });
    });
    getFile('opptasks.json', options).then(file => {
        const opptasks = JSON.parse(file || '[]');
        this.setState({
          opptasks,
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
    const { contacttasks } = this.state;
    const { accounttasks } = this.state;
    const { opptasks } = this.state;
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
    if (ifAttribute(contacttasks[0])) {
      ContactBlock = (
        <div className="w-100 w-75-ns fl ph4 tl">
             {contacttasks.map(contacttask => (
             <SingleContactTasks contacttask={contacttask} key={contacttask.id} />
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
    if (ifAttribute(accounttasks[0])) {
        AccountBlock = (
          <div className="w-100 w-75-ns fl ph4 tl">
            {accounttasks.map(accounttask => (
              <SingleAccountTasks accounttask={accounttask} key={accounttask.id} />
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
    if (ifAttribute(opptasks[0])) {
      OppBlock = (
        <div className="w-100 w-75-ns fl ph4 tl">
          {opptasks.map(opptask => (
            <SingleOppTasks opptask={opptask} key={opptask.id} />
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
          <div className="w-100 w-75-ns f4 ph4 tl">
            <h1> Contacts
            <Link
              to={{
                pathname: '/contacttasks'
              }}
              className="f2 link dim ph3 pv2 mb2 dib white bg-green b--black"
            > > 
            </Link></h1>
          </div>
          {ContactBlock} 
          
          <div className="w-100 w-75-ns f4 ph4 tl">
            <h1> Accounts
            <Link
              to={{
                pathname: '/accounttasks',
              }}
              className="f2 link dim ph3 pv2 mb2 dib white bg-yellow b--black"
            > >
            </Link></h1> 
          </div>
          {AccountBlock}
          <br /> <br /> 
          <div className="w-100 w-75-ns f4 ph4 tl">
            <h1> Opportunities
            <Link
              to={{
                pathname: '/opptasks',
              }}
              className="f2 link dim ph3 pv2 mb2 dib white bg-blue b--black"
            > >  
            </Link></h1> 
          </div>
          {OppBlock}
        </div>
      </div>
    ) : null;
  }
}
