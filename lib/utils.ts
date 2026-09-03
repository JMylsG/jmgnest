import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'PHP'): string {
  // Handle currency symbol '₱' by converting to ISO code 'PHP'
  const currencyCode = currency === '₱' ? 'PHP' : currency
  
  try {
    // Try using Intl.NumberFormat for standard currency codes
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
    }).format(amount)
  } catch (error) {
    // Fallback: If currency code is invalid, just format the number and add symbol
    const formattedAmount = new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
    return `${currency}${formattedAmount}`
  }
}

export function formatDate(date: string | Date): string {
  // If date is already a Date object, use it directly
  if (date instanceof Date) {
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return String(date)
    }
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
    } catch (error) {
      return String(date)
    }
  }

  // If date is a string, check if it's already formatted (like "February 2025")
  const dateStr = String(date).trim()
  
  // Check if it looks like an already-formatted date (contains month names)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']
  const hasMonthName = monthNames.some(month => dateStr.includes(month))
  
  // If it already contains a month name, assume it's formatted and return as-is
  if (hasMonthName) {
    return dateStr
  }

  // Try to parse as a date string (ISO format, etc.)
  try {
    const dateObj = new Date(dateStr)
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      // Invalid date, return original string
      return dateStr
    }
    
    // Format the valid date
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj)
  } catch (error) {
    // If formatting fails, return the original string
    return dateStr
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

