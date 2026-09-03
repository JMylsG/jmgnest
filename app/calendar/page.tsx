'use client'

import { useState, useEffect, useCallback } from 'react'
import { getUnitById, units } from '@/lib/units.data'
import { BlockedRange } from '@/lib/calendar-api'
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function CalendarPage() {
  const [selectedUnitId, setSelectedUnitId] = useState<string>('main-unit')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [blockedRanges, setBlockedRanges] = useState<BlockedRange[]>([])
  const [loading, setLoading] = useState(true) // Start as true to show loading
  const [error, setError] = useState<string | null>(null)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [timezone, setTimezone] = useState<string>('Asia/Manila')
  const [debugInfo, setDebugInfo] = useState<{
    url?: string
    status?: number
    blockedCount?: number
    rawResponse?: any
  }>({})
  const [showRawJson, setShowRawJson] = useState(false)

  // Get visitor timezone
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      setTimezone(tz)
    } catch (e) {
      console.warn('Could not detect timezone, using Asia/Manila')
    }
  }, [])

  const fetchAvailability = useCallback(async (force: boolean = false) => {
    setLoading(true)
    setError(null)
    setDebugInfo({})

    try {
      const month = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`
      const url = `/api/availability/${selectedUnitId}?month=${month}&tz=${encodeURIComponent(timezone)}${force ? '&force=true' : ''}`
      
      console.log('🔄 Fetching availability:', {
        unitId: selectedUnitId,
        month,
        timezone,
        force,
        url
      })
      
      const response = await fetch(url)
      const responseData = await response.json()
      
      setDebugInfo({
        url,
        status: response.status,
        blockedCount: responseData.blocked?.length || 0,
        rawResponse: responseData
      })
      
      if (!response.ok) {
        throw new Error(responseData.error || `HTTP ${response.status}: Failed to fetch availability`)
      }

      console.log('✅ Availability fetched:', {
        blockedCount: responseData.blocked?.length || 0,
        updatedAt: responseData.updatedAt
      })
      
      setBlockedRanges(responseData.blocked || [])
      setUpdatedAt(responseData.updatedAt)
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to load calendar'
      setError(errorMsg)
      console.error('❌ Error fetching availability:', err)
      setDebugInfo(prev => ({ ...prev, error: errorMsg }))
    } finally {
      setLoading(false)
    }
  }, [selectedUnitId, currentMonth, timezone])

  // Fetch availability when unit or month changes
  useEffect(() => {
    fetchAvailability(false)
  }, [fetchAvailability])

  const prevMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    console.log('⬅️ Previous month:', {
      from: `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`,
      to: `${newMonth.getFullYear()}-${String(newMonth.getMonth() + 1).padStart(2, '0')}`
    })
    setCurrentMonth(newMonth)
  }

  const nextMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    console.log('➡️ Next month:', {
      from: `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`,
      to: `${newMonth.getFullYear()}-${String(newMonth.getMonth() + 1).padStart(2, '0')}`
    })
    setCurrentMonth(newMonth)
  }

  const isDateBlocked = (date: Date): boolean => {
    if (!blockedRanges || blockedRanges.length === 0) {
      return false
    }
    
    // Normalize date to start of day in UTC for comparison
    // Create date at midnight in local time, then convert to UTC
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    const dateStart = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000)
    const dateEnd = new Date(dateStart.getTime() + 24 * 60 * 60 * 1000) // Next day (exclusive)
    
    return blockedRanges.some(range => {
      const rangeStart = new Date(range.start)
      const rangeEnd = new Date(range.end)
      
      // Check if date overlaps with blocked range
      // range.end is end-exclusive, so we check if our date range overlaps
      // Date is blocked if: dateStart < rangeEnd && dateEnd > rangeStart
      const isBlocked = dateStart < rangeEnd && dateEnd > rangeStart
      
      // Debug log for first few blocked ranges
      if (isBlocked && blockedRanges.indexOf(range) < 3) {
        console.log('🚫 Date blocked:', {
          date: date.toISOString().split('T')[0],
          dateStart: dateStart.toISOString(),
          dateEnd: dateEnd.toISOString(),
          rangeStart: rangeStart.toISOString(),
          rangeEnd: rangeEnd.toISOString(),
          rangeSummary: range.summary
        })
      }
      
      return isBlocked
    })
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const today = new Date()

  // Ensure daysInMonth is always valid
  if (daysInMonth <= 0 || daysInMonth > 31) {
    console.error('❌ Invalid daysInMonth:', daysInMonth, 'for month:', currentMonth)
  }

  // Debug logging
  useEffect(() => {
    console.log('📅 Calendar State:', {
      selectedUnitId,
      currentMonth: `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`,
      timezone,
      blockedRangesCount: blockedRanges.length,
      daysInMonth,
      firstDay,
      loading,
      error,
      currentDate: currentMonth.toISOString()
    })
  }, [selectedUnitId, currentMonth, timezone, blockedRanges.length, daysInMonth, firstDay, loading, error])

  return (
    <div className="min-h-screen bg-cream py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-h1 font-serif font-normal text-forest-green mb-8">
          Availability Calendar
        </h1>

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Unit Selector */}
            <div className="flex items-center gap-4">
              <label className="text-body font-sans font-medium text-forest-green">
                Unit:
              </label>
              <select
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(e.target.value)}
                className="px-4 py-2 border border-border-light rounded-lg text-body font-sans focus:outline-none focus:ring-2 focus:ring-forest-green"
              >
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-warm-sage rounded-lg transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5 text-forest-green" />
              </button>
              <h2 className="text-h3 font-serif font-semibold text-forest-green min-w-[200px] text-center">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-warm-sage rounded-lg transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5 text-forest-green" />
              </button>
            </div>

            {/* Refresh Button */}
            <Button
              variant="secondary"
              onClick={() => fetchAvailability(true)}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Status */}
          {updatedAt && (
            <div className="mt-4 text-sm text-text-secondary font-sans">
              Last updated: {new Date(updatedAt).toLocaleString()} ({timezone})
            </div>
          )}
        </div>

        {/* Debug Bar */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 text-xs font-mono">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <span className="font-semibold">Unit:</span> {selectedUnitId}
            </div>
            <div>
              <span className="font-semibold">Month:</span> {currentMonth.getFullYear()}-{String(currentMonth.getMonth() + 1).padStart(2, '0')}
            </div>
            <div>
              <span className="font-semibold">TZ:</span> {timezone}
            </div>
            <div>
              <span className="font-semibold">LastUpdated:</span> {updatedAt ? new Date(updatedAt).toLocaleTimeString() : 'N/A'}
            </div>
          </div>
          {debugInfo.status && (
            <div className="mt-2 pt-2 border-t border-gray-400">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div>
                  <span className="font-semibold">Status:</span> {debugInfo.status}
                </div>
                <div>
                  <span className="font-semibold">Blocked Ranges:</span> {debugInfo.blockedCount || 0}
                </div>
                <div>
                  <button
                    onClick={() => setShowRawJson(!showRawJson)}
                    className="text-blue-600 hover:underline"
                  >
                    {showRawJson ? 'Hide' : 'Show'} Raw JSON
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-[#DC143C]/10 border-2 border-[#DC143C] rounded-lg p-4 mb-6">
            <p className="text-sm text-[#DC143C] font-sans font-semibold mb-2">❌ Error:</p>
            <p className="text-sm text-[#DC143C] font-sans">{error}</p>
            {debugInfo.status && (
              <p className="text-xs text-[#DC143C] font-sans mt-2">HTTP Status: {debugInfo.status}</p>
            )}
          </div>
        )}

        {/* Raw JSON Debug */}
        {showRawJson && debugInfo.rawResponse && (
          <div className="bg-gray-900 text-green-400 rounded-lg p-4 mb-6 font-mono text-xs overflow-auto max-h-64">
            <pre>{JSON.stringify(debugInfo.rawResponse, null, 2)}</pre>
          </div>
        )}

        {/* Calendar Grid - Always render, even when loading */}
        <div className="bg-white rounded-xl p-6 shadow-md relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-xl">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 animate-spin text-forest-green mx-auto mb-2" />
                <p className="text-sm text-text-secondary">Loading availability...</p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-forest-green py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before first day of month */}
            {Array.from({ length: firstDay }).map((_, index) => (
              <div 
                key={`empty-${index}`} 
                className="aspect-square min-h-[40px] bg-gray-50 border border-gray-200 rounded-lg"
                aria-hidden="true"
              />
            ))}

            {/* Days of the month - ALWAYS RENDER */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const date = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day
              )
              // Only check if blocked when not loading
              const isBlocked = !loading && blockedRanges.length > 0 && isDateBlocked(date)
              const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()

              // Ensure the date string is always valid
              const dateStr = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })

              return (
                <div
                  key={`day-${day}`}
                  className={`
                    aspect-square min-h-[40px] w-full flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200
                    border-2 ${isBlocked ? 'border-[#DC143C]' : 'border-green-300'}
                    ${isBlocked
                      ? 'bg-[#DC143C] text-white font-semibold'
                      : 'bg-green-100 text-forest-green hover:bg-green-200 hover:scale-105'
                    }
                    ${isToday ? 'ring-2 ring-warm-gold ring-offset-1 z-10' : ''}
                    ${loading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
                    shadow-sm hover:shadow-md
                  `}
                  title={loading 
                    ? 'Loading...' 
                    : isBlocked 
                      ? `Booked: ${dateStr}` 
                      : `Available: ${dateStr}`}
                  style={{ 
                    outline: 'none',
                    display: 'flex',
                    visibility: 'visible',
                    opacity: loading ? 0.6 : 1
                  }}
                  onClick={() => {
                    if (!loading) {
                      console.log('📅 Date clicked:', {
                        day,
                        date: dateStr,
                        dateISO: date.toISOString().split('T')[0],
                        isBlocked,
                        isToday
                      })
                    }
                  }}
                >
                  <span className="select-none">{day}</span>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-border-light flex items-center gap-6 text-sm font-sans">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-300"></div>
              <span className="text-text-secondary">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#DC143C] border-2 border-[#DC143C]"></div>
              <span className="text-text-secondary">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-warm-gold bg-transparent"></div>
              <span className="text-text-secondary">Today</span>
            </div>
          </div>

          {/* Debug Info - Show if no blocked dates */}
          {!loading && blockedRanges.length === 0 && (
            <div className="mt-6 pt-6 border-t border-border-light text-center">
              <p className="text-sm text-text-secondary font-sans">
                No blocked dates found for this month. All dates are available.
              </p>
            </div>
          )}

          {/* Grid Debug - Show cell count */}
          <div className="mt-4 text-xs text-text-tertiary font-mono text-center space-y-1">
            <div>Grid: {firstDay} empty cells + {daysInMonth} days = {firstDay + daysInMonth} total cells</div>
            <div>Current Month: {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
            <div>Blocked Ranges: {blockedRanges.length}</div>
            {blockedRanges.length > 0 && (
              <div className="text-[10px] mt-2">
                Ranges: {blockedRanges.slice(0, 3).map(r => 
                  `${new Date(r.start).toLocaleDateString()}-${new Date(r.end).toLocaleDateString()}`
                ).join(', ')}{blockedRanges.length > 3 ? '...' : ''}
              </div>
            )}
          </div>
        </div>

        {/* Force Render Test - Show if dates aren't rendering */}
        {daysInMonth === 0 && (
          <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 mt-4">
            <p className="text-red-800 font-bold">⚠️ ERROR: No days calculated for this month!</p>
            <p className="text-red-700 text-sm mt-2">
              Year: {currentMonth.getFullYear()}, Month: {currentMonth.getMonth() + 1}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

