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
import SingleAccountTask from './SingleAccountTask';
import ifAttribute from './util/ifAttribute';
import AddAccountIcon from '@material-ui/icons/addtophotos';

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
    accounttasks: [],
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
    getFile('accounttasks.json', options).then(file => {
      const accounttasks = JSON.parse(file || '[]');
      this.setState({
        accounttasks,
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
    const { accounttasks } = this.state;
    let AccountTaskBlock = null;

    if (ifAttribute(accounttasks[0])) {
      AccountTaskBlock = (
          <div className="w-100 w-200-ns fl ph4 tl">
            {accounttasks.map(accounttask => (
              <SingleAccountTask accounttask={accounttask} key={accounttask.id} />
            ))}
          </div>
        );
    } else {
      AccountTaskBlock = null;
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
            <h1> Account Tasks
            <Link
              to="/add-accounttask"
              className="f2 link dim ph3 pv2 mb2 dib white bg-red b--black"
            >
            <AddAccountIcon />
            </Link> </h1>
            <br /> <br />
          </div>
          {AccountTaskBlock}
        </div>
      </div>
    ) : null;
  }
}
