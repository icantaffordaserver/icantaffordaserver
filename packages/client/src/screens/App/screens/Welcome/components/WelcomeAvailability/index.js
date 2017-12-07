import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import { Flex, Box } from 'grid-styled'
import ReactSVG from 'react-svg'

import { Button } from '../WelcomeChooseInterests/styles.js'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'

import Logo from '../../assets/Logo.svg'
import Graphic1 from '../../assets/Group8.svg'

import Schedule from '../../../Profile/components/ScheduleComponent'
import InputLocation from './InputLocation'

class WelcomeAvailability extends Component {
  render() {
    const {
      location,
      handleLocationChange,
      cells,
      convertToBoolean,
      handleScheduleChange,
      handleSubmit,
      locationSuccess,
      availabilitySuccess,
    } = this.props
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
            width={[1, 1, 1, 0.3, 0.3, 0.35, 0.4]}
            ml={['0%', '0%', '0%', '5%', '15%', '15%', '10%']}
          >
            <ReactSVG path={Graphic1} />
          </Box>
          <Box
            width={[1, 1, 1, 0.4, 0.3, 0.35, 0.4]}
            ml={['0%', '0%', '0%', '20%', '10%', '0%', '0%']}
          >
            <p>
              Tell us a bit more about yourself. We want to know who you are,
              why you’re on Pluto, and how you’re hoping to interact with the
              community.
            </p>
          </Box>
          <Flex wrap width={1} pt={2}>
            {availabilitySuccess ? (
              <Box width={1}>
                <Schedule
                  convertToBoolean={convertToBoolean}
                  cells={cells}
                  handleChange={handleScheduleChange}
                  edit={true}
                />
              </Box>
            ) : (
              <Box width={0.95}>
                <Schedule
                  convertToBoolean={convertToBoolean}
                  cells={cells}
                  handleChange={handleScheduleChange}
                  edit={true}
                />
              </Box>
            )}

            {availabilitySuccess ? null : (
              <p style={{ color: 'red' }}>
                <i>Please fill in your availability*</i>
              </p>
            )}
          </Flex>
          <Flex wrap width={1} pt={2}>
            {locationSuccess ? (
              <Box width={1}>
                <InputLocation
                  location={location}
                  handleLocationChange={handleLocationChange}
                />
              </Box>
            ) : (
              <Box width={0.95}>
                <InputLocation
                  location={location}
                  handleLocationChange={handleLocationChange}
                />
              </Box>
            )}

            {locationSuccess ? null : (
              <Box width={0.05}>
                <Icon circular name="exclamation" color="red" size="large" />
              </Box>
            )}
          </Flex>
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
      </ThemeProvider>
    )
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(updateUserMutation, { name: 'updateUser' }),
)(WelcomeAvailability)
