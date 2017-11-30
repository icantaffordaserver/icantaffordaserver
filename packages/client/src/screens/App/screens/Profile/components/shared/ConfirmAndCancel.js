import React from 'react'
import { Button } from '../../style'
import { Flex, Box } from 'grid-styled'

const ConfirmAndCancel = ({ handleSave, handleCancel, cancelText }) => {
  return (
    <Flex wrap width={1} py={2}>
      <Box width={2 / 10} ml="40%" pt={2}>
        <Button color={'#FF7F50'} inverseColor={'#FFFFFF'} onClick={handleSave}>
          Confirm
        </Button>
      </Box>
      <Box width={1 / 10} pt={2} pl={2}>
        <Button
          color={'rgba(255, 255, 255, 0.9)'}
          inverseColor={'#BDBDBD'}
          noHoverChange={true}
          onClick={handleCancel}
        >
          {cancelText || 'Cancel'}
        </Button>
      </Box>
    </Flex>
  )
}

export default ConfirmAndCancel
