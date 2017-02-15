import React from 'react';
import { Message } from 'semantic-ui-react';

class Messages extends React.Component {
  render() {
    return this.props.messages.success ? (
        <Message success>
          {this.props.messages.success.map((message, index) =>
            <div key={index}>{message.msg}</div>)}
        </Message>
      ) : this.props.messages.error ? (
          <Message error list={this.props.messages.error}>
            {this.props.messages.error.map((message, index) =>
              <div key={index}>{message.msg}</div>)}
          </Message>
        ) : this.props.messages.info ? (
            <Message warning>
              {this.props.messages.info.map((message, index) =>
                <div key={index}>{message.msg}</div>)}
            </Message>
          ) : null;
  }
}

export default Messages;
