import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
} from 'blockstack';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import SingleContactTasks from './SingleContactTasks';
import SingleAccountTasks from './SingleAccountTasks';
import SingleOppTasks from './SingleOppTasks';
import ifAttribute from './util/ifAttribute';
import AddOppIcon from '@material-ui/icons/noteadd';
import AddContactIcon from '@material-ui/icons/personadd';
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
    contacttasks: [],
    accounttasks: [],
    opptasks: [],
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
    getFile('contacttasks.json', options).then(file => {
      const contacttasks = JSON.parse(file || '[]');
      this.setState({
        contacttasks,
      });
    });
    getFile('accounttasks.json', options).then(file => {
        const accounttasks = JSON.parse(file || '[]');
        this.setState({
          accounttasks,
        });
    });
    getFile('opptasks.json', options).then(file => {
        const opptasks = JSON.parse(file || '[]');
        this.setState({
          opptasks,
        });
    });
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { contacttasks } = this.state;
    const { accounttasks } = this.state;
    const { opptasks } = this.state;
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
    let ContactBlock = null;
    let AccountBlock = null;
    let OppBlock = null;

    if (ifAttribute(contacttasks[0])) {
      ContactBlock = (
        <div className="w-100 w-200-ns fl ph4 tl">
             {contacttasks.map(contacttask => (
             <SingleContactTasks contacttask={contacttask} key={contacttask.id} />
            ))}
        </div>
      );
    } else {
      ContactBlock = null;
    }

    if (ifAttribute(accounttasks[0])) {
        AccountBlock = (
          <div className="w-100 w-200-ns fl ph4 tl">
            {accounttasks.map(accounttask => (
              <SingleAccountTasks accounttask={accounttask} key={accounttask.id} />
            ))}
          </div>
        );
    } else {
        AccountBlock = null;
    }

    if (ifAttribute(opptasks[0])) {
      OppBlock = (
        <div className="w-100 w-200-ns fl ph4 tl">
          {opptasks.map(opptask => (
            <SingleOppTasks opptask={opptask} key={opptask.id} />
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
          <div className="w-100 w-75-ns f4 ph4 tl">
            <h1>Tasks </h1>
            <Link
              to={{
                pathname: '/add-contacttask'
              }}
              className="f2 link dim ph3 pv2 mb2 dib white bg-green b--black"
            >
            <AddContactIcon />
            </Link>
            <Link
              to={{
                pathname: '/add-accounttask'
              }}
              className="f2 link dim ph3 pv2 mb2 dib white bg-red b--black"
            >
            <AddAccountIcon />
            </Link>
            <Link
              to={{
                pathname: '/add-opptask'
              }}
              className="f2 link dim ph3 pv2 mb2 dib white bg-blue b--black"
            >
            <AddOppIcon />
            </Link>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead></TableHead>
                  <TableBody>
                      <TableRow>
                      <TableCell width="20%" align="left">Name</TableCell>
                      <TableCell width="20%" align="left">Subject</TableCell>
                      <TableCell width="20%" align="left">Due Date</TableCell>
                      <TableCell width="20%" align="left">Priority</TableCell>
                      <TableCell width="20%" align="left">Status</TableCell>
                      </TableRow>
                  </TableBody>
              </Table>
            </Paper>
          </div>
          {ContactBlock}
          {AccountBlock}
          {OppBlock}
        </div>  
      </div>
    ) : null;
  }
}
