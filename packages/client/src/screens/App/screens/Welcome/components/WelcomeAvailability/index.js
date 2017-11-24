import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import { Button } from '../WelcomeChooseInterests/styles.js'

import { Title } from '../../../../styles'

import { Flex, Box } from 'grid-styled'
import Graphic1 from '../../assets/Group8.svg'
import SVG from 'react-inlinesvg'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'

import Planet from '../../../../shared/assets/planet.png'

import Schedule from '../../../Profile/components/ScheduleComponent'
import InputLocation from './InputLocation'

class WelcomeAvailability extends Component {
  render() {
    console.log('welcome Availability : ', this.props)
    const {
      location,
      handleLocationChange,
      cells,
      convertToBoolean,
      handleScheduleChange,
      handleSubmit,
    } = this.props

    return (
      <Flex width={1} wrap>
        <Box width={1}>
          <Title huge style={{ marginBottom: '-5px' }}>
            PLUT<img style={{ height: '65px' }} src={Planet} alt="" />
          </Title>
        </Box>
        <Box width={1 / 3} ml="16.667%">
          <SVG src={Graphic1} />
        </Box>
        <Box width={1 / 3}>
          <p>
            Tell us a bit more about yourself. We want to know who you are, why
            you’re on Pluto, and how you’re hoping to interact with the
            community.
          </p>
        </Box>
        <Box width={1} pt={2}>
          <Schedule
            convertToBoolean={convertToBoolean}
            cells={cells}
            handleChange={handleScheduleChange}
            edit={true}
          />
        </Box>
        <Box width={1} pt={2}>
          <InputLocation
            location={location}
            handleLocationChange={handleLocationChange}
          />
        </Box>
        <Box width={4 / 5} ml="10%" pt={2}>
          <Button
            color={'#FF7F50'}
            inverseColor={'#FFFFFF'}
            onClick={handleSubmit}
          >
            Go to Pluto!
          </Button>
        </Box>
      </Flex>
    )
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(updateUserMutation, { name: 'updateUser' }),
)(WelcomeAvailability)
