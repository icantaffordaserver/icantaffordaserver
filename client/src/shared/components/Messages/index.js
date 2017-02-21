import React from 'react';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Messages extends React.Component {
  render() {
    return this.props.messages.success ? (
      <Message success list={this.props.messages.success.map((message) => message.msg)} />
    ) : this.props.messages.error ? (
      <Message error list={this.props.messages.error.map((message) => message.msg)} />
    ) : this.props.messages.info ? (
      <Message warning list={this.props.messages.info.map((message) => message.msg)} />
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(Messages);
