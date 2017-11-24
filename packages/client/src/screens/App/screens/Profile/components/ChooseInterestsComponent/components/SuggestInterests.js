import React from 'react'
import { Flex, Box } from 'grid-styled'
import { Input, Button } from '../../../../../styles'

/**
 * props suggestion = value of the input field
 * props handleChange = function to update the state value of input field
 * props handleSubmit = function to submit the value of the input field
 */

const SuggestInterests = ({ suggestion, handleChange, handleSubmit }) => (
  <Flex wrap width={1}>
    <Box width={1 / 3} px={2}>
      <p>
        Create your own interest:
        <br />
        <i>
          This will show up in your profile, and if popular enought, we may
          feature it in the future!
        </i>
      </p>
    </Box>
    <Box width={1 / 3} pr={2}>
      <Input value={suggestion} type="text" onChange={handleChange} />
    </Box>
    <Box width={1 / 3}>
      <Button fontSize={'small'} noMargin color="accept" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  </Flex>
)

export default SuggestInterests
