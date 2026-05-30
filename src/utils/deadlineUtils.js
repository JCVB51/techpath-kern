// Helper functions for deadline parsing and status labels.

const ROLLING_KEYWORDS = ['rolling', 'open year-round', 'open year round', 'ongoing']

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000

function startOfToday() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
}

/**
 * Parses a deadline string into a simple object for sorting and status checks.
 */
export function parseDeadline(deadline) {
  if (!deadline || !deadline.trim()) {
    return { type: 'unknown' }
  }

  const lower = deadline.toLowerCase().trim()

  if (ROLLING_KEYWORDS.some((keyword) => lower.includes(keyword))) {
    return { type: 'rolling' }
  }

  const parsed = Date.parse(deadline)
  if (Number.isNaN(parsed)) {
    return { type: 'unknown' }
  }

  return { type: 'date', timestamp: parsed }
}

/**
 * Returns: Expired | Due Soon | Upcoming | Rolling | Unknown
 */
export function getDeadlineStatus(deadline) {
  const parsed = parseDeadline(deadline)

  if (parsed.type === 'unknown') {
    return 'Unknown'
  }

  if (parsed.type === 'rolling') {
    return 'Rolling'
  }

  const today = startOfToday()
  const deadlineDate = new Date(parsed.timestamp)
  const deadlineStart = new Date(
    deadlineDate.getFullYear(),
    deadlineDate.getMonth(),
    deadlineDate.getDate(),
  ).getTime()

  if (deadlineStart < today) {
    return 'Expired'
  }

  if (deadlineStart - today <= FOURTEEN_DAYS_MS) {
    return 'Due Soon'
  }

  return 'Upcoming'
}

export function isExpired(deadline) {
  return getDeadlineStatus(deadline) === 'Expired'
}

export function isDueSoon(deadline) {
  return getDeadlineStatus(deadline) === 'Due Soon'
}

export function getDeadlineBadgeClass(status) {
  const classMap = {
    'Due Soon': 'deadline-badge deadline-badge--soon',
    Upcoming: 'deadline-badge deadline-badge--upcoming',
    Rolling: 'deadline-badge deadline-badge--rolling',
    Expired: 'deadline-badge deadline-badge--expired',
    Unknown: 'deadline-badge deadline-badge--unknown',
  }

  return classMap[status] || classMap.Unknown
}

/** Used when sorting by Deadline Soonest. Lower = appears first. */
export function getDeadlineSortPriority(deadline) {
  const status = getDeadlineStatus(deadline)

  if (status === 'Due Soon') return 1
  if (status === 'Upcoming') return 2
  if (status === 'Rolling') return 3
  if (status === 'Unknown') return 4
  if (status === 'Expired') return 5

  return 6
}

export function compareDeadlineSoonest(a, b) {
  const priorityCompare = getDeadlineSortPriority(a.deadline) - getDeadlineSortPriority(b.deadline)
  if (priorityCompare !== 0) return priorityCompare

  const parsedA = parseDeadline(a.deadline)
  const parsedB = parseDeadline(b.deadline)

  if (parsedA.type === 'date' && parsedB.type === 'date') {
    return parsedA.timestamp - parsedB.timestamp
  }

  return 0
}
