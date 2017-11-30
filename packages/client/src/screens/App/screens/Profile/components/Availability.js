import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { Box } from 'grid-styled'

import SubTitleSection from './shared/SubTitleSection'
import Schedule from './ScheduleComponent'
import ConfirmAndCancel from './shared/ConfirmAndCancel'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../../shared/graphql/mutations/updateUserMutation'

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

class Availabilty extends Component {
  state = {
    edit: false,
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
    clickSave: false,
  }

  handleEditButton = () => this.setState({ edit: !this.state.edit })

  setAvailability = () => {
    let availability = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    }

    let data = this.state.cells
    // Convert nested array of boolean values from this.state.cells to "availability" variable's data structure
    for (let i = 1; i < data.length; i++) {
      for (let j = 1; j < data[i].length; j++) {
        if (data[i][j]) {
          availability[Object.keys(availability)[j - 1]].push(times[i - 1])
        }
      }
    }
    console.log({
      id: this.props.data.user.id,
      availability,
    })

    this.props
      .mutate({
        variables: {
          id: this.props.data.user.id,
          availability,
        },
        refetchQueries: [
          {
            query: currentUserQuery,
          },
        ],
      })
      .then(() => this.setState({ clickSave: true }, this.handleEditButton))
      .then(() => console.log('success: Availability updated.'))
      .catch(err => console.error(err))
  }

  handleClear = () => {
    const cells = [
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
    if (this.state.edit) {
      this.setState({ cells })
    }
  }

  convertToBoolean = () => {
    console.log('Availability convertToBoolean : ', this.props)
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

    if (this.props.user) {
      let data = this.props.data.user.availability
      // Convert availability props to nested array of boolean values
      if (data) {
        for (let i = 0; i < days.length; i++) {
          for (let j = 0; j < data[days[i]].length; j++) {
            let index = times.indexOf(data[days[i]][j])
            cells[index + 1][i + 1] = true
          }
        }
      }
    }

    // if (this.state.cells === cells) return
    console.log(cells)
    this.setState({ cells })
  }

  handleChange = cells => {
    if (this.state.edit) {
      this.setState({ cells })
    }
  }

  render() {
    const { edit, cells } = this.state

    return (
      <Box width={1} py={2}>
        <SubTitleSection
          title={'AVAILABLITY'}
          handleEdit={this.handleEditButton}
        />
        <Schedule
          edit={edit}
          convertToBoolean={this.convertToBoolean}
          cells={cells}
          handleChange={this.handleChange}
        />
        <div style={edit ? { display: 'inline' } : { display: 'none' }}>
          <ConfirmAndCancel
            handleSave={this.setAvailability}
            handleCancel={this.handleClear}
            cancelText={'Clear'}
          />
        </div>
      </Box>
    )
  }
}

export default compose(
  withApollo,
  graphql(currentUserQuery),
  graphql(updateUserMutation),
)(Availabilty)
