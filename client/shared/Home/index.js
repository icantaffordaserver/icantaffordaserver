import React from 'react';
import { connect } from 'react-redux';
import Messages from '../Messages';

function Home(props) {
  return (
    <div className="container-fluid">
      <Messages messages={props.messages} />
      Hello World
    </div>
  );
}

const mapStateToProps = state => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(Home);
