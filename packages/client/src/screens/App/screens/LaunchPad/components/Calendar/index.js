import React, { Component } from 'react'
import moment from 'moment'

import { Calendar, Day, Wrapper, Header, LeftChev, RightChev } from './styles'

class CalendarComponent extends Component {
  state = {
    currentMonth: moment().startOf('month'),
    dow: {
      Sun: 1,
      Mon: 2,
      Tue: 3,
      Wed: 4,
      Thu: 5,
      Fri: 6,
      Sat: 7,
    },
  }

  /**
   * Generates an array containing strings for every regular
   * day in the month and a connection object for "Events"
   */
  getDaysInMonth = () => {
    const daysInMonth = []
    const monthDate = this.state.currentMonth.clone() // Clone to avoid altering state.

    let numDays = monthDate.daysInMonth()

    let currentDay = 1
    while (currentDay <= numDays) {
      // TODO: Fix this, no functions in loops
      // eslint-disable-next-line
      this.props.upcoming.map(con => {
        if (this.isEqualDates(con.connectionTime, monthDate.toISOString())) {
          daysInMonth.push(con)
          monthDate.add(1, 'day')
          currentDay++
        }
      })
      daysInMonth.push(monthDate.toISOString())
      monthDate.add(1, 'day')
      currentDay++
    }
    return daysInMonth
  }

  isEqualDates = (day1, day2 = moment()) => {
    return (
      moment(day1).format('DDD/MMM/YYYY') ===
      moment(day2).format('DDD/MMM/YYYY')
    )
  }

  nextMonth = () => {
    const currentMonth = this.state.currentMonth.add(1, 'month')
    this.setState({ currentMonth })
  }
  lastMonth = () => {
    const currentMonth = this.state.currentMonth.subtract(1, 'month')
    this.setState({ currentMonth })
  }

  render() {
    if (!this.props.upcoming) return null
    return (
      <Wrapper>
        {moment(this.state.currentMonth).isAfter(moment()) && (
          <LeftChev onClick={this.lastMonth} />
        )}
        <RightChev onClick={this.nextMonth} />
        <h1>{moment(this.state.currentMonth).format('MMMM-YYYY')}</h1>
        <Header>
          {Object.keys(this.state.dow).map(day => <h3 key={day}>{day}</h3>)}
        </Header>
        <Calendar>
          {this.getDaysInMonth().map(day => {
            if (typeof day === 'object') {
              return (
                <Day
                  dow={this.state.dow[moment(day.connectionTime).format('ddd')]}
                  key={day.connectionTime}
                  className={
                    this.isEqualDates(day.connectionTime)
                      ? 'today event'
                      : 'event'
                  }
                  onClick={() => this.props.updateUpcoming(day)}
                >
                  {moment(day.connectionTime).format('D')}
                </Day>
              )
            } else {
              return (
                <Day
                  dow={this.state.dow[moment(day).format('ddd')]}
                  key={day}
                  className={this.isEqualDates(day) && 'today'}
                >
                  {moment(day).format('D')}
                </Day>
              )
            }
          })}
        </Calendar>
      </Wrapper>
    )
  }
}

export default CalendarComponent
