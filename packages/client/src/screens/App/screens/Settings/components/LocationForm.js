import React from 'react'

import InputLocation from '../../../shared/components/InputLocation'

import { Flex, Box } from 'grid-styled'

import { ProfileSection } from '../../Profile/style'

const LocationForm = ({ location, handleLocationChange }) => {
  return (
    <ProfileSection>
      <Flex wrap>
        <Box width={1 / 2} p={2}>
          <Box width={1 / 2} py={2}>
            Update Location
          </Box>
          <InputLocation
            location={location}
            handleLocationChange={handleLocationChange}
          />
        </Box>
      </Flex>
    </ProfileSection>
  )
}

export default LocationForm
