import React, { Component } from 'react'

import {
  Button,
  Content,
  ColumnContainer,
  RowContainer,
  Section,
  Card,
  Title,
  Subheading,
  Tag,
  Text,
  TextLink,
  TextArea,
} from '../../../../styles'

import { Flex, Box, Grid } from 'grid-styled'
import SVG from 'react-inlinesvg'

import EditIcon from '../../../../../../assets/icons/icon.svg'
import { ProfileSection } from '../../style'

const SubTitleSection = ({ title, handleEdit }) => {
  return (
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
  )
}

export default SubTitleSection
