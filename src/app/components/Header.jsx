import { useState, useCallback } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <section className="flex justify-center bg-blue-50">
      <header className="container mx-auto fixed z-20 flex justify-between p-2 before:pointer-events-none before:fixed before:left-0 before:bg-blue-50 before:-z-10 before:h-12 before:top-0 before:w-screen before:shadow-md">

        {/* Logo */}
        <section>
          <p className="text-2xl font-bold tracking-wider text-blue-900">
            Dhurandar Oil
          </p>
        </section>

        {/* Desktop Menu */}
        <nav className="hidden items-baseline text-xl md:flex">
          <ul className="flex gap-3">
            <li><a href="#home" className="transition duration-300 ease-in-out hover:text-blue-900">Home</a></li>
            <li><a href="#benefit" className="transition duration-300 ease-in-out hover:text-blue-900">Benefit</a></li>
            <li><a href="#how-it-works" className="transition duration-300 ease-in-out hover:text-blue-900">How it works</a></li>
            <li><a href="#testimonials" className="mr-4 transition duration-300 ease-in-out hover:text-blue-900">Testimonials</a></li>
            <li>
              <a
                href="#buy"
                onClick={toggleMenu}
                className="w-fit rounded-xl border-2 border-blue-900 bg-blue-900 px-2 text-xl text-white transition duration-300 ease-in-out xl:hover:bg-white xl:hover:text-blue-900"
              >
                Buy Now
              </a>
            </li>
          </ul>
        </nav>

        {/* Hamburger */}
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

        {/* Mobile Menu */}
        {open && (
          <section
            id="mobile-menu"
            className="absolute top-12 left-0 z-50 h-screen w-screen border-t-2 border-t-slate-400 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              <li><a href="#home" onClick={closeMenu}>Home</a></li>
              <li><a href="#benefit" onClick={closeMenu}>Benefit</a></li>
              <li><a href="#how-it-works" onClick={closeMenu}>How it works</a></li>
              <li><a href="#testimonials" onClick={closeMenu}>Testimonials</a></li>
              <li>
                <a
                  href="#buy"
                  onClick={closeMenu}
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