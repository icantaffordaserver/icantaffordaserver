import React from 'react'
import moment from 'moment'

import UserProfile from '../UserProfile'

import { UpcomingWrapper, Avatar, Tags } from './styles'
import { Tag, Title, Subheading, Text, Button } from '../../../../styles'
import EmptyProfile from '../../../../../../assets/pictures/empty_avatar.jpg'

const UpcomingComponent = props => {
  const connection = props.connection
  const user = connection && connection.participants[0]

  if (connection) {
    return (
      <UpcomingWrapper>
        <Avatar
          src={user.profilePhotoUrl ? user.profilePhotoUrl : EmptyProfile}
        />
        <Title fullWidth small darkGray>
          {user.firstName} {user.lastName}
        </Title>
        <Subheading fullWidth darkGray>
          {connection &&
            moment(connection.connectionTime).format(
              '[Connect on] MMM[.] D [at] h:MMA',
            )}
        </Subheading>
        <Tags>
          {user.connectionInterests.map((interest, i) => (
            <Tag key={i}>{interest.name}</Tag>
          ))}
        </Tags>
        <Text light>{user.bio}</Text>
        <UserProfile
          user={user}
          connection={connection}
          trigger={
            <Button square darkGray small fullWidth>
              See More
            </Button>
          }
        />
      </UpcomingWrapper>
    )
  } else {
    return (
      <UpcomingWrapper>
        <p>
          Nothing here yet, but we're sure you’ll have a bunch of invitations
          coming your way soon!
        </p>
      </UpcomingWrapper>
    )
  }
}

export default UpcomingComponent
