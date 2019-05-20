import React from 'react';
import Floating from './styles/Floating';
import CRMIcons from '../assets/keepintouchicons.png';
import CRMIcons2 from '../assets/iconstwokit.png';
import PriorityLabel from '../assets/priority.png';

export default function LearnMore() {
  return (
    <div className="pa3">
      <div>
        <Floating src={CRMIcons} className="mw-100 w-70-m w-40-l" />
        <h1>🌲 Create leads, contacts and opportunities knowing that you data is yours</h1>
        <p className="mid-gray mw-100 w-50-l w-20-l center">
          Is your sales funnel, not ours! Is your data, not ours!
        </p>
      </div>
      <div>
        <Floating src={PriorityLabel} className="mw-100 w-70-m w-40-l" />
        <h1>👥 Grow your business and protect your data</h1>
        <p className="mid-gray">
          Enjoy the Dashboard, Contacts, Accounts and Opportunities!
        </p>
      </div>
      <div>
        <Floating src={CRMIcons2} className="mw-100 w-70-m w-40-l" />
        <h1>🔐 Keep your data on your Network</h1>
        <p className="mid-gray">
          As we're leveraging the Blockstack network, you get to own and host
          your own data.
        </p>
        <p className="b">No setup required.</p>
        <p className="lh-copy mid-gray">
          You don't have to trust me, you can verify yourself checking our{' '}
          <a
            href="https://github.com/danparamov/mila-crm"
            className="black b
            no-underline bg-light-yellow pv1 ph1 hover-bg-yellow"
          >
            Open Source
          </a>{' '}
          code
        </p>
      </div>
    </div>
  );
}
