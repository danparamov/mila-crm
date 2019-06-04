import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
} from 'blockstack';
import { Link } from 'react-router-dom';
import Logo from '../assets/funnelicon.jpg';
import LogoMobile from '../assets/funnelicon.jpg';
import ProfileDesktop from './ProfileDesktop';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import Menu from './Menu';
import moment from 'moment';
import ifAttribute from './util/ifAttribute';

export default class Nav extends Component {
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
    showMenu: false,
  };

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
      username: loadUserData().username,
    });
  }

  render() {
    const { person } = this.state;
    const { username } = this.state;
    const { handleSignOut } = this.props;
    return !isSignInPending() ? (
      <div>
        <div>
          <Link to="/" title="MILA CRM">
            <img src={Logo} className="w-10" alt="MILA CRM" align="right"/>
          </Link><br /><br />
        </div>
        <nav className="">
          <div className="">
            <ProfileDesktop
            profileImage={
              person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
            }
            username={loadUserData().username}
            logout={this.props.logout}
            />
          </div>
        </nav>
      </div>
    ) : null;
  }
}
