import React from 'react'

import Report from '../../Report'

import { Icon as i } from 'semantic-ui-react'
import styled from 'styled-components'
import { ControlsWrapper, Control } from '../styles'

const Icon = styled(i)`color: ${props => `${props.color} !important`};`

export default props => {
  return (
    <ControlsWrapper>
      <Control>
        <Report>
          <Icon size="big" color="red" name="flag" />
        </Report>
      </Control>
      <Control onClick={props.toggleAudio}>
        <Icon
          size="big"
          color={props.audio ? '#fff' : 'red'}
          name="microphone"
        />
      </Control>
      <Control onClick={props.toggleVideo}>
        <Icon
          size="big"
          color={props.video ? '#fff' : 'red'}
          name="video camera"
        />
      </Control>
      <Control onClick={props.fullscreen}>
        <Icon color="#fff" size="big" name="maximize" />
      </Control>
      <Control onClick={props.toggleChat}>
        <Icon
          size="big"
          color={props.chat ? '#fff' : 'red'}
          name="talk outline"
        />
      </Control>
    </ControlsWrapper>
  )
}
