import React from 'react'

import {
  Button,
  TextArea,
  ColumnContainer,
  Content,
  Section,
  Title,
  Subheading,
  Text,
} from '../../../../../styles'

import Report from '../../Report'

class PostConversationComponent extends React.Component {
  render() {
    return (
      <ColumnContainer>
        <Title large>Post Conversation</Title>
        <Subheading darkGray medium fullWidth>
          Thanks for using Pluto! We're always working hard to make the platform
          better for you. Please take a couple minutes to give us some feedback
          so we can help foster even better conversations!
        </Subheading>
        <Content expanded>
          <Section>
            <Title left medium fullWidth primary>
              Technical Feedback
            </Title>
            <Section gray inline>
              <Text left>Was the video quality good?</Text>
              <input
                type="checkbox"
                name="videoSatisfactory"
                checked={this.props.videoSatisfactory}
                onChange={this.props.handleChange}
              />
            </Section>
            <Section darkGray inline>
              <Text left white>
                Was the audio quality good?
              </Text>
              <input
                type="checkbox"
                name="audioSatisfactory"
                checked={this.props.audioSatisfactory}
                onChange={this.props.handleChange}
              />
            </Section>
          </Section>
          <Section>
            <Title left medium fullWidth primary>
              Conversation Feedback
            </Title>
            <Section gray inline>
              <Text left>
                Did you enjoy the conversation with{' '}
                {this.props.otherUser.firstName}?
              </Text>
              <Text>
                <input
                  type="checkbox"
                  name="enjoyedConversation"
                  checked={this.props.enjoyedConversation}
                  onChange={this.props.handleChange}
                />
              </Text>
            </Section>
            <Section darkGray>
              <Text left white>
                Do you have any comments for {this.props.otherUser.firstName}?
              </Text>
              <TextArea name="comment" onChange={this.props.handleChange} />
            </Section>
          </Section>
          <Section>
            <Title left medium fullWidth primary>
              Journal
            </Title>
            <Subheading left darkGray fullWidth>
              This is for your eyes only. Jot down anything from the
              conversation you'd like to remember.
            </Subheading>
            <TextArea name="journalEntry" onChange={this.props.handleChange} />
          </Section>
          <Button
            secondary
            loading={this.props.loading}
            onClick={this.props.handleReview}
          >
            Submit
          </Button>
          <Report button />
        </Content>
      </ColumnContainer>
    )
  }
}

export default PostConversationComponent
