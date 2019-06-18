import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
} from 'blockstack';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import SingleContactTasks from './SingleContactTasks';
import SingleAccountTasks from './SingleAccountTasks';
import SingleOppTasks from './SingleOppTasks';
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
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { contacttasks } = this.state;
    const { accounttasks } = this.state;
    const { opptasks } = this.state;
    let ContactBlock = null;
    let AccountBlock = null;
    let OppBlock = null;
 
    if (ifAttribute(contacttasks[0])) {
      ContactBlock = (
        <div className="w-100 w-75-ns fl ph4 tl">
             {contacttasks.map(contacttask => (
             <SingleContactTasks contacttask={contacttask} key={contacttask.id} />
            ))}
        </div>
      );
    } else {
      ContactBlock = null;
    }

    if (ifAttribute(accounttasks[0])) {
        AccountBlock = (
          <div className="w-100 w-75-ns fl ph4 tl">
            {accounttasks.map(accounttask => (
              <SingleAccountTasks accounttask={accounttask} key={accounttask.id} />
            ))}
          </div>
        );
    } else {
        AccountBlock = null;
    }

    if (ifAttribute(opptasks[0])) {
      OppBlock = (
        <div className="w-100 w-75-ns fl ph4 tl">
          {opptasks.map(opptask => (
            <SingleOppTasks opptask={opptask} key={opptask.id} />
          ))}
        </div>
      );
    } else {
        OppBlock = null;
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
