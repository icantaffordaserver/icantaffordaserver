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
    this.props.convertToBoolean()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.edit !== nextProps.edit && this.props.clickSave === false) {
      this.props.convertToBoolean()
    }

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
            <td disabled className="theader" />
            <td disabled className="theader">
              Monday
            </td>
            <td disabled className="theader">
              Tuesday
            </td>
            <td disabled className="theader">
              Wednesday
            </td>
            <td disabled className="theader">
              Thursday
            </td>
            <td disabled className="theader">
              Friday
            </td>
            <td disabled className="theader">
              Saturday
            </td>
            <td disabled className="theader">
              Sunday
            </td>
          </tr>
          {times.map((x, i) => (
            <tr key={i}>
              <td disabled className="theader">
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
