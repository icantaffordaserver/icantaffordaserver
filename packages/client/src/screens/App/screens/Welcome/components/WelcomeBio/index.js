import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import { Flex, Box } from 'grid-styled'
import ReactSVG from 'react-svg'
import { Icon } from 'semantic-ui-react'

import { Button } from '../WelcomeChooseInterests/styles.js'

import { TextArea } from '../../../../styles'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'

import Logo from '../../assets/Logo.svg'
import Graphic from '../../assets/Graphic2.png'

class WelcomeBio extends Component {
  render() {
    console.log(this.props)
    const { bio, incrementCount, handleChange, bioSuccess } = this.props

    return (
      <ThemeProvider
        theme={{
          space: [0, 6, 12, 18, 24],
          breakpoints: [32, 48, 64, 80, 96, 112, 128],
        }}
      >
        <Flex width={1} wrap>
          <Flex width={1} justify="center">
            <ReactSVG path={Logo} />
          </Flex>
          <Box
            width={[1, 1, 1, 1, 0.3, 0.35, 0.35]}
            ml={['0%', '0%', '0%', '0%', '0%', '0%', '0%']}
          >
            <img src={Graphic} alt="graphic" />
          </Box>
          <Box
            width={[1, 1, 1, 1, 0.3, 0.35, 0.35]}
            ml={['0%', '0%', '0%', '0%', '40%', '30%', '20%']}
          >
            <p>
              Tell us a bit more about yourself. We want to know who you are,
              why you’re on Pluto, and how you’re hoping to interact with the
              community.
            </p>
          </Box>
          <Flex wrap width={1} pt={2}>
            {bioSuccess ? (
              <Box width={1}>
                <TextArea
                  value={bio}
                  maxLength="250"
                  name="bio"
                  placeholder="Max 250 characters"
                  onChange={handleChange}
                />
              </Box>
            ) : (
              <Box width={0.95}>
                <TextArea
                  value={bio}
                  maxLength="250"
                  name="bio"
                  placeholder="Max 250 characters"
                  onChange={handleChange}
                />
              </Box>
            )}

            {bioSuccess ? null : (
              <Box width={0.04} ml="1%">
                <Icon circular name="exclamation" color="red" size="large" />
              </Box>
            )}
          </Flex>
          <Box width={4 / 5} ml="10%" p={2}>
            <Button
              color={'#FF7F50'}
              inverseColor={'#FFFFFF'}
              onClick={incrementCount}
            >
              Last step!
            </Button>
          </Box>
        </Flex>
      </ThemeProvider>
    )
  }
}

export default compose(graphql(currentUserQuery))(WelcomeBio)
