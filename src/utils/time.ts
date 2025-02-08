//  Time in milliseconds
export const ONE_SECOND = 1000
export const ONE_MINUTE = 60000
export const ONE_HOUR = 60 * ONE_MINUTE
export const ONE_DAY = 24 * ONE_HOUR
export const ONE_WEEK = 7 * ONE_DAY
export const ONE_MONTH = 30 * ONE_DAY
export const ONE_YEAR = 365 * ONE_DAY

// Returns the given seconds in the format "Xd XhXmXs"
export const formatTimeBySecs = (seconds: number) => {
  seconds = Math.floor(seconds)
  const days = Math.floor(seconds / (24 * 3600))
  seconds %= 24 * 3600
  const hours = Math.floor(seconds / 3600)
  seconds %= 3600
  const minutes = Math.floor(seconds / 60)
  seconds %= 60

  let result = ""
  if (days > 0) result += `${days}d `
  if (hours > 0 || days > 0) result += `${hours}h`
  if (minutes > 0 || hours > 0 || days > 0) result += `${minutes}m`
  result += `${seconds}s`

  return result.trim()
}
