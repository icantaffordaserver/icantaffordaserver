import React, { Component } from 'react'

import moment from 'moment'

import UserProfile from '../UserProfile'

import { Icon } from 'semantic-ui-react'
import { Title, Subheading } from '../../../../styles'
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
  state = {
    introductions: this.props.introductions,
  }
  rotate = () => {
    let arr = this.state.introductions
    const first = arr.shift()
    arr.push(first)
    this.setState({ introductions: arr })
  }

  render() {
    return (
      <IntroductionsContainer>
        {this.state.introductions &&
          this.state.introductions.slice(0, 4).map(introduction => {
            const user = introduction.participants[0]
            return (
              <Introduction
                key={introduction.id}
                img={
                  'https://api.adorable.io/avatars/285/' + user.email + '.png'
                }
              >
                <ProfilePhoto />
                <Info>
                  <Title fullWidth left small darkGray>
                    {user.firstName} {user.lastName}
                  </Title>
                  <Subheading fullWidth left darkGray>
                    <i>
                      Connect on{' '}
                      {moment(introduction.connectionTime).format(
                        'MMM[.] D [at] h:MMA',
                      )}
                    </i>
                  </Subheading>
                  <UserProfile user={user} trigger={<View src={viewIcon} />} />
                  <Tags>
                    <p>#photography</p>
                    <p>#other</p>
                    <p>#sickstuff</p>
                  </Tags>
                </Info>
              </Introduction>
            )
          })}
        {this.state.introductions.length > 4 && (
          <Icon
            style={{ margin: 'auto', cursor: 'pointer' }}
            name="chevron right"
            size="big"
            circular
            onClick={this.rotate}
          />
        )}
      </IntroductionsContainer>
    )
  }
}

export default IntroductionsComponent
