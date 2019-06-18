import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Logo from '../assets/milalogo.jpg';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Contacts from '@material-ui/icons/Face';
import Dashboard from '@material-ui/icons/Dashboard';
import Accounts from '@material-ui/icons/Group';
import Tasks from '@material-ui/icons/Assignment';
import Settings from '@material-ui/icons/Settings';
import Opportunities from '@material-ui/icons/Favorite';
import Updates from '@material-ui/icons/Update';
import Logout from '@material-ui/icons/Power';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

const drawerWidth = "relevant";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles(theme => ({
  root: {
  display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));


function ProfileDesktop(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
          >
          <StyledMenuItem>
            <ListItemIcon>
            <Link
              to="/settings"
              className="link dim dib green"
              >
            <div>
              <img
                src={props.profileImage}
                className="h3 w3 br-100"
                id="avatar-image"
                alt=""
              />
            </div>
            <p className="h6">
              <span id="heading-name">{props.name}</span>
              <Typography className="green">{props.username}</Typography>
            </p>
            </Link>
            </ListItemIcon>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
              <Link
                to="/profile"
                className="link dim dib green"
              >
                <Typography>
                 Dashboard
                </Typography>
              </Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <Contacts />
            </ListItemIcon>
            <Link
              to="/contacts"
              className="link dim dib green"
            >
              <Typography>
               Contacts
              </Typography>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <Accounts />
            </ListItemIcon>
            <Link
              to="/accounts"
              className="link dim dib green"
            >
              <Typography>
               Accounts
              </Typography>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <Opportunities />
            </ListItemIcon>
            <Link
              to="/opportunities"
              className="link dim dib green"
            >
              <Typography>
               Opportunities
              </Typography>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <Tasks />
            </ListItemIcon>
            <Link
              to="/tasks"
              className="link dim dib green"
            >
              <Typography>
               Tasks
              </Typography>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <Link
              to="/settings"
              className="link dim dib green"
            >
              <Typography>
               Settings
              </Typography>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <Updates />
            </ListItemIcon>
            <Link
              to="/updates"
              className="link dim dib green"
            >
              <Typography>
               Updates
              </Typography>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <a
              className="link dim dib green"
              id="signout-button"
              onClick={props.logout}
            >
            <Typography>
             Logout
            </Typography>
            </a>
          </StyledMenuItem>
        </Drawer>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Coming Soon"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search'}}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ProfileDesktop;
