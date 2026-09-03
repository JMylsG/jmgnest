export type Unit = {
  id: 'main-unit' | 'unit-a' | 'unit-b' | 'main' | 'a' | 'b'
  name: string
  googleCalendarId: string
}

export const units: Unit[] = [
  {
    id: 'main-unit',
    name: 'Main Unit',
    googleCalendarId: 'c_0f01c83b800403808c0f437e7762e83c58c8cc68313f40f4bb2ad671f47a0f02@group.calendar.google.com'
  },
  {
    id: 'unit-a',
    name: 'Unit A',
    googleCalendarId: 'c_169c05a073398c9d09acf5a2b165a548b3504914fd153fbab3d907073c3890ff@group.calendar.google.com'
  },
  {
    id: 'unit-b',
    name: 'Unit B',
    googleCalendarId: 'c_9dd14670fa7078070a6bef04a015f8de5d6a56be0cd9595078a31bc89bc7886@group.calendar.google.com'
  }
]

// Map for backwards compatibility with different ID formats
export const unitIdMap: Record<string, string> = {
  'main': 'main-unit',
  'a': 'unit-a',
  'b': 'unit-b',
  'main-unit': 'main-unit',
  'unit-a': 'unit-a',
  'unit-b': 'unit-b'
}

/**
 * Get unit by ID (supports both formats: 'main' or 'main-unit')
 */
export function getUnitById(id: string): Unit | null {
  const normalizedId = unitIdMap[id] || id
  return units.find(u => u.id === normalizedId) || null
}

/**
 * Get unit by calendar ID
 */
export function getUnitByCalendarId(calendarId: string): Unit | null {
  return units.find(u => u.googleCalendarId === calendarId) || null
}

