import React from 'react';
import LaunchPad from '../../components/LaunchPad';
import Messages from '../../Messages';

function Home(props) {
  return (
    <div>
      <Messages />
      <LaunchPad />
    </div>
  );
}

export default Home;
