import React from 'react'
import moment from 'moment'

import { Button, Title, Subheading, Text, Tag } from '../../../../styles'
import {
  ProfileWrapper,
  User,
  UserDetails,
  ProfilePhoto,
  Tags,
  QASection,
  QA,
  Left,
  Right,
  Avatar,
} from './styles'
import { Modal, Icon } from 'semantic-ui-react'

export default props => {
  const user = props.user
  return (
    <Modal basic trigger={props.trigger}>
      <ProfileWrapper>
        <User>
          {props.connection.status === 'MATCHED' ? (
            <ProfilePhoto>
              <Icon name="lock" size="huge" />
              <p>
                Pictues are only displayed once both parties have accepted the
                invitation!
              </p>
            </ProfilePhoto>
          ) : (
            <Avatar
              src={'https://api.adorable.io/avatars/285/' + user.email + '.png'}
            />
          )}
          <UserDetails>
            <Title fullWidth small left darkGray noMargin>
              {user.firstName} {user.lastName}
            </Title>
            <i>
              <Subheading fullWidth left darkGray>
                {moment(props.connection.time).format(
                  '[Connect on] MMM[.] D [at] h:MMA',
                )}
              </Subheading>
            </i>
            <Tags>
              {user.interests &&
                user.interests.map(interest => <Tag>#{interest.name}</Tag>)}
            </Tags>
            <Text left>{user.bio}</Text>
          </UserDetails>
        </User>
        <QASection>
          <Left />
          <QA />
          <QA />
          <Right />
        </QASection>
        {props.connection.status === 'MATCHED' && (
          <Button
            square
            small
            onClick={() => props.scheduleInvitation(props.connection)}
          >
            Invite to Conversation
          </Button>
        )}
      </ProfileWrapper>
    </Modal>
  )
}
