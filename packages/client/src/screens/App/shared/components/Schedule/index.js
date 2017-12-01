import React, { Component } from 'react'

import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import '../../../../../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.momentLocalizer(moment)

class ScheduleComponent extends Component {
  render() {
    return (
      <BigCalendar
        selectable
        formats={{
          dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'ddd DD', culture),
        }}
        views={['week']}
        toolbar={false}
        events={this.props.events}
        min={moment('12:00PM', 'h:mmA').toDate()}
        defaultView="week"
        onSelectSlot={slotInfo => this.props.handleChange(slotInfo)}
      />
    )
  }
}

export default ScheduleComponent
