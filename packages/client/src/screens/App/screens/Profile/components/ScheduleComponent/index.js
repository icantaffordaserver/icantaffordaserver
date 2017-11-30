import React, { Component } from 'react'
import TableDragSelect from './table'
import './style.css'

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

class Schedule extends Component {
  componentDidMount() {
    console.log('schedule : ', this.props)
    this.props.convertToBoolean()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.edit !== nextProps.edit && this.props.clickSave === false) {
      this.props.convertToBoolean()
    }
    console.log('nextProps : ', nextProps)

    // if (this.props.edit === nextProps.edit) {
    //   this.setState({ clickSave: false })
    // }
  }

  render() {
    const { edit, cells, handleChange } = this.props
    return (
      <div>
        <TableDragSelect value={cells} onChange={handleChange} edit={edit}>
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
            <tr key={i}>
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
      </div>
    )
  }
}

export default Schedule
