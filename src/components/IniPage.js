import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
} from 'blockstack';
import Nav from './Nav';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import SingleContact from './SingleContact';
import SingleAccount from './SingleAccount';
import SingleOpp from './SingleOpp';
import ifAttribute from './util/ifAttribute';
import ProfileDesktop from './ProfileDesktop';
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
    contacts: [],
    accounts: [],
    opps: [],
    oppsamount: [],
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
    getFile('contacts.json', options).then(file => {
      const contacts = JSON.parse(file || '[]');
      this.setState({
        contacts,
      });
    });
    getFile('accounts.json', options).then(file => {
        const accounts = JSON.parse(file || '[]');
        this.setState({
          accounts,
        });
    });
    getFile('opps.json', options).then(file => {
        const opps = JSON.parse(file || '[]');
        const oppsamount = opps.map((opp) => parseFloat(opp.amount));
        console.log(oppsamount)
        this.setState({
          opps,
          oppsamount,
        });
    });
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { contacts } = this.state;
    const { accounts } = this.state;
    const { opps } = this.state;
    const { today } = this.state;
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
    let AddMoreContactsBlock = null;
    let ContactBlock = null;
    let AccountBlock = null;
    let OppBlock = null;
    const {oppsamount} = this.state;
    let oppstotal;
    let numOr0 = n => isNaN(n) ? 0 : n
    const reducer = (accumulator, currentValue) => numOr0(accumulator) +  numOr0(currentValue);

    console.log(oppstotal = oppsamount.reduce(reducer,0));

    if (ifAttribute(contacts[0])) {
      ContactBlock = (
        <div className="w-100 w-200-ns fl ph4 tl">
          {contacts.map(contact => (
            <SingleContact contact={contact} key={contact.id} />
          ))}
        </div>
      );
    } else {
      ContactBlock = null;
    }

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
        <div class="w9 center ph3 cf">
          <div className="w-100 w-200-ns fl ph4 tl">
            <h1>Contacts</h1>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead></TableHead>
                  <TableBody>
                      <TableRow>
                        <TableCell align="relevant">Contact</TableCell>
                        <TableCell align="relevant">Account Name</TableCell>
                        <TableCell align="relevant">Email</TableCell>
                        <TableCell align="relevant">Country</TableCell>
                        <TableCell align="relevant">Twitter</TableCell>
                      </TableRow>
                  </TableBody>
              </Table>
            </Paper>
          </div>
          {ContactBlock}
          <div className="w-100 w-200-ns fl ph4 tl">
            <h1>Accounts</h1>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead></TableHead>
                  <TableBody>
                      <TableRow>
                        <TableCell align="relevant">Account</TableCell>
                        <TableCell align="relevant">Website</TableCell>
                        <TableCell align="relevant">Industry</TableCell>
                        <TableCell align="relevant">Country</TableCell>
                        <TableCell align="relevant">Twitter</TableCell>
                      </TableRow>
                  </TableBody>
              </Table>
            </Paper>
          </div>
          {AccountBlock}
          <div className="w-100 w-200-ns fl ph4 tl">
            <h1>Opportunities</h1>
            <div className="f2 green">Total Opp Amount: ${oppstotal}</div>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead></TableHead>
                  <TableBody>
                      <TableRow>
                        <TableCell align="relevant">Opportunity</TableCell>
                        <TableCell align="relevant">Lead Source</TableCell>
                        <TableCell align="relevant">Account</TableCell>
                        <TableCell align="relevant">Amount</TableCell>
                        <TableCell align="relevant">Closing Date</TableCell>
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
