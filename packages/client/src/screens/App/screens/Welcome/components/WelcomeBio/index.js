import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'

import { Logo, Button } from '../WelcomeChooseInterests/styles.js'

import { Title, TextArea } from '../../../../styles'

import { Flex, Box, Grid } from 'grid-styled'
import Graphic1 from '../../assets/Group.svg'
import SVG from 'react-inlinesvg'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import allConnectionInterests from '../../../../shared/graphql/queries/allConnectionInterests'
import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'
import createConnectionInterest from '../../../../shared/graphql/mutations/createConnectionInterest.js'

import Planet from '../../../../shared/assets/planet.png'

import Biography from '../../../Profile/components/Biography.js'

class WelcomeBio extends Component {
  render() {
    console.log(this.props)
    const { bio, incrementCount, handleChange } = this.props

    return (
      <Flex width={1} wrap>
        <Box width={1} pr={2}>
          <Title huge style={{ marginBottom: '-5px' }}>
            PLUT<img style={{ height: '65px' }} src={Planet} alt="" />
          </Title>
        </Box>
        <Box width={1 / 2}>
          <SVG src={Graphic1} />
        </Box>
        <Box width={1 / 2} pl={4}>
          <p>
            Tell us a bit more about yourself. We want to know who you are, why
            you’re on Pluto, and how you’re hoping to interact with the
            community.
          </p>
        </Box>
        <Box width={1} pt={2}>
          <TextArea
            value={bio}
            maxLength="250"
            name="bio"
            onChange={handleChange}
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

export default compose(graphql(currentUserQuery))(WelcomeBio)
