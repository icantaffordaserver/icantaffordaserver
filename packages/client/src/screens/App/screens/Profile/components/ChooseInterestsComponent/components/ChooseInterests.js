import React from 'react'
import { Flex, Box, Grid } from 'grid-styled'
import { Tag } from '../../../../../styles'

/**
 * props interets = all ConnectionInterests
 * props changeColor = function to change the color of border when selected/de-selected
 * props selectedTags = array of all tags that are selected 
 */

const ChooseInterests = ({ interests, changeColor, selectedTags }) => (
  <Flex width={1} wrap>
    {interests.map((x, i) => (
      <div
        style={{
          justifyContent: 'space-between',
        }}
        onClick={() => changeColor(x.id)}
        key={x.id}
      >
        <Tag isSelected={selectedTags.includes(x.id)}>#{x.name}</Tag>
      </div>
    ))}
  </Flex>
)

export default ChooseInterests
