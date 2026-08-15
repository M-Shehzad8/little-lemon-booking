# Little Lemon — Table Booking Web App

A React (Vite) web app for the **Little Lemon** restaurant that lets guests
book a table online. Built as the Meta Front-End Developer capstone project,
matching the official Little Lemon Figma design.

## Features

- 🍋 Semantic HTML (`<header>`, `<main>`, `<section>`, `<form>`, `<label>`, `<footer>`)
- 🎨 Brand-accurate UI matching the Little Lemon style guide
  (colors `#495E57` / `#F4CE14` / `#EE9972`, fonts **Markazi Text** + **Karla**)
- 🏠 Hero section (green panel, "Little Lemon / Chicago", food photo, "Reserve a table" CTA)
- 🍽️ Menu section ("Order for delivery!" + category filter chips + item cards)
- 📱 Fully responsive layout (mobile + desktop)
- 🧾 Client-side form validation with accessible error messages
- 🧩 `BookingForm` is a **child** component of `BookingPage`
- 🗓️ Available-times state is **managed by the parent** (`BookingPage`)
- 🔖 Meta tags + Open Graph Protocol tags in `index.html`
- ✅ Unit tests for validation and the form component (Vitest + Testing Library)

## Tech stack

- React 18 + Vite 5
- Vitest + @testing-library/react for unit tests
- Plain CSS (no UI framework) to closely match the Figma mockup
- Google Fonts: Markazi Text (headlines) + Karla (body)

## Getting started

### Prerequisites
- Node.js 18+ and npm

### Install dependencies
```bash
npm install
```

### Run the development server
```bash
npm run dev
```
Then open the printed local URL (usually http://localhost:5173).

### Build for production
```bash
npm run build
```

### Preview the production build
```bash
npm run preview
```

### Run the unit tests
```bash
npm test
```

## Project structure

```
little-lemon-booking/
├── index.html              # Meta + Open Graph tags, brand fonts
├── public/
│   ├── favicon.svg
│   └── images/             # Brand assets (logo, hero, menu photos)
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Composes Header / Hero / Menu / BookingPage / Footer
│   ├── App.css
│   ├── components/
│   │   ├── Header.jsx/.css       # White bar: hamburger, logo, cart
│   │   ├── Hero.jsx/.css         # Green hero with CTA
│   │   ├── Menu.jsx/.css         # Menu items + filter chips
│   │   ├── Footer.jsx/.css
│   │   ├── BookingPage.jsx/.css  # PARENT: owns availableTimes state
│   │   ├── BookingForm.jsx/.css  # CHILD: form + validation
│   │   └── BookingForm.test.jsx  # Component tests
│   └── utils/
│       ├── BookingAPI.js          # fetchAPI / initializeTimes / updateTimes
│       ├── validate.js            # Pure validation functions
│       └── validate.test.js       # Validation tests
```

## How the grading criteria are met

| Criterion | Where |
|-----------|-------|
| Matches Figma UI/UX | Brand colors `#495E57`/`#F4CE14`/`#EE9972`, Markazi Text + Karla fonts, Hero + Menu + Booking layout |
| Semantic HTML | `<header>`, `<main>`, `<form>`, `<label>`, `<footer>` |
| Responsive | Media queries in each CSS file |
| Meta + OG tags | `index.html` |
| BookingForm is a child | Rendered inside `BookingPage` |
| Times state in parent | `useReducer` in `BookingPage` |
| Client-side validation | `validate.js` + inline errors |
| Unit tests | `*.test.js` / `*.test.jsx` |
| Tests pass | `npm test` |

## License

Educational project for the Meta Front-End Developer Professional Certificate.
