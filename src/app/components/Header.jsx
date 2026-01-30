import { useState, useEffect, useCallback } from 'react'
import BookNowButton from './BookNowButton'

export default function Header() {
  const [open, setOpen] = useState(false)

  // enable CSS smooth scroll globally
  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth')
  }, [])

  // scroll with offset for fixed header
  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const header = document.querySelector('header')
    const offset = header ? header.offsetHeight : 70 // adjust fallback if needed
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }, [])

  // desktop: allow ctrl/meta clicks to open in new tab
  const handleDesktopNav = useCallback(
    (e, id) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      scrollToId(id)
    },
    [scrollToId]
  )

  // mobile: close menu then scroll (small delay)
  const handleMobileNav = useCallback(
    (e, id) => {
      e.preventDefault()
      setOpen(false)
      setTimeout(() => scrollToId(id), 70) // 50-120ms works well
    },
    [scrollToId]
  )

  const toggleMenu = useCallback(() => setOpen((prev) => !prev), [])

  return (
    <section className="flex justify-center bg-blue-50">
      <header className="fixed z-20 container mx-auto flex justify-between p-2 before:pointer-events-none before:fixed before:top-0 before:left-0 before:-z-10 before:h-12 before:w-screen before:bg-blue-50 before:shadow-md">
        <section>
          <p className="text-2xl font-bold tracking-wider text-blue-900">Dhurandar Oil</p>
        </section>

        <nav className="hidden items-baseline text-xl md:flex">
          <ul className="flex gap-3">
            <li>
              <a
                href="#home"
                onClick={(e) => handleDesktopNav(e, 'home')}
                className="transition duration-300 ease-in-out hover:text-blue-900"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#benefit"
                onClick={(e) => handleDesktopNav(e, 'benefit')}
                className="transition duration-300 ease-in-out hover:text-blue-900"
              >
                Benefit
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                onClick={(e) => handleDesktopNav(e, 'how-it-works')}
                className="transition duration-300 ease-in-out hover:text-blue-900"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={(e) => handleDesktopNav(e, 'testimonials')}
                className="mr-4 transition duration-300 ease-in-out hover:text-blue-900"
              >
                Testimonials
              </a>
            </li>
          </ul>
          <a
                  href="#buy"
                  onClick={(e) => handleMobileNav(e, 'buy')}
                  className="w-fit rounded-xl border-2 border-blue-900 bg-blue-900 px-2 text-xl text-white transition duration-300 ease-in-out xl:hover:bg-white xl:hover:text-blue-900"
                >
                  Buy Now
                </a>
        </nav>

        <button
          className="z-50 text-2xl md:hidden"
          onClick={toggleMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          type="button"
        >
          {open ? '×' : '☰'}
        </button>

        {open && (
          <section
            id="mobile-menu"
            className="absolute top-12 left-0 z-50 h-screen w-screen border-t-2 border-t-slate-400 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#home" onClick={(e) => handleMobileNav(e, 'home')}>
                  Home
                </a>
              </li>
              <li>
                <a href="#benefit" onClick={(e) => handleMobileNav(e, 'benefit')}>
                  Benefit
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => handleMobileNav(e, 'how-it-works')}>
                  How it works
                </a>
              </li>
              <li>
                <a href="#testimonials" onClick={(e) => handleMobileNav(e, 'testimonials')}>
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#buy"
                  onClick={(e) => handleMobileNav(e, 'buy')}
                  className="w-fit rounded-xl border-2 border-blue-900 bg-blue-900 px-2 text-xl text-white transition duration-300 ease-in-out xl:hover:bg-white xl:hover:text-blue-900"
                >
                  Buy Now
                </a>
              </li>
            </ul>
          </section>
        )}
      </header>
    </section>
  )
}
