import TextContainerLeft from "./TextContainerLeft"
export default function Home(){
    return(
        <div className="Home bg-blue-50 py-4">
            <div className="container md:flex mx-auto">
                <TextContainerLeft></TextContainerLeft>
                <div>
                    <img src="src\assets\mainImg.png" className="md:max-w-md" alt="" loading="lazy" />
                </div>
            </div>
        </div>
    )
}