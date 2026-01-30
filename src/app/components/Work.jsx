const steps = [
  {
    id: 1,
    title: 'Apply Gently',
    desc: 'Take a small amount of oil and apply it to the affected area',
  },
  {
    id: 2,
    title: 'Massage Thoroughly',
    desc: 'Massage in circular motions for 3-5 minutes until absorbed',
  },
  {
    id: 3,
    title: 'Feel the Relief',
    desc: 'Experience soothing warmth and pain relief within 15-20 minutes',
  },
  {
    id: 4,
    title: 'Repeat Daily',
    desc: 'Use 2-3 times daily for best results and long-term relief',
  },
]

export default function Work() {
  return (
    <section id="how-it-works" className="bg-blue-50">
      <div className="container mx-auto p-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Simple steps to experience fast and effective pain relief
          </p>
        </div>

        <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 overflow-hidden rounded-2xl md:order-1">
            <img
              src="https://sunil.drpilesfree.com/mayank/dhurandar/assets/neckPain.png"
              alt="Pain relief therapy"
              className="w-full transition duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <div className="order-1 space-y-6 md:order-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex gap-4 rounded-2xl transition duration-300 ease-in-out hover:-translate-2 hover:bg-blue-300"
              >
                <div className="shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-blue-800">
                    <span className="text-xl font-bold text-white">
                      {String(step.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
