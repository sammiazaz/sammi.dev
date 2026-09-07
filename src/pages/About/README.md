# About Page Component (Exported from Blackhole)

This folder contains the complete, self-contained About page component including React JSX code, full CSS with design tokens, and all image assets.

---

## 📁 Folder Structure

```text
about_page_export/
├── About.jsx                       # Main React component
├── About.css                       # Complete styles & CSS variables
├── README.md                       # Setup & usage guide
└── assets/
    ├── images/
    │   └── delhi_location_map.png  # Delhi background map
    └── hover_image/
        ├── iStock-1025313432-2-EDITED-Header_Mobile.jpg
        ├── istockphoto-471052720-612x612.webp
        ├── istockphoto-482557081-612x612.webp
        ├── photo-1548013146-72479768bada.avif
        └── premium_photo-1661962542692-4fe7a4ad6b54.avif
```

---

## 📦 Required Dependencies

Install the required npm packages in your target project:

```bash
npm install framer-motion react-router-dom
```

> **Note on `react-router-dom`:**
> The Resume link in the side pill bar uses `<Link to="/resume" />`. If your project does not use `react-router-dom` (e.g., standard Next.js or a simple single-page HTML/React app), you can change line 3 and lines 218–224 in `About.jsx` to use standard `<a href="/resume">` tags instead.

---

## 🚀 Quick Usage

1. Copy the `about_page_export` folder (or rename it to `About` or `AboutPage`) into your project's `src/components/` or `src/pages/` directory.
2. Import and render it in your app:

```jsx
import React from 'react';
import About from './About'; // adjust path to where you placed it

export default function App() {
  return (
    <main>
      <About />
    </main>
  );
}
```

---

## 🎨 Features & Highlights

- **Interactive 3D Flipping Vertical Pill Bar**: Hovering over the side navigation flips letter tiles (`C-O-N-T-A-C-T`) into social links with animated tooltips.
- **Dynamic India Map Location Card**: Cycling hover images across Indian landmarks on mouse over, with glowing laser scanner animation and live coordinates.
- **Live LeetCode Stats Gauge**: Real-time stats fetched from `https://leetcode-stats-api.herokuapp.com/sammiazaz21` with multi-arc SVG ring visualization.
- **GitHub Contribution Heatmap**: Real-time contribution matrix fetched from `https://github-contributions-api.jogruber.de/v4/sammiazaz?y=last` with custom green/teal intensity levels.
- **Glassmorphic Bento Focus Cards**: Growth, Focus, and Craft spotlight cards with modern backdrop filters and hover elevation.
- **Self-Contained Styling**: Includes Comfortaa Google font import and root CSS variables directly in `About.css`.
