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
import ifAttribute from './util/ifAttribute';
import SingleOpp from './SingleOpp';
import AddOppIcon from '@material-ui/icons/noteadd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import PriorityLabel from './PriorityLabel';
import'./Styles/Table.css';
import { makeStyles } from '@material-ui/core/styles';

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
    opps: [],
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
    getFile('opps.json', options).then(file => {
      const opps = JSON.parse(file || '[]');
      this.setState({
        opps,
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

  async exportOpps() {
    const columns = Object.keys(this.state.opps[0]).join(',');
    const rows = this.state.opps
      .map(c => Object.values(c).join(','))
      .join('\n');
    const csv = `${columns}\n${rows}`;
    const url = await putFile('opps.csv', csv, { encrypt: false });
    console.log(url);
    window.open(url);
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { opps } = this.state;
    const classes = makeStyles(theme => ({
      root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
    }));
    let OppBlock = null;
    if (ifAttribute(opps[0])) {
      OppBlock = (
        <div className="w-100 w-200-ns fl ph4 tl">
          {opps.map(opp => (
            <SingleOpp opp={opp} key={opp.id} />
          ))}
        </div>
      );
    } else {
      OppBlock = null;
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
          <div className="w-100 w-200-ns fl ph4 tl">
            <h1>Opportunities
            <Link
              to="/add-opportunity"
              className="f2 link dim ph3 pv2 mb2 dib white bg-blue b--black"
            >
            <AddOppIcon />
            </Link></h1>
            <div
              className="f6 link dim ph2 pv1 mb2 dib white bg-blue b--black pointer"
              onClick={async () => await this.exportOpps()}
            >
              Export as CSV
            </div>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead></TableHead>
                  <TableBody>
                      <TableRow>
                      <TableCell width="20%" align="left">Opportunity</TableCell>
                      <TableCell width="20%" align="left">Lead Source</TableCell>
                      <TableCell width="20%" align="left">Account</TableCell>
                      <TableCell width="20%" align="left">Amount</TableCell>
                      <TableCell width="20%" align="left">Closing Date</TableCell>
                      </TableRow>
                  </TableBody>
              </Table>
            </Paper>
          </div>
          {OppBlock}
        </div>
      </div>
    ) : null;
  }
}
