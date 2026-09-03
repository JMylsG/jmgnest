import { NextRequest, NextResponse } from 'next/server'
import { fetchAvailability } from '@/lib/calendar-api'

export const dynamic = 'force-dynamic' // Ensure this is a dynamic route

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  const startTime = Date.now()
  
  try {
    const { searchParams } = new URL(request.url)
    const { unitId } = await params
    const month = searchParams.get('month') || new Date().toISOString().slice(0, 7) // YYYY-MM format
    const tz = searchParams.get('tz') || 'Asia/Manila'
    const force = searchParams.get('force') === 'true'

    console.log('📅 Availability API Request:', {
      unitId,
      month,
      timezone: tz,
      force,
      timestamp: new Date().toISOString()
    })

    // Validate month format
    if (!/^\d{4}-\d{2}$/.test(month)) {
      console.error('❌ Invalid month format:', month)
      return NextResponse.json(
        { error: 'Invalid month format. Use YYYY-MM', details: { received: month } },
        { status: 400 }
      )
    }

    const availability = await fetchAvailability(unitId, month, tz, force)
    
    const duration = Date.now() - startTime
    console.log('✅ Availability API Success:', {
      unitId,
      month,
      blockedCount: availability.blocked.length,
      duration: `${duration}ms`,
      updatedAt: availability.updatedAt
    })

    return NextResponse.json(availability)
  } catch (error: any) {
    const duration = Date.now() - startTime
    const { unitId: errorUnitId } = await params
    console.error('❌ Availability API Error:', {
      unitId: errorUnitId,
      error: error.message,
      stack: error.stack,
      duration: `${duration}ms`
    })
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch availability',
        details: process.env.NODE_ENV === 'development' ? {
          unitId: errorUnitId,
          month: new URL(request.url).searchParams.get('month'),
          timezone: new URL(request.url).searchParams.get('tz'),
          message: error.message,
          name: error.name
        } : undefined
      },
      { status: error.message?.includes('not found') ? 404 : 500 }
    )
  }
}

