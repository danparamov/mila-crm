import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PriorityLabel from './PriorityLabel';

export default class SingleAccountTask extends Component {
  render() {
    const { accounttask } = this.props;
    return (
      <div className="db overflow-x-hidden">
          <div className="w-20 w-10-ns">
            <img
              src={`https://avatars.io/twitter/${accounttask.twitterHandle}`}
              className="fl br-100 w3 mt2-m mt0-l w-100 w-70-l"
              alt=""
            />
          </div>
          <p className="fl w-80 w-90-ns h3 pl3 f4 fw4 black-80">
            {accounttask.contactname} {' -- '}
            {accounttask.subject} {' -- '}
            {accounttask.duedate}
          </p>
      </div>
    );
  }
}