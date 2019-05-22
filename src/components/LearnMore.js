import React from 'react';
import Floating from './styles/Floating';
import Grow from '../assets/funnelicon.jpg';
import Create from '../assets/play.jpg';
import Plans from '../assets/buildings.jpg';

export default function LearnMore() {
  return (
    <div className="pa3">
      <div>
        <h1>Create accounts, contacts and opportunities knowing that is your data</h1>
      </div>
      <div>
        <Floating src={Grow} className="mw-100 w-70-m w-40-l" />
        <h1>Grow your business where everything is encrypted</h1>
      </div>
      <div>
        <Floating src={Plans} className="mw-100 w-70-m w-40-l" />
        <h1>Security and privacy come first</h1>
        <p className="mid-gray">
          As we're leveraging the Blockstack network, you get to own and host
          your own data.
        </p>
        <p className="lh-copy mid-gray">
          Learn more about{' '}
          <a
            href="https://www.blockstack.org"
            className="black b
            no-underline bg-green pv1 ph1 bg-green b--black pointer"
          >
            Blockstack
          </a>{' '}
        </p>
      </div>
    </div>
  );
}
