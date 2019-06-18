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
import SingleContact from './SingleContact';
import SingleAccount from './SingleAccount';
import SingleOpp from './SingleOpp';
import ContactBubble from './ContactBubble';
import NoOneLeft from '../assets/no-one-left.png';
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
        this.setState({
          opps,
        });
    });

    /*getFile('today.json', options).then(file => {
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
    });*/
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { username } = this.state;
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
    const ContactToday = [];
    let NoContactTodayBlock = null;
    // Contacts
    /*if (today[0].contactsLeft !== 0) {
      AddMoreContactsBlock = (
        <div className="w-100 w-75-ns fl tc bg-lightest-blue pa3 br1">
          Add <span className="b">{this.state.today[0].contactsLeft}</span> more
          people today to your contacts
        </div>
      );
    }*/
    if (ifAttribute(contacts[0])) {
      ContactBlock = (
        <div className="w-100 w-200-ns fl ph4 tl">
          {contacts.map(contact => (
            <SingleContact contact={contact} key={contact.id} />
          ))}
        </div>
      );
      /*contacts.map(contact => {
        if (
          contact.contactDate === moment().format('l') ||
          moment().isAfter(moment(contact.contactDate, 'MM/DD/YYYY'))
        ) {
          ContactToday.push(contact);
        }
      });*/
    } else {
      ContactBlock = null;
    }
    /*if (ContactToday.length == 0 || ContactToday == null) {
      NoContactTodayBlock = (
        <div className="w-100">
          <img src={NoOneLeft} className="center h4 db" alt="" />
          <p className="center center tc b f4">No pending</p>
        </div>
      );
    }*/

    // Accounts
    if (ifAttribute(accounts[0])) {
        AccountBlock = (
          <div className="w-100 w-200-ns fl ph4 tl">
            {accounts.map(account => (
              <SingleAccount account={account} key={account.id} />
            ))}
          </div>
        );
        //contacts.map(contact => {
        /*accounts.map(account => {
          if (
            //contact.contactDate === moment().format('l') ||
            account.contactDate === moment().format('l') ||
            //moment().isAfter(moment(contact.contactDate, 'MM/DD/YYYY'))
            moment().isAfter(moment(account.contactDate, 'MM/DD/YYYY'))
          ) {
            //ContactToday.push(contact);
            ContactToday.push(account);
          }
        });*/
    } else {
        AccountBlock = null;
    }
    /*if (ContactToday.length == 0 || ContactToday == null) {
        NoContactTodayBlock = (
          <div className="w-100">
            <img src={NoOneLeft} className="center h4 db" alt="" />
            <p className="center center tc b f4">No pending checkins for today</p>
          </div>
        );
    }*/

    // Opportunities
    if (ifAttribute(opps[0])) {
      OppBlock = (
        <div className="w-100 w-200-ns fl ph4 tl">
          {opps.map(opp => (
            <SingleOpp opp={opp} key={opp.id} />
          ))}
        </div>
      );
      //contacts.map(contact => {
      /*opps.map(opp => {
        if (
          //contact.contactDate === moment().format('l') ||
          opp.contactDate === moment().format('l') ||
          //moment().isAfter(moment(contact.contactDate, 'MM/DD/YYYY'))
          moment().isAfter(moment(opp.contactDate, 'MM/DD/YYYY'))
        ) {
          //ContactToday.push(contact);
          ContactToday.push(opp);
        }
      });*/
    } else {
        OppBlock = null;
    }
    /*if (ContactToday.length == 0 || ContactToday == null) {
      NoContactTodayBlock = (
        <div className="w-100">
          <img src={NoOneLeft} className="center h4 db" alt="" />
          <p className="center center tc b f4">No pending checkins for today</p>
        </div>
      );
    }*/
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
