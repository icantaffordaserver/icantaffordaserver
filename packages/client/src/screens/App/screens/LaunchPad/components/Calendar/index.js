import React, { Component } from 'react'
import moment from 'moment'

import {
  Calendar,
  Day,
  Wrapper,
  Header,
  Heading,
  CalendarWrapper,
  LeftChev,
  RightChev,
} from './styles'

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
        if (
          this.dateRelativeToToday(
            con.connectionTime,
            monthDate.toISOString(),
          ) === 0
        ) {
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

  dateRelativeToToday = (day1, day2 = moment()) => {
    if (
      moment(day1).format('DDD/MMM/YYYY') ===
      moment(day2).format('DDD/MMM/YYYY')
    )
      return 0

    if (moment(day1).isBefore(day2)) return -1
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
        <Heading>
          <LeftChev onClick={this.lastMonth} />
          <h1>{moment(this.state.currentMonth).format('MMMM YYYY')}</h1>
          <RightChev onClick={this.nextMonth} />
        </Heading>

        <CalendarWrapper>
          <Header>
            {Object.keys(this.state.dow).map(day => <h3 key={day}>{day}</h3>)}
          </Header>
          <Calendar>
            {this.getDaysInMonth().map(day => {
              if (typeof day === 'object') {
                return (
                  <Day
                    dow={
                      this.state.dow[moment(day.connectionTime).format('ddd')]
                    }
                    key={day.connectionTime}
                    className={
                      this.dateRelativeToToday(day.connectionTime) === 0
                        ? 'today event'
                        : 'event'
                    }
                    onClick={() => this.props.updateUpcoming(day)}
                  >
                    {moment(day.connectionTime).format('D')}
                    <i style={{ fontSize: '0.75vw' }}>
                      Conversation with {day.participants[0].firstName}
                    </i>
                  </Day>
                )
              } else {
                return (
                  <Day
                    dow={this.state.dow[moment(day).format('ddd')]}
                    key={day}
                    className={
                      this.dateRelativeToToday(day) === 0
                        ? 'today'
                        : this.dateRelativeToToday(day) === -1 && 'past'
                    }
                  >
                    {moment(day).format('D')}
                  </Day>
                )
              }
            })}
          </Calendar>
        </CalendarWrapper>
      </Wrapper>
    )
  }
}

export default CalendarComponent
