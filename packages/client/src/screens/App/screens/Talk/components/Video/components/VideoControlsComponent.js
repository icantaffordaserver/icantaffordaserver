import React from 'react'

import Report from '../../Report'

import alien from '../../../../../shared/assets/alien.svg'
import { ControlsWrapper, Controls, Control } from '../styles'
import { Icon } from 'semantic-ui-react'

export default props => {
  return (
    <ControlsWrapper>
      <Controls>
        <Control>
          <Icon
            name="chat"
            size="large"
            onClick={props.toggleChat}
            color={props.chat && 'red'}
          />
        </Control>
        <Control>
          <Icon
            name="camera"
            size="large"
            onClick={props.toggleVideo}
            color={!props.video && 'red'}
          />
        </Control>
        <Control>
          <Icon
            name="microphone"
            size="large"
            onClick={props.toggleAudio}
            color={!props.audio && 'red'}
          />
        </Control>
        <Control>
          <Report>
            <Icon name="flag" size="large" color="red" />
          </Report>
        </Control>
        <img src={alien} alt="" />
      </Controls>
    </ControlsWrapper>
  )
}
