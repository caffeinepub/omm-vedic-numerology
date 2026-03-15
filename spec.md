# Specification

## Summary
**Goal:** Add a suite of advanced UI features and enhancements to the Omm Vedic Numerloggy homepage, hero section, booking form, and admin dashboard to create a more immersive, interactive experience.

**Planned changes:**
- Add an animated particle/star-field canvas layer (golden orbs, twinkling stars, drifting mandala outlines) behind the hero section
- Add a parallax scroll effect to the hero section background image, disabled on mobile viewports below 768px
- Add a continuously scrolling marquee ticker banner between the header and hero section with all four services, location, and price info styled with a gold gradient
- Add a live bookings counter badge in the hero section fetching total booking count from a new `getTotalBookingCount` backend query, auto-refreshing every 60 seconds
- Add a Client Testimonials carousel section (between Services and About) with at least 5 hardcoded cards showing name, city, service, 5-star rating, and quote; auto-advances every 5 seconds with manual prev/next navigation
- Add a Daily Cosmic Insight section (between Testimonials and WhyChooseUs) displaying a daily rotating tip from a hardcoded array of 14 tips selected by `dayOfYear % 14`, inside a mandala-bordered card
- Add an interactive Spiritual Profile Quiz section on the homepage with 3–5 multiple-choice questions that recommends one of the four services and provides a "Book This Service" CTA that pre-selects the service in the booking form
- Convert the booking form into a 3-step wizard (Step 1: Service & Category; Step 2: Personal Details; Step 3: Schedule & Message) with a step progress indicator, Next/Back navigation, and backend submission only on the final step
- Add a floating "Book via WhatsApp" button fixed to the bottom-left with a gold/cosmic gradient that opens a pre-filled WhatsApp deep link to +918689838590
- Add an Admin Analytics panel above the bookings table on AdminPage showing total bookings, per-service CSS bar chart, status counts, and most recent booking date
- Add `getTotalBookingCount` public query to `backend/main.mo` returning total bookings as Nat

**User-visible outcome:** Visitors experience a visually immersive homepage with animated hero, scrolling ticker, testimonials carousel, daily spiritual tips, and a guided quiz that recommends and pre-selects a service in an improved multi-step booking form. A WhatsApp booking shortcut floats at the bottom-left. Admins see a new analytics summary panel on the dashboard.
