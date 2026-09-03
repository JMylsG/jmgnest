'use server'

import { revalidatePath } from 'next/cache'

export async function submitBooking(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const checkIn = formData.get('checkIn') as string
  const checkOut = formData.get('checkOut') as string
  const guests = formData.get('guests') as string
  const message = formData.get('message') as string
  
  // Validate data
  if (!name || !email || !checkIn || !checkOut || !guests) {
    throw new Error('All required fields must be filled')
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email address')
  }
  
  // Validate dates
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (checkInDate < today) {
    throw new Error('Check-in date cannot be in the past')
  }
  
  if (checkOutDate <= checkInDate) {
    throw new Error('Check-out date must be after check-in date')
  }
  
  try {
    // In a real application, you would send an email or save to database here
    // await sendBookingEmail({ name, email, checkIn, checkOut, guests, message })
    // await saveBookingToDatabase({ name, email, checkIn, checkOut, guests, message })
    
    console.log('Booking request:', { name, email, checkIn, checkOut, guests, message })
    
    // Revalidate booking page
    revalidatePath('/booking')
    
    return { success: true, message: 'Booking request submitted successfully' }
  } catch (error) {
    throw new Error('Failed to submit booking request')
  }
}

