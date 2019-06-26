import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
} from 'blockstack';
import BlockstackLogo from '../assets/blockstack-icon.svg';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import findObjectBy from './util/findObjectBy';
import ifAttribute from './util/ifAttribute';
import Nav from './Nav';
import SingleOppTask from './SingleOppTask';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class mySingleOppPage extends Component {
  state = {
    opp: [],
    opps: [],
    opptask: [],
    opptasks: [],
    person: {
      name() {
        return 'Anonymous';
      },
      avatarUrl() {
        return avatarFallbackImage;
      },
    },
    username: '',
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
      const opp = findObjectBy(opps, {
        id: this.props.location.search.substring(4),
      });
      this.setState({
        opp,
        opps,
      });
    });
    getFile('opptasks.json', options).then(file => {
      const name = this.state.opp[0].oppname
      const opp_name = name
      const opptasks = JSON.parse(file || '[]');
      const opptask = findObjectBy(opptasks, {
        contactname: opp_name,
      })

      this.setState({
        opptask,
        opptasks,
      });
    });
  }

  deleteOpp() {
    const toDelete = this.state.opp[0].id;
    const newContactsList = this.state.opps.filter(
        opp => opp.id !== toDelete
    );
    const options = { encrypt: true };
    putFile('opps.json', JSON.stringify(newContactsList), options).then(
      () => {
        this.props.history.push('/opportunities');
      }
    );
  }


  render() {
    const { opp } = this.state;
    const { opptask } = this.state;
    const { handleSignOut } = this.props;
    const { person } = this.state;
    let UserCountryBlock;
    let SocialBlock = null;
    let AccountBlock;
    let AmountBlock;
    let ProbabilityBlock;
    let BlockstackBlock;
    let TwitterBlock;
    let ContactDateBlock;
    let TaskBlock = null;
    let OppTaskBlock;

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

    if (opp[0]) {
      if (ifAttribute(opp[0].accountname)) {
        AccountBlock = (
          <div className="mt2">
            <span className="b">Account Name:</span> {opp[0].accountname}
          </div>
        );
      } else AccountBlock = null;
      if (ifAttribute(opp[0].amount)) {
        AmountBlock = (
          <div className="mt2">
            <span className="b">Amount:</span> {opp[0].amount}
          </div>
        );
      } else AmountBlock = null;
      if (ifAttribute(opp[0].probability)) {
        ProbabilityBlock = (
          <div className="mt2">
            <span className="b">Probability:</span> {opp[0].probability}
            <span className="b"> %</span>
          </div>
        );
      } else ProbabilityBlock = null;
      if (
        ifAttribute(opp[0].twitterHandle) ||
        ifAttribute(opp[0].blockstackId)
      ) {
        SocialBlock = <h2>Social</h2>;
        if (ifAttribute(opp[0].twitterHandle)) {
          TwitterBlock = (
            <a
              href={`https://twitter.com/${opp[0].twitterHandle}`}
              className="no-underline black"
            >
              <div className="inline-flex justify-center items-center">
                <i className="fa fa-twitter" />
                <span className="ml2">{opp[0].twitterHandle}</span>
              </div>
            </a>
          );
        } else TwitterBlock = null;
        if (ifAttribute(opp[0].blockstackId)) {
          BlockstackBlock = (
            <div className="mt2 inline-flex justify-center items-center">
              <img src={BlockstackLogo} alt="blockstack" className="w1" />
              <span className="ml2">{opp[0].blockstackId}</span>
            </div>
          );
        } else BlockstackBlock = null;
      }
      if (opptask[0]) {
        TaskBlock = <h2>Tasks -- click on each task to edit it</h2>;
        if (ifAttribute(opptask[0].contactname)) {
          OppTaskBlock = (
            <div className="mt2">
              {opptask.map(opptask => (
              <SingleOppTask opptask={opptask} key={opptask.id} />
              ))}
            </div>
          );
        } else OppTaskBlock = null;
      }
    }
    return !isSignInPending() ? (
      <div className={classes.root}>
        <Nav
          profileImage={
            person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
          }
          logout={handleSignOut.bind(this)}
        />
        {opp.map(opp => (
          <div className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
              <div class="">
                <div className="">
                  <img
                    src={`https://avatars.io/twitter/${opp.twitterHandle}`}
                    className=""
                    alt=""
                  />
                </div>
                <div className={classes.table}>
                  <Typography>
                    {opp.oppname} {' '}
                  </Typography>
                </div>
                <div className="">
                  <div className="tl">
                    {ContactDateBlock}
                    {AccountBlock}
                    {AmountBlock}
                    {ProbabilityBlock}
                    {UserCountryBlock}
                  </div>
                  <div className="tl">
                    {SocialBlock}
                    {TwitterBlock}
                    <br />
                    {BlockstackBlock}
                    <br />
                    {TaskBlock}
                    {OppTaskBlock}
                  </div>
                </div>
              </div>
            <div className="mt3 right-ns tr pr4">
              <a
                className="pointer link dim ba bw1 ph2 pv2 mb2 dib no-underline ba b--black black mr2 "
                onClick={() => {
                  this.deleteOpp();
                }}
              >
                Delete Opportunity
              </a>
              <Link
                to={{
                  pathname: '/edit-opportunity',
                  search: `?id=${opp.id}`,
                }}
                className="link dim ba bw1 ph2 pv2 mb2 dib no-underline black mr2"
              >
                ✏️️️ Edit Opportunity
              </Link>
              <Link
                to={{
                  pathname: '/add-opptask',
                }}
                className="link dim ba bw1 ph2 pv2 mb2 dib no-underline black mr2"
              >
                ✏️️️ Add Opportunity Task
              </Link>
            </div>
            </Grid>
          </Container>
        </div>
          ))}
      </div>
    ) : null;
  }
}

const SingleOppPage = withRouter(mySingleOppPage);

export default SingleOppPage;
