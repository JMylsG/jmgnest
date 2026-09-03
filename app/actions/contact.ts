'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string
  
  // Validate
  if (!name || !email || !message) {
    return { success: false, error: 'Name, email, and message are required' }
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email address' }
  }
  
  try {
    // Send email to info@jmgnest.com
    // Note: For production, verify your domain with Resend and update the 'from' address
    // For testing, you can use onboarding@resend.dev (Resend's test domain)
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'JMG Nest Contact Form <onboarding@resend.dev>'
    
    const { error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: 'info@jmgnest.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d5016; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
          <p style="color: #666; font-size: 14px;">This message was sent from the JMG Nest contact form.</p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from the JMG Nest contact form.
      `,
    })

    if (emailError) {
      console.error('Resend error:', emailError)
      return { success: false, error: 'Failed to send message. Please try again.' }
    }
    
    return { success: true, message: 'Thank you for your message! We will get back to you soon.' }
  } catch (error) {
    console.error('Contact form error:', error)
    return { success: false, error: 'Failed to send message. Please try again.' }
  }
}

