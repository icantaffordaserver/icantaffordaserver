import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import { Flex, Box } from 'grid-styled'
import ReactSVG from 'react-svg'
import { Icon } from 'semantic-ui-react'

import { Button } from './styles'

import Graphic1 from '../../assets/graphic1.svg'
import Logo from '../../assets/Logo.svg'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import allConnectionInterests from '../../../../shared/graphql/queries/allConnectionInterests'
import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'
import createConnectionInterest from '../../../../shared/graphql/mutations/createConnectionInterest.js'

import ChooseInterests from '../../../Profile/components/ChooseInterestsComponent/components/ChooseInterests'
import SuggestInterests from '../../../Profile/components/ChooseInterestsComponent/components/SuggestInterests'

class WelcomeInterests extends Component {
  render() {
    console.log(this.props)
    const { allConnectionInterestses, loading } = this.props.data
    const {
      incrementCount,
      changeColor,
      selectedTags,
      suggestion,
      handleChange,
      handleSubmit,
      chooseInterestsSuccess,
      suggestionSuccess,
    } = this.props

    return (
      <ThemeProvider
        theme={{
          space: [0, 6, 12, 18, 24],
          breakpoints: [32, 48, 64, 80, 96, 112, 128],
        }}
      >
        <Flex wrap>
          <Flex width={1} justify="center">
            <ReactSVG path={Logo} />
          </Flex>
          <Box
            width={[1, 1, 1, 0.4, 1 / 2, 1 / 2, 1 / 3]}
            ml={['0%', '0%', '0%', '0%', '0%', '0%', '16.5%']}
          >
            <ReactSVG path={Graphic1} />
          </Box>
          <Box
            width={[1, 1, 1, 0.4, 1 / 2, 1 / 2, 1 / 3]}
            ml={['0%', '0%', '0%', '20%', '0%', '0%', '0%']}
          >
            <p>
              Thanks for signing up for our Beta! We just need a bit of info
              before we begin. What are you interested in? What do you like to
              talk about? We’ve created a list of popular topics, but be sure to
              add your own!
            </p>
          </Box>
          {!loading ? (
            <Flex wrap width={1} pt={2}>
              <Box width={1} p={2}>
                <p>
                  Choose your interests:
                  <br />
                  <i>Multiple interests can be selected.</i>
                </p>
              </Box>
              {chooseInterestsSuccess ? (
                <Box width={1}>
                  <ChooseInterests
                    interests={allConnectionInterestses}
                    changeColor={changeColor}
                    selectedTags={selectedTags}
                  />
                </Box>
              ) : (
                <Box width={0.95}>
                  <ChooseInterests
                    interests={allConnectionInterestses}
                    changeColor={changeColor}
                    selectedTags={selectedTags}
                  />
                </Box>
              )}

              {chooseInterestsSuccess ? null : (
                <Box width={0.05}>
                  <Icon circular name="exclamation" color="red" size="large" />
                </Box>
              )}
            </Flex>
          ) : null}
          <Box width={1} pt={2}>
            <SuggestInterests
              suggestion={suggestion}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              suggestionSuccess={suggestionSuccess}
            />
          </Box>
          <Box width={4 / 5} ml="10%" p={2}>
            <Button
              color={'#FF7F50'}
              inverseColor={'#FFFFFF'}
              onClick={incrementCount}
            >
              Done! What's next?
            </Button>
          </Box>
        </Flex>
      </ThemeProvider>
    )
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(allConnectionInterests),
  graphql(createConnectionInterest, { name: 'createConnectionInterest' }),
  graphql(updateUserMutation, { name: 'updateUser' }),
)(WelcomeInterests)
