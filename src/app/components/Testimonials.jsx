import TestimonialCard from './TestimonialCard'
const testimonials = [
  {
    id: 1,
    username: 'Rajesh Kumar',
    meta: '62 years, Mumbai',
    img: 'https://sunil.drpilesfree.com/mayank/dhurandar/assets/Rajesh.jpg',
    quote:
      'After years of knee pain, I finally found relief with Dhurandar. I can now walk without discomfort and even started my morning walks again!',
  },
  {
    id: 2,
    username: 'Priya Sharma',
    meta: '45 years, Delhi',
    img: 'https://sunil.drpilesfree.com/mayank/dhurandar/assets/PriyaSharma.jpg',
    quote:
      'As a yoga instructor, joint flexibility is crucial for me. Dhurandar has become an essential part of my daily routine. Highly recommended!',
  },
  {
    id: 3,
    username: 'Anil Patel',
    meta: '58 years, Bangalore',
    img: 'https://sunil.drpilesfree.com/mayank/dhurandar/assets/AnilPatel.jpg',
    quote:
      'I was skeptical at first, but Dhurandar proved me wrong. The pain relief is fast and long-lasting. No more dependency on pain killers!',
  },
]
export default function Testimonials() {
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
            <TestimonialCard key={user.id} user={user} /> // We are passing the object here that is element of the array.
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
}
