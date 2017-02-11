/**
 * Created by alexandermann on 2017-02-11.
 */
import React from 'react';
import { Header, Divider, Label, Card, Button } from 'semantic-ui-react';
import moment from 'moment';

class CurrentProfile extends React.Component {

  renderQuestion(questionText) {
    return (
      <strong>{questionText}</strong>
    );
  }

  renderAnswer(answerArray) {
    return (
      <div>
        {answerArray.map((answer) => (
          <div>{answer}</div>
        ))}
      </div>
    );
  }

  render() {
    const { profileResponses } = this.props.profile.typeform_profile;
    return (
      <div>
        <Label attached="top right" color="blue">
          Last
          Updated: {moment(this.props.profile.typeform_profile.dateSubmit).format('MMM DD, YYYY')}
        </Label>
        <Header as="h1" textAlign="center">
          {this.props.profile.first_name}'s Matching Profile
        </Header>
        <Card.Group itemsPerRow={2}>
          {Object.keys(profileResponses).map((key) => {
            return (
              <Card key={key}>
                <Card.Content>
                  <Card.Header>
                    {this.renderQuestion(profileResponses[key].questionText)}
                  </Card.Header>
                  <Card.Description>
                    {this.renderAnswer(profileResponses[key].answer)}
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
        <Divider />
        <Button fluid positive onClick={this.props.handleUpdateProfile}>
          Update My Matching Profile
        </Button>
      </div>
    );
  }
}

export default CurrentProfile;
