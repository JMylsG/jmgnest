# Google Calendar Integration Setup Guide

This guide will help you set up Google Calendar integration so that blocked dates from your calendars are displayed on the website.

## Prerequisites

- A Google account
- Access to Google Cloud Console
- Your Google Calendar IDs for each unit

## Step-by-Step Setup

### 1. Get Your Google Calendar IDs

1. Open [Google Calendar](https://calendar.google.com/)
2. On the left sidebar, find your calendars (Main Unit, Unit A, Unit B)
3. Click the three dots (⋮) next to each calendar name
4. Select "Settings and sharing"
5. Scroll down to "Integrate calendar"
6. Copy the **Calendar ID** (format: `c_xxxxxxxxxxxxx@group.calendar.google.com`)
7. Save these IDs - you'll need them later

### 2. Make Calendars Public

For the API to read your calendars, they need to be publicly accessible:

1. In the same "Settings and sharing" page for each calendar
2. Scroll to "Access permissions"
3. Check the box: **"Make available to public"**
4. Select **"See all event details"** from the dropdown
5. Click "Save"

### 3. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click "New Project"
4. Enter a project name (e.g., "JMG Nest Calendar")
5. Click "Create"

### 4. Enable Google Calendar API

1. In Google Cloud Console, go to **"APIs & Services" > "Library"**
2. Search for **"Google Calendar API"**
3. Click on it and press **"Enable"**

### 5. Create API Key

1. Go to **"APIs & Services" > "Credentials"**
2. Click **"Create Credentials" > "API Key"**
3. Copy the API key that appears
4. (Optional but recommended) Click "Restrict key" to:
   - Under "API restrictions": Select "Restrict key" and choose "Google Calendar API"
   - Under "Application restrictions": For production, restrict by HTTP referrer

### 6. Add API Key to Your Project

1. Open your project's `.env.local` file (create it if it doesn't exist)
2. Add the following line:
   ```env
   NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with the API key you copied

### 7. Verify Calendar IDs

The calendar IDs are already configured in the code at:
- `lib/data.ts` (lines 661, 776, 871)
- `lib/units.data.ts` (lines 11, 16, 21)

If your calendar IDs are different, you can override them in `.env.local`:
```env
NEXT_PUBLIC_MAIN_UNIT_CALENDAR_ID=your_main_unit_calendar_id
NEXT_PUBLIC_UNIT_A_CALENDAR_ID=your_unit_a_calendar_id
NEXT_PUBLIC_UNIT_B_CALENDAR_ID=your_unit_b_calendar_id
```

### 8. Restart Your Development Server

After adding the environment variable:

```bash
# Stop the server (Ctrl+C or Cmd+C)
# Then restart it
npm run dev
```

### 9. Test the Integration

1. Go to `http://localhost:3000/calendar`
2. Select a unit from the dropdown
3. You should see blocked dates highlighted in red
4. Check the browser console (F12) for any error messages

## Troubleshooting

### Dates Not Showing as Blocked

1. **Check API Key**: Make sure `NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY` is set in `.env.local`
2. **Check Calendar Public Access**: Verify calendars are set to "Make available to public"
3. **Check Calendar IDs**: Verify the calendar IDs match your actual Google Calendar IDs
4. **Check Browser Console**: Look for error messages in the browser console (F12)
5. **Check Server Logs**: Look for error messages in your terminal where `npm run dev` is running

### Common Errors

**Error: "Google Calendar API key not configured"**
- Solution: Add `NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY` to `.env.local` and restart the server

**Error: "Calendar not found: [calendar_id]"**
- Solution: Check that the calendar ID is correct and the calendar is public

**Error: "Access denied (403)"**
- Solution: Make sure the Calendar API is enabled in Google Cloud Console and the API key has proper permissions

**Error: "Bad request (400)"**
- Solution: Check that the calendar ID format is correct (should start with `c_` and end with `@group.calendar.google.com`)

### Testing Calendar Connection

You can test if your calendar is accessible by visiting this URL in your browser (replace with your calendar ID and API key):

```
https://www.googleapis.com/calendar/v3/calendars/YOUR_CALENDAR_ID/events?key=YOUR_API_KEY&timeMin=2025-01-01T00:00:00Z&timeMax=2025-12-31T23:59:59Z&singleEvents=true
```

If you see JSON data with events, your calendar is accessible. If you see an error, check the error message for details.

## Security Notes

- Never commit your `.env.local` file to git (it should already be in `.gitignore`)
- For production, set the API key in your hosting platform's environment variables (e.g., Vercel, Netlify)
- Consider restricting your API key to only allow requests from your domain in production

## Need Help?

If you're still having issues:
1. Check the browser console for detailed error messages
2. Check the server terminal for API request logs
3. Verify all steps above were completed correctly
4. Test the calendar API directly using the URL above

