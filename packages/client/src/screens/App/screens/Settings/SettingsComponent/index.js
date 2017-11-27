import React, { Component } from 'react'

import {
  SettingsWrapper,
  SettingsForm,
  SettingsGroup,
  Label,
  Input,
} from '../styles'
import { Title, Button } from '../../../styles'

class SettingsComponent extends Component {
  render() {
    return (
      <SettingsWrapper>
        <Title fullWidth left>
          User Settings
        </Title>
        <hr />

        <SettingsForm>
          <SettingsGroup>
            <Label>Email:</Label>
            <Input />
          </SettingsGroup>
          <SettingsGroup>
            <Label>Password:</Label>
            <Input />
          </SettingsGroup>
          <SettingsGroup>
            <Label>Location:</Label>
            <Input />
          </SettingsGroup>
        </SettingsForm>
        <Button round small>
          Confirm
        </Button>
      </SettingsWrapper>
    )
  }
}

export default SettingsComponent
