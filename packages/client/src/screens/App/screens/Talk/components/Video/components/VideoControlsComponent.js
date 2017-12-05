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
          <Icon name="chat" size="large" />
        </Control>
        <Control onClick={props.toggleVideo}>
          <Icon name="camera" size="large" color={!props.video && 'red'} />
        </Control>
        <Control onClick={props.toggleAudio}>
          <Icon name="microphone" size="large" color={!props.audio && 'red'} />
        </Control>
        <Control>
          <Report>
            <Icon name="flag" size="large" color="red" />
          </Report>
        </Control>
        <Control onClick={props.endConversation}>
          <Icon name="close" size="large" />
        </Control>
        <img src={alien} alt="" />
      </Controls>
    </ControlsWrapper>
  )
}
