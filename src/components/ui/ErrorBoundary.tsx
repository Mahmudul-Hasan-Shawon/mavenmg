import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  /** Optional UI shown instead of the children after a caught error.
   *  Defaults to null so failures degrade silently to whatever sits
   *  beneath (e.g. a scene's CSS fallback layer). */
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  failed: boolean
}

/**
 * Minimal class-component error boundary. Wraps the R3F <Canvas> scenes so a
 * render-time failure (e.g. getContext succeeding but the GL context dying on
 * first use) unmounts just the scene instead of white-screening the page.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // WebGL/context failures are expected on some GPUs — keep a breadcrumb
    // without surfacing anything to the visitor.
    console.error('[ErrorBoundary] scene crashed, falling back:', error, info.componentStack)
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
