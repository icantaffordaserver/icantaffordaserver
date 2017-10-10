import React from 'react';
import { Form, Header, Segment, Button, Icon, Label } from 'semantic-ui-react';

const propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  labelMessage: React.PropTypes.string,
  labelColor: React.PropTypes.string,
};

const defaultProps = {
  labelMessage: '',
  labelColor: '',
};

function SendInvite(props) {
  const { labelMessage, labelColor } = props;
  return (
    <div>
      <Header as="h2" attached="top">
        Send Invite
      </Header>
      <Segment attached>
        <Form onSubmit={props.onSubmit}>
          <Form.Group widths="equal">
            <Form.Input label="First Name" name="firstName" placeholder="First Name" />
            <Form.Input label="Last Name" name="lastName" placeholder="Last Name" />
          </Form.Group>
          <Form.Input label="Email" name="email" placeholder="Email" />
          <Button color="green" loading={props.loading}><Icon name="mail" />Send</Button>
          {labelMessage &&
            <Label color={labelColor} pointing="left" content={labelMessage} />}
        </Form>
      </Segment>
    </div>
  );
}

SendInvite.propTypes = propTypes;
SendInvite.defaultProps = defaultProps;

export default SendInvite;
