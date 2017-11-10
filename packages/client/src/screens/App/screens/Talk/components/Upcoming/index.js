import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import moment from 'moment'

import Countdown from '../../../../shared/components/Countdown'

import {
  UpcomingWrapper,
  Upcoming,
  TalkButton,
  PassButton,
  UserInfo,
  UserTags,
} from './styles'

import { Tag } from '../../../../styles'
const UpcomingComponent = props => {
  const isUpcoming = moment().isBefore(moment(props.connection.connectionTime))
  const user = props.connection.participants[0]

  return (
    <UpcomingWrapper>
      <Upcoming img={'http://lorempixel.com/1920/200/'}>
        <TalkButton
          className={isUpcoming && 'countdown'}
          onClick={() => {
            console.log(props.connection.token)
            props.history.push(`/talk/${props.connection.token}`)
            props.handleConversation()
          }}
        >
          {isUpcoming ? (
            <Countdown
              noLoader
              start={() => {}}
              startTime={props.connection.connectionTime}
            />
          ) : (
            'Talk Now'
          )}
        </TalkButton>
        <UserTags>
          <Tag>#School</Tag>
          <Tag>#Uncool things</Tag>
          <Tag>#Being lame</Tag>
        </UserTags>
        <UserInfo>
          <b>
            {user.firstName} {user.lastName}
          </b>
          | {user.location} - {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </UserInfo>
      </Upcoming>
      <PassButton>
        <p>Pass</p>
      </PassButton>
    </UpcomingWrapper>
  )
}

export default withRouter(UpcomingComponent)
