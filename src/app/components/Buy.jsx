import { memo } from 'react'
import BookNowButton from './BookNowButton'

const Buy = memo(function Buy() {
  return (
    <section id="buy" className="bg-white py-4">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h1 className="bg-linear-to-r from-black via-blue-400 to-black bg-clip-text pb-8 text-center text-4xl font-semibold text-transparent md:text-5xl">
          Buy Now and Get Relief Today
        </h1>

        {/* Card */}
        <div className="grid items-center gap-10 rounded-3xl bg-blue-50 p-4 shadow-md">
          <p className="text-center text-lg leading-relaxed text-wrap text-slate-700">
            Experience fast, natural relief from joint pain with our premium Ayurvedic formula.
            Trusted by thousands across India. Order now and feel the difference within days.
          </p>
          <div className="mx-auto">
            <BookNowButton content="Call Now to buy"></BookNowButton>
          </div>
        </div>
      </div>
    </section>
  )
})

export default Buy