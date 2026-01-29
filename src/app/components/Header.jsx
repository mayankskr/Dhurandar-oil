import { useState } from "react";
import BookNowButton from "./BookNowButton";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    // When using :before, add before:pointer-events-none so that hover effects work
    <header className="container mx-auto flex justify-between p-2 before:w-screen before:shadow-md before:absolute before:left-0 before:h-10 before:pointer-events-none">
      {/* Desktop Menu */}
      <section>
        <p className="text-blue-900 text-2xl font-bold tracking-wider">
          Dhurandar Oil
        </p>
      </section>

      <nav className=" hidden md:flex text-xl items-baseline">
        <ul className="flex gap-3">
          <li><a href="" className="hover:text-blue-900 transition duration-300 ease-in-out">Home</a></li>
          <li><a href="" className="hover:text-blue-900 transition duration-300 ease-in-out">Benefit</a></li>
          <li><a href="" className="hover:text-blue-900 transition duration-300 ease-in-out">How it works</a></li>
          <li><a href="" className="hover:text-blue-900 transition duration-300 ease-in-out mr-4">Testimonials</a></li>
        </ul>
        <BookNowButton content="Buy Now"></BookNowButton>
        </nav>

      {/* Hamburger (z-index added, aria attrs, icon toggles to cross) */}
      <button
        className="md:hidden text-2xl z-50"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        type="button"
      >
        {open ? "×" : "☰"}
      </button>

      {/* Mobile Menu (z-index added, id for aria-controls) */}
      {open && (
        <section id="mobile-menu" className="absolute top-12 h-screen w-screen left-0  backdrop-blur-xl border-t-2 border-t-slate-400 p-4 md:hidden z-50">
          <ul className="flex flex-col gap-2">
            <li><a href="#">Home</a></li>
            <li><a href="#">Benefit</a></li>
            <li><a href="#">How it works</a></li>
            <li><a href="#">Testimonials</a></li>
            <BookNowButton content="Buy Now"></BookNowButton>          
          </ul>
        </section>
      )}
    </header>
  );
}
