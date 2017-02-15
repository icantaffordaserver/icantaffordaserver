import React from 'react';
import { Message } from 'semantic-ui-react';

class Messages extends React.Component {
  render() {
    return this.props.messages.success ? (
        <Message success>
          <Message.List>
            {this.props.messages.success.map((message, index) =>
              <Message.List key={index}>{message.msg}</Message.List>
            )}
          </Message.List>
        </Message>
      ) : this.props.messages.error ? (
          <Message error list={this.props.messages.error}>
            <Message.List>
              {this.props.messages.error.map((message, index) =>
                <Message.Item key={index}>{message.msg}</Message.Item>
              )}
            </Message.List>
          </Message>
        ) : this.props.messages.info ? (
            <Message warning>
              <Message.List>
                {this.props.messages.info.map((message, index) =>
                  <Message.Item key={index}>{message.msg}</Message.Item>
                )}
              </Message.List>
            </Message>
          ) : null;
  }
}

export default Messages;
