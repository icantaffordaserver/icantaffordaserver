import React, { Component } from 'react'
import TableDragSelect from './table'
import './style.css'

import { graphql, compose, withApollo } from 'react-apollo'

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

class AvailabilityScheduleComponent extends Component {
  state = {
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
  }

  componentDidMount() {
    let data = this.props.data.user.availability
    let days = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ]
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
    console.log('setting state')
    // Convert availability props to nested array of boolean values
    for (let i = 0; i < days.length; i++) {
      for (let j = 0; j < data[days[i]].length; j++) {
        let index = times.indexOf(data[days[i]][j])
        cells[index + 1][i + 1] = true
      }
    }
    if (this.state.cells === cells) return
    console.log(cells)
    this.setState({ cells })
  }

  render() {
    return (
      <div>
        <TableDragSelect
          value={this.state.cells}
          onChange={this.handleChange}
          edit={this.props.edit}
        >
          <tr>
            <td disabled className="header" />
            <td disabled className="header">
              Monday
            </td>
            <td disabled className="header">
              Tuesday
            </td>
            <td disabled className="header">
              Wednesday
            </td>
            <td disabled className="header">
              Thursday
            </td>
            <td disabled className="header">
              Friday
            </td>
            <td disabled className="header">
              Saturday
            </td>
            <td disabled className="header">
              Sunday
            </td>
          </tr>
          {times.map((x, i) => (
            <tr>
              <td disabled className="header">
                {x}
              </td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          ))}
        </TableDragSelect>
        <div
          style={{
            margin: '1% auto',
            display: 'flex',
            justifyContent: 'space-between',
            width: '50%',
          }}
        >
          <Button
            small
            noMargin
            color="cancel"
            onClick={this.handleClear}
            style={
              this.props.edit ? { display: 'inline' } : { display: 'none' }
            }
          >
            Clear
          </Button>
          <Button
            noMargin
            onClick={this.setAvailability}
            small
            style={
              this.props.edit ? { display: 'inline' } : { display: 'none' }
            }
          >
            Save
          </Button>
        </div>
      </div>
    )
  }

  handleChange = cells => {
    if (this.props.edit) {
      this.setState({ cells })
    }
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
    if (this.props.edit) {
      this.setState({ cells })
    }
  }

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
      .then(() => this.props.handleEdit())
      .then(() => console.log('success: Availability updated.'))
      .catch(err => console.error(err))
  }
}

export default compose(
  withApollo,
  graphql(currentUserQuery),
  graphql(updateUserMutation),
)(AvailabilityScheduleComponent)
