import React from 'react'

import { Input } from '../../../styles/Inputs/index.js'

import { Flex, Box } from 'grid-styled'

import { ProfileSection } from '../../Profile/style'

const LocationForm = ({ location, handleInputChange }) => {
  return (
    <ProfileSection>
      <Flex wrap>
        <Box width={1 / 2} p={2}>
          <Box width={1 / 2} py={2}>
            Update Location
          </Box>
          <Input
            value={location}
            name="location"
            onChange={handleInputChange}
          />
        </Box>
      </Flex>
    </ProfileSection>
  )
}

export default LocationForm
