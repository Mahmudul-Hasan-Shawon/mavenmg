import { createRoot } from 'react-dom/client'
import App from './App'
import '@flaticon/flaticon-uicons/css/brands/all.css'
import './index.css'

// StrictMode intentionally omitted: GSAP ScrollTrigger pinning creates and
// reverts its layout on the double effect pass, which fights with the pinned
// WorkShowcase on route hydration.
createRoot(document.getElementById('root')!).render(<App />)
