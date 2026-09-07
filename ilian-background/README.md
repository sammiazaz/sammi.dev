# Ilian Background

Portable extraction of the animated background used by the Ilian portfolio.

## Files

- `IlanBackground.jsx` contains the React background component and canvas animation.
- `ilian-background.css` contains the fixed canvas layer, noise texture, and reduced-motion rule.
- `assets/` contains the image and four videos sampled by the dotfield.

## React/Vite integration

Copy this folder into the project, then render the component near the root of the app:

```jsx
import IlanBackground from './ilian-background/IlanBackground';

export default function App() {
  return (
    <>
      <IlanBackground />
      <main>{/* application content */}</main>
    </>
  );
}
```

The canvas is fixed and uses `z-index: 0`. Put page content in a positioned layer above it, for example:

```css
main {
  position: relative;
  z-index: 1;
}
```

The component watches `html[data-theme="light"]` to match the original light/dark color behavior. It fades and stops after one viewport of scroll, pauses when the tab is hidden, responds to mouse/touch movement, and disables itself for reduced-motion users.

## Dependencies

- React 18+ or React 19
- A Vite-compatible bundler for `.mp4` and `.webp` imports

No animation library or runtime package is required beyond React.
