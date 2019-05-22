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
        <p className="lh-copy mid-gray">
          Here is our{' '}
          <a
            href="https://www.notion.so/milacrm/5f0435f1a0974109b814a640ab664d25?v=e7d2a0ec348548859d2f2f438a46281c"
            className="black b
            no-underline bg-red pv1 ph1 bg-red b--black pointer"
          >
            Roadmap
          </a>{' '}
        </p>
        <p className="lh-copy mid-gray">
          Get in touch with us and send us a message on{' '}
          <a
            href="https://www.twitter.com/danparamov"
            className="black b
            no-underline bg-yellow pv1 ph1 bg-yellow b--black pointer"
          >
            Twitter
          </a>{' '}
        </p>
      </div>
    </div>
  );
}
