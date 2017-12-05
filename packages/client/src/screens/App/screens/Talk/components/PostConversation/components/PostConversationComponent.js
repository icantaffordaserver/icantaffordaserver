import React from 'react'

import { Background, Screen, Button, TextArea } from '../../../../../styles'
import Nav from '../../../../../shared/components/Navigation'
import {
  PostConvoWrapper,
  TechnicalFeedback,
  ConversationFeedback,
  Comments,
  Journal,
  TitleWrapper,
  Heading,
  SoundQuality,
  VideoQuality,
  Buttons,
  ToggleButton,
} from '../styles'

class PostConversationComponent extends React.Component {
  render() {
    const {
      videoSatisfactory,
      audioSatisfactory,
      setAudioSatisfactory,
      setVideoSatisfactory,
      handleChange,
      handleReview,
      loading,
    } = this.props
    return (
      <Background>
        <Nav />
        <Screen>
          <PostConvoWrapper>
            <TitleWrapper>
              <h1>Thank You!</h1>
              <p>
                Thanks for using Pluto. We really hope you enjoyed your
                conversation. We’re very interested in your feedback, and taking
                a couple minutes to fill out this form would really go a long
                way in helping us develop the community and platform!
              </p>
            </TitleWrapper>
            <TechnicalFeedback>
              <Heading>Technical Feedback</Heading>
              <SoundQuality>
                <h3>Was the sound quality good?</h3>
                <Buttons>
                  <ToggleButton
                    className={audioSatisfactory && 'yes'}
                    onClick={() => setAudioSatisfactory(true)}
                  >
                    Yes
                  </ToggleButton>
                  <ToggleButton
                    className={audioSatisfactory === false && 'no'}
                    onClick={() => setAudioSatisfactory(false)}
                  >
                    No
                  </ToggleButton>
                </Buttons>
              </SoundQuality>
              <VideoQuality>
                <h3>Was the video quality good?</h3>
                <Buttons>
                  <ToggleButton
                    className={videoSatisfactory && 'yes'}
                    onClick={() => setVideoSatisfactory(true)}
                  >
                    Yes
                  </ToggleButton>
                  <ToggleButton
                    className={videoSatisfactory === false && 'no'}
                    onClick={() => setVideoSatisfactory(false)}
                  >
                    No
                  </ToggleButton>
                </Buttons>
              </VideoQuality>
            </TechnicalFeedback>
            <ConversationFeedback>
              <Heading>Conversation Feedback</Heading>
              <Comments>
                <h3>
                  How was the quality of the content in your conversation? How
                  do you feel afterwards?
                </h3>
                <TextArea name="comment" onChange={handleChange} />
              </Comments>
              <Journal>
                <h3>
                  Jot down any thoughts or notes that your conversation may have
                  inspired! No one can read this but you. (Optional)
                </h3>
                <TextArea name="journalEntry" onChange={handleChange} />
              </Journal>
            </ConversationFeedback>
            <Buttons>
              <Button round small onClick={handleReview} loading={loading}>
                Submit Feedback
              </Button>
            </Buttons>
          </PostConvoWrapper>
        </Screen>
      </Background>
    )
  }
}

export default PostConversationComponent
