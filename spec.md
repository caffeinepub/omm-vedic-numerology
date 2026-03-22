# Omm Vedic Numerology

## Current State
Full website with Hero, Services, Testimonials, About, Booking, JustDial, FindUs, Contact, and Footer sections. Router has home `/` and admin `/admin` routes.

## Requested Changes (Diff)

### Add
- `/blog` route listing all 10 blog posts in a grid
- `/blog/:slug` route for individual blog post detail page
- `BlogPage` component (list view)
- `BlogPostPage` component (detail view)
- `BlogSection` component on HomePage showing a preview of 3 latest blog posts with a "Read All Articles" button
- 10 static blog posts covering all services:
  1. "The Power of Vedic Numerology: How Numbers Shape Your Destiny" (numerology)
  2. "Tarot Card Reading Explained: What the Cards Reveal About Your Life" (tarot)
  3. "Vastu Shastra for Modern Homes: Harmonize Your Living Space" (vastu)
  4. "Pronology: The Science of Sound Vibrations in Your Name" (pronology)
  5. "Expert Watch Analysis: How Your Watch Reflects Your Energy" (watch analysis)
  6. "Life Path Numbers: Find Your True Purpose Through Numerology" (numerology)
  7. "The Major Arcana: 22 Cards That Map Your Spiritual Journey" (tarot)
  8. "Vastu for Your Office: Attract Prosperity and Career Growth" (vastu)
  9. "Name Correction Through Numerology: Transform Your Luck" (numerology + pronology)
  10. "Five Ancient Vedic Sciences That Can Change Your Life" (all services)
- Navigation header link to Blog
- Blog posts are rich, long-form with intro, sections, tips, and a call-to-action to book at ₹400

### Modify
- `App.tsx`: Add blog routes
- `HomePage.tsx`: Add BlogSection before footer
- `Header` component: Add Blog nav link

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/data/blogPosts.ts` with 10 rich blog post objects (slug, title, excerpt, content, category, readTime, date, coverEmoji)
2. Create `src/frontend/src/pages/BlogPage.tsx` - grid of all posts
3. Create `src/frontend/src/pages/BlogPostPage.tsx` - full post detail
4. Create `src/frontend/src/components/home/BlogSection.tsx` - homepage preview of latest 3 posts
5. Update `App.tsx` to add `/blog` and `/blog/$slug` routes
6. Update `HomePage.tsx` to include `<BlogSection />` before footer
7. Update Header to include Blog link in navigation
