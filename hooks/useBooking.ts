'use client'

import { useState, useEffect } from 'react'
import { Unit } from '@/lib/types'

interface Pricing {
  baseRate: number
  nights: number
  subtotal: number
  weeklyDiscount: number
  cleaningFee: number
  total: number
}

interface SelectedDates {
  checkIn: string
  checkOut: string
}

export function useBooking(unit: Unit) {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    checkIn: '',
    checkOut: '',
  })
  const [guests, setGuests] = useState(1)
  const [pricing, setPricing] = useState<Pricing | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Set initial guest count to unit's max capacity if it's less than current
  useEffect(() => {
    if (guests > unit.capacity.guests) {
      setGuests(unit.capacity.guests)
    }
  }, [unit.capacity.guests, guests])

  const calculatePrice = (checkIn: string, checkOut: string, numGuests: number) => {
    if (!checkIn || !checkOut) {
      setPricing(null)
      return
    }

    try {
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(checkOut)

      // Calculate number of nights
      const diffTime = checkOutDate.getTime() - checkInDate.getTime()
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (nights < unit.pricing.minNights) {
        setError(`Minimum stay is ${unit.pricing.minNights} nights`)
        setPricing(null)
        return
      }

      setError(null)

      // Calculate base rate
      const baseRate = unit.pricing.baseRate

      // Calculate subtotal
      const subtotal = baseRate * nights

      // Calculate weekly discount (if applicable)
      const weeks = Math.floor(nights / 7)
      const weeklyDiscountAmount = weeks > 0 ? subtotal * unit.pricing.weeklyDiscount : 0

      // Calculate cleaning fee
      const cleaningFee = unit.pricing.cleaningFee

      // Calculate total
      const total = subtotal - weeklyDiscountAmount + cleaningFee

      setPricing({
        baseRate,
        nights,
        subtotal,
        weeklyDiscount: weeklyDiscountAmount,
        cleaningFee,
        total,
      })
    } catch (err) {
      setError('Invalid date range')
      setPricing(null)
    }
  }

  return {
    selectedDates,
    setSelectedDates,
    guests,
    setGuests,
    pricing,
    calculatePrice,
    loading,
    error,
  }
}

