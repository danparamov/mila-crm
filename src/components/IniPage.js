import React, { Component } from 'react';
import clsx from 'clsx';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
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
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://milacrm.com/">
        Mila CRM
      </Link>
      {' team.'}
    </Typography>
  );
}

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
        display: 'flex',
      },
      toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
      },
      toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      menuButtonHidden: {
        display: 'none',
      },
      title: {
        flexGrow: 1,
      },
      drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      },
      appBarSpacer: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      },
      container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: 240,
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

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return !isSignInPending() ? (
      <div className={classes.root}>
      <CssBaseline />
        <Nav
          profileImage={
            person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
          }
          logout={handleSignOut.bind(this)}
        />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
          <MadeWithLove />
        </div>
    ) : null;
  }
}
