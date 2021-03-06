import { petService } from "../services/petService.js";
import { Component } from 'react'
import { connect } from 'react-redux'
import { CarouselComponent} from '../cmps/CarouselComponent'


import { saveOrder } from '../store/actions/orderActions.js'
import { OrderAdd } from "../cmps/OrderAdd.jsx";
import { Reviews } from "../cmps/Reviews.jsx";
import { MapContainer } from "../cmps/MapContainer.jsx";
import { toggleDarkMode } from '../store/actions/appSettingsActions'

import { ReactComponent as HeartFull } from "../assets/imgs/heart-full.svg"
import { ReactComponent as FemaleBlack } from "../assets/imgs/female-black.svg"
import { ReactComponent as FemaleWhite } from "../assets/imgs/female-white.svg"
import { ReactComponent as MaleBlack } from "../assets/imgs/male-black.svg"
import { ReactComponent as MaleWhite } from "../assets/imgs/male-white.svg"
import { ReactComponent as AgeBlack } from "../assets/imgs/age-black.svg"
import { ReactComponent as AgeWhite } from "../assets/imgs/age-white.svg"
import { ReactComponent as SizeBlack } from "../assets/imgs/size-black.svg"
import { ReactComponent as SizeWhite } from "../assets/imgs/size-white.svg"
import { ReactComponent as ChildBlack } from "../assets/imgs/child-black.svg"
import { ReactComponent as ChildWhite } from "../assets/imgs/child-white.svg"
import { ReactComponent as DisabilityBlack } from "../assets/imgs/disability-black.svg"
import { ReactComponent as DisabilityWhite } from "../assets/imgs/disability-white.svg"
import { ReactComponent as AnimalsBlack } from "../assets/imgs/animals-black.svg"
import { ReactComponent as AnimalsWhite } from "../assets/imgs/animals-white.svg"
import { ReactComponent as PawprintBlack } from "../assets/imgs/pawprint-black.svg"
import { ReactComponent as PawprintWhite } from "../assets/imgs/pawprint-white.svg"
import { ReactComponent as WhatsappBlack } from "../assets/imgs/whatsapp-black.svg"
import { ReactComponent as WhatsappWhite } from "../assets/imgs/whatsapp-white.svg"




export class _PetDetails extends Component {
    state = {
        pet: null,
        isPetDetailsResiezed:false
    };

    componentDidMount() {
        const { petId } = this.props.match.params;
        this.loadPet(petId)
        window.addEventListener('resize', this.handleResize)
        this.handleResize()


    }

    loadPet = async (petId) => {
        try {
            const pet = await petService.getById(petId)
            return this.setState({ pet })
        } catch (err) {
            console.log('Error catched in fronf2', err)
        }
    }

    handleResize = () =>{
        if(window.innerWidth < 1100 ){
            this.setState({
                isPetDetailsResiezed:true
            })
        }else{
            this.setState({
                isPetDetailsResiezed:false
            })
        }
        
    }


    render() {
        const { pet } = this.state
        if (!pet) return <h2>Loading...</h2>
        return (
            <div className={`pet-details-page ${this.props.isDarkMode ? 'dark-mode-pet-details-page' : ''}`}>
                <div className="pet-details container">
                    <div className="pet-details-main-title">
                        <h2 className={`pet-details-pet-name ${this.props.isDarkMode ? 'dark-mode-pet-details-name' : ''}` }>{pet.name}</h2>
                        <div className="pet-details-block flex center">
                            <div className="pet-details-statstics flex">
                                <HeartFull />
                                <h5 className={`pet-details-statstics-likes ${this.props.isDarkMode ? 'dark-mode-pet-details-likes' : ''}`}>{pet.likes}</h5>
                            </div>
                            <h5 className={`${this.props.isDarkMode ? 'dark-mode-pet-details-likes' : ''}`}>·</h5>
                            <h5 className={`pet-details-statstics-host ${this.props.isDarkMode ? 'dark-mode-pet-details-likes' : ''}`}>{pet.host.fullname}</h5>
                        </div>
                    </div>






                    <div className={`pet-details-imgs ${this.state.isPetDetailsResiezed ? 'pet-details-imgs-hide' : ''}`}>
                        {pet.imgUrls.map((img, idx) => {
                            return <img src={img} alt="" key={idx} className='pet-details-img' />
                        })
                        }
                    </div>


                    <div className={`pet-details-imgs-carusel ${this.state.isPetDetailsResiezed ? 'pet-details-imgs-show' : ''}`}>
                        <CarouselComponent pet={pet}/>
                    </div>





                    <div className="pet-details-main">
                        <div className="pet-details-pet">
                            <div className="pet-details-title">
                                <h3 className={`${this.props.isDarkMode ? 'dark-mode-details-title' : ''}`}>{pet.shortDesc}</h3>
                            </div>
                            <div className={`pet-details-info ${this.props.isDarkMode ? 'dark-mode-details-info' : ''}`}>
                                <div className="pet-char">
                                    {pet.gender === 'female' ? this.props.isDarkMode ? <FemaleWhite /> : <FemaleBlack /> : this.props.isDarkMode ? <MaleWhite /> : <MaleBlack />}
                                    <h4>{pet.gender}</h4>
                                </div>
                                <div className="pet-char">
                                    <div>{this.props.isDarkMode ? <AgeWhite /> : <AgeBlack />}</div>
                                    <h4>{pet.age}</h4>
                                </div>
                                <div className="pet-char">
                                    <div>{this.props.isDarkMode ? <SizeWhite /> : <SizeBlack />}</div>
                                    <h4>{pet.size}</h4>
                                </div>
                                {pet.specialities && pet.specialities.map((spec, idx) => {
                                    switch (spec) {
                                        case 'friendly with children':
                                            var res = this.props.isDarkMode ? <ChildWhite /> : <ChildBlack />
                                            break
                                        case 'trained as service animal':
                                            var res = this.props.isDarkMode ? <DisabilityWhite /> : <DisabilityBlack />
                                            break
                                        case 'friendly with other animals':
                                            var res = this.props.isDarkMode ? <AnimalsWhite /> : <AnimalsBlack />
                                            break
                                        default:
                                            res = this.props.isDarkMode ? <PawprintWhite /> : <PawprintBlack />
                                            break
                                    }
                                    return <div key={idx} className="pet-char">
                                        {res}
                                        <h4>{spec}</h4>
                                    </div>
                                })}
                            </div>
                            <div className="pet-details-about">
                                <h3 className={`pet-details-story-title ${this.props.isDarkMode ? 'dark-mode-story-title' : ''}`}>{pet.name}'s story</h3>
                                <p className={`pet-details-story-desc ${this.props.isDarkMode ? 'dark-mode-story-desc' : ''}`}>{pet.description}</p>
                            </div>
                        </div>
                        <div className="pet-details-nav">
                            <OrderAdd pet={pet} />
                        </div>
                    </div>

                    <Reviews />

                    <div className="pet-details-map" >
                        <h3 className={`pet-details-map-title ${this.props.isDarkMode ? 'dark-mode-map-title' : ''}`}>Location</h3>
                        <p className={`pet-details-map-loc ${this.props.isDarkMode ? 'dark-mode-map-loc' : ''}`}>{pet.host.loc.address}</p>
                        <div className="map-contact flex">
                            <div className="map-contact-whatsapp flex justify-center  align-center">{this.props.isDarkMode ? <WhatsappWhite /> : <WhatsappBlack />} </div>
                            <p className={`map-contact-phone flex justify-center  align-center ${this.props.isDarkMode ? 'dark-mode-map-loc' : ''}`}>{pet.host.phone}</p>
                        </div>

                        <iframe className="map-frame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.774375029796!2d34.773206115548874!3d32.0753507267356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b80606b804b%3A0x697250962d76bb21!2sDizengoff%2050%2C%20Tel%20Aviv-Yafo!5e0!3m2!1sru!2sil!4v1613405310300!5m2!1sen!2sil"></iframe>
                        {/* <MapContainer hostCreds={{ lat: pet.host.loc.lat, lng: pet.host.loc.lng }} /> */}
                    </div>

                </div>

            </div>

        )
    }
}

const mapGlobalStateToProps = (state) => {
    return {
        isDarkMode: state.appSettingsModule.isDarkMode
    }
}

const mapDispatchToProps = {
    saveOrder,
    toggleDarkMode

}
export const PetDetails = connect(mapGlobalStateToProps, mapDispatchToProps)(_PetDetails)


