import React from 'react'

import { Title } from '../../../../styles'

import { Box, Grid } from 'grid-styled'
import SVG from 'react-inlinesvg'

import EditIcon from '../../../../../../assets/icons/icon.svg'
import { ProfileSection } from '../../style'

const SubTitleSection = ({ title, handleEdit }) => {
  return (
    <Box width={1} pb={2}>
      <ProfileSection>
        <Title fullWidth darkGray style={{ padding: '20px' }}>
          <Grid width={1 / 3} ml="33%">
            {title}
          </Grid>
          <Grid width={1 / 20} ml="28%">
            <div onClick={handleEdit}>
              <SVG src={EditIcon} />
            </div>
          </Grid>
        </Title>
      </ProfileSection>
    </Box>
  )
}

export default SubTitleSection
