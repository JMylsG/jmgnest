// Inline SVG icon sprite ported from the standalone mockups.
// Rendered once per page; icons are referenced via <svg className="ic"><use href="#i-..."/></svg>.
export default function MockupSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="i-guests" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 5.2a3.2 3.2 0 0 1 0 6" /><path d="M17 15.2a5.5 5.5 0 0 1 3.5 4.8" /></symbol>
      <symbol id="i-bed" viewBox="0 0 24 24"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" /><path d="M3 14h18" /><path d="M7 10V8.5A1.5 1.5 0 0 1 8.5 7h7A1.5 1.5 0 0 1 17 8.5V10" /><path d="M3 18v2M21 18v2" /></symbol>
      <symbol id="i-bath" viewBox="0 0 24 24"><path d="M4 12V6.2A2.2 2.2 0 0 1 6.2 4a2.1 2.1 0 0 1 2 1.6" /><path d="M3 12h18v1.5A5.5 5.5 0 0 1 15.5 19h-7A5.5 5.5 0 0 1 3 13.5z" /><path d="M7.5 22l.8-2M16.5 22l-.8-2" /></symbol>
      <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 2.5l2.7 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.3 19.6l1.4-6.3-4.8-4.3 6.4-.6z" /></symbol>
      <symbol id="i-wifi" viewBox="0 0 24 24"><path d="M4.5 12.3a11 11 0 0 1 15 0" /><path d="M7.8 15.6a6.3 6.3 0 0 1 8.4 0" /><path d="M11 18.9a1.5 1.5 0 0 1 2 0" /></symbol>
      <symbol id="i-parking" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M10 16V8h3.2a2.6 2.6 0 0 1 0 5.2H10" /></symbol>
      <symbol id="i-kitchen" viewBox="0 0 24 24"><path d="M4 9.5h16" /><path d="M5 9.5l.9 8.2a2 2 0 0 0 2 1.8h8.2a2 2 0 0 0 2-1.8L20 9.5" /><path d="M9 9.5v-3a3 3 0 0 1 6 0v3" /></symbol>
      <symbol id="i-tv" viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="12.5" rx="2" /><path d="M8 21h8M12 17.5V21" /></symbol>
      <symbol id="i-coffee" viewBox="0 0 24 24"><path d="M4 8.5h13V13a4.5 4.5 0 0 1-4.5 4.5H8.5A4.5 4.5 0 0 1 4 13z" /><path d="M17 9.5h1.8a2.4 2.4 0 0 1 0 4.8H17" /><path d="M8 3v2.2M12 3v2.2" /></symbol>
      <symbol id="i-shower" viewBox="0 0 24 24"><path d="M12 4.2V2.5" /><path d="M5.5 11a6.5 6.5 0 0 1 13 0z" /><path d="M8 15v.2M12 16.5v.2M16 15v.2M10 19v.2M14 19v.2" /></symbol>
      <symbol id="i-mountain" viewBox="0 0 24 24"><path d="M2.5 19.5l6-11 3.5 5.5 2-3 7.5 8.5z" /><path d="M8.5 8.5l2 3.2" /></symbol>
      <symbol id="i-house" viewBox="0 0 24 24"><path d="M3.5 11L12 4l8.5 7" /><path d="M5.5 9.7V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.7" /><path d="M9.5 20v-5.5h5V20" /></symbol>
      <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21.5s6.5-5.8 6.5-10.5A6.5 6.5 0 1 0 5.5 11c0 4.7 6.5 10.5 6.5 10.5z" /><circle cx="12" cy="10.5" r="2.4" /></symbol>
      <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 3l1.9 5.4L19.5 10l-5.6 1.6L12 17l-1.9-5.4L4.5 10l5.6-1.6z" /></symbol>
      <symbol id="i-celebrate" viewBox="0 0 24 24"><path d="M4 20l4.5-11 6.5 6.5z" /><path d="M13 4.5c1 0 1.7.7 1.7 1.7M16.5 3.2l-1 1.6M20 6l-1.7.8M19.3 11l-1.6-.6" /></symbol>
      <symbol id="i-tree" viewBox="0 0 24 24"><path d="M12 3l4.5 6.5H14l3.5 5H6.5L10 9.5H7.5z" /><path d="M12 14.5V21" /></symbol>
      <symbol id="i-bag" viewBox="0 0 24 24"><path d="M6.5 8h11l1 12.5H5.5z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></symbol>
      <symbol id="i-berry" viewBox="0 0 24 24"><path d="M12 8.5c3.2 0 5.5 2 5.5 5 0 3.8-3.3 7.5-5.5 7.5S6.5 17.3 6.5 13.5c0-3 2.3-5 5.5-5z" /><path d="M9 7c1 1 2 1.5 3 1.5S14 8 15 7" /><path d="M12 8.5V6" /></symbol>
      <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3.5 7l8.5 5.5L20.5 7" /></symbol>
      <symbol id="i-chat" viewBox="0 0 24 24"><path d="M4.5 5h15A1.5 1.5 0 0 1 21 6.5v8a1.5 1.5 0 0 1-1.5 1.5H9l-4 3.5V16H4.5A1.5 1.5 0 0 1 3 14.5v-8A1.5 1.5 0 0 1 4.5 5z" /></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 6.5" /></symbol>
      <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20.5S3.5 15 3.5 8.9A4.4 4.4 0 0 1 12 6.6a4.4 4.4 0 0 1 8.5 2.3C20.5 15 12 20.5 12 20.5z" /></symbol>
      <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></symbol>
      <symbol id="i-compass" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></symbol>
      <symbol id="i-landmark" viewBox="0 0 24 24"><path d="M12 3l8 4.5H4z" /><path d="M6 10v6M10 10v6M14 10v6M18 10v6" /><path d="M4 20h16M4.5 17h15" /></symbol>
      <symbol id="i-utensils" viewBox="0 0 24 24"><path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11" /><path d="M16.5 3c-1.5 0-2.5 1.8-2.5 4.5S15 12 16.5 12 19 10.2 19 7.5 18 3 16.5 3zM16.5 12v9" /></symbol>
      <symbol id="i-chevron-left" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></symbol>
      <symbol id="i-chevron-right" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></symbol>
      <symbol id="i-expand" viewBox="0 0 24 24"><path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" /></symbol>
      <symbol id="i-images" viewBox="0 0 24 24"><rect x="3" y="6" width="14" height="12" rx="2" /><path d="M7 3h12a2 2 0 0 1 2 2v10" /><path d="M3 14l3.5-3 3 2.5L14 9l3 4" /></symbol>
      <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5" /></symbol>
      <symbol id="i-google" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></symbol>
      <symbol id="i-facebook" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></symbol>
      <symbol id="i-airbnb" viewBox="0 0 32 32"><path d="M29.5 22.3c-.4-1-.75-1.9-1.18-2.74v-.04c-2.36-5-4.55-9.5-6.63-13.55l-.14-.2C20.07 3.7 19 1.9 15.92 1.9c-3.05 0-4.34 2.1-5.67 4.87l-.1.2c-2.09 4.04-4.28 8.55-6.63 13.55v.07l-.7 1.52c-.26.63-.4.96-.43 1.06-.28.7-.44 1.5-.44 2.33 0 3.53 2.86 6.39 6.39 6.39h.06c.12 0 .23-.01.34-.04h.46c2.74-.57 5.07-2.06 6.71-4.12 1.66 2.08 3.98 3.57 6.65 4.13h.54c3.5 0 6.35-2.83 6.38-6.32 0-.84-.16-1.64-.46-2.38zm-13.5 1.54c-1.37-1.54-2.4-3.4-2.99-5.47a3.7 3.7 0 0 1-.2-1.17c0-.7.21-1.37.57-1.93.54-.8 1.45-1.32 2.48-1.32h.35c1.03 0 1.94.53 2.47 1.33.35.54.56 1.2.56 1.9 0 .43-.07.83-.2 1.2-.63 2.16-1.66 4.02-3.03 5.6z" /></symbol>
    </svg>
  )
}
