import TextContainerLeft from './TextContainerLeft'
export default function Home() {
  return (
    <section className="Home rounded-b-4xl bg-blue-50 px-4 pt-4 shadow-xl md:pr-0">
      <section className="container mx-auto mb-4 md:flex md:justify-between">
        <TextContainerLeft></TextContainerLeft>
        <section className="flex">
          <img
            src="src\assets\mainImg.png"
            className="object-cover xl:max-w-md"
            alt=""
            loading="lazy"
          />
        </section>
      </section>
    </section>
  )
}
