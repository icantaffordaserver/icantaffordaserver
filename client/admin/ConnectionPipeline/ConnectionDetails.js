import React from 'react';
import moment from 'moment';
import { Modal, Card, Grid, Image, Button, Divider } from 'semantic-ui-react';

class ConnectionDetails extends React.Component {
  formatConnectionTime(connectionTime) {
    return moment(connectionTime).isValid()
            ? moment(connectionTime).format('hh:mm A on MMM Do, YYYY') : 'Not Set';
  }

  render() {
    const { selectedMatch } = this.props;
    const { accounts, matchedBy, connection_time } = selectedMatch;
    return (
      <Modal.Content>
        <Grid stackable columns={2}>
          {accounts.map((account) => {
            const { profile, phone_number, email, gravatar } = account;
            const { first_name, last_name, gender, city, state_province, country } = profile;
            return (
              <Grid.Column key={account.id}>
                <Card fluid>
                  <Image src={gravatar} fluid />
                  <Card.Content>
                    <Card.Header>{`${first_name} ${last_name}`}</Card.Header>
                    <Card.Meta>{`${city}, ${state_province} (${country})`}</Card.Meta>
                    <Card.Description>
                      <div className="capitalize"><label>Gender: </label> {gender}</div>
                      <div><label>Phone Number:</label> {phone_number}</div>
                      <div><label>Email:</label> {email}</div>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          })}
        </Grid>
        <Divider section />
        <div><label>Connection ID:</label> {selectedMatch.id}</div>
        <div><label>Matched By:</label> {`${matchedBy.profile.first_name} ${matchedBy.profile.last_name}`}</div>
        <div><label>Connection Time:</label> {this.formatConnectionTime(connection_time)}</div>
      </Modal.Content>
    );
  }
}

export default ConnectionDetails;
