import React from 'react';
import { Link } from 'react-router-dom';

function ProfileDesktop(props) {
  return (
    <div className="w-100 w-25-ns fl pa2 dn dib-m dib-l pb5-l" id="section-2">
      <div>
        <img
          src={props.profileImage}
          className="h3 w3 br-100"
          id="avatar-image"
          alt=""
        />
      </div>
      <p className="f3">
        <span id="heading-name">{props.name}</span>
        <br />
        <span className="f3 gray">{props.username}</span>
      </p>
      <p className="lead">
      <div className="w-100">
        <Link
          to="/profile"
          className="f3 link dim ph3 pv1 mb2 dib gray"
        >
          Dashboard
        </Link>
      </div>
      <div className="w-100">
        <Link
          to="/contacts"
          className="f3 link dim ph3 pv1 mb2 dib gray"
        >
          Contacts
        </Link>
      </div>
      <div className="w-100">
        <Link
          to="/accounts"
          className="f3 link dim ph3 pv1 mb2 dib gray"
        >
          Accounts
        </Link>
      </div>
      <div className="w-100">
        <Link
          to="/opportunities"
          className="f3 link dim ph3 pv1 mb2 dib gray"
        >
          Opportunities
        </Link>
      </div>
      <div className="w-100">
        <Link
          to="/tasks"
          className="f3 link dim ph3 pv1 mb2 dib gray"
        >
          Tasks
        </Link>
      </div>
        <div className="w-100">
          <Link
            to="/settings"
            className="f3 link dim ph3 pv1 mb2 dib gray"
          >
            Settings
          </Link>
        </div>
        <div className="w-100">
          <Link
            to="/updates"
            className="f3 link dim ph3 pv1 mb2 dib gray"
          >
            Updates
          </Link>
        </div>
        <div className="w-100">
          <a
            className="pointer f3 link dim ph3 pv1 mb2 dib gray"
            id="signout-button"
            onClick={props.logout}
          >
            Logout
          </a>
        </div>
      </p>
    </div>
  );
}

export default ProfileDesktop;
