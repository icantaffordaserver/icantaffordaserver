import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import moment from 'moment'

import UserProfile from '../UserProfile'

import { Icon } from 'semantic-ui-react'
import { Title, Subheading, Tag } from '../../../../styles'
import {
  IntroductionsContainer,
  Introduction,
  ProfilePhoto,
  Info,
  Tags,
  View,
} from './styles'
import viewIcon from '../../../../shared/assets/view.svg'

class IntroductionsComponent extends Component {
  render() {
    const { connectionSuggestions } = this.props.introductions

    return (
      <IntroductionsContainer>
        {connectionSuggestions &&
          connectionSuggestions.slice(0, 4).map(suggestion => {
            const introduction = suggestion.connection
            const user = introduction.participants[0]
            return (
              <Introduction key={introduction.id}>
                <ProfilePhoto>
                  <Icon name="lock" size="huge" />
                  <p>
                    Pictues are only displayed once both parties have accepted
                    the invitation!
                  </p>
                </ProfilePhoto>
                <Info>
                  <Title fullWidth left small darkGray>
                    {user.firstName} {user.lastName}
                  </Title>
                  <Subheading fullWidth left darkGray>
                    <i>
                      {moment(introduction.connectionTime).format(
                        '[Connect on] MMM[.] D [at] h:MMA',
                      )}
                    </i>
                  </Subheading>
                  <UserProfile
                    loading={this.props.loading}
                    connection={{
                      id: suggestion.id,
                      time: introduction.connectionTime,
                      accepted: suggestion.accepted,
                      status: introduction.status,
                    }}
                    user={user}
                    scheduleInvitation={this.props.scheduleInvitation}
                    passInvitation={this.props.passInvitation}
                    trigger={<View src={viewIcon} />}
                  />
                  <Tags>
                    {user.connectInterests &&
                      user.connectInterests.map((interest, i) => (
                        <Tag key={i}>{interest.name}</Tag>
                      ))}
                  </Tags>
                </Info>
              </Introduction>
            )
          })}
        {connectionSuggestions.length > 4 && (
          <Icon
            style={{ margin: 'auto', cursor: 'pointer' }}
            name="chevron right"
            size="big"
            onClick={this.props.rotate}
          />
        )}
      </IntroductionsContainer>
    )
  }
}

export default withApollo(IntroductionsComponent)
