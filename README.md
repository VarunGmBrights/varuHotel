# Varun GM — Luxury Hotel Booking Website

A modern, fully responsive luxury hotel booking website built with React JS.

## 🏨 Features

- **Hero Section** — Fullscreen auto-sliding banner with Framer Motion animations
- **Facilities Section** — 9 facility cards with hover animations
- **Rooms Section** — 6 room types with filtering, ratings, and detail pages
- **Booking Form** — Check-in/checkout/guests/room picker with validation & success modal
- **About Section** — Hotel story with animated counters (120+ rooms, 5000+ guests, etc.)
- **Testimonials** — Interactive review carousel with 5 guest stories
- **Gallery** — Masonry grid with lightbox, category filtering
- **Contact Page** — Form that emails directly to gmvarun60@gmail.com via FormSubmit
- **FAQ Section** — Accordion with 8 questions
- **Room Details Page** — Image gallery, amenities, reviews, booking modal, similar rooms
- **Full Gallery Page** — Category filters + keyboard-navigable lightbox
- **Dark Mode** — Toggle between dark/light themes
- **Sticky Navbar** — Mobile menu, smooth scroll links
- **Scroll-to-Top** — Floating button
- **Loading Screen** — Animated intro
- **Newsletter** — Footer subscription form

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site opens at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky navbar + mobile menu
│   ├── Footer.jsx          # Footer with newsletter
│   ├── HeroSection.jsx     # Fullscreen hero slider
│   ├── FacilitiesSection.jsx
│   ├── RoomsSection.jsx    # Rooms with filtering
│   ├── BookingSection.jsx  # Check-in/out form
│   ├── AboutSection.jsx    # Story + animated counters
│   ├── TestimonialsSection.jsx
│   ├── GallerySection.jsx  # Masonry preview
│   ├── FAQSection.jsx
│   ├── LoadingScreen.jsx
│   └── ScrollToTop.jsx
├── pages/
│   ├── Home.jsx            # Assembles all sections
│   ├── RoomDetails.jsx     # Dynamic room page
│   ├── ContactPage.jsx     # Contact form → gmvarun60@gmail.com
│   └── GalleryPage.jsx     # Full gallery
├── data/
│   └── data.js             # Rooms, facilities, testimonials, gallery data
├── context/
│   └── ThemeContext.jsx    # Dark mode context
├── App.jsx                 # Router + page transitions
├── main.jsx
└── index.css               # Tailwind + custom styles
```

## 📧 Contact Form

The contact form uses **FormSubmit.co** to send emails directly to `gmvarun60@gmail.com`.

> **First use:** FormSubmit will send a confirmation email to gmvarun60@gmail.com. Click the link to activate the form.

## 🎨 Design System

- **Fonts:** Cormorant Garant (headings) + Jost (body)
- **Primary:** Gold `#d4a853` / `#f0c875`
- **Background:** Navy `#080c14` / `#0d1628`
- **Text:** Cream `#f8f4ed`
- **Effects:** Glassmorphism, gradients, Framer Motion animations

## 🖼️ Images

All images are sourced from **Unsplash** (free, high-quality, luxury hotel photography).

## 📦 Tech Stack

| Technology | Version |
|-----------|---------|
| React | 18 |
| React Router DOM | 6 |
| Framer Motion | 10 |
| Tailwind CSS | 3 |
| React Icons | 4 |
| Vite | 4 |

---

*Built for Varun GM Luxury Hotel & Resort — gmvarun60@gmail.com*
