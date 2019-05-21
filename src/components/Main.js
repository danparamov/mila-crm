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
import Profile from './Profile';
import SignIn from './SignIn';
import Contacts from './Contacts';
import Updates from './Updates';
import AddContact from './AddContact';
import AddAccount from './AddAccount';
import AddOpp from './AddOpp';
import Settings from './Settings';
import SingleContactPage from './SingleContactPage';
import SingleAccountPage from './SingleAccountPage';
import SingleOppPage from './SingleOppPage';
import Accounts from './Accounts1';
import Opportunities from './Opportunities';

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
      <main className="sans-serif">
        {!isUserSignedIn() ? (
          <Switch>
            <Route path="/updates" component={Updates} />

            <Route
              path="/contact"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/contacts"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/account"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/opportunity"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />

            <Route
              path="/accounts1"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/opportunities"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />

            <Route
              path="/add-contact"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/add-account"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/add-opportunity"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />

            <Route
              path="/edit-contact"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/edit-account"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/edit-opportunity"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />

            <Route
              path="/settings"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
          </Switch>
        ) : (
          <Switch>
            <Route path="/updates" component={Updates} />

            <Route
              path="/add-contact"
              component={() => (
                <AddContact handleSignOut={this.handleSignOut} />
              )}
            />
             <Route
              path="/add-account"
              component={() => (
                <AddAccount handleSignOut={this.handleSignOut} />
              )}
            />
             <Route
              path="/add-opportunity"
              component={() => (
                <AddOpp handleSignOut={this.handleSignOut} />
              )}
            />

            <Route
              path="/edit-contact"
              component={() => (
                <EditContact handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/edit-account"
              component={() => (
                <EditAccount handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/edit-opportunity"
              component={() => (
                <EditOpp handleSignOut={this.handleSignOut} />
              )}
            />

            <Route
              path="/settings"
              component={() => <Settings handleSignOut={this.handleSignOut} />}
            />
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
              path="/account"
              component={() => (
                <SingleAccountPage handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/opportunity"
              component={() => (
                <SingleOppPage handleSignOut={this.handleSignOut} />
              )}
            />

            <Route
              path="/accounts1"
              component={() => (
                <Accounts handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/opportunities"
              component={() => (
                <Opportunities handleSignOut={this.handleSignOut} />
              )}
            />

            <Route
              path="/"
              component={() => <Profile handleSignOut={this.handleSignOut} />}
            />
          </Switch>
        )}
      </main>
    );
  }
}
