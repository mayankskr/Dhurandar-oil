import { memo } from 'react'
import TestimonialCard from './TestimonialCard'

const testimonials = [
  {
    id: 1,
    username: 'Rajesh Kumar',
    meta: '62 years, Mumbai',
    img: 'https://res.cloudinary.com/dym1rigju/image/upload/w_300,h_300,c_fill,q_auto,f_auto/v1769917950/Rajesh_jicuaa.jpg',
    quote:
      'After years of knee pain, I finally found relief with Dhurandar. I can now walk without discomfort and even started my morning walks again!',
  },
  {
    id: 2,
    username: 'Priya Sharma',
    meta: '45 years, Delhi',
    img: 'https://res.cloudinary.com/dym1rigju/image/upload/w_300,h_300,c_fill,q_auto,f_auto/v1769917950/PriyaSharma_abz4rl.jpg',
    quote:
      'As a yoga instructor, joint flexibility is crucial for me. Dhurandar has become an essential part of my daily routine. Highly recommended!',
  },
  {
    id: 3,
    username: 'Anil Patel',
    meta: '58 years, Bangalore',
    img: 'https://res.cloudinary.com/dym1rigju/image/upload/w_300,h_300,c_fill,q_auto,f_auto/v1769917949/AnilPatel_bzdjrv.jpg',
    quote:
      'I was skeptical at first, but Dhurandar proved me wrong. The pain relief is fast and long-lasting. No more dependency on pain killers!',
  },
]

const Testimonials = memo(function Testimonials() {
  return (
    <section id="testimonials" className="bg-linear-to-br from-blue-900 to-blue-800 p-4 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">What Our Customers Say</h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Join thousands of satisfied customers who have found relief with Dhurandar
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((user) => (
            <TestimonialCard key={user.id} user={user} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-blue-100">
            Join <span className="font-bold text-white">50,000+</span> satisfied customers
          </p>
        </div>
      </div>
    </section>
  )
})

export default Testimonials