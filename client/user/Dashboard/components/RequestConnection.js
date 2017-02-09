/**
 * Created by alexandermann on 2017-02-06.
 */
import React from 'react';
import { Header, Button, Form, TextArea, Divider } from 'semantic-ui-react';

class RequestConnection extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnCommentChange = this.handleOnCommentChange.bind(this);
    this.state = {
      requestConnectionComment: '',
    };
  }

  handleOnCommentChange(e) {
    this.setState({
      requestConnectionComment: e.target.value,
    });
  }

  requestConnectionForm() {
    return (
      <div>
        <Form>
          <TextArea
            placeholder="Give our matching experts more info on who you want to talk with or about"
            onChange={this.handleOnCommentChange}
          />
        </Form>
        <Divider />
        <Button
          disabled={!this.props.isAllowed}
          onClick={() => this.props.requestConnection(this.state.requestConnectionComment)}
          size="massive"
          positive
          fluid
        >
          Match me with someone!
        </Button>
      </div>
    );
  }

  requestPending() {
    return (
      <div>
        <Header as="h1" textAlign="center">
          We have a conversation headed your way. Stay tuned..
        </Header>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header as="h1" textAlign="center">Request Connection</Header>
        {this.props.isAllowed ? this.requestConnectionForm() : this.requestPending()}
      </div>
    );
  }
}

RequestConnection.propTypes = {
  isAllowed: React.PropTypes.bool,
  requestConnection: React.PropTypes.func,
};

RequestConnection.defaultProps = {
  isAllowed: false,
};

export default RequestConnection;
