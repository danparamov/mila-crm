import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';
import EditContact from './EditContact';
import EditAccount from './EditAccount';
import EditOpp from './EditOpp';
import EditUserInfo from './EditUserInfo';

import IniPage from './IniPage';
import SignIn from './SignIn';
import Contacts from './Contacts';
import Updates from './Updates';
import AddContact from './AddContact';
import AddAccount from './AddAccount';
import AddOpp from './AddOpp';
import AddUserInfo from './AddUserInfo';

import Profile from './Profile';
import SingleContactPage from './SingleContactPage';
import SingleAccountPage from './SingleAccountPage';
import SingleOppPage from './SingleOppPage';
import Accounts from './Accounts';
import Opportunities from './Opportunities';

import Tasks from './Tasks';
import ContactTasks from './ContactTasks';
import EditContactTask from './EditContactTask';
import AddContactTask from './AddContactTask';
import AccountTasks from './AccountTasks';
import EditAccountTask from './EditAccountTask';
import AddAccountTask from './AddAccountTask';
import OppTasks from './OppTasks';
import EditOppTask from './EditOppTask';
import AddOppTask from './AddOppTask';

export default class Main extends Component {
  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then(userData => {
        window.location = window.location.origin;
      });
    }
  }

  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn(origin, `${origin}/manifest.json`, [
      'store_write',
      'publish_data',
    ]);
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
    return (
      <main class="section_container_dash">
        {!isUserSignedIn() ? (
          <Switch>
            <Route
              path="/contact"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/contacts"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
             <Route
              path="/add-contact"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
             <Route
              path="/edit-contact"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/account"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
             <Route
              path="/accounts"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/add-account"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/edit-account"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />

            <Route
              path="/opportunity"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/opportunities"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/add-opportunity"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/edit-opportunity"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />

            <Route
              path="/tasks"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/contacttasks"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
             <Route
              path="/edit-contacttask"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
             <Route
              path="/add-contacttask"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/accounttasks"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
             <Route
              path="/edit-accounttask"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
             <Route
              path="/add-accounttask"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
             <Route
              path="/opptasks"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
             <Route
              path="/edit-opptask"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
             <Route
              path="/add-opptask"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/profile"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/edit-user-info"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
             <Route
              path="/add-user-info"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/updates"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
          </Switch>
        ) : (
          <Switch>
            <Route
              path="/contact"
              component={() => (
                <SingleContactPage handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/contacts"
              component={() => (
                <Contacts handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/add-contact"
              component={() => (
                <AddContact handleSignOut={this.handleSignOut} />
              )}
            />
             <Route
              path="/edit-contact"
              component={() => (
                <EditContact handleSignOut={this.handleSignOut} />
              )}
            />
             <Route
              path="/account"
              component={() => (
                <SingleAccountPage handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/accounts"
              component={() => (
                <Accounts handleSignOut={this.handleSignOut} />
              )}
            />
             <Route
              path="/add-account"
              component={() => (
                <AddAccount handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/edit-account"
              component={() => (
                <EditAccount handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/opportunity"
              component={() => (
                <SingleOppPage handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/opportunities"
              component={() => (
                <Opportunities handleSignOut={this.handleSignOut} />
              )}
            />
             <Route
              path="/add-opportunity"
              component={() => (
                <AddOpp handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/edit-opportunity"
              component={() => (
                <EditOpp handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/tasks"
              component={() => (
                <Tasks handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/contacttasks"
              component={() => (
                <ContactTasks handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/edit-contacttask"
              component={() => (
                <EditContactTask handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/add-contacttask"
              component={() => (
                <AddContactTask handleSignOut={this.handleSignOut} />
              )}
            />
             <Route
              path="/accounttasks"
              component={() => (
                <AccountTasks handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/edit-accounttask"
              component={() => (
                <EditAccountTask handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/add-accounttask"
              component={() => (
                <AddAccountTask handleSignOut={this.handleSignOut} />
              )}
            />
             <Route
              path="/opptasks"
              component={() => (
                <OppTasks handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/edit-opptask"
              component={() => (
                <EditOppTask handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/add-opptask"
              component={() => (
                <AddOppTask handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/profile"
              component={() => (
                <Profile handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/edit-user-info"
              component={() => (
                <EditUserInfo handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/add-user-info"
              component={() => (
                <AddUserInfo handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/updates"
              component={() => <Updates handleSignOut={this.handleSignOut} />}
            />
            <Route
              path="/"
              component={() => <IniPage handleSignOut={this.handleSignOut} />}
            />
          </Switch>
        )}
      </main>
    );
  }
}
