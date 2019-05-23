import React from 'react';
import NavLoggedOut from './NavLoggedOut';

const Updates = () => (
  <div>
    <NavLoggedOut />
    <div className="tl ph3 ph5-ns ph7-l">
      <h1>Updates</h1>
      <p>
        Mila is a solo project made in 🇪🇨 Ecuador by me,{' '}
        <a href="https://twitter.com/danparamov" className="black">
          Daniel Paramo
        </a>
      </p>
      <p>
        Here is our{' '}
        <a
          href="https://www.notion.so/milacrm/5f0435f1a0974109b814a640ab664d25?v=e7d2a0ec348548859d2f2f438a46281c"
          className="black"
        >
          Roadmap
        </a>
        , you can add feature requests if you want!
      </p>
    </div>
  </div>
);

export default Updates;
