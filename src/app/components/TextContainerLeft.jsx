import TrustIcon from './TrustIcon'
import BookNowButton from './BookNowButton'
import TrustBadge from './TrustBadge'
export default function TextContainerLeft() {
  return (
    <section className="TextContainerLeft space-y-4">
      <h1 className="text-4xl leading-normal font-bold text-gray-900 sm:text-5xl lg:text-6xl">
        Natural Relief for
        <span className="text-blue-600"> Joint Pain</span>
      </h1>
      <p className="text-xl leading-relaxed text-slate-700">
        Experience the power of ancient Ayurvedic wisdom combined with modern science. Dhurandar
        Joint Pain Oil provides fast, effective relief from joint and muscle pain.
      </p>
      <TrustBadge></TrustBadge>
      <section>
        <a
          href="#buy"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="w-fit rounded-xl border-2 border-blue-900 bg-blue-900 px-2 text-xl text-white transition duration-300 ease-in-out xl:hover:bg-white xl:hover:text-blue-900"
        >
          Order Now
        </a>
      </section>
      <TrustIcon></TrustIcon>
    </section>
  )
}
