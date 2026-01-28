export default function BookNowButton({content}){
    return(
        <a href="" className=" w-fit px-2 
        border-2 border-blue-900 rounded-xl
        text-white text-xl bg-blue-900
        transition duration-300 ease-in-out
        xl:hover:bg-white
        xl:hover:text-blue-900 
        ">
            {content}
        </a>
    )
}