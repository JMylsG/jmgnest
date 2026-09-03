import { units, getUnitById } from './units.data'

export type BlockedRange = {
  start: string   // ISO 8601 (UTC), end-exclusive
  end: string     // ISO 8601 (UTC)
  summary?: string
  source?: 'airbnb' | 'vrbo' | 'direct' | 'other'
}

export type AvailabilityResponse = {
  blocked: BlockedRange[]
  updatedAt: string
}

// In-memory cache with 1-hour TTL
const cache = new Map<string, { data: AvailabilityResponse; expiresAt: number }>()
const CACHE_TTL = 60 * 60 * 1000 // 1 hour in milliseconds

/**
 * Detect booking source from event summary/description
 */
function detectSource(event: any): 'airbnb' | 'vrbo' | 'direct' | 'other' {
  const text = `${event.summary || ''} ${event.description || ''}`.toLowerCase()
  
  if (text.includes('airbnb') || text.includes('abnb')) {
    return 'airbnb'
  }
  if (text.includes('vrbo') || text.includes('homeaway')) {
    return 'vrbo'
  }
  if (text.includes('direct') || text.includes('booking') || text.includes('reservation')) {
    return 'direct'
  }
  return 'other'
}

/**
 * Convert all-day event dates to proper range [start, end)
 * Google Calendar all-day events use exclusive end dates
 */
function normalizeEventDates(event: any): { start: string; end: string } {
  const isAllDay = !!event.start.date && !event.start.dateTime
  
  if (isAllDay) {
    // All-day event: end is exclusive (e.g., "2025-01-05" means blocked until end of Jan 4)
    const startDate = new Date(event.start.date + 'T00:00:00Z')
    const endDate = new Date(event.end.date + 'T00:00:00Z')
    // For all-day events, the end date is exclusive, so we subtract 1 day
    endDate.setUTCDate(endDate.getUTCDate() - 1)
    
    return {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    }
  } else {
    // DateTime event
    const start = event.start.dateTime || event.start.date
    const end = event.end.dateTime || event.end.date
    
    return {
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString()
    }
  }
}

/**
 * Merge overlapping blocked ranges
 */
function mergeRanges(ranges: BlockedRange[]): BlockedRange[] {
  if (ranges.length === 0) return []
  
  // Sort by start date
  const sorted = [...ranges].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
  
  const merged: BlockedRange[] = [sorted[0]]
  
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i]
    const last = merged[merged.length - 1]
    
    const currentStart = new Date(current.start)
    const lastEnd = new Date(last.end)
    
    // If current overlaps or is adjacent to last, merge them
    if (currentStart <= lastEnd) {
      // Merge: keep the later end date
      if (new Date(current.end) > lastEnd) {
        merged[merged.length - 1] = {
          ...last,
          end: current.end,
          summary: last.summary || current.summary
        }
      }
    } else {
      // No overlap, add as new range
      merged.push(current)
    }
  }
  
  return merged
}

/**
 * Fetch events from Google Calendar API with pagination
 */
async function fetchCalendarEvents(
  calendarId: string,
  timeMin: string,
  timeMax: string,
  apiKey: string
): Promise<any[]> {
  const allEvents: any[] = []
  let pageToken: string | undefined = undefined
  let pageCount = 0
  
  console.log('🔗 Google Calendar API - Request params:', {
    calendarId,
    timeMin,
    timeMax,
    hasApiKey: !!apiKey
  })
  
  do {
    pageCount++
    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`)
    url.searchParams.set('key', apiKey)
    url.searchParams.set('timeMin', timeMin)
    url.searchParams.set('timeMax', timeMax)
    url.searchParams.set('singleEvents', 'true')
    url.searchParams.set('orderBy', 'startTime')
    
    if (pageToken) {
      url.searchParams.set('pageToken', pageToken)
    }
    
    console.log(`📡 Google Calendar API - Page ${pageCount} request:`, url.toString().replace(apiKey, '***REDACTED***'))
    
    const response = await fetch(url.toString())
    const responseText = await response.text()
    
    if (!response.ok) {
      let errorMessage = `Google Calendar API error: ${response.status} ${response.statusText}`
      try {
        const errorData = JSON.parse(responseText)
        errorMessage = errorData.error?.message || errorMessage
        console.error('❌ Google Calendar API Error Response:', errorData)
      } catch (e) {
        console.error('❌ Google Calendar API Error (non-JSON):', responseText)
      }
      
      if (response.status === 404) {
        throw new Error(`Calendar not found: ${calendarId}. ${errorMessage}`)
      }
      if (response.status === 403) {
        throw new Error(`Access denied (403). Please check API key and calendar permissions. ${errorMessage}`)
      }
      if (response.status === 400) {
        throw new Error(`Bad request (400). ${errorMessage}`)
      }
      throw new Error(errorMessage)
    }
    
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error('❌ Failed to parse Google Calendar API response:', responseText)
      throw new Error('Invalid JSON response from Google Calendar API')
    }
    
    const pageEvents = data.items || []
    console.log(`📥 Google Calendar API - Page ${pageCount}: ${pageEvents.length} events`)
    allEvents.push(...pageEvents)
    pageToken = data.nextPageToken
    
    if (pageCount > 10) {
      console.warn('⚠️ Stopping pagination after 10 pages to prevent infinite loop')
      break
    }
  } while (pageToken)
  
  console.log(`✅ Google Calendar API - Total: ${allEvents.length} events across ${pageCount} page(s)`)
  
  return allEvents
}

/**
 * Get the UTC time that represents midnight on a given date in a specific timezone
 * Uses iterative approach to find the correct UTC time
 */
function getUTCTimeForMidnight(year: number, month: number, day: number, timezone: string): Date {
  // Validate timezone first
  try {
    // Test if timezone is valid by trying to format a date
    Intl.DateTimeFormat(undefined, { timeZone: timezone })
  } catch (e) {
    console.warn(`⚠️ Invalid timezone "${timezone}", falling back to UTC`)
    // Fallback to UTC if timezone is invalid
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
  }
  
  let formatter: Intl.DateTimeFormat
  try {
    formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  } catch (e) {
    console.warn(`⚠️ Could not create formatter with timezone "${timezone}", falling back to UTC`)
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
  }
  
  // Start with UTC midnight on the target date
  let candidate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
  
  // Check what this represents in the target timezone
  let parts = formatter.formatToParts(candidate)
  let tzYear = parseInt(parts.find(p => p.type === 'year')?.value || '0')
  let tzMonth = parseInt(parts.find(p => p.type === 'month')?.value || '0')
  let tzDay = parseInt(parts.find(p => p.type === 'day')?.value || '0')
  let tzHour = parseInt(parts.find(p => p.type === 'hour')?.value || '0')
  
  // If we're on the right date but wrong hour, adjust
  if (tzYear === year && tzMonth === month && tzDay === day) {
    // We're on the right day, just need to adjust to midnight
    candidate = new Date(candidate.getTime() - tzHour * 60 * 60 * 1000)
  } else {
    // We're on a different day, need to adjust more
    const targetDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`)
    
    // Use a more direct approach: find what UTC time formats to our target in the timezone
    // Try multiple UTC times and see which one gives us the right date/time in target TZ
    // Use binary search or approximation
    const dayDiff = (tzDay - day) + (tzMonth - month) * 30 + (tzYear - year) * 365
    candidate = new Date(candidate.getTime() - dayDiff * 24 * 60 * 60 * 1000 - tzHour * 60 * 60 * 1000)
    
    // Verify and refine
    parts = formatter.formatToParts(candidate)
    tzYear = parseInt(parts.find(p => p.type === 'year')?.value || '0')
    tzMonth = parseInt(parts.find(p => p.type === 'month')?.value || '0')
    tzDay = parseInt(parts.find(p => p.type === 'day')?.value || '0')
    tzHour = parseInt(parts.find(p => p.type === 'hour')?.value || '0')
    
    if (tzYear !== year || tzMonth !== month || tzDay !== day || tzHour !== 0) {
      // Refine: adjust by the difference
      const hourDiff = tzHour
      const dayOffset = (tzDay - day) + (tzMonth - month) * 30
      candidate = new Date(candidate.getTime() - hourDiff * 60 * 60 * 1000 - dayOffset * 24 * 60 * 60 * 1000)
    }
  }
  
  return candidate
}

/**
 * Get month boundaries in a specific timezone
 * Returns ISO strings in UTC but computed for the given timezone
 */
export function getMonthBoundaries(year: number, month: number, timezone: string): { start: string; end: string } {
  // Get UTC time for midnight on first day of month in target timezone
  const startUTC = getUTCTimeForMidnight(year, month, 1, timezone)
  
  // Get last day of month
  const lastDay = new Date(year, month, 0).getDate()
  
  // Get UTC time for 23:59:59 on last day of month in target timezone
  const lastDayMidnight = getUTCTimeForMidnight(year, month, lastDay, timezone)
  const endUTC = new Date(lastDayMidnight.getTime() + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000)
  
  // Make end exclusive (add 1 second to be the start of next day)
  endUTC.setSeconds(endUTC.getSeconds() + 1)
  
  return {
    start: startUTC.toISOString(),
    end: endUTC.toISOString()
  }
}

/**
 * Fetch blocked dates for a unit and month
 */
export async function fetchAvailability(
  unitId: string,
  month: string, // YYYY-MM format
  timezone: string = 'Asia/Manila',
  forceRefresh: boolean = false
): Promise<AvailabilityResponse> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
  
  if (!apiKey) {
    throw new Error('Google Calendar API key not configured')
  }
  
  const unit = getUnitById(unitId)
  if (!unit) {
    throw new Error(`Unit not found: ${unitId}`)
  }
  
  // Check cache
  const cacheKey = `${unitId}|${month}|${timezone}`
  const cached = cache.get(cacheKey)
  const now = Date.now()
  
  if (!forceRefresh && cached) {
    if (cached.expiresAt > now) {
      const ageMinutes = Math.floor((now - (cached.expiresAt - CACHE_TTL)) / 60000)
      console.log(`💾 Calendar API - Cache HIT (age: ${ageMinutes}m):`, {
        cacheKey,
        blockedCount: cached.data.blocked.length,
        expiresAt: new Date(cached.expiresAt).toISOString()
      })
      return cached.data
    } else {
      const expiredMinutes = Math.floor((now - cached.expiresAt) / 60000)
      console.log(`⏰ Calendar API - Cache EXPIRED (${expiredMinutes}m ago):`, {
        cacheKey,
        expiredAt: new Date(cached.expiresAt).toISOString()
      })
    }
  } else if (forceRefresh) {
    console.log('🔄 Calendar API - Cache FORCED refresh (force=true):', { cacheKey })
  } else {
    console.log('💾 Calendar API - Cache MISS:', { cacheKey })
  }
  
  // Parse month
  const [year, monthNum] = month.split('-').map(Number)
  
  console.log('📊 Calendar API - Fetching availability:', {
    unitId,
    unitName: unit.name,
    calendarId: unit.googleCalendarId,
    month: `${year}-${String(monthNum).padStart(2, '0')}`,
    timezone,
    forceRefresh,
    cacheKey
  })
  
  // Get month boundaries in the specified timezone
  const { start: timeMin, end: timeMax } = getMonthBoundaries(year, monthNum, timezone)
  
  // Validate timezone before using in toLocaleString
  let timeMinLocalStr = 'N/A'
  let timeMaxLocalStr = 'N/A'
  try {
    timeMinLocalStr = new Date(timeMin).toLocaleString('en-US', { timeZone: timezone })
    timeMaxLocalStr = new Date(timeMax).toLocaleString('en-US', { timeZone: timezone })
  } catch (e) {
    console.warn('⚠️ Could not format dates with timezone:', timezone, e)
  }
  
  console.log('📅 Calendar API - Month boundaries:', {
    year,
    month: monthNum,
    timezone,
    timeMin,
    timeMax,
    timeMinLocal: timeMinLocalStr,
    timeMaxLocal: timeMaxLocalStr
  })
  
  // Fetch events from Google Calendar
  console.log('🔄 Calendar API - Fetching from Google Calendar...')
  const events = await fetchCalendarEvents(unit.googleCalendarId, timeMin, timeMax, apiKey)
  console.log(`📥 Calendar API - Fetched ${events.length} total events from Google Calendar`)
  
  // Transform events to blocked ranges
  const confirmedEvents = events.filter((event: any) => event.status === 'confirmed')
  console.log(`✓ Calendar API - ${confirmedEvents.length} confirmed events (out of ${events.length} total)`)
  
  const blockedRanges: BlockedRange[] = confirmedEvents
    .map((event: any) => {
      const { start, end } = normalizeEventDates(event)
      return {
        start,
        end,
        summary: event.summary || undefined,
        source: detectSource(event)
      }
    })
  
  console.log('📋 Calendar API - Blocked ranges (before merge):', {
    count: blockedRanges.length,
    ranges: blockedRanges.slice(0, 5).map(r => ({
      start: r.start,
      end: r.end,
      summary: r.summary,
      source: r.source
    }))
  })
  
  // Merge overlapping ranges
  const mergedRanges = mergeRanges(blockedRanges)
  console.log(`🔗 Calendar API - Merged to ${mergedRanges.length} non-overlapping ranges (from ${blockedRanges.length})`)
  
  const response: AvailabilityResponse = {
    blocked: mergedRanges,
    updatedAt: new Date().toISOString()
  }
  
  // Cache the result
  cache.set(cacheKey, {
    data: response,
    expiresAt: Date.now() + CACHE_TTL
  })
  
  return response
}

/**
 * Clear cache for a specific key or all cache
 */
export function clearCache(cacheKey?: string): void {
  if (cacheKey) {
    cache.delete(cacheKey)
  } else {
    cache.clear()
  }
}

