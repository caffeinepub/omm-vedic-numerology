# Specification

## Summary
**Goal:** Display the exact business address on the website and fix the WhatsApp deep link integration.

**Planned changes:**
- Display the full verbatim address "In front of Jagluck Services Pvt Ltd, 3269, Kotitirtha Ln, near Sampurna Jaleswar Temple, Gouri Nagar, Old Town, Bhubaneswar, Odisha 751002" in the FindUsSection component and the footer, styled with the cosmic/gold theme
- Update the Google Maps CTA link to use the Plus Code URL: `https://www.google.com/maps/search/?api=1&query=6RRQ%2B93M+Jagluck+services+pvt+ltd,+Kotitirtha+Ln,+Old+Town,+Bhubaneswar,+Odisha+751002`
- Update the JSON-LD LocalBusiness structured data in `index.html` with the correct address fields (streetAddress, addressLocality, addressRegion, postalCode, addressCountry) and update the `hasMap` URL to use the Plus Code
- Fix the WhatsApp deep link in `BookingForm.tsx` to use `https://wa.me/918689838590?text=...` with a pre-filled message containing booking details
- Fix the WhatsApp deep link in `AdminPage.tsx` to use the same corrected number `918689838590`

**User-visible outcome:** Visitors can see the exact business address on the homepage and footer, click a correctly resolving Google Maps link, and successfully open WhatsApp with the correct number and pre-filled booking details.
