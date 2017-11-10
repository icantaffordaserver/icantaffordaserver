import React from 'react'

import moment from 'moment'

import UserProfile from '../UserProfile'

import { IntroductionsContainer, Introduction } from './styles'
import { Button, Text } from '../../../../styles'
import { Icon } from 'semantic-ui-react'

export default props => {
  return (
    <IntroductionsContainer>
      {props.introductions &&
        props.introductions.map(introduction => (
          <Introduction
            key={introduction.id}
            img={
              'https://api.adorable.io/avatars/285/' +
              introduction.participants[0].email +
              '.png'
            }
          >
            <div className="overlay">
              <UserProfile user={introduction.participants[0]} />
            </div>
            <div className="info">
              <Text white>
                {introduction.participants[0].firstName}{' '}
                {introduction.participants[0].firstName} |{' '}
                {moment(introduction.connectionTime).format('h:MMA MMM DD')}
              </Text>
              <Button
                fullWidth
                square
                onClick={() => props.scheduleConversation(introduction)}
              >
                Invite to Chat
              </Button>
            </div>
          </Introduction>
        ))}
    </IntroductionsContainer>
  )
}
