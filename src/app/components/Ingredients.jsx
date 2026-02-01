import { memo } from 'react'

const ingredients = [
  {
    id: 1,
    title: 'Nilgiri Oil',
    desc: 'It has strong anti-inflammatory properties, which help reduce pain in the joints and muscles.',
    img: 'https://res.cloudinary.com/dym1rigju/image/upload/w_300,h_300,c_fill,q_auto,f_auto/v1769917907/Nilgiri_Oil_j09qio.jpg',
  },
  {
    id: 2,
    title: 'Sonth Oil',
    desc: 'Helps to make joints flexible by reducing their stiffness and making movement easier.',
    img: 'https://res.cloudinary.com/dym1rigju/image/upload/w_300,h_300,c_fill,q_auto,f_auto/v1769917907/Sonth_Oil_cxuwdf.jpg',
  },
  {
    id: 3,
    title: 'Lavang Oil',
    desc: 'It has strong anti-oxidant properties that help improve blood circulation around joints. ',
    img: 'https://res.cloudinary.com/dym1rigju/image/upload/w_300,h_300,c_fill,q_auto,f_auto/v1769917907/Lavanga_Oil_lal49v.jpg',
  },
  {
    id: 4,
    title: 'Roghan Phosphorus',
    desc: 'This herb inside Dhurandar makes joints and bones stronger from within. ',
    img: 'https://res.cloudinary.com/dym1rigju/image/upload/w_300,h_300,c_fill,q_auto,f_auto/v1769917905/Rogan_Phosphorus_getfy1.webp',
  },
  {
    id: 5,
    title: 'Til Oil',
    desc: 'This natural oil nourishes the joints and muscles, reducing swelling.',
    img: 'https://res.cloudinary.com/dym1rigju/image/upload/w_300,h_300,c_fill,q_auto,f_auto/v1769917907/Til_Oil_ta5wg9.jpg',
  },
]

const Ingredients = memo(function Ingredients() {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Powered by Nature's Best
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Each ingredient is carefully selected from premium natural sources to ensure maximum
            effectiveness and safety
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 md:grid md:grid-cols-2 lg:flex lg:flex-row lg:gap-6">
          {ingredients.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl lg:max-w-xs lg:flex-1"
            >
              <div className="relative aspect-square overflow-hidden bg-black">
                <div className="absolute h-full w-full bg-black opacity-20"></div>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  width="300"
                  height="300"
                  className="h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="bg-blue-50 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Ingredients