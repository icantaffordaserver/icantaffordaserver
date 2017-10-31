/**
 * Generates an expiry date based on given milliseconds.
 * 1 Day = 86400000 ms
 * @param {Date} days
 */
export default function generateExpiryDate(days = 86400000) {
  const daysInMS = days || 86400000
  const now = new Date()
  return new Date(now.getTime() + daysInMS).toISOString()
}
