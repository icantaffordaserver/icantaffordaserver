import React, { Component } from 'react'
import { graphql, withApollo, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { Flex, Box } from 'grid-styled'

import WelcomeChooseInterests from '../components/WelcomeChooseInterests'
import WelcomeBio from '../components/WelcomeBio'
import WelcomeAvailability from '../components/WelcomeAvailability'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../../shared/graphql/mutations/updateUserMutation'
import createConnectionInterest from '../../../shared/graphql/mutations/createConnectionInterest.js'

const FullScreen = Flex.extend`
  width: 100vw;
  height: 100vh;
`
const Modal = Box.extend`
  margin: auto auto;
  background: white;
`
const times = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
]

class WelcomeContainer extends Component {
  state = {
    count: 0,
    bio: '',
    selectedTags: [],
    suggestion: '',
    location: '',
    cells: [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
    ],
    chooseInterestsSuccess: true,
    bioSuccess: true,
    availabilitySuccess: true,
    locationSuccess: true,
    suggestionSuccess: false,
  }

  incrementCount = () => {
    const {
      selectedTags,
      bio,
      count,
      chooseInterestsSuccess,
      bioSuccess,
    } = this.state
    if (count === 0 && selectedTags.length > 0) {
      this.setState({ count: this.state.count + 1 })
    }
    if (count === 0 && selectedTags.length === 0) {
      this.setState({ chooseInterestsSuccess: false })
    }
    if (count === 1 && bio.length > 0) {
      this.setState({ count: this.state.count + 1 })
    }
    if (count === 1 && bio.length === 0) {
      this.setState({ bioSuccess: false })
    }
  }

  changeColor = id => {
    let index = this.state.selectedTags.indexOf(id)
    console.log('index: ', index)
    if (index === -1) {
      this.setState({ selectedTags: [...this.state.selectedTags, id] }, () =>
        console.log(this.state),
      )
    } else {
      const selectedTags = this.state.selectedTags
      this.setState(
        {
          selectedTags: [
            ...selectedTags.slice(0, index),
            ...selectedTags.slice(index + 1),
          ],
        },
        () => console.log(this.state),
      )
    }
  }

  handleInput = event =>
    this.setState({ [event.target.name]: event.target.value }, () =>
      console.log(this.state),
    )
  handleLocationChange = location => this.setState({ location })
  handleSubmitInterest = () => {
    console.log(this.props, ' Choose interests')
    this.props
      .createConnectionInterest({
        variables: {
          name: this.state.suggestion,
        },
      })
      .then(() => this.setState({ suggestion: '', suggestionSuccess: true }))
      .then(() =>
        setTimeout(() => {
          this.setState({ suggestionSuccess: false })
        }, 1000),
      )
      .then(() => console.log(this.state))
      .catch(err => console.error(err))
  }

  handleCompleteOnBoarding = () => {
    const {
      bio,
      cells,
      location,
      availabilitySuccess,
      locationSuccess,
    } = this.state
    let connectionInterestsIds = this.state.selectedTags

    let availability = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    }

    let data = cells
    // Convert nested array of boolean values from this.state.cells to "availability" variable's data structure
    for (let i = 1; i < data.length; i++) {
      for (let j = 1; j < data[i].length; j++) {
        if (data[i][j]) {
          availability[Object.keys(availability)[j - 1]].push(times[i - 1])
        }
      }
    }

    console.log('Handle Onboarding : ', {
      id: this.props.data.user.id,
      availability,
      bio,
      location,
      connectionInterestsIds,
    })

    let merged = [].concat.apply([], cells)

    if (merged.filter(x => x).length > 0 && location.length > 0) {
      this.props
        .updateUser({
          variables: {
            id: this.props.data.user.id,
            connectionInterestsIds,
            bio,
            availability,
            location,
          },
        })
        .then(() => this.props.client.resetStore())
        .then(() => this.props.history.push('/profile'))
        .catch(err => console.error(err))
    }
    if (merged.filter(x => x).length === 0) {
      this.setState({ availabilitySuccess: false })
    }
    if (merged.filter(x => x).length > 0) {
      this.setState({ availabilitySuccess: true })
    }
    if (location.length === 0) {
      this.setState({ locationSuccess: false })
    }
    if (location.length > 0) {
      this.setState({ locationSuccess: true })
    }
  }

  convertToBoolean = () => {
    console.log('convertoboolean : ', this.props)
    let cells = [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
    ]
    let days = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ]
    const { data } = this.props
    // Convert availability props to nested array of boolean values
    if (data.user && !data.loading && data.user.availability) {
      let avail = this.props.data.user.availability

      for (let i = 0; i < days.length; i++) {
        for (let j = 0; j < avail[days[i]].length; j++) {
          let index = times.indexOf(avail[days[i]][j])
          cells[index + 1][i + 1] = true
        }
      }
    }

    // if (this.state.cells === cells) return
    console.log(cells)
    this.setState({ cells })
  }

  handleScheduleChange = cells => this.setState({ cells })

  render() {
    const {
      count,
      bio,
      selectedTags,
      suggestion,
      location,
      cells,
      chooseInterestsSuccess,
      bioSuccess,
      locationSuccess,
      availabilitySuccess,
      suggestionSuccess,
    } = this.state
    let view = null

    if (count === 0) {
      view = (
        <WelcomeChooseInterests
          incrementCount={this.incrementCount}
          selectedTags={selectedTags}
          changeColor={this.changeColor}
          suggestion={suggestion}
          handleChange={this.handleInput}
          handleSubmit={this.handleSubmitInterest}
          chooseInterestsSuccess={chooseInterestsSuccess}
          suggestionSuccess={suggestionSuccess}
        />
      )
    }
    if (count === 1) {
      view = (
        <WelcomeBio
          bio={bio}
          incrementCount={this.incrementCount}
          handleChange={this.handleInput}
          bioSuccess={bioSuccess}
        />
      )
    }
    if (count === 2) {
      view = (
        <WelcomeAvailability
          location={location}
          handleLocationChange={this.handleLocationChange}
          handleSubmit={this.handleCompleteOnBoarding}
          cells={cells}
          convertToBoolean={this.convertToBoolean}
          handleScheduleChange={this.handleScheduleChange}
          availabilitySuccess={availabilitySuccess}
          locationSuccess={locationSuccess}
        />
      )
    }
    if (this.props.data.loading) return null
    console.log(' WelcomeContainer : ', this.props)
    return (
      <FullScreen
        style={{ background: 'linear-gradient(0deg, #617EA5, #1E252F)' }}
      >
        <Modal width={1 / 2} ml="25%" p={4}>
          <Modal width={4 / 5} ml="10%">
            {view}
          </Modal>
        </Modal>
      </FullScreen>
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  graphql(currentUserQuery),
  graphql(createConnectionInterest, { name: 'createConnectionInterest' }),
  graphql(updateUserMutation, { name: 'updateUser' }),
)(WelcomeContainer)
