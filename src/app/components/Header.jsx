import { useState } from 'react'
import BookNowButton from './BookNowButton'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    // When using :before, add before:pointer-events-none so that hover effects work
    <header className="container mx-auto flex justify-between p-2 before:pointer-events-none before:absolute before:left-0 before:h-10 before:w-screen before:shadow-md">
      {/* Desktop Menu */}
      <section>
        <p className="text-2xl font-bold tracking-wider text-blue-900">Dhurandar Oil</p>
      </section>

      <nav className="hidden items-baseline text-xl md:flex">
        <ul className="flex gap-3">
          <li>
            <a href="" className="transition duration-300 ease-in-out hover:text-blue-900">
              Home
            </a>
          </li>
          <li>
            <a href="" className="transition duration-300 ease-in-out hover:text-blue-900">
              Benefit
            </a>
          </li>
          <li>
            <a href="" className="transition duration-300 ease-in-out hover:text-blue-900">
              How it works
            </a>
          </li>
          <li>
            <a href="" className="mr-4 transition duration-300 ease-in-out hover:text-blue-900">
              Testimonials
            </a>
          </li>
        </ul>
        <BookNowButton content="Buy Now"></BookNowButton>
      </nav>

      {/* Hamburger (z-index added, aria attrs, icon toggles to cross) */}
      <button
        className="z-50 text-2xl md:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        type="button"
      >
        {open ? '×' : '☰'}
      </button>

      {/* Mobile Menu (z-index added, id for aria-controls) */}
      {open && (
        <section
          id="mobile-menu"
          className="absolute top-12 left-0 z-50 h-screen w-screen border-t-2 border-t-slate-400 p-4 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Benefit</a>
            </li>
            <li>
              <a href="#">How it works</a>
            </li>
            <li>
              <a href="#">Testimonials</a>
            </li>
            <BookNowButton content="Buy Now"></BookNowButton>
          </ul>
        </section>
      )}
    </header>
  )
}
