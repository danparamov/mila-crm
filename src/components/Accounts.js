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
import SingleAccount from './SingleAccount';
import AddAccountIcon from '@material-ui/icons/addtophotos';
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
    accounts: [],
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
    getFile('accounts.json', options).then(file => {
      const accounts = JSON.parse(file || '[]');
      this.setState({
        accounts,
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

  async exportAccounts() {
    const columns = Object.keys(this.state.accounts[0]).join(',');
    const rows = this.state.accounts
      .map(c => Object.values(c).join(','))
      .join('\n');
    const csv = `${columns}\n${rows}`;
    const url = await putFile('accounts.csv', csv, { encrypt: false });
    console.log(url);
    window.open(url);
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { accounts } = this.state;
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
    let AccountBlock = null;
    if (ifAttribute(accounts[0])) {
      AccountBlock = (
        <div className="w-100 w-200-ns fl ph4 tl">
          {accounts.map(account => (
            <SingleAccount account={account} key={account.id} />
          ))}
        </div>
      );
    } else {
      AccountBlock = null;
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
            <h1>Accounts
            <Link
              to="/add-account"
              className="f2 link dim ph3 pv2 mb2 dib white bg-red b--black"
            >
            <AddAccountIcon />
            </Link></h1>
            <div
              className="f6 link dim ph2 pv1 mb2 dib white bg-red b--black pointer"
              onClick={async () => await this.exportAccounts()}
            >
              Export as CSV
            </div>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead></TableHead>
                  <TableBody>
                      <TableRow>
                      <TableCell width="20%" align="left">Account</TableCell>
                      <TableCell width="20%" align="left">Website</TableCell>
                      <TableCell width="20%" align="left">Industry</TableCell>
                      <TableCell width="20%" align="left">Country</TableCell>
                      <TableCell width="20%" align="left">Twitter</TableCell>
                      </TableRow>
                  </TableBody>
              </Table>
            </Paper>
          </div>
          {AccountBlock}
        </div>
      </div>
    ) : null;
  }
}
