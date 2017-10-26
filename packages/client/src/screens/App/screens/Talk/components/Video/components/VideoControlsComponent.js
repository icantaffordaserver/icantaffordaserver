import React from 'react'

import Report from '../../Report'

import { ControlsWrapper, Control } from '../styles'
//import {Icons} from 'icons'

export default props => {
  return (
    <ControlsWrapper>
      <Control>
        <Report />
      </Control>
      <Control>Leave</Control>
      <Control onClick={props.toggleAudio}>Audio</Control>
      <Control onClick={props.toggleVideo}>Video</Control>
      <Control onClick={props.fullscreen}>Fullscreen</Control>
      <Control onClick={props.toggleChat}>Chat</Control>
    </ControlsWrapper>
  )
}
