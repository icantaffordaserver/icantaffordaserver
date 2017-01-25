import React from 'react';
import { connect } from 'react-redux';
import Messages from '../shared/Messages';

function Home(props) {
  return (
    <div className="container-fluid">
      <Messages messages={props.messages}/>
      Hello World
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(Home);