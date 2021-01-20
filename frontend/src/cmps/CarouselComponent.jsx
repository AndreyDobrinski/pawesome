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
            <Carousel showThumbs={false} infiniteLoop={true} onClickItem={onClick}>
                <div className="square-ratio">
                    <img src={pet.imgUrls[0]} alt=""/>
                </div>
                <div className="square-ratio">
                    <img src={pet.imgUrls[1]} alt=""/>
                </div>
                <div className="square-ratio">
                    <img src={pet.imgUrls[2]} alt=""/>
                </div>
            </Carousel>
        </div>
    );
}

export const CarouselComponent = withRouter(_CarouselComponent)