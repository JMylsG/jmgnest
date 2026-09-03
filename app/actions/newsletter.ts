'use server'

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get('email') as string
  
  if (!email) {
    return { success: false, error: 'Email is required' }
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email address' }
  }
  
  try {
    // In a real application, you would subscribe to a newsletter service
    // await subscribeToNewsletter(email)
    
    console.log('Newsletter subscription:', { email })
    
    return { success: true, message: 'Successfully subscribed to newsletter!' }
  } catch (error) {
    return { success: false, error: 'Failed to subscribe. Please try again.' }
  }
}

