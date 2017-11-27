import React from 'react'

import { Title } from '../../../styles/Text/index.js'

import { Input } from '../../../styles/Inputs/index.js'

import { Flex, Box } from 'grid-styled'

import { ProfileSection } from '../../Profile/style'

const SettingsForm = ({
  email,
  password,
  repeatEmail,
  repeatPassword,
  handleInputChange,
}) => {
  return (
    <ProfileSection>
      <Flex wrap>
        <Box width={1 / 2} p={2}>
          <Box width={1 / 2} py={2}>
            Update Email
          </Box>
          <Input value={email} name="email" onChange={handleInputChange} />
        </Box>
        <Box width={1 / 2} p={2}>
          <Box width={1 / 2} py={2}>
            Re-enter new email
          </Box>
          <Input
            value={repeatEmail}
            name="repeatEmail"
            onChange={handleInputChange}
          />
        </Box>
        <Box width={1 / 2} p={2}>
          <Box width={1 / 2} py={2}>
            Update Password
          </Box>
          <Input
            value={password}
            name="password"
            onChange={handleInputChange}
          />
        </Box>
        <Box width={1 / 2} p={2}>
          <Box width={1 / 2} py={2}>
            Re-enter new password
          </Box>
          <Input
            value={repeatPassword}
            name="repeatPassword"
            onChange={handleInputChange}
          />
        </Box>
      </Flex>
    </ProfileSection>
  )
}

export default SettingsForm
