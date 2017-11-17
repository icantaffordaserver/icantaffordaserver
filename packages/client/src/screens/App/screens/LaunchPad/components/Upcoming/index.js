import React from 'react'
import moment from 'moment'

import { UpcomingWrapper, Avatar, Tags } from './styles'

import { Tag, Title, Subheading, Text, Button } from '../../../../styles'
const UpcomingComponent = props => {
  const connection = props.connection
  const user = connection.participants[0]

  return (
    <UpcomingWrapper>
      <Avatar
        src={'https://api.adorable.io/avatars/285/' + user.email + '.png'}
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
        <Tag>#Cool</Tag>
        <Tag>#Stuff</Tag>
        <Tag>#Smile</Tag>
      </Tags>

      <Text light>{user.bio}</Text>
      <Button square darkGray small fullWidth>
        See More
      </Button>
    </UpcomingWrapper>
  )
}

export default UpcomingComponent
