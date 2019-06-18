import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
} from 'blockstack';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import ifAttribute from './util/ifAttribute';
import Nav from './Nav';

class mySingleUserPage extends Component {
  state = {
    users: [],
 
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
    getFile('users.json', options).then(file => {
      const users = JSON.parse(file || '[]');
     
      this.setState({
        users,
      });
    });
  }

  render() {
    const { users } = this.state;
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { username } = this.state;
    let UserCountryBlock;
    let SocialBlock = null;
    let TwitterBlock;
    let NameBlock;
    let LanguageBlock;
    let userid;
    let usertwitter;
    let DefaultBlock;

    DefaultBlock = (
      <div className="mt2">
         <img
            src={person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage}
            className="h3 w3 br-100"
         />
         <br />
         <span>{username}</span>
      </div>
    );

    if (ifAttribute(users[0])) {
      if (ifAttribute(users[0].country)) {
        UserCountryBlock = (
          <div className="mt2">
            <span className="b">Country:</span> {users[0].country}
          </div>
        );
      } else
        UserCountryBlock = (
          <div className="mt2">
            <span className="b">Country:</span>
            🌎
          </div>
        );
      
      if (
        ifAttribute(users[0].twitterHandle) 
      ) {
        SocialBlock = <h2>Social</h2>;
        if (ifAttribute(users[0].twitterHandle)) {
          TwitterBlock = (
            <a
              href={`https://twitter.com/${users[0].twitterHandle}`}
              className="no-underline black"
            >
              <div className="inline-flex justify-center items-center">
                <i className="fa fa-twitter" />
                <span className="ml2">{users[0].twitterHandle}</span>
              </div>
            </a>
          );
        } else TwitterBlock = null;
      }
    
      if (ifAttribute(users[0].name)) {
        NameBlock = (
          <div className="mt2">
            <span className="b">Name:</span> {users[0].name}
          </div>
        );
      } else
        UserCountryBlock = (
          <div className="mt2">
          </div>
        );

      if (ifAttribute(users[0].language)) {
        LanguageBlock = (
            <div className="mt2">
              <span className="b">Language:</span> {users[0].language}
            </div>
          );
        } else
        LanguageBlock = (
            <div className="mt2">
            </div>
          );
        
      userid = users[0].id;
      usertwitter = users[0].twitterHandle;
    }
    
    return !isSignInPending() ? (
      <div>
        <Nav
          profileImage={
            person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
          }
          logout={handleSignOut.bind(this)}
        />
         
          <div>
            <div className="w-100 w-70-l center">
              <div className="">
                <div className="center w-80 w-40-ns pt6-ns">
                  <div className="tl">
                    {DefaultBlock}
                    {NameBlock}
                    {UserCountryBlock}
                    {LanguageBlock}
                  </div>
                  <div className="tl">
                    {SocialBlock}
                    {TwitterBlock}
                    <br />
                  </div>
                  <img
                      src={`https://avatars.io/twitter/${usertwitter}`}
                      className="center fl-ns br-100 h4 ml3-ns mt0-l mt3"
                      alt=""
                    />
                </div>
              </div>
            </div>
            <div className="mt3 right-ns tr pr4">
            <Link
                to={{
                  pathname: '/edit-user-info',
                  search: `?id=${userid}`,
                }}
                className="link dim ba bw1 ph2 pv2 mb2 dib no-underline black mr2"
              >
                ✏️️️ Edit Info
            </Link>
            <Link
                to={{
                  pathname: '/add-user-info', 
                }}
                className="link dim ba bw1 ph2 pv2 mb2 dib no-underline black mr2"
              >
                ✏️️️ Add New Info
            </Link>
            <Link
                to={{
                  pathname: '',
                 
                }}
                className="link dim ba bw1 ph2 pv2 mb2 dib no-underline black mr2"
              >
                ✏️️️ Add User (Coming Soon!)
            </Link>
            </div>
          </div>
        
      </div>
    ) : null;
  }
}

const SingleUserPage = withRouter(mySingleUserPage);

export default SingleUserPage;
