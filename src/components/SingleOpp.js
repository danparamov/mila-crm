import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PriorityLabel from './PriorityLabel';
import'./Styles/Table.css';

export default class SingleOpp extends Component {
  render() {
    const { opp } = this.props;
    return (
      <div className="">
        <table className="Table f3">
           <tbody>
            <tr>
              <td className="Cell" style={{width:1000}}><Link
                to={{
                pathname: '/opportunity',
                search: `?id=${opp.id}`,
              }}
              className="f4 link dim ph3 pv2 mb2 dib white bg-blue b--black br-100 w3"> >>>
              </Link>
              </td>
              <td className="Cell" style={{width:2000}}>{opp.oppname}</td>
              <td className="Cell" style={{width:2000}}>{opp.accountname}</td>
              <td className="Cell" style={{width:1000}}>{opp.amount}</td> 
              <td className="Cell" style={{width:1000}}>{opp.salesstage}</td>
              <td className="Cell" style={{width:1000}}>{opp.probability}</td>
            </tr>
           </tbody>
          </table>
      </div>
    );
  }
}
