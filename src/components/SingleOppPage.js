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

//class mySingleContactPage extends Component {
class mySingleOppPage extends Component {
  state = {
    //contact: [],
    opp: [],
    //contacts: [],
    opps: [],
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
    //getFile('contacts.json', options).then(file => {
    getFile('opps.json', options).then(file => {
      //const contacts = JSON.parse(file || '[]');
      //const contact = findObjectBy(contacts, {
      const opps = JSON.parse(file || '[]');
      const opp = findObjectBy(opps, {
        id: this.props.location.search.substring(4),
      });
      this.setState({
        opp,
        opps,
        //contact,
        //contacts,
      });
    });
  }
  //
  deleteOpp() {
    const toDelete = this.state.opp[0].id;
    const newContactsList = this.state.opps.filter(
        opp => opp.id !== toDelete
    );
    const options = { encrypt: true };
    putFile('opps.json', JSON.stringify(newContactsList), options).then(
      () => {
        this.props.history.push('/opportunities');
      }
    );
  }

  checkedIn() {
    const toDelete = this.state.opp[0].id;
    const newContactsList = this.state.opps.filter(
        opp => opp.id !== toDelete
    );
    this.state.opp[0].contactDate = nextContactDate(
      this.state.opp[0].priority
    );
    newContactsList.unshift(this.state.opp[0]);
    const options = { encrypt: true };
    putFile('opps.json', JSON.stringify(newContactsList), options).then(
      () => {
        this.props.history.push('/opportunities');
      }
    );
  }

  render() {
    const { opp } = this.state;
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
    let contactDate = null;
    if (opp[0]) {
      if (ifAttribute(opp[0].contactDate)) {
        contactDate = moment(opp[0].contactDate, 'MM/DD/YYYY').fromNow(
          'days'
        );
      }
      if (ifAttribute(opp[0].country)) {
        UserCountryBlock = (
          <div className="mt2">
            <span className="b">Country:</span> {opp[0].country},{' '}
            {opp[0].region}
          </div>
        );
      } else
        UserCountryBlock = (
          <div className="mt2">
            <span className="b">Country:</span>
            🌎
          </div>
        );
      if (ifAttribute(opp[0].email)) {
        EmailBlock = (
          <div className="mt2">
            <span className="b">Email:</span> {opp[0].email}
          </div>
        );
      } else EmailBlock = null;
      if (ifAttribute(opp[0].birthDate)) {
        BirthDateBlock = (
          <div className="mt2">
            <span className="b">Birthday:</span> {opp[0].birthDate}
          </div>
        );
      } else BirthDateBlock = null;
      if (ifAttribute(opp[0].contactDate)) {
        ContactDateBlock = (
          <div className="mt2">
            <span className="b">Next Check in is in {contactDate}</span>
          </div>
        );
      } else ContactDateBlock = null;
      if (ifAttribute(opp[0].phoneNumber)) {
        PhoneNumberBlock = (
          <div className="mt2">
            <span className="b">Phone Number:</span> {opp[0].phoneNumber}
          </div>
        );
      } else PhoneNumberBlock = null;
      if (
        ifAttribute(opp[0].twitterHandle) ||
        ifAttribute(opp[0].blockstackId)
      ) {
        SocialBlock = <h2>Social</h2>;
        if (ifAttribute(opp[0].twitterHandle)) {
          TwitterBlock = (
            <a
              href={`https://twitter.com/${opp[0].twitterHandle}`}
              className="no-underline black"
            >
              <div className="inline-flex justify-center items-center">
                <i className="fa fa-twitter" />
                <span className="ml2">{opp[0].twitterHandle}</span>
              </div>
            </a>
          );
        } else TwitterBlock = null;
        if (ifAttribute(opp[0].blockstackId)) {
          BlockstackBlock = (
            <div className="mt2 inline-flex justify-center items-center">
              <img src={BlockstackLogo} alt="blockstack" className="w1" />
              <span className="ml2">{opp[0].blockstackId}</span>
            </div>
          );
        } else BlockstackBlock = null;
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
        {opp.map(opp => (
          <div>
            <div className="w-100 w-70-l center">
              <div className="">
                <div className="w-100 w-20-ns center fl-ns">
                  <img
                    src={`https://avatars.io/twitter/${opp.twitterHandle}`}
                    className="center fl-ns br-100 h4 ml3-ns mt0-l mt3"
                    alt=""
                  />
                </div>
                <div className="w-100 w-80-ns center fl-ns">
                  <h1 className="f3 f1-ns">
                    {opp.oppname} {' '}
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
                  </div>
                </div>
              </div>
            </div>
            <div className="mt3 right-ns tr pr4">
              <a
                className="pointer link dim ba bw1 ph2 pv2 mb2 dib no-underline ba b--black black mr2 "
                onClick={() => {
                  this.deleteOpp();
                }}
              >
                Delete Opportunity
              </a>
              <Link
                to={{
                  pathname: '/edit-opportunity',
                  search: `?id=${opp.id}`,
                }}
                className="link dim ba bw1 ph2 pv2 mb2 dib no-underline black mr2"
              >
                ✏️️️ Edit Opportunity
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

const SingleOppPage = withRouter(mySingleOppPage);

export default SingleOppPage;
