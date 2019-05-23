import React from 'react';
import { Link } from 'react-router-dom';

function ProfileDesktop(props) {
  return (
    <div className="w-100 w-75-ns fl pa2 dn dib-m dib-l pb5-l" id="section-2">
      <div>
        <img
          src={props.profileImage}
          className="h3 w3 br-100"
          id="avatar-image"
          alt=""
        />
        <br />
        <span className="f6 gray">{props.username}</span>
        <br /><br />
        <Link
          to="/profile"
          className="f6 link dim ph3 pv1 mb2 dib black bg-white ba b--black"
        >
          Dashboard
        </Link>
      
        <Link
          to="/contacts"
          className="f6 link dim ph3 pv1 mb2 dib black bg-white ba b--black"
        >
          Contacts
        </Link>
      
        <Link
          to="/accounts"
          className="f6 link dim ph3 pv1 mb2 dib black bg-white ba b--black"
        >
          Accounts
        </Link>
      
        <Link
          to="/opportunities"
          className="f6 link dim ph3 pv1 mb2 dib black bg-white ba b--black"
        >
          Opportunities
        </Link>
      
        <Link
          to="/settings"
          className="f6 link dim ph3 pv1 mb2 dib black bg-white ba b--black"
         >
          Settings
        </Link>
        
        <Link
          to="/updates"
          className="f6 link dim ph3 pv1 mb2 dib black bg-white ba b--black"
        >
          Updates
        </Link>
        
        <a
          className="pointer f6 link dim ph3 pv1 mb2 dib black bg-white ba b--black"
          id="signout-button"
          onClick={props.logout}
        >
          Logout
        </a>
        </div>
    
    </div>
  );
}

export default ProfileDesktop;
