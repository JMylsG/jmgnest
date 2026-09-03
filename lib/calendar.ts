const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

const cache = new Map<string, { data: BlockedDateRange[]; timestamp: number }>()

export interface BlockedDateRange {
  start: string // YYYY-MM-DD
  end: string // YYYY-MM-DD (last day that is blocked, inclusive)
  title: string
}

/**
 * Fetch blocked dates from Google Calendar
 * @param {string} calendarId - Google Calendar ID
 * @returns {Promise<Array>} Array of blocked date objects
 */
export const fetchBlockedDates = async (calendarId: string): Promise<BlockedDateRange[]> => {
  // Check cache first
  const cached = cache.get(calendarId)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('📅 Using cached calendar data for:', calendarId)
    return cached.data
  }

  console.log('🔄 Fetching fresh calendar data for:', calendarId)

  // Get API key from environment (Next.js uses NEXT_PUBLIC_ prefix for client-side env vars)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY

  if (!apiKey) {
    console.warn('⚠️ Google Calendar API key not found. Calendar integration disabled.')
    return []
  }

  if (!calendarId) {
    console.warn('⚠️ Calendar ID not provided')
    return []
  }

  // Fetch events from now to 3 months in the future
  const now = new Date().toISOString()
  const threeMonthsLater = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${now}&timeMax=${threeMonthsLater}&singleEvents=true&orderBy=startTime`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 404) {
        console.error('❌ Calendar not found. Please check the calendar ID and ensure it is public.')
        throw new Error(`Calendar not found: ${calendarId}`)
      }
      if (response.status === 403) {
        console.error('❌ Access denied. Please check API key permissions and calendar sharing settings.')
        throw new Error('Access denied to calendar. Please check API key and calendar permissions.')
      }
      throw new Error(`Calendar API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Transform events to blocked date objects
    const blockedDates: BlockedDateRange[] = (data.items || [])
      .filter((event: any) => event.status === 'confirmed')
      .map((event: any) => {
        // Handle both date-only and dateTime events
        const start = event.start.date || event.start.dateTime?.split('T')[0]
        const end = event.end.date || event.end.dateTime?.split('T')[0]

        // Google Calendar uses exclusive end dates for all-day events
        // For all-day events: if end is "2025-01-05", it means blocked until end of Jan 4
        // For dateTime events: end is the actual end time
        // We store the end date as the last day that is blocked (inclusive)
        let endDate = end
        if (event.start.date && !event.start.dateTime) {
          // All-day event: end is exclusive (e.g., "2025-01-05" means available from Jan 5)
          // So last blocked day is Jan 4 (end - 1 day)
          const endDateObj = new Date(end)
          endDateObj.setDate(endDateObj.getDate() - 1)
          endDate = endDateObj.toISOString().split('T')[0]
        } else if (event.end.dateTime) {
          // For dateTime events, extract just the date part
          // The end date represents the check-out day (last day of stay)
          endDate = event.end.dateTime.split('T')[0]
        }

        return {
          start,
          end: endDate, // Last day that is blocked (inclusive)
          title: event.summary || 'Blocked'
        }
      })

    // Cache the results
    cache.set(calendarId, {
      data: blockedDates,
      timestamp: Date.now()
    })

    console.log(`✅ Fetched ${blockedDates.length} blocked date ranges from Google Calendar`)
    return blockedDates
  } catch (error) {
    console.error('❌ Failed to fetch calendar:', error)

    // Return cached data if available, even if expired
    if (cached) {
      console.log('⚠️ Using expired cache due to error')
      return cached.data
    }

    // Return empty array as fallback
    return []
  }
}

/**
 * Check if a specific date range is available
 * @param {string} calendarId - Google Calendar ID
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Promise<boolean>} True if available, false if blocked
 */
export const checkAvailability = async (
  calendarId: string,
  startDate: string,
  endDate: string
): Promise<boolean> => {
  if (!calendarId) {
    return true // If no calendar configured, assume available
  }

  const blockedDates = await fetchBlockedDates(calendarId)

  if (blockedDates.length === 0) {
    return true // No blocked dates, so available
  }

  const start = new Date(startDate)
  const end = new Date(endDate)

  // Check if any blocked date range overlaps with requested range
  // Note: blocked.end is the last day that is blocked (inclusive)
  // So the unit becomes available on blocked.end + 1 day
  for (const blocked of blockedDates) {
    const blockedStart = new Date(blocked.start)
    const blockedEnd = new Date(blocked.end)

    // Check for overlap:
    // - Requested start must be before or on the day after blocked end (blockedEnd + 1)
    // - Requested end must be after blocked start
    // This allows check-in on the day after check-out (same-day turnaround)
    const availableFromDate = new Date(blockedEnd)
    availableFromDate.setDate(availableFromDate.getDate() + 1) // Day after last blocked day

    if (start < availableFromDate && end > blockedStart) {
      console.log(
        `🚫 Date range ${startDate} to ${endDate} conflicts with blocked period: ${blocked.start} to ${blocked.end}`
      )
      return false // Dates are blocked
    }
  }

  return true // Dates are available
}

/**
 * Get all blocked dates for a specific month
 * @param {string} calendarId - Google Calendar ID
 * @param {string} month - Month in YYYY-MM format
 * @returns {Promise<Array>} Array of blocked dates in the month
 */
export const getBlockedDatesForMonth = async (
  calendarId: string,
  month: string
): Promise<BlockedDateRange[]> => {
  const blockedDates = await fetchBlockedDates(calendarId)

  // Filter blocked dates for the specified month
  const [year, monthNum] = month.split('-').map(Number)
  const monthStart = new Date(year, monthNum - 1, 1)
  const monthEnd = new Date(year, monthNum, 0) // Last day of month

  return blockedDates.filter(blocked => {
    const blockedStart = new Date(blocked.start)
    const blockedEnd = new Date(blocked.end)

    // Check if blocked period overlaps with the month
    return blockedStart <= monthEnd && blockedEnd >= monthStart
  })
}

/**
 * Clear cache (useful for manual refresh)
 */
export const clearCache = (): void => {
  cache.clear()
  console.log('🗑️ Calendar cache cleared')
}

/**
 * Check if a specific date is blocked
 * @param {string} calendarId - Google Calendar ID
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<boolean>} True if blocked, false if available
 */
export const isDateBlocked = async (calendarId: string, date: string): Promise<boolean> => {
  const blockedDates = await fetchBlockedDates(calendarId)
  const checkDate = new Date(date)

  return blockedDates.some(blocked => {
    const blockedStart = new Date(blocked.start)
    const blockedEnd = new Date(blocked.end)
    return checkDate >= blockedStart && checkDate <= blockedEnd
  })
}

/**
 * Convert blocked date ranges to an array of individual blocked dates
 * @param {BlockedDateRange[]} blockedRanges - Array of blocked date ranges
 * @returns {string[]} Array of blocked dates in YYYY-MM-DD format
 */
export const getBlockedDatesArray = (blockedRanges: BlockedDateRange[]): string[] => {
  const blockedDates: string[] = []
  
  for (const range of blockedRanges) {
    const start = new Date(range.start)
    const end = new Date(range.end)
    
    // Generate all dates in the range (inclusive)
    const currentDate = new Date(start)
    while (currentDate <= end) {
      blockedDates.push(currentDate.toISOString().split('T')[0])
      currentDate.setDate(currentDate.getDate() + 1)
    }
  }
  
  return blockedDates
}

