import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu(props) {
  return (
    <div className="db bg-black">
      <Link to="/profile" className="db white no-underline b pt3 pb3 tr mr3">
        Dashboard
      </Link>
      <Link to="/contacts" className="db white no-underline b pt3 pb3 tr mr3">
        Contacts
      </Link>
      <Link to="/accounts" className="db white no-underline b pt3 pb3 tr mr3">
        Accounts
      </Link>
      <Link to="/opportunities" className="db white no-underline b pt3 pb3 tr mr3">
        Opportunities
      </Link>
      <Link
        to="/settings"
        className="db bg-white black no-underline b pt3 pb3 w-100 tr pr3"
      >
        Settings
      </Link>
      <Link to="/updates" className="db white no-underline b pt3 pb3 tr mr3">
        📰 Updates
      </Link>
      <div
        className="db bg-white black no-underline b pt3 pb3 w-100 tr pr3"
        onClick={props.logout}
      >
        Logout
      </div>
    </div>
  );
}
