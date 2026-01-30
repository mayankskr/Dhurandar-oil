import { Zap, Heart, Leaf, Users, Clock, ShieldCheck } from 'lucide-react'
import BenefitCard from './BenefitCard'
const Cards = [
  {
    id: 1,
    icon: Zap,
    heading: 'Fast Acting Relief',
    content: 'Experience noticeable pain relief within 15-20 minutes of application',
  },
  {
    id: 2,
    icon: Heart,
    heading: 'Deep Penetration',
    content: 'Advanced formula penetrates deep into muscles and joints for lasting relief',
  },
  {
    id: 3,
    icon: Leaf,
    heading: '100% Natural',
    content: 'Made from pure Ayurvedic herbs without any harmful chemicals',
  },
  {
    id: 4,
    icon: Users,
    heading: 'Trusted Formula',
    content: 'Used by thousands of satisfied customers across the country',
  },
  {
    id: 5,
    icon: Clock,
    heading: 'Long Lasting',
    content: 'Provides relief for up to 8-12 hours with regular use',
  },
  {
    id: 6,
    icon: ShieldCheck,
    heading: 'Safe to Use',
    content: 'No side effects, suitable for all age groups above 12 years',
  },
]

export default function Benefit() {
  return (
    <section id="benefit" className="Benefit container mx-auto p-4">
      <section className="text-center">
        <h1 className="text-4xl leading-tight font-bold tracking-wider text-slate-900">
          Why Choose Dhurandar?
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Discover the powerful benefits that make Daurandar the preferred choice for joint pain
          relief
        </p>
      </section>
      <section className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Cards.map((item) => (
          <BenefitCard
            key={item.id}
            icon={item.icon}
            heading={item.heading}
            content={item.content}
          />
        ))}
      </section>
    </section>
  )
}
