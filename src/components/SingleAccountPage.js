import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
} from 'blockstack';
import moment from 'moment';
import BlockstackLogo from '../assets/blockstack-icon.svg';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import findObjectBy from './util/findObjectBy';
import ifAttribute from './util/ifAttribute';
import Nav from './Nav';
import PriorityLabel from './PriorityLabel';
import nextContactDate from './util/nextContactDate';
import SingleAccountTask from './SingleAccountTask';

class mySingleAccountPage extends Component {
  state = {
    account: [],
    accounts: [],
    accounttask: [],
    accounttasks: [],
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
      username: loadUserData().username,
    });
    this.fetchData();
  }

  fetchData() {
    const options = { decrypt: true };
    getFile('accounts.json', options).then(file => {
      const accounts = JSON.parse(file || '[]');
      const account = findObjectBy(accounts, {
        id: this.props.location.search.substring(4),
      });
      this.setState({
        account,
        accounts,
      });
    });
    getFile('accounttasks.json', options).then(file => {
      const name = this.state.account[0].accountname
      const account_name = name
      const accounttasks = JSON.parse(file || '[]');
      const accounttask = findObjectBy(accounttasks, {
        contactname: account_name,
      })

      this.setState({
        accounttask,
        accounttasks,
      });
    });
  }

  deleteAccount() {
    const toDelete = this.state.account[0].id;
    const newContactsList = this.state.accounts.filter(
      account => account.id !== toDelete
    );
    const options = { encrypt: true };
    putFile('accounts.json', JSON.stringify(newContactsList), options).then(
      () => {
        this.props.history.push('/accounts');
      }
    );
  }

  checkedIn() {
    const toDelete = this.state.account[0].id;
    const newContactsList = this.state.accounts.filter(
      account => account.id !== toDelete
    );
    this.state.account[0].contactDate = nextContactDate(
      this.state.account[0].priority
    );
    newContactsList.unshift(this.state.account[0]);
    const options = { encrypt: true };
    putFile('accounts.json', JSON.stringify(newContactsList), options).then(
      () => {
        this.props.history.push('/accounts');
      }
    );
  }

  render() {
    const { account } = this.state;
    const { accounttask } = this.state;
    const { handleSignOut } = this.props;
    const { person } = this.state;
    let UserCountryBlock;
    let SocialBlock = null;
    let EmailBlock;
    let BirthDateBlock;
    let PhoneNumberBlock;
    let BlockstackBlock;
    let TwitterBlock;
    let ContactDateBlock;
    let TaskBlock = null;
    let AccountTaskBlock;
    let contactDate = null;
    if (account[0]) {
      if (ifAttribute(account[0].contactDate)) {
        contactDate = moment(account[0].contactDate, 'MM/DD/YYYY').fromNow(
          'days'
        );
      }
      if (ifAttribute(account[0].country)) {
        UserCountryBlock = (
          <div className="mt2">
            <span className="b">Country:</span> {account[0].country},{' '}
            {account[0].region}
          </div>
        );
      } else
        UserCountryBlock = (
          <div className="mt2">
            <span className="b">Country:</span>
            🌎
          </div>
        );
      if (ifAttribute(account[0].email)) {
        EmailBlock = (
          <div className="mt2">
            <span className="b">Email:</span> {account[0].email}
          </div>
        );
      } else EmailBlock = null;
      if (ifAttribute(account[0].birthDate)) {
        BirthDateBlock = (
          <div className="mt2">
            <span className="b">Birthday:</span> {account[0].birthDate}
          </div>
        );
      } else BirthDateBlock = null;
      if (ifAttribute(account[0].contactDate)) {
        ContactDateBlock = (
          <div className="mt2">
            <span className="b">Next Check in is in {contactDate}</span>
          </div>
        );
      } else ContactDateBlock = null;
      if (ifAttribute(account[0].phoneNumber)) {
        PhoneNumberBlock = (
          <div className="mt2">
            <span className="b">Phone Number:</span> {account[0].phoneNumber}
          </div>
        );
      } else PhoneNumberBlock = null;
      if (
        ifAttribute(account[0].twitterHandle) ||
        ifAttribute(account[0].blockstackId)
      ) {
        SocialBlock = <h2>Social</h2>;
        if (ifAttribute(account[0].twitterHandle)) {
          TwitterBlock = (
            <a
              href={`https://twitter.com/${account[0].twitterHandle}`}
              className="no-underline black"
            >
              <div className="inline-flex justify-center items-center">
                <i className="fa fa-twitter" />
                <span className="ml2">{account[0].twitterHandle}</span>
              </div>
            </a>
          );
        } else TwitterBlock = null;
        if (ifAttribute(account[0].blockstackId)) {
          BlockstackBlock = (
            <div className="mt2 inline-flex justify-center items-center">
              <img src={BlockstackLogo} alt="blockstack" className="w1" />
              <span className="ml2">{account[0].blockstackId}</span>
            </div>
          );
        } else BlockstackBlock = null;
      }
      if (accounttask[0]) {
        TaskBlock = <h2>Tasks -- click on each task to edit it</h2>;
        if (ifAttribute(accounttask[0].contactname)) {
          AccountTaskBlock = (
            <div className="mt2">
              {accounttask.map(accounttask => (
              <SingleAccountTask accounttask={accounttask} key={accounttask.id} />
              ))}
            </div>
          );
        } else AccountTaskBlock = null;
      }
    }
    return !isSignInPending() ? (
      <div>
        <Nav
          profileImage={
            person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
          }
          logout={handleSignOut.bind(this)}
        />
        {account.map(account => (
          <div>
            <div class="section_container_dash">
              <div className="">
                <div className="w-100 w-20-ns center fl-ns">
                  <img
                    src={`https://avatars.io/twitter/${account.twitterHandle}`}
                    className="center fl-ns br-100 h4 ml3-ns mt0-l mt3"
                    alt=""
                  />
                </div>
                <div className="w-100 w-80-ns center fl-ns">
                  <h1 className="f3 f1-ns">
                    {account.accountname} {' '}
                    <PriorityLabel priority={account.priority} />
                  </h1>
                </div>
                <div className="center w-80 w-40-ns pt6-ns">
                  <div className="tl">
                    {ContactDateBlock}
                    {PhoneNumberBlock}
                    {EmailBlock}
                    {BirthDateBlock}
                    {UserCountryBlock}
                  </div>
                  <div className="tl">
                    {SocialBlock}
                    {TwitterBlock}
                    <br />
                    {BlockstackBlock}
                    <br />
                    {TaskBlock}
                    {AccountTaskBlock}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt3 right-ns tr pr4">
              <a
                className="pointer link dim ba bw1 ph2 pv2 mb2 dib no-underline ba b--black black mr2 "
                onClick={() => {
                  this.deleteAccount();
                }}
              >
                Delete Account
              </a>
              <Link
                to={{
                  pathname: '/edit-account',
                  search: `?id=${account.id}`,
                }}
                className="link dim ba bw1 ph2 pv2 mb2 dib no-underline black mr2"
              >
                ✏️️️ Edit Account
              </Link>
              <Link
                to={{
                  pathname: '/add-accounttask',
                }}
                className="link dim ba bw1 ph2 pv2 mb2 dib no-underline black mr2"
              >
                ✏️️️ Add Account Task
              </Link>
              <a
                className="pointer link dim ba bw1 ph2 pv2 mb2 dib no-underline bg-black b--black white"
                onClick={() => {
                  this.checkedIn();
                }}
              >
                ✅ Check In
              </a>
            </div>
          </div>
        ))}
      </div>
    ) : null;
  }
}

const SingleAccountPage = withRouter(mySingleAccountPage);

export default SingleAccountPage;
