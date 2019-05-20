import React from 'react';

function OppBubble(props) {
  const { opp } = props;
  return (
    <div className="w-20 w-10-ns fl">
      <img
        className="fl br-100 w3 mt2-m mt0-l w-100 w-70-l ba bw2 b--white"
        alt=""
        src={`https://avatars.io/twitter/${opp.twitterHandle}`}
      />
    </div>
  );
}

export default OppBubble;
