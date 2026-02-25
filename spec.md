# Specification

## Summary
**Goal:** Add a hardcoded admin user and a protected admin panel for viewing all submitted bookings.

**Planned changes:**
- Add a hardcoded admin principal to the backend actor.
- Expose a backend `isAdmin(caller)` query that returns true only for the admin principal.
- Expose a protected `getAllBookings` query that returns booking data only to the admin principal, rejecting all other callers with an authorization error.
- Add an `/admin` route to the frontend with a "Login with Internet Identity" button.
- After login, call `isAdmin`; if true, display a bookings dashboard table with columns: booking ID, service type, booking category, customer name, phone number, preferred date, message, and status.
- If the authenticated user is not admin, show an "Access Denied" message.
- Style the admin panel to match the existing cosmic/mystical visual theme.

**User-visible outcome:** The website owner can navigate to `/admin`, log in with their Internet Identity, and view a table of all submitted bookings. Any other visitor sees an access denied message or is prompted to log in.
