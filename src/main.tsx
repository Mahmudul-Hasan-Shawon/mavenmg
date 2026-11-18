import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import App from './App'
import './index.css'

// StrictMode intentionally omitted: GSAP ScrollTrigger pinning creates and
// reverts its layout on the double effect pass, which fights with the pinned
// WorkShowcase on route hydration.
createRoot(document.getElementById('root')!).render(<App />)
