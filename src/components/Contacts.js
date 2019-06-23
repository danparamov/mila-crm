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
import SingleContact from './SingleContact';
import AddContactIcon from '@material-ui/icons/personadd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper'
import PriorityLabel from './PriorityLabel';
import'./Styles/Table.css';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Redirect } from 'react-router';

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
    tasks: [],
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

  async exportContacts() {
    const columns = Object.keys(this.state.contacts[0]).join(',');
    const rows = this.state.contacts
      .map(c => Object.values(c).join(','))
      .join('\n');
    const csv = `${columns}\n${rows}`;
    const url = await putFile('contacts.csv', csv, { encrypt: false });
    console.log(url);
    window.open(url);
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { contacts } = this.state;
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

    const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const columns = [
      { title: 'Contact', field: 'name' },
      { title: 'Account', field: 'accountname' },
      { title: 'Email', field: 'email'},
      { title: 'Country', field: 'country'},
      { title: 'LeadSource', field: 'leadsource'},
    ];

    const data = [];

    return !isSignInPending() ? (
      <div>
      <div>
        <Nav
          profileImage={
            person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
          }
          logout={handleSignOut.bind(this)}
        />
        <div className="mw9 center ph3 cf">
          <div className="w-100 w-200-ns fl ph4 tl">
            <h1> Contacts
            <Link
              to="/add-contact"
              className="f2 link dim ph3 pv2 mb2 dib white bg-green b--black"
            >
            <AddContactIcon />
            </Link> </h1>
            <div
              className="f6 link dim ph2 pv1 mb2 dib white bg-green b--black pointer"
              onClick={async () => await this.exportContacts()}
            >
              Export as CSV
            </div>
          </div>
          
        </div>
      </div>
        <MaterialTable
        icons={tableIcons}
        title="Contacts"
        columns={columns}
        data={contacts}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 600);
            
              const newContact = {
                id: Date.now(),
                created_at: Date.now(),
                name: newData.name,
                accountname: newData.accountname,
                title: newData.title,
                medium: newData.medium,
                twitterHandle: newData.twitterHandle,
                email: newData.email,
                bestcomm: newData.bestcomm,
                reachout: newData.reachout,
                telegramId: newData.telegramId,
                phoneNumber: newData.phoneNumber,
                country: newData.country,
                region: newData.region,
                streetAddress: newData.streetAddress,
                leadsource: newData.leadsource,
                description: newData.description,
                blockstackId: newData.blockstackId,
                birthDate: newData.birthDate,
                priority: newData.priority,
              };

              console.log(contacts);
              contacts.unshift(newContact);
             
              const options = { encrypt: true };
              putFile('contacts.json', JSON.stringify(contacts), options).then(() => {
                cb();
              });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 600);

              let { contacts } = this.state;     
              const newContact1 = {
                id: newData.id,
                created_at: newData.created_at,
                name: newData.name,
                accountname: newData.accountname,
                title: newData.title,
                medium: newData.medium,
                twitterHandle: newData.twitterHandle,
                email: newData.email,
                bestcomm: newData.bestcomm,
                reachout: newData.reachout,
                telegramId: newData.telegramId,
                phoneNumber: newData.phoneNumber,
                country: newData.country,
                region: newData.region,
                streetAddress: newData.streetAddress,
                leadsource: newData.leadsource,
                description: newData.description,
                blockstackId: newData.blockstackId,
                birthDate: newData.birthDate,
                priority: newData.priority,
              };
            
              // delete the contact with the same ID as the edited one
              contacts = contacts.filter(contact => contact.id !== newContact1.id);
             
              // delete the contact with the same ID as the edited one
              contacts.unshift(newContact1);
              const options = { encrypt: true };
              putFile('contacts.json', JSON.stringify(contacts), options).then(() => {
              });
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 600);

              const toDelete = oldData.id; 
              const newContactsList = contacts.filter(
                contact => contact.id !== toDelete
              );

              const options = { encrypt: true };
              putFile('contacts.json', JSON.stringify(newContactsList), options).then(
                () => {
                  //this.props.history.push('/contacts');
                  return <Redirect to={`/contacts`} />;
                }
              );

            }),
          }}
        />
      </div>
    ) : null;
  }
}
