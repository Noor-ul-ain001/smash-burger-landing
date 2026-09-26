import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './CornerNav.css'

gsap.registerPlugin(useGSAP)

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Locations', href: '#locations' },
  { label: 'Order', href: '#order' },
]

function CornerNav() {
  const overlayRef = useRef(null)
  const [open, setOpen] = useState(false)

  useGSAP(
    () => {
      const overlay = overlayRef.current
      const lines = overlay.querySelectorAll('.corner-nav-line')

      if (open) {
        gsap.set(overlay, { display: 'flex' })
        gsap.fromTo(
          overlay,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4, ease: 'power2.out' }
        )
        gsap.fromTo(
          lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.06,
            delay: 0.1,
          }
        )
      } else {
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => gsap.set(overlay, { display: 'none' }),
        })
      }
    },
    { dependencies: [open] }
  )

  return (
    <>
      <header className="corner-nav">
        <a href="#home" className="corner-nav-logo">
          Burger&nbsp;Haus
        </a>

        <button
          type="button"
          className="corner-nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="corner-nav-toggle-label">
            {open ? 'Close' : 'Menu'}
          </span>
          <span className={`corner-nav-icon ${open ? 'is-open' : ''}`}>
            <span />
            <span />
          </span>
        </button>
      </header>

      <div className="corner-nav-overlay" ref={overlayRef}>
        <nav className="corner-nav-links">
          {LINKS.map((link, i) => (
            <div className="corner-nav-line-mask" key={link.href}>
              <a
                href={link.href}
                className="corner-nav-line"
                onClick={() => setOpen(false)}
              >
                <span className="corner-nav-line-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}

export default CornerNav
