import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { withRouter } from 'react-router-dom'

function _CarouselComponent(props) {

    const {pet} = props

    function onClick() {
        console.log('props---', props)
        props.history.push(`/pet/${pet._id}`)
    }

    

    return (
        <div className="carousel-wrapper">
            <Carousel showThumbs={false} infiniteLoop={true} showStatus={false} onClickItem={onClick} >
                {pet.imgUrls.map( img => <div className="square-ratio" key={pet._id} > <img src={img} alt=""/></div>)}
            </Carousel>
        </div>
    );
}

export const CarouselComponent = withRouter(_CarouselComponent)