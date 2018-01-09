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
import InputLocation from '../../../../shared/components/InputLocation'

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
              Last step! Just tell us when you’re free and we can schedule your
              conversations!
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