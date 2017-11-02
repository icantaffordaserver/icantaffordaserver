/**
 * Generates an expiry date based on an integer value of days.
 * 1 Day = 86400000 ms
 * @param {Date} days
 */
export default function generateExpiryDate(days = 1) {
  const oneDayInMs = 86400000
  const expiryInMS = days * oneDayInMs
  const now = new Date()
  return new Date(now.getTime() + expiryInMS).toISOString()
}
