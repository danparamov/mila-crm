import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PriorityLabel from './PriorityLabel';
import'./Styles/Table.css';

export default class SingleContact extends Component {
  render() {
    const { contact } = this.props;
    
    return (
      <div className="">
          <table className="Table f3">
           <tbody>
            <tr>
              <td className="Cell" style={{width:1000}}><Link
                to={{
                pathname: '/contact',
                search: `?id=${contact.id}`,
              }}
              className="f4 link dim ph3 pv2 mb2 dib white bg-green b--black br-100 w3"> >>>
              </Link>
              </td>
              <td className="Cell" style={{width:2000}}>{contact.name}</td>
              <td className="Cell" style={{width:2000}}>{contact.email}</td>
              <td className="Cell" style={{width:1000}}>{contact.phoneNumber}</td> 
              <td className="Cell" style={{width:1000}}>{contact.country}</td>
              <td className="Cell" style={{width:1000}}><PriorityLabel priority={contact.priority} small/></td>
            </tr>
           </tbody>
          </table>
      </div>
    );
  }
}
