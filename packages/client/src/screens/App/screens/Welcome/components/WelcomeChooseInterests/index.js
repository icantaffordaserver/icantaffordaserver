import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import { Button } from './styles'

import { Title } from '../../../../styles'

import { Flex, Box } from 'grid-styled'
import Graphic1 from '../../assets/graphic1.svg'
import SVG from 'react-inlinesvg'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import allConnectionInterests from '../../../../shared/graphql/queries/allConnectionInterests'
import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'
import createConnectionInterest from '../../../../shared/graphql/mutations/createConnectionInterest.js'

import Planet from '../../../../shared/assets/planet.png'

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
    } = this.props

    return (
      <Flex wrap>
        <Box width={1}>
          <Title huge style={{ marginBottom: '-5px' }}>
            PLUT<img style={{ height: '65px' }} src={Planet} alt="" />
          </Title>
        </Box>
        <Box width={1 / 3} ml="10%">
          <SVG src={Graphic1} />
        </Box>
        <Box width={1 / 2} pt={2}>
          <p>
            Thanks for signing up for our Beta! We just need a bit of info
            before we begin. What are you interested in? What do you like to
            talk about? We’ve created a list of popular topics, but be sure to
            add your own!
          </p>
        </Box>
        {!loading ? (
          <Box width={1} pt={2}>
            <ChooseInterests
              interests={allConnectionInterestses}
              changeColor={changeColor}
              selectedTags={selectedTags}
            />
          </Box>
        ) : null}
        <Box width={1} pt={2}>
          <SuggestInterests
            suggestion={suggestion}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
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
    )
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(allConnectionInterests),
  graphql(createConnectionInterest, { name: 'createConnectionInterest' }),
  graphql(updateUserMutation, { name: 'updateUser' }),
)(WelcomeInterests)
