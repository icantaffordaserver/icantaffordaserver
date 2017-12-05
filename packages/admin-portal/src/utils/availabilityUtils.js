import moment from 'moment'

const getLowerCaseDay = day => {
  // The user availability json is formatted with lowercase days
  return moment(day)
    .format('dddd')
    .toLowerCase()
}
export const overlappingTimes = (userAvail, otherUserAvail) => {
  // Only check for availability for days in the future.
  // i.e. Don't check the availability for "Today"
  const currentDayTimeStamp = moment().add(1, 'd')
  let currentDay = getLowerCaseDay(currentDayTimeStamp)
  let possibleTimes = []

  for (let i = 1; i <= 7; i++) {
    // Availability for current day.
    let currentAvailability = userAvail[currentDay]
    // Push all overlapping timeslots
    possibleTimes.push({
      day: [moment(currentDayTimeStamp).format('dddd MMMM Do YYYY')],
      slots: otherUserAvail[currentDay].map(slot => {
        return currentAvailability && currentAvailability.includes(slot) && slot
      }),
    })

    currentDayTimeStamp.add(1, 'd')
    currentDay = getLowerCaseDay(currentDayTimeStamp)
  }

  return possibleTimes
}
