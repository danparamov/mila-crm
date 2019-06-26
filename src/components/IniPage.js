import React, { Component } from 'react';
import clsx from 'clsx';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  YAxis,
  Label,
  ResponsiveContainer
} from 'recharts';
import Title from './Title';
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
import Paper from '@material-ui/core/Paper';
import PriorityLabel from './PriorityLabel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
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

const data = [
  {
    name: 'Leads', yearly: 40, monthly: 24, amt: 24,
  },
  {
    name: 'Prospects', yearly: 30, monthly: 13, amt: 22,
  },
  {
    name: 'Customers', yearly: 20, monthly: 98, amt: 22,
  },
  {
    name: 'Partners', yearly: 27, monthly: 39, amt: 20,
  },
  {
    name: 'Opportunities', yearly: 18, monthly: 48, amt: 21,
  },
  {
    name: 'Won', yearly: 23, monthly: 38, amt: 25,
  },
  {
    name: 'Closed', yearly: 34, monthly: 43, amt: 21,
  },
];

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
        height: 500,
      },
      depositContext: {
        flex: 1,
      },
      seeMore: {
        marginTop: theme.spacing(3),
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
        <div className="">
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
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9} className={fixedHeightPaper}>
                <React.Fragment>
                  <Title>Today</Title>
                  <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer style={{ width: '100%', height: 300 }}>
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 30, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="monthly" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="yearly" stroke="#82ca9d" />
                  </LineChart>
                  </ResponsiveContainer>
                  </div>
                </React.Fragment>
              </Grid>
              {/* Total Revenue */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                <React.Fragment>
                  <Title>Total Revenue</Title>
                  <Typography component="p" variant="h4">
                    ${oppstotal}
                  </Typography>
                  <Typography color="textSecondary" className={classes.depositContext}>
                    This yearly
                  </Typography>
                  <div>
                    <Link color="primary" href="javascript:;">
                      View balance
                    </Link>
                  </div>
                </React.Fragment>
                </Paper>
              </Grid>
              {/* Recent Opportunities */}
              <Title>Recent Opportunities</Title>
              <Grid item xs={12}>
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
                {OppBlock}
              </Grid>
            </Grid>
          </Container>
        </div>
          <MadeWithLove />
        </div>
    ) : null;
  }
}
