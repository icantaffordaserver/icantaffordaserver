import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'

import Schedule from './ScheduleComponent'
import {
  UserAvailability,
  UserAvailabilitySection,
  EditButton,
  Heading,
} from '../../styles'
import { Button } from '../../../../styles'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'

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

class AvailabilityComponent extends Component {
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
    this.setState({ loading: true })
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

    this.props
      .mutate({
        variables: {
          id: this.props.user.id,
          availability,
        },
        refetchQueries: [
          {
            query: currentUserQuery,
          },
        ],
      })
      .then(() =>
        this.setState(
          { clickSave: true, loading: false },
          this.handleEditButton,
        ),
      )
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
      let data = this.props.user.availability
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
    this.setState({ cells })
  }

  handleChange = cells => {
    if (this.state.edit) {
      this.setState({ cells })
    }
  }
  render() {
    return (
      <UserAvailabilitySection>
        <Heading>
          <h1>AVAILABILITY</h1>
          <EditButton onClick={this.handleEditButton} />
        </Heading>
        <UserAvailability>
          <Schedule
            edit={this.state.edit}
            convertToBoolean={this.convertToBoolean}
            cells={this.state.cells}
            handleChange={this.handleChange}
          />
        </UserAvailability>

        {this.state.edit && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              right
              small
              round
              loading={this.state.loading}
              onClick={this.setAvailability}
            >
              Save
            </Button>

            <Button small left round altGray onClick={this.handleClear}>
              Clear
            </Button>
          </div>
        )}
      </UserAvailabilitySection>
    )
  }
}

export default compose(withApollo, graphql(updateUserMutation))(
  AvailabilityComponent,
)
