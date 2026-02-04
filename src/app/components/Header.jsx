import { useState, useCallback } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleMenu = useCallback(() => setOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Benefit', id: 'benefit' },
    { name: 'How it works', id: 'how-it-works' },
    { name: 'Testimonials', id: 'testimonials' },
  ];

  return (
    <section className="flex justify-center bg-blue-50">
      <header className="container mx-auto fixed z-20 flex justify-between p-2 before:pointer-events-none before:fixed before:left-0 before:bg-blue-50/80 before:backdrop-blur-md before:-z-10 before:h-16 before:top-0 before:w-screen before:shadow-sm">

        <section>
          <p className="text-2xl font-bold tracking-wider text-blue-900">
            Dhurandar Oil
          </p>
        </section>

        <nav className="hidden items-center text-lg md:flex font-medium">
          <ul className="flex gap-6 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={`#${link.id}`} 
                  onClick={(e) => handleScroll(e, link.id)}
                  className="transition duration-300 ease-in-out hover:text-blue-600 text-slate-700"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#buy"
                onClick={(e) => handleScroll(e, 'buy')}
                className="ml-2 rounded-xl bg-blue-600 px-5 py-2 text-white transition duration-300 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
              >
                Buy Now
              </a>
            </li>
          </ul>
        </nav>

        <button
          className="z-50 text-2xl md:hidden text-slate-800"
          onClick={toggleMenu}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          type="button"
        >
          {open ? '×' : '☰'}
        </button>

        {open && (
          <div className="absolute top-0 left-0 z-40 h-screen w-screen bg-white/90 backdrop-blur-xl md:hidden flex items-center justify-center">
            <ul className="flex flex-col gap-6 text-center text-xl font-semibold">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={`#${link.id}`} onClick={(e) => handleScroll(e, link.id)} className="text-slate-800">
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#buy"
                  onClick={(e) => handleScroll(e, 'buy')}
                  className="inline-block mt-4 rounded-xl bg-blue-600 px-8 py-3 text-white shadow-xl"
                >
                  Buy Now
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </section>
  )
}