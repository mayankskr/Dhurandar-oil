import { memo } from 'react'
import { Star, Quote } from 'lucide-react'

const TestimonialCard = memo(function TestimonialCard({ user }) {
  return (
    <div className="TestimonialCard group rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-colors hover:bg-white/20">
      <Quote className="mb-4 h-10 w-10 rotate-180 text-blue-300 duration-300 ease-in-out group-hover:text-white" />

      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="leading-relaxed text-blue-50">{user.quote}</p>

      <Quote className="mb-4 ml-[80%] h-10 w-10 text-blue-300 duration-300 ease-in-out group-hover:text-white" />

      <div className="flex items-center gap-4">
        <img 
            src={user.img} 
            alt={user.username} 
            className="h-12 w-12 rounded-full object-cover" 
            width="48"
            height="48"
            loading="lazy"
        />
        <div>
          <p className="font-semibold">{user.username}</p>
          <p className="text-sm text-blue-200">{user.meta}</p>
        </div>
      </div>
    </div>
  )
})

export default TestimonialCard