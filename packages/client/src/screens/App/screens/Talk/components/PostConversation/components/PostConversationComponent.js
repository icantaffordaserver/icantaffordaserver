import React from 'react'

import {
  Form,
  FormGroup,
  FormButton,
  FormLabel,
  FormTextArea,
} from '../../../../../styles/Forms'

import { Checkbox } from 'semantic-ui-react'

import ReportComponent from './ReportComponent'

class PostConversationComponent extends React.Component {
  state = {
    review: '',
  }
  updateField = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    return (
      <div>
        <h1>Post Conversation</h1>

        <div style={{ width: '80%', margin: 'auto' }}>
          <Form onSubmit={this.handleReview}>
            <FormGroup>
              <FormLabel htmlFor="user-review">
                How was your conversation with {this.props.user.firstName}
              </FormLabel>
              <FormTextArea
                onChange={this.updateField}
                placehoder={`Review ${this.props.user.firstName}`}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Checkbox label="I'd like to talk again" />
            </FormGroup>

            <FormButton>Submit</FormButton>
          </Form>

          <div>
            <ReportComponent
              onReport={this.handleReport}
              user={this.props.user}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default PostConversationComponent
