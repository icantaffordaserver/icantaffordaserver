import moment from 'moment'

/**
 * Converts a given map to an object.
 * @export function
 * @param {Map} map 
 * @returns An object representation of given map.
 */
export function mapToObj(map) {
  const obj = {}
  map.forEach((value, key) => {
    obj[key] = value
  })
  return obj
}

/**
 * Uses given availability information to generate events for user.
 * @export function
 * @param {String} day 
 * @param {Object} slots 
 * @returns [Object] representing events based on user availability.
 */
export function availToEvent(day, slots) {
  let events = []
  const format = 'dddd h:mmA'

  for (let i in slots) {
    events.push({
      start: moment(day + ' ' + slots[i].start, format).toDate(),
      end: moment(day + ' ' + slots[i].end, format).toDate(),
    })
  }

  return events
}

/**
 * Returns a time comparison function based on given format.
 * @export function
 * @param {String} format Moment readable format string.
 * @returns Comparison function for sorting by start time. (a: any, b: any) => Int
 */
export function compareStartTimes(format) {
  return (a, b) => {
    if (moment(a.start, format).isBefore(moment(b.start, format))) return -1
    else if (moment(b.start, format).isBefore(moment(a.start, format))) return 1
    else return 0
  }
}

/**
 * Joins overlapping "timeslots". This function expects a sorted 
 * array of timeslots.
 * @export function
 * @param {Object[]} arr Array of Objects with start & end times.
 * @param {String} format  Moment readable format string.
 * @returns New array without overlapping timeslots.
 */
export function removeOverlap(arr, format) {
  let newArr = arr
  let slot = 1

  while (true) {
    if (slot + 1 > newArr.length) break

    if (
      moment(newArr[slot - 1].end, format).isAfter(
        moment(newArr[slot].start, format),
      )
    ) {
      // Overlap end time
      newArr = [
        {
          start: newArr[slot - 1].start,

          // Pick the later end time
          end: moment(newArr[slot].end, format).isBefore(
            moment(newArr[slot - 1].end, format),
          )
            ? newArr[slot - 1].end
            : newArr[slot].end,
        },
        ...newArr.slice(slot + 1),
      ]
    } else if (
      moment(newArr[slot].start, format).isBefore(
        moment(newArr[slot - 1].start, format),
      )
    ) {
      // Overlap start time
      newArr = [
        {
          start: newArr[slot].start,

          // Pick the later end time
          end: moment(newArr[slot].end, format).isBefore(
            moment(newArr[slot - 1].end, format),
          )
            ? newArr[slot - 1].end
            : newArr[slot].end,
        },
        ...newArr.slice(slot + 1),
      ]
    } else {
      slot++
    }
  }

  return newArr
}
