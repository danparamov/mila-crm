import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PriorityLabel from './PriorityLabel';
import'./Styles/Table.css';

export default class SingleAccount extends Component {
  render() {
    const { account } = this.props;
    return (
      <div className="">
        <table className="Table f3">
           <tbody>
            <tr>
              <td className="Cell" style={{width:1000}}><Link
                to={{
                pathname: '/account',
                search: `?id=${account.id}`,
              }}
              className="f4 link dim ph3 pv2 mb2 dib white bg-yellow b--black br-100 w3"> >>>
              </Link>
              </td>
              <td className="Cell" style={{width:2000}}>{account.accountname}</td>
              <td className="Cell" style={{width:2000}}>{account.industry}</td>
              <td className="Cell" style={{width:1000}}>{account.salesstage}</td> 
              <td className="Cell" style={{width:1000}}>{account.email}</td>
              <td className="Cell" style={{width:1000}}>{account.phoneNumber}</td>
              <td className="Cell" style={{width:1000}}>{account.country}</td>
              <td className="Cell" style={{width:1000}}><PriorityLabel priority={account.priority} small/></td>
            </tr>
           </tbody>
        </table>
      </div>
    );
  }
}
