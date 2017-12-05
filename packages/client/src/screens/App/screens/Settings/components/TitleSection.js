import React from 'react'

import { Title } from '../../../styles/Text/index.js'

import { Box } from 'grid-styled'

import { ProfileSection } from '../../Profile/style'

const TitleSection = ({ title }) => {
  return (
    <ProfileSection>
      <Title fullWidth darkGray style={{ padding: '20px' }}>
        <Box width={1 / 3} ml="33%">
          {title}
        </Box>
      </Title>
    </ProfileSection>
  )
}

export default TitleSection
