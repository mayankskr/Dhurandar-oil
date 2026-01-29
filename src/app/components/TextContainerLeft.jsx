import TrustIcon from "./TrustIcon"
import BookNowButton from "./BookNowButton"
import TrustBadge from "./TrustBadge"
export default function TextContainerLeft(){
    return(
        <section className="TextContainerLeft space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-normal">
                Natural Relief for
                <span className="text-blue-600"> Joint Pain</span>
            </h1>
            <p className="text-slate-700 text-xl leading-relaxed">
            Experience the power of ancient Ayurvedic wisdom combined with modern science. 
            Dhurandar Joint Pain Oil provides fast, effective relief from joint and muscle pain.
            </p>
            <TrustBadge></TrustBadge>
            <section>
            <BookNowButton content="Order Now"></BookNowButton>
            </section>
            <TrustIcon></TrustIcon>
        </section>
    )
}