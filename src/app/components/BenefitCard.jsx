import { memo } from 'react'

const BenefitCard = memo(function BenefitCard({ icon: Icon, heading, content }) {
  return (
    <section className="BenefitCard group rounded-2xl border border-blue-200 bg-blue-200 p-6 transition-all duration-300 ease-in-out hover:bg-blue-800 hover:shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 transition-all duration-300 ease-in-out group-hover:bg-blue-50">
        <Icon className="m-2 inline-block text-white transition-all duration-300 ease-in-out group-hover:text-blue-600"></Icon>
      </div>
      <div>
        <h1 className="mb-2 text-lg font-semibold text-gray-900 transition-all duration-300 ease-in-out group-hover:text-white">
          {heading}
        </h1>
        <p className="text-pretty text-gray-600 transition-all duration-300 ease-in-out group-hover:text-indigo-50">
          {content}
        </p>
      </div>
    </section>
  )
})

export default BenefitCard