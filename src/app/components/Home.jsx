import { memo } from 'react'
import TextContainerLeft from './TextContainerLeft'

const Home = memo(function Home() {
  return (
    <section id="home" className="Home rounded-b-4xl bg-blue-50 px-4 pt-4 shadow-xl md:pr-0">
      <section className="container mx-auto mt-8 px-4 md:flex md:justify-between">
        <TextContainerLeft />
        <section className="flex">
          <img
            src="https://res.cloudinary.com/dym1rigju/image/upload/f_auto,q_auto,w_600/v1769917949/mainImg_mgiooc"
            className="object-cover xl:max-w-md"
            alt="Dhurandar Joint Pain Relief Oil Bottle"
            fetchPriority="high"
            width="600"
            height="600" 
          />
        </section>
      </section>
    </section>
  )
})

export default Home