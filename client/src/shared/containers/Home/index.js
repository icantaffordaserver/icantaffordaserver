import React from 'react';
import { connect } from 'react-redux';
import LaunchPad from '../../components/LaunchPad';
import Messages from '../../Messages';

function Home(props) {
  return (
    <LaunchPad />
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(Home);
