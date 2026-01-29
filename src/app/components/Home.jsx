import TextContainerLeft from "./TextContainerLeft"
export default function Home(){
    return(
        <section className="Home bg-blue-50 pl-4 pt-4 shadow-md">
            <section className="container md:flex md:justify-between mx-auto mb-4">
                <TextContainerLeft></TextContainerLeft>
                <section className="flex">
                    <img src="src\assets\mainImg.png" className="xl:max-w-md object-cover" alt="" loading="lazy" />
                </section>
            </section>
        </section>
    )
}