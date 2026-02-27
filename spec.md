# Specification

## Summary
**Goal:** Fix the end-to-end booking submission pipeline so that bookings are stored correctly in the backend and admin notification buttons appear after a successful submission.

**Planned changes:**
- Audit and fix the Motoko `createBooking` function signature to accept all required fields (`serviceType`, `bookingCategory`, `name`, `phone`, `preferredDate`, `preferredTime`, optional `message`) with correct variant/text types
- Fix the frontend `BookingForm.tsx` to serialize form fields into exactly the shape the backend expects before calling the actor
- Update the `useCreateBooking` hook in `useQueries.ts` to correctly call `createBooking`, await the result, unwrap `#ok`/`#err` variants, and surface errors to React Query's error state
- Ensure the mutation returns the new booking record (including the assigned booking ID) on success
- Display a user-friendly error message on submission failure
- After a confirmed successful submission, show a "Notify Admin via WhatsApp" button linking to `https://wa.me/918689838590?text=<urlencoded message>` containing all booking details prefixed with "New Booking from Website"
- After a confirmed successful submission, show a "Notify Admin via Email" button opening a `mailto:ptripathy1989@gmail.com` link with subject "New Booking – Omm Vedic Numerloggy" and body containing all booking details
- Ensure both notification buttons include the booking ID from the backend response and are hidden before submission or on failure

**User-visible outcome:** Users can successfully submit the booking form without errors, see a confirmation with their booking ID, and use the WhatsApp and email buttons to notify the admin with full booking details.
