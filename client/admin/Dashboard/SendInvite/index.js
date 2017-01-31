import React from 'react';
import { connect } from 'react-redux';
import { submitInviteForm } from './actions';
import { Form, Header, Segment, Button, Icon } from 'semantic-ui-react';

class SendInvite extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event, { formData }) {
    event.preventDefault();
    const options = { resend: false };
    this.props.dispatch(submitInviteForm(formData, this.props.auth.user.id, options));
  }

  render() {
    return (
      <div>
        <Header as="h2" attached="top">
          Send Invite
        </Header>
        <Segment attached>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group widths="equal">
              <Form.Input label="First Name" name="firstName" placeholder="First Name" />
              <Form.Input label="Last Name" name="lastName" placeholder="Last Name" />
            </Form.Group>
            <Form.Input label="Email" name="email" placeholder="Email" />
            <Button color="green"><Icon name="mail" />Send</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SendInvite);
