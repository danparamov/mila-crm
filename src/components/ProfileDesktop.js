import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Logo from '../assets/milalogo.jpg';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ProfileDesktop(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
      <AppBar>
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
            <Link
              to="/profile"
              className="f3 link dim ph3 pv1 mb2 dib white w-10"
            >
              <Tab label="Dashboard" />
            </Link>
            <Link
              to="/contacts"
              className="f3 link dim ph3 pv1 mb2 dib white w-10"
            >
              <Tab label="Contacts" />
            </Link>
            <Link
              to="/accounts"
              className="f3 link dim ph3 pv1 mb2 dib white w-10"
            >
              <Tab label="Accounts" />
            </Link>
            <Link
              to="/opportunities"
              className="f3 link dim ph3 pv1 mb2 dib white w-10"
            >
              <Tab label="Opportunities" />
            </Link>
            <Link
              to="/tasks"
              className="f3 link dim ph3 pv1 mb2 dib white w-10"
            >
              <Tab label="Tasks" />
            </Link>
            <Link
              to="/settings"
              className="f3 link dim ph3 pv1 mb2 dib white w-10"
            >
              <Tab label="Settings" />
            </Link>
            <Link
              to="/updates"
              className="f3 link dim ph3 pv1 mb2 dib white w-10"
            >
              <Tab label="Updates" />
            </Link>
              <a
                className="pointer f3 link dim ph3 pv1 mb2 dib white w-10"
                id="signout-button"
                onClick={props.logout}
              >
                <Tab label="Logout" />
              </a>
            <Link to="/" title="MILA CRM">
              <img src={Logo} className="w-50" alt="MILA CRM" align="right"/>
            </Link><br /><br />
            </Tabs>
        </AppBar>
  );
}

export default ProfileDesktop;
