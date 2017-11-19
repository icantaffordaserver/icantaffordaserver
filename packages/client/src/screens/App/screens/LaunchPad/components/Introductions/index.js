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
  Pass,
} from './styles'
import viewIcon from '../../../../shared/assets/view.svg'

class IntroductionsComponent extends Component {
  render() {
    return (
      <IntroductionsContainer>
        {this.props.introductions &&
          this.props.introductions.slice(0, 4).map(introduction => {
            const user = introduction.participants[0]
            return (
              <Introduction key={introduction.id}>
                <Pass
                  onClick={() => this.props.passInvitation(introduction.id)}
                >
                  <Icon name="close" size="large" />
                </Pass>
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
                    connection={{
                      id: introduction.id,
                      time: introduction.connectionTime,
                      accepted: introduction.accepted,
                      status: introduction.status,
                    }}
                    user={user}
                    scheduleInvitation={this.props.scheduleInvitation}
                    trigger={<View src={viewIcon} />}
                  />
                  <Tags>
                    {user.connectInterests &&
                      user.connectInterests.map(interest => (
                        <Tag>{interest.name}</Tag>
                      ))}
                  </Tags>
                </Info>
              </Introduction>
            )
          })}
        {this.props.introductions.length > 4 && (
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
