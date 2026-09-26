import type { AnchorHTMLAttributes } from 'react'

type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Real destination — keeps keyboard activation and open-in-new-tab working. */
  href: string
  /** SPA navigation handler, called instead of the default browser navigation. */
  onNavigate?: (href: string) => void
}

/** Anchor that keeps its href (focusable, middle-clickable) but routes clicks through onNavigate. */
export function SmartLink({ href, onNavigate, onClick, children, ...rest }: SmartLinkProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        e.preventDefault()
        onNavigate?.(href)
      }}
    >
      {children}
    </a>
  )
}
