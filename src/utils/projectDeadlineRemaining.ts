const DAY_MS = 24 * 60 * 60 * 1000

/**
 * Human-readable countdown until `deadlineOn` (ms since epoch).
 * Uses Math.ceil for multi-day spans; sub-day uses 3/4, half, 1/4 buckets.
 */
export function formatProjectDeadlineRemaining(
  deadlineOn: number,
  now: number = Date.now(),
): string {
  const remainingMs = deadlineOn - now
  if (remainingMs <= 0) {
    return 'Overdue'
  }

  const diffDays = remainingMs / DAY_MS

  if (diffDays >= 1) {
    const n = Math.ceil(diffDays)
    return n === 1 ? '1 day left' : `${n} days left`
  }

  if (diffDays >= 0.75) {
    return '3/4 day left'
  }
  if (diffDays >= 0.5) {
    return 'Half day left'
  }
  if (diffDays >= 0.25) {
    return '1/4 day left'
  }

  const hoursLeft = Math.ceil(remainingMs / (60 * 60 * 1000))
  return hoursLeft <= 1 ? 'Less than 1 hour left' : `${hoursLeft} hours left`
}
