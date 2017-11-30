import React from 'react'
import { Flex, Box } from 'grid-styled'
import { ThemeProvider } from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { SuggestionSubmitButton } from '../../../style'
import { Input } from '../../../../../styles'

/**
 * props suggestion = value of the input field
 * props handleChange = function to update the state value of input field
 * props handleSubmit = function to submit the value of the input field
 */

const SuggestInterests = ({
  suggestion,
  handleChange,
  handleSubmit,
  suggestionSuccess,
}) => (
  <ThemeProvider
    theme={{
      space: [0, 6, 12, 18, 24],
      breakpoints: [32, 48, 64, 80, 96, 112, 128],
    }}
  >
    <Flex wrap width={1}>
      <Box
        width={[1, 1, 1, 1, 1, 1 / 3, 1 / 3]}
        px={2}
        py={[1, 1, 1, 1, 1, 0, 0]}
      >
        <p>
          Create your own interest:
          <br />
          <i>
            This will show up in your profile, and if popular enought, we may
            feature it in the future!
          </i>
        </p>
      </Box>
      <Box
        width={[1, 1, 1, 1, 1 / 2, 1 / 3, 1 / 3]}
        pr={2}
        py={[1, 1, 1, 1, 1, 0, 0]}
      >
        <Input
          value={suggestion}
          name="suggestion"
          type="text"
          onChange={handleChange}
        />
      </Box>
      <Box width={[1, 1, 1, 1, 1 / 2, 1 / 3, 1 / 3]} py={[1, 1, 1, 1, 1, 0, 0]}>
        {suggestionSuccess ? (
          <Icon circular name="checkmark" color="green" size="large" />
        ) : (
          <SuggestionSubmitButton onClick={handleSubmit}>
            Submit
          </SuggestionSubmitButton>
        )}
      </Box>
    </Flex>
  </ThemeProvider>
)

export default SuggestInterests
